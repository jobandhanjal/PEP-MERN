import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router';
import HomePage from './pages/homePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { useState, useEffect } from 'react';
import TaskPage from './pages/TaskPage';

const App = () => {
  const [currUser, setCurrUser] = useState(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      return {
        isLoggedIn: true,
        fullName: 'Guest',
      };
    } else {
      return {
        isLoggedIn: false,
        fullName: 'Guest',
      };
    }
  });

  const afterLogin = (respObj) => {
    const newStateOfUser = {
      isLoggedIn: true,
      fullName: respObj.data.user.fullName,
    };
    localStorage.setItem('isLoggedIn', true);
    setCurrUser(newStateOfUser);
  };

  const getLoggedInUserInfo = async () => {
    const resp = await fetch('http://localhost:2005/users/me', {
      credentials: 'include',
    });
    const respObj = await resp.json();
    console.log(respObj);
    setCurrUser({
      isLoggedIn: true,
      fullName: respObj.data.user.fullName,
      email: respObj.data.user.email,
    });
  };

  useEffect(() => {
    if (currUser.isLoggedIn) {
      getLoggedInUserInfo();
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('isLoggedin');
    const resp = await fetch('http://localhost:2005/users/logout', {
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });
    const respObj = await resp.json();
    if (respObj.status === 'success') {
      setCurrUser({
        isLoggedIn: false,
        fullName: 'Guest',
      });
    } else {
      alert('Error in logout', respObj.message);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              currUser.isLoggedIn ? (
                <HomePage currUser={currUser} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/signup" />
              )
            }
          />
          <Route
            path="/login"
            element={
              currUser.isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <LoginPage afterLogin={afterLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={currUser.isLoggedIn ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/tasks"
            element={
              currUser.isLoggedIn ? <TaskPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="*"
            element={
              <div>
                Page not found <Link to={<HomePage />}></Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
