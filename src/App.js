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
import UserInfoContext from './utils/context/userInfo'

function App() {
  const [user, setUser] = useState({})
  return (
    <UserInfoContext.Provider value={{user, setUser}}>
    <Router>
      <Routes>
        <Route exact path="/" element={<LogInPage />}></Route>
        <Route exact path="/create-new" element={<CreateAccount/>}></Route>
        <Route exact path="/tweet" element={<MainPage/>}></Route>
        <Route exact path="/error" element={<ErrorPage/>}></Route>
      </Routes>
    </Router>
    </UserInfoContext.Provider>
      
  );
}

export default App;
