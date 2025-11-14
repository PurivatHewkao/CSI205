import React, { useState, useEffect, useRef } from 'react';
import basketballImg from '../assets/basketball.png';
import footballImg from '../assets/football.png';
import volleyballImg from '../assets/volleyball.png';
import humanImg from '../assets/human.png';
import cartoonImg from '../assets/cartoon.jpg';
import floorImg from '../assets/floorfield.jpg';



const Animation = () => {
  const fieldWidth = 650;
  const fieldHeight = 300;
  const ballDiameter = 100;
  const maxX = fieldWidth - ballDiameter - 2;
  const maxY = fieldHeight - ballDiameter - 2;
  const vx = 5;
  const vy = 5;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ goRight: true, goDown: true });
  const [angle, setAngle] = useState(0);
  const [rotateSpeed, setRotateSpeed] = useState(10);
  const [rotateDirection, setRotateDirection] = useState(1);
  const [running, setRunning] = useState(true);
  const [selectedBall, setSelectedBall] = useState('None');

  const intervalRef = useRef(null);

  const ballImages = {
    Basketball: basketballImg,
  Football: footballImg,
  Volleyball: volleyballImg,
  Human: humanImg,
  Cartoon: cartoonImg
  };

  const bounceRotate = () => {
    setRotateSpeed(Math.floor(Math.random() * 10) + 5);
    setRotateDirection(prev => prev * -1);
  };

  const calculate = () => {
    setPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      let newGoRight = direction.goRight;
      let newGoDown = direction.goDown;

      if (direction.goRight) {
        newX = prev.x + vx;
        if (newX >= maxX) {
          newGoRight = false;
          bounceRotate();
        }
      } else {
        newX = prev.x - vx;
        if (newX <= 0) {
          newGoRight = true;
          bounceRotate();
        }
      }

      if (direction.goDown) {
        newY = prev.y + vy;
        if (newY >= maxY) {
          newGoDown = false;
          bounceRotate();
        }
      } else {
        newY = prev.y - vy;
        if (newY <= 0) {
          newGoDown = true;
          bounceRotate();
        }
      }

      setDirection({ goRight: newGoRight, goDown: newGoDown });
      return { x: newX, y: newY };
    });

    setAngle(prev => {
      let newAngle = prev + (rotateSpeed * rotateDirection);
      if (newAngle >= 360) {
        newAngle = newAngle - 360;
      } else if (newAngle < 0) {
        newAngle = newAngle + 360;
      }
      return newAngle;
    });
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        calculate();
      }, 25);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, direction, rotateSpeed, rotateDirection]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case '0':
          setSelectedBall('None');
          break;
        case '1':
          setSelectedBall('Basketball');
          break;
        case '2':
          setSelectedBall('Football');
          break;
        case '3':
          setSelectedBall('Volleyball');
          break;
        case '4':
          setSelectedBall('Human');
          break;
        case '5':
          setSelectedBall('Cartoon');
          break;
        case ' ':
          event.preventDefault();
          setRunning(prev => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getBallStyle = () => {
    const baseStyle = {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${ballDiameter}px`,
      height: `${ballDiameter}px`,
      borderRadius: '50px',
      transform: `rotate(${angle}deg)`,
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    };

    if (selectedBall === 'None') {
      return { ...baseStyle, backgroundColor: 'aqua' };
    } else if (ballImages[selectedBall]) {
      return { ...baseStyle, backgroundImage: `url(${ballImages[selectedBall]})` };
    }

    return baseStyle;
  };

  return (
    <div style={{
      border: '1px solid #000',
      padding: '1rem',
      width: 'fit-content',
      margin: 'auto',
      borderRadius: '1rem',
      backgroundColor: 'white'
    }}>
      <div className='d-flex' style={{
        border: '1px solid #000',
        margin:'auto' ,
        width: `${fieldWidth}px`,
        height: `${fieldHeight}px`,
        backgroundImage: `url(${floorImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '1rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={getBallStyle()}></div>
      </div>

      <div style={{
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setRunning(!running)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: running ? '#ffc107' : '#28a745',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          {running ? (
            <>
              <i class="bi bi-pause" /> PAUSE
            </>
          ) : 
          (
            <>
            < i class="bi bi-play"/> RUN
            </>
          )}
        </button>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedBall('None')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: selectedBall === 'None' ? 'none' : '1px solid #6c757d',
              cursor: 'pointer',
              backgroundColor: selectedBall === 'None' ? '#6c757d' : 'white',
              color: selectedBall === 'None' ? 'white' : '#6c757d'
            }}
          >
            None
          </button>

          {['Basketball', 'Football', 'Volleyball', 'Human', 'Cartoon'].map(ball => (
            <button
              key={ball}
              onClick={() => setSelectedBall(ball)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: selectedBall === ball ? 'none' : '1px solid #007bff',
                cursor: 'pointer',
                backgroundColor: selectedBall === ball ? '#007bff' : 'white',
                color: selectedBall === ball ? 'white' : '#007bff'
              }}
            >
              {ball}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animation;