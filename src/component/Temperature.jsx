import { useState, useEffect } from "react"
import Value from "./Value"

const Temperature = () => {

    const [cel, setCel] = useState(0)
    const [fah, setFah] = useState(0)
    const [kel, setKel] = useState(0)

    const handleCelsiusChange = (newCel) => {
        // แปลงค่าเป็นตัวเลข (หรือ 0 ถ้าเป็น string ว่าง)
    const c = parseFloat(newCel) || 0; 

    setCel(newCel); // เก็บ string สำหรับ input field
    setFah((c * 9/5) + 32);
    setKel(c + 273.15);
    }

    const handleFahrenheitChange = (newFah) => {
        const f = parseFloat(newFah) || 0;

        setFah(newFah)
        const c = (f - 32) * 5 / 9;
        setCel(c);
        setKel(c + 273.15);
    }

    const handleKelvinChange = (newKel) => {
        const k = parseFloat(newKel) || 0
        setKel(k)
        const c = k - 273.15
        setCel(c)
        setFah((c * 9 / 5) + 32)
    }


    //   const fromC = (v) => setCel(Number(v))
    //   const fromF = (v) => setCel((Number(v) - 32) * 5/9)
    //   const fromK = (v) => setCel(Number(v) - 273.15)

    //   const fah = (cel * 9/5) + 32
    //   const kel = cel + 273.15

    return (
        <div className="border border-black border-2 rounded-3 bg-white mx-auto mt-3 p-2" style={{ width: 'fit-content' }}>
            <h1 className="text-center fw-bold text-primary d-block">Temperature</h1>
            <div className="d-flex justify-content-center align-items-center" style={{ gap: "8rem" }}>
                <div className="badge bg-primary fs-3">{cel.toFixed(2)}</div>
                <div className="badge bg-primary fs-3">{fah.toFixed(2)}</div>
                <div className="badge bg-primary fs-3">{kel.toFixed(2)}</div>
            </div>
            <div className="d-flex gap-2 justify-content-center">
                <Value name={'CELSIUS'} value={cel} setValue={handleCelsiusChange} />
                <Value name={'FAHRENHEIT'} value={fah} setValue={handleFahrenheitChange} />
                <Value name={'KELVIN'} value={kel} setValue={handleKelvinChange} />
            </div>
        </div>
    )
}

export default Temperature