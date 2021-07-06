import {useState, useEffect} from 'react'
//import {Observable} from 'rxjs';
//import { debounce } from 'rxjs/dist/cjs/internal/operators/debounce';
import './App.css';

function App() {
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if(timerOn) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 10)
      }, 10)
    } 

    return () => {
      clearInterval(interval);
    }
  }, [timerOn])

  const ClickHandler = () => {
    
    if (waiting) {
      setTimerOn(false);
      setWaiting(false);
    } else {
      setWaiting(true);
      setTimeout(() => {
        setWaiting(false);
      }, 300)
    }
  };

  return (
    <div className="wrapper">
      <div className="timer" onClick={ClickHandler}>
        <span>{("0" + (Math.floor(timer / 3600000) % 24)).slice(-2)}:</span>
        <span>{("0" + (Math.floor(timer / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + (Math.floor(timer / 1000) % 60)).slice(-2)}</span>
      </div>
      <div className="App">
        <button type="button" onClick={() => setTimerOn(true)}>
          Start
        </button>
        <button
          type="button"
          onClick={() => {
            setTimerOn(false);
            setTimer(0);
          }}
        >
          Stop
        </button>
        <button type="button" onClick={() => {
          setTimerOn(true);
          setTimer(0);
        }}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
