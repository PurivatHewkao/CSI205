import { useState } from "react"

const RadixCounter = () => {

    //    getter   setter
    const [value, setValue] = useState(0)
    const bin = value.toString(2).padStart(12, '0')
    const oct = value.toString(8).padStart(4, '0')
    const hex = value.toString(16).toUpperCase().padStart(3, '0')

    const plusClicked = () => {
        console.log("+")
        if (value >= 4095)
        {
            setValue(0)
        }
        else
        {
        setValue(prev => prev + 1)
        }
        // convertBinary()

    }

    const minusClicked = () => {
        console.log("-")
        if (value <= 0) 
        {
            setValue(4095)
        }
        else 
        {
            setValue(prev => prev - 1)
        }


    }

    const resetClicked = () => {
        console.log("Reset")
        setValue(0)
    }

    // const convertBinary = () => {
    //     console.log("Binary Call")
    //     let num = value + 1
    //     let displayDEC = value +1 
    //     if( value !== 0)
    //     {
    //         let fraction = []
    //         while(num > 0)
    //         {
    //             // divine number to find feacrtion and keep in array
    //             let remind = num % 2
    //             num = Math.floor(num / 2)
    //             fraction.push(remind)

    //             // display array
    //             console.log("num:"+ displayDEC +"fraction: " + fraction)

    //             // reverse array
    //             fraction.reverse()
    //             console.log(fraction)
                
    //             let bin = fraction.join('').padStart(12,'0')
    //             return bin
    //         }

    //     }
    // }

    return (
        // container
        <div className="border border-2 border-black rounded-3 p-3 m-auto"
            style={{ width: '400px' }}>

            {/* title */}
            <div className="text-center fw-bold fs-4">RADIX COUNTER</div>

            {/* body */}
            <div className="d-flex justify-content-between mt-3">
                <div className="text-center">
                    <div className="fw-bold">[HEX]</div>
                    <div className="font-monospace">{hex}</div>
                </div>
                <div className="text-center">
                    <div className="fw-bold">[DEC]</div>
                    <div className="font-monospace text-primary fw-bold">{value.toString().padStart(4, '0')}</div>
                </div>
                <div className="text-center">
                    <div className="fw-bold">[OCT]</div>
                    <div className="font-monospace">{oct}</div>
                </div>
                <div className="text-center">
                    <div className=" fw-bold">[ฺBIN]</div>
                    <div className="font-monospace">{bin}</div>
                </div>

            </div>

            {/* button */}
            <div className="mt-3 d-flex justify-content-around">
                <button className="btn btn-danger px-4" onClick={minusClicked}>&minus;</button>
                <button className="btn btn-secondary px-4" onClick={resetClicked}>RESET</button>
                <button className="btn btn-success px-4" onClick={plusClicked}>+</button>
            </div>
        </div>
    )
}

export default RadixCounter