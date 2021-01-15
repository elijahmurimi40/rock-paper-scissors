import { useRef, useEffect, useState } from 'react';
// import React from 'react';
import './App.css';
import TopNav from './ui/TopNav';
import BottomNav from './ui/BottomNav';
import Game from './components/Game';

const debounce = (callback: () => void, time: number = 305) => {
  let debounceTimer = 0;
  return () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(callback, time);
  };
};

function App() {
  const topNav = useRef<HTMLDivElement>(null);
  const bottomNav = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState(0);

  // get the remaing window height
  const remaingWindowHeight = () => {
    const windowHeight = window.innerHeight + 20;
    const topNavHeight = topNav.current!!.clientHeight;
    const bottomNavHeight = bottomNav.current!!.clientHeight;
    const containerOffset = container.current!!.offsetTop;

    // game.tsx container height
    const remaingHeight = windowHeight - topNavHeight - bottomNavHeight - containerOffset;
    setContainerHeight(remaingHeight);
  };

  useEffect(() => {
    remaingWindowHeight();
    // effect
    window.addEventListener('resize', debounce(remaingWindowHeight));

    return () => {
      window.removeEventListener('resize', debounce(remaingWindowHeight));
    };
  }, []);

  return (
    <div>
      <TopNav>{{ nav: topNav }}</TopNav>
      <BottomNav>{{ nav: bottomNav }}</BottomNav>
      <Game>{{ container, cHeight: containerHeight }}</Game>
      <div className="error-div">Use Screen of 320px and above</div>
    </div>
  );
}

export default App;
