import RadixCounter from "../components/RadixCounter";
import Value from "../component/Value";
import Adder from "../component/Adder";
import Timer from "../component/Timer";
import Temperature from "../component/Temperature";
import { useState } from "react";

const Component = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="container py-4">

      <div className="row g-4 mb-2">
        <div className="col-md-4">
          <div className="p-3 shadow-sm  h-100">
            <h5 className="text-center mb-3">Counter</h5>
            <Value name={"COUNTER"} value={counter} setValue={setCounter} />
          </div>
        </div>

        <div className="col-md-8">
          <div className="p-3 shadow-sm h-100">
            <h5 className="text-center mb-3">Timer</h5>
            <Timer />
          </div>
        </div>
      </div>

      <div className="row g-4 mb-2">
        <div className="col-12">
          <div className="p-3  shadow-sm ">
            <h5 className="text-center mb-3">Adder</h5>
            <Adder name={"ADD"} />
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="p-3 shadow-sm ">
            <h5 className="text-center mb-3">Temperature</h5>
            <Temperature />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Component;
