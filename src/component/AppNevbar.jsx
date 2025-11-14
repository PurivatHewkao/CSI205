import { useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNevBar = ({products, carts, setToken}) => {


    return ( 
        <div className="dcontainer-fluid py-2  d-flex p-3 justify-content-center gap-2">

            <Link to={'home'}>
                <Button variant='outline-primary'>Home</Button>
                </Link>
            <Link to={'calculator'}>
                <Button variant='outline-primary'>Calculator</Button>
            </Link>
            <Link to={'animation'}>
                <Button variant='outline-primary'>Animation</Button>
            </Link>
            <Link to={'component'}>
                <Button variant='outline-primary'>Component</Button>
            </Link>
            <Link to={'todos'}>
                <Button variant='outline-primary'>Todos</Button>
            </Link>
            <Link to={'products'}>
                <Button variant="outline-primary">Products{(products.length)}</Button>
            </Link>
            <Link to={'carts'}>
                <Button variant="outline-primary position-relative">Carts
                    {carts.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {carts.length < 10 ? carts.length :'9+'}
                        <span className="visually-hidden">Unread</span>
                    </span>
                    )}
                </Button>
            </Link>
            <Button variant="outline-danger" onClick={()=>{setToken('')}}>Logout</Button>
            
        </div>
     );
}
 
export default AppNevBar;