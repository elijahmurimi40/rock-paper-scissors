import { useRef, useEffect, useState } from 'react';
// import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import TopNav from './ui/TopNav';
import BottomNav from './ui/BottomNav';
import Game from './components/Game';
import Friend from './components/Friend';
import Stranger from './components/Stranger';
import PlayOnline from './components/PlayOnline';
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
  const selectDiv = useRef<HTMLDivElement>(null);

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
    <Router>

      <div>
        <TopNav>{{ nav: topNav, selectDiv }}</TopNav>
        <BottomNav>
          {{ nav: bottomNav, selectDiv: null }}
        </BottomNav>
      </div>

      <Switch>

        <Route exact path="/">
          <Game>
            {{
              container, margin, playingInfo, selectDiv,
            }}
          </Game>
        </Route>

        <Route exact path="/play-with-friend">
          <Friend>
            {{
              container, margin, playingInfo, selectDiv,
            }}
          </Friend>
        </Route>

        <Route exact path="/play-with-stranger">
          <Stranger>
            {{
              container, margin, playingInfo, selectDiv,
            }}
          </Stranger>
        </Route>

        <Route exact path="/play-with-friend/:code">
          <PlayOnline>
            {{
              container, margin, playingInfo, selectDiv,
            }}
          </PlayOnline>
        </Route>

        <Route exact path="/play-with-stranger/:code">
          <PlayOnline>
            {{
              container, margin, playingInfo, selectDiv,
            }}
          </PlayOnline>
        </Route>

      </Switch>

      <div className="error-div">Use Screen of 320px and above</div>
    </Router>
  );
}

export default App;
