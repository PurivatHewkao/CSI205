import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [screen, setScreen] = useState('0');
  const [operator, setOperator] = useState('?');
  const [state, setState] = useState('S0');
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(0);
  const [secondOperand, setSecondOperand] = useState(0);

  const numberClicked = (number) => {
    if (state === 'S0') {
      const newScreen = number.toString();
      setScreen(newScreen);
      setFirstOperand(Number(newScreen));
      setState('S1');
    } else if (state === 'S1') {
      if (screen.length < 9) {
        const newScreen = screen + number.toString();
        setScreen(newScreen);
        setFirstOperand(Number(newScreen));
        // state ยังคงเป็น 'S1'
      }
    } else if (state === 'S2') {
      if (screen.length < 9) {
        let newScreen;
        if (screen === firstOperand.toString()) {
          newScreen = number.toString();
        } else {
          newScreen = screen + number.toString();
        }
        setScreen(newScreen);
        setSecondOperand(Number(newScreen));
      }
    }
  };

  const operatorClicked = (_operator) => {
    if (state === 'S1') {
      setOperator(_operator);
      // setFirstOperand(Number(screen)); // ถูกตั้งค่าใน numberClicked แล้ว
      setState('S2');
    } else if (state === 'S2') {
      let result = firstOperand;
      if (operator === '+') {
        result += secondOperand;
      } else if (operator === '-') {
        result -= secondOperand;
      }
      
      setFirstOperand(result);
      setDisplay(result.toString()); // อัปเดต display state
      setScreen(result.toString());
      setOperator(_operator);
      setSecondOperand(0);
    }
  };

  const ceClicked = () => {
    setScreen('0');
    setOperator('?');
    setState('S0');
    setDisplay('0');
    setFirstOperand(0);
    setSecondOperand(0);
  };

  const equalClicked = () => {
    // คำนวณเฉพาะเมื่ออยู่ใน state S2
    if (state === 'S2') {
      let result = firstOperand;
      if (operator === '+') {
        result += secondOperand;
      } else if (operator === '-') {
        result -= secondOperand;
      }
      
      setFirstOperand(result);
      setDisplay(result.toString());
      setScreen(result.toString());
      setOperator('?'); // รีเซ็ต operator
      setState('S1'); // กลับไป state S1 เพื่อเริ่มคำนวณใหม่กับผลลัพธ์
      setSecondOperand(0);
    }
  };

  // 3. ใช้ useEffect เพื่อจัดการ Keyboard events
  useEffect(() => {
    const checkKeyboard = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        numberClicked(Number(event.key));
      } else if (event.key === '+' || event.key === '=') {
        // โค้ดเดิมของคุณผูก '=' กับ '+'
        operatorClicked('+');
      } else if (event.key === '-') {
        operatorClicked('-');
      } else if (event.key === 'Enter') {
        equalClicked();
      } else if (event.key === 'Escape') {
        ceClicked();
      }
    };

    // เพิ่ม event listener
    document.addEventListener('keydown', checkKeyboard);

    // Cleanup function: ลบ event listener ออกเมื่อ component ถูก unmount
    return () => {
      document.removeEventListener('keydown', checkKeyboard);
    };
  }, [screen, operator, state, firstOperand, secondOperand]); // ให้ effect ทำงานใหม่เมื่อ state เหล่านี้เปลี่ยน

  return (
    <>
      <div className="cal-container">
        <div id="screen" className="cal-screen">
          {screen}
        </div>
        <div>
          <button className="cal-btn cal-btn-green" disabled>
            MC
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            MR
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            M+
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            M-
          </button>
          <button className="cal-btn cal-btn-red" onClick={ceClicked}>
            CE
          </button>
        </div>
        <div>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(7)}
          >
            7
          </button>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(8)}
          >
            8
          </button>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(9)}
          >
            9
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            &divide;
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            &Sqrt;
          </button>
        </div>
        <div>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(4)}
          >
            4
          </button>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(5)}
          >
            5
          </button>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(6)}
          >
            6
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            &times;
          </button>
          <button className="cal-btn cal-btn-green" disabled>
            %
          </button>
        </div>
        <div>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(1)}
          >
            1
          </button>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(2)}
          >
            2
          </button>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(3)}
          >
            3
          </button>
          <button
            id="minus"
            className={`cal-btn ${
              operator === '-' ? 'cal-btn-orange' : 'cal-btn-green'
            }`}
            onClick={() => operatorClicked('-')}
          >
            &minus;
          </button>
          <button className="cal-btn cal-btn-green" disabled> {/* แก้ไข: เพิ่ม disabled ตามไฟล์ HTML เดิม */}
            1/x
          </button>
        </div>
        <div>
          <button
            className="cal-btn cal-btn-blue"
            onClick={() => numberClicked(0)}
          >
            0
          </button>
          <button className="cal-btn cal-btn-blue" disabled>
            .
          </button>
          <button className="cal-btn cal-btn-blue" disabled>
            +/-
          </button>
          <button
            id="plus"
            className={`cal-btn ${
              operator === '+' ? 'cal-btn-orange' : 'cal-btn-green'
            }`}
            onClick={() => operatorClicked('+')}
          >
            +
          </button>
          <button className="cal-btn cal-btn-green" onClick={equalClicked}>
            =
          </button>
        </div>
      </div>
    </>
  );
};

export default Calculator;