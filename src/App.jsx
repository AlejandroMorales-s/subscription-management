import './App.scss';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/feed' element={<Feed/>}/>
    </Routes>
  );
}

export default App;
