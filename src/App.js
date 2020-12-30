import React, {useState, useEffect} from 'react';
import Content from './components/content';
import Navigation from './components/navigation';

import './App.css';

function App() {

  // Setup the states
  const [page, setPage] = useState("home");
  const [active, setActive] = useState(false);
  const [next, setNext] = useState(0);
  const [wait, setWait] = useState(0);

  // Check for saved data on first load
  useEffect(() => {getLocal()}, []);

  const getLocal = () => {
    if(localStorage.getItem("cisy_next") === null){
      setActive(false);
    }else{
      setActive(true);
      setNext(localStorage.getItem("cisy_next"));
      setWait(localStorage.getItem("cisy_wait"));
    }
  }

  // Set the page to home when the title is clicked
  // (and reload the timers to prevent a double yes)
  const goHome = () => {
    getLocal();
    setPage("home");
  }

  // If we're on the homepage and there's a timer to check, check it!
  if(active && page === "home"){setPage("check");}

  return (
    <div className="app">
      <div className="header">
        <h1 className="title" onClick={goHome}>Can I Smoke Yet?</h1>
      </div>
      <Content page={page} next={next} wait={wait} active={active} setActive={setActive}/>
      <Navigation page={page} setPage={setPage} active={active}/>
    </div>
  );
}

export default App;
