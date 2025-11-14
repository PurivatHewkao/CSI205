import React, { useState, useEffect } from 'react';

export default function Calculator() {
  const [screen, setScreen] = useState('0');
  const [operator, setOperator] = useState('?');
  const [state, setState] = useState('S0');
  const [firstOperand, setFirstOperand] = useState(0);
  const [secondOperand, setSecondOperand] = useState(0);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        numberClicked(Number(event.key));
      } else if (event.key === '+' || event.key === '=') {
        operatorClicked('+');
      } else if (event.key === '-') {
        operatorClicked('-');
      } else if (event.key === 'Enter') {
        equalClicked();
      } else if (event.key === 'Escape') {
        ceClicked();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [screen, operator, state, firstOperand, secondOperand]);

  const numberClicked = (number) => {
    if (state === 'S0') {
      setScreen(number.toString());
      setState('S1');
      setFirstOperand(number);
    } else if (state === 'S1') {
      if (screen.length < 9) {
        const newScreen = screen + number.toString();
        setScreen(newScreen);
        setFirstOperand(Number(newScreen));
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
      setFirstOperand(Number(screen));
      setState('S2');
    } else if (state === 'S2') {
      let newFirstOperand = firstOperand;
      if (operator === '+') {
        newFirstOperand = firstOperand + secondOperand;
      } else if (operator === '-') {
        newFirstOperand = firstOperand - secondOperand;
      }
      setFirstOperand(newFirstOperand);
      setScreen(newFirstOperand.toString());
      setOperator(_operator);
      setSecondOperand(0);
    }
  };

  const ceClicked = () => {
    setScreen('0');
    setOperator('?');
    setState('S0');
    setFirstOperand(0);
    setSecondOperand(0);
  };

  const equalClicked = () => {
    let newFirstOperand = firstOperand;
    if (operator === '+') {
      newFirstOperand = firstOperand + secondOperand;
    } else if (operator === '-') {
      newFirstOperand = firstOperand - secondOperand;
    }
    setFirstOperand(newFirstOperand);
    setScreen(newFirstOperand.toString());
    setOperator('?');
  };

  return (
    <div>
      <style>{`
        * {
          font-family:  monospace;
          ;
        }
        .cal-container {
          margin: 1rem auto;
          width: fit-content;
          border: 3px solid black;
          padding: 0.5rem;
          border-radius: 20px;
          background-color: rgb(245, 245, 245);
        }
        .cal-screen {
          background-color: antiquewhite;
          text-align: right;
          height: 1.2rem;
          padding: 0.5rem;
          border-radius: 10px;
          border: 2px solid gray;
          margin-bottom: 1rem;
        }
        .cal-btn {
          width: 2rem;
          height: 2rem;
          margin: 0.15rem 0.1rem;
          border-radius: 10px;
          border: 2px solid gray;
        }
        .cal-btn-green {
          background-color: lightgreen;
        }
        .cal-btn-blue {
          background-color: lightblue;
        }
        .cal-btn-red {
          background-color: lightcoral;
        }
        .cal-btn-orange {
          background-color: orange;
        }
      `}</style>
      
      <div className="cal-container">
        <div id="screen" className="cal-screen">
          {screen}
        </div>
        <div>
          <button className="cal-btn cal-btn-green" disabled>MC</button>
          <button className="cal-btn cal-btn-green" disabled>MR</button>
          <button className="cal-btn cal-btn-green" disabled>M+</button>
          <button className="cal-btn cal-btn-green" disabled>M-</button>
          <button className="cal-btn cal-btn-red" onClick={ceClicked}>CE</button>
        </div>
        <div>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(7)}>7</button>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(8)}>8</button>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(9)}>9</button>
          <button className="cal-btn cal-btn-green" disabled>÷</button>
          <button className="cal-btn cal-btn-green" disabled>√</button>
        </div>
        <div>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(4)}>4</button>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(5)}>5</button>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(6)}>6</button>
          <button className="cal-btn cal-btn-green" disabled>×</button>
          <button className="cal-btn cal-btn-green" disabled>%</button>
        </div>
        <div>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(1)}>1</button>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(2)}>2</button>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(3)}>3</button>
          <button 
            id="minus" 
            className={`cal-btn ${operator === '-' ? 'cal-btn-orange' : 'cal-btn-green'}`}
            onClick={() => operatorClicked('-')}
          >
            −
          </button>
          <button className="cal-btn cal-btn-green"></button>
        </div>
        <div>
          <button className="cal-btn cal-btn-blue" onClick={() => numberClicked(0)}>0</button>
          <button className="cal-btn cal-btn-blue" disabled>.</button>
          <button className="cal-btn cal-btn-blue" disabled></button>
          <button 
            id="plus" 
            className={`cal-btn ${operator === '+' ? 'cal-btn-orange' : 'cal-btn-green'}`}
            onClick={() => operatorClicked('+')}
          >
            +
          </button>
          <button className="cal-btn cal-btn-green" onClick={equalClicked}>=</button>
        </div>
      </div>
    </div>
  );
}