import { Route, HashRouter as Router } from 'react-router-dom';

import ProfileGuard from './components/profileGuard';
import React from 'react';
import Titlebar from './components/titlebar';
import { getTheme } from './state/theme.slice';
import { useSelector } from 'react-redux';

let App = () => {
  let theme = useSelector(getTheme);

  return (
    <Router>
      <div className={theme}>
        <div className="flex flex-col w-screen h-screen bg-transparent dark:bg-black text-white dark:text-white select-none focus:outline-none">
          <Titlebar title="Lone Wolf" />
          hekk
        </div>
      </div>
    </Router>
  );
};

export default App;
