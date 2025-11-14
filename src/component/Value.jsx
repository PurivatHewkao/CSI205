import { useEffect, useState } from "react"

const Value = ({ name, initial, type, value, setValue }) => {

  // const[value, setValue] = useState(0)

  useEffect(() => {
    setValue(initial || 0)
  }, [initial])

  return (
    <div
      className="border border-black border-2 rounded-3 mx-auto p-2 mt-3 bg-body-secondary"
      style={{ width: "fit-content" }}>

      <h1 className="text-center fw-bold text-primary">{name || "VALUE"}</h1>

      <div className="d-flex justify-content-center align-items-center gap-3">
        <button
          className="btn btn-danger px-3"
          onClick={() => setValue((p) => p - 1)}>
          &minus;
        </button>

        <div className="fs-2 fw-bold">

          {type === 'real' ? value.toFixed(2) : Math.round(value)}
        </div>

        <button
          className="btn btn-success px-3"
          onClick={() => setValue((p) => p + 1)}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Value