import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Chat from './Components/Chat';
import Avatar from './Components/Avatar';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = '/' element={<Chat />}/>
        <Route exact path = '/login' element={<Login />}/>
        <Route exact path = '/signup' element={<SignUp />}/>
        <Route exact path = '/setAvatar' element={<Avatar />}/>
      </Routes>
    </Router>
  );
}

export default App;
