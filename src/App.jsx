import './App.scss';
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authChangeHandler } from './features/user/userSlice';
import { auth } from './libs/firebase';
import AddNewSubscription from './pages/AddNewSubscription';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLocation = useLocation()

  useEffect(() => {
    const availablePagesIfUserIsNotLogged = [
      '/', 
      '/signup'
    ]
    
    dispatch(authChangeHandler(auth))
    .then(res => {
      const currentLocation = userLocation.pathname 
      if (
        !res.error
        && availablePagesIfUserIsNotLogged.includes(currentLocation)
        ) {
          navigate('/feed')
      } else if (
          res.error.message === 'Session closed' 
          && !availablePagesIfUserIsNotLogged.includes(currentLocation)
        ){  
          navigate('/')
      } 
    })
  }, [])
  
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/feed' element={<Feed/>}/>
      <Route path='/add-subscription' element={<AddNewSubscription/>}/>
    </Routes>
  );
}

export default App;
