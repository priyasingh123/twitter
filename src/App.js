import logo from './logo.svg';
import './App.css';
import LogInPage from './components/LogInPage';
import CreateAccount from './components/CreateAccount';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Tweets from './components/Tweets';
import "bootstrap-icons/font/bootstrap-icons.css"
import MainPage from './components/MainPage';
import {useState} from 'react'
import ErrorPage from './components/ErrorPage';

function App() {
  const [user, setUser] = useState({})
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LogInPage setUser={setUser}/>}></Route>
        <Route exact path="/create-new" element={<CreateAccount/>}></Route>
        <Route exact path="/tweet" element={<MainPage user={user}/>}></Route>
        <Route exact path="/error" element={<ErrorPage/>}></Route>
      </Routes>
    </Router>
      
  );
}

export default App;
