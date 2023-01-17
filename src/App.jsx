import './App.scss';
import { useEffect } from 'react';
//* React Router
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
//* React Redux
import { useDispatch, useSelector } from 'react-redux';
//* Custom js
import { authChangeHandler, selectUserData } from './features/user/userSlice';
import { auth } from './libs/firebase';
import { readUserSubscriptions } from './features/subscriptions/subscriptionsSlice';
//* Components
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';
import AddNewSubscription from './pages/AddNewSubscription';
import Account from './pages/Account';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLocation = useLocation();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const availablePagesIfUserIsNotLogged = ['/', '/signup'];

    dispatch(authChangeHandler(auth)).then((res) => {
      const currentLocation = userLocation.pathname;
      if (
        !res.error &&
        availablePagesIfUserIsNotLogged.includes(currentLocation)
      ) {
        navigate('/feed');
      } else if (
        res.error?.message === 'Session closed' &&
        !availablePagesIfUserIsNotLogged.includes(currentLocation)
      ) {
        navigate('/');
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(readUserSubscriptions(userData.uid));
    // eslint-disable-next-line
  }, [userData]);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/add-subscription' element={<AddNewSubscription />} />
      <Route path='/account' element={<Account />} />
      <Route
        path='/modify-subscription/:subscriptionId'
        element={<AddNewSubscription />}
      />
    </Routes>
  );
}

export default App;
