import { useRef, useEffect, useState } from 'react';
// import React from 'react';
import './App.css';
import TopNav from './ui/TopNav';
import BottomNav from './ui/BottomNav';
import Game from './components/Game';
import { AIinfo } from './helperFunctions/GameInfo';

const debounce = (callback: () => void, time: number = 305) => {
  let debounceTimer = 0;
  return () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
  };
};

const playingInfo = AIinfo;

function App() {
  const topNav = useRef<HTMLDivElement>(null);
  const bottomNav = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const [margin, setMargin] = useState(0);

  // get height of top and bottom nav
  const topBottomHeight = () => {
    const topNavHeight = topNav.current!!.clientHeight;
    setMargin(topNavHeight);
  };

  useEffect(() => {
    topBottomHeight();
    // effect
    window.addEventListener('resize', debounce(topBottomHeight));

    return () => {
      window.removeEventListener('resize', debounce(topBottomHeight));
    };
  }, []);

  return (
    <div>
      <TopNav>{{ nav: topNav }}</TopNav>
      <BottomNav>{{ nav: bottomNav }}</BottomNav>
      <Game>{{ container, margin, playingInfo }}</Game>
      <div className="error-div">Use Screen of 320px and above</div>
    </div>
  );
}

export default App;
