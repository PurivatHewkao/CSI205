import { useEffect, useRef, useState } from "react";
import { fetchTodos } from "../data/todos";
import { Form, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

const Todos = () => {

  const newTitleRef = useRef()
  const newIdRef = useRef()
  //todosRaw -> fliters -> todos 
  // [getchTodos] -> todosRaw -> [filter] -> todos -> [pageination] -> view
  // onlyWaiting ->
  // todos -> [] => numPages
  // itemsPerPage ->

  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [numPages, setNumPages] = useState(3);
  const [curPage, setCurPage] = useState(1);

  //load
  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []); // fetch todos on load

  useEffect(() => {
    //bypass filters
    if(onlyWaiting)
    
      setTodos(todosRaw.filter( (todo) => !todo.completed
     ))
    
    else
    
    setTodos(todosRaw);
    
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage))
  },[todos,itemsPerPage])

  useEffect(() => {
    if (numPages <= 0 ) setCurPage(0)
    else if (curPage > numPages) setCurPage(numPages)
    else if (curPage <= 0 ) setCurPage(1)
  }, [numPages])

  const waittingClicked = (id) => {
    console.log(id)

    const foundTodo = todos.find( (todo)=> {
      return todo.id === id 
    })
    foundTodo.completed = true

    setTodosRaw(...[ todosRaw ]) // force to be effect to refrech view
  }

  const deleteClicked = (id) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id))
  }

  // handel modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveClieked = (id, title) => {
    console.log(id,title)
    if (title.trim() !== "")
    {
      const newTodo = {
        userId: 1,
        id,
        title,
        completed: false
      }

      setTodosRaw([...todosRaw, newTodo])
    }

    newIdRef.current.value = ""
    newTitleRef.current.value = ""
    handleClose()
  }

  return (
    <>
      {/* modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
              value={todosRaw.reduce( (prev, todo) => {
                return todo.id > prev ? todo.id : prev
              }, -1) +1}
              disabled = {true}
              ref={newIdRef}

              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                placeholder="new todo here"
                autoFocus
                ref={newTitleRef} 
              />
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => 
            saveClieked(Number(newIdRef.current.value), newTitleRef.current.value)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* filter */}
      <Form>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Show only waiting" 
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          <Form.Select
            aria-label="Default select example"
            className="w-25"
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </Form.Select>
        </div>
      </Form>

      {/* table */}
      <div>
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th className="text-center" style={{ width: "75px" }}>
                ID
              </th>
              <th>Titile</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed&nbsp;
                <Button onClick={() => handleShow()}>
                  <i className="bi bi-plus"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              // start = (curPage-1) * itemsPerPage = 0
              // stop  = curPage * itemsPerPage -   = 4
            todos.filter((todo, index) => {
              return index >= (curPage -1 ) *itemsPerPage && 
                     index <= curPage * itemsPerPage -1
            })
            
            .map((todo) => {
              return (
                <tr>
                  <td className="text-center">
                    <h5>
                      <Badge bg="secondary">{todo.id}</Badge>
                    </h5>
                  </td>

                  <td className="text-start">{todo.title}</td>
                  <td className="text-end">
                    {todo.completed ? (
                      <Badge bg="success" className="fs-6">
                        done
                      </Badge>
                    ) : (
                      <Button variant="warning" 
                      onClick={() =>waittingClicked(todo.id)}>
                        Waiting&nbsp;<i className="bi bi-clock"></i>
                      </Button>
                    )}
                    &nbsp;
                    <Button variant="danger"
                    onClick={() => deleteClicked(todo.id)}>
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* page control */}
      <div className="text-center">
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </Button>{" "}
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => {
            curPage > 1 && setCurPage((p) => p - 1);
          }}
          disabled={curPage === 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage} &nbsp;/&nbsp; {numPages}
        </span>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => {
            if (curPage < numPages) setCurPage((p) => p + 1);
          }}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
      </div>
    </>
  );
};

export default Todos;
