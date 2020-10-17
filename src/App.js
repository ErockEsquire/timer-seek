import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';

function App() {

  return (
    <div className="App">
      <Playback/>
      <Playback/>
    </div>
  );
}

export default App;


const Playback = () => {

  const MaxDiv = styled.div`
    border-radius: 6px;
    background-color: rgba(255, 94, 98, .95);
    height: 50px;
    width: ${props => props.width}px;
    margin: 1rem;
    box-shadow: 
      -6px -6px 14px rgba(255, 255, 255, .7),
      -6px -6px 10px rgba(255, 255, 255, .5),
      6px 6px 8px rgba(255, 255, 255, .075),
      6px 6px 10px rgba(0, 0, 0, .15);
  `

  const TimeDiv = styled.div`
    background-color:  rgba(255, 146, 148, 0.95);
    height: 50px;
    border-radius: 6px;
    width: ${props => props.width}%;
  `
  
  const [runtime, setRuntime] = useState(0)
  const [maxtime, setMaxtime] = useState(15000)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    let interval = null;
    if (play) {
      interval = setInterval(() => {
        setRuntime(runtime => runtime + 100);
      }, 100);
    } else if (!play && runtime !== 0) {
      clearInterval(interval);
    }

    if (runtime === maxtime) {
      clearInterval(interval);
      setPlay(false)
    }
    return () => clearInterval(interval);
  }, [play, runtime, maxtime]);

  const currentTime = (runtime/maxtime) * 100;

  return (
    <main className="playback">
      <div>
        <span>{Math.floor(runtime/1000)} / {Math.floor(maxtime/1000)}</span>
        <span className="button" onClick={() => setPlay(!play)}>{play ? "Pause":"Play"}</span>
        <span className="button" onClick={() => setRuntime(0)}>Reset</span>
      </div>
      <MaxDiv width={500}>
        <TimeDiv width={currentTime}></TimeDiv>
      </MaxDiv>
    </main>
  )
}

