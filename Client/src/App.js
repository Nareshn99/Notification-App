import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from './Registration';
import Login from './Login';
import Home from './Home';


function App() {

  return (
    <div className='app'>
      { 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/*" element={<Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>
    }
    </div>
  )
}

export default App;
