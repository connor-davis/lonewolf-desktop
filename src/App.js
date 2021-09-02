/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import AuthenticationPage from './pages/Authentication';
import HomePage from './pages/Home';
import { database, user } from './state/database';
import { getTheme } from './state/theme.slice';
import { getUserInfo, setUser } from './state/user.slice';

let App = () => {
  let dispatch = useDispatch();
  let theme = useSelector(getTheme);
  let userInfo = useSelector(getUserInfo);

  useEffect(() => {
    database.on('auth', async (_) => {
      let username = await user.get('alias');
      dispatch(setUser({ username }));
    });

    return () => {};
  }, []);

  return (
    <Router>
      <div className={theme}>
        <div className="bg-transparent flex-none text-white w-screen h-screen select-none focus:outline-none">
          {userInfo.username ? <HomePage /> : <AuthenticationPage />}
        </div>
      </div>
    </Router>
  );
};

export default App;
