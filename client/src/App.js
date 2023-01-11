import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/Signup'
import Navbar from './components/other/Navbar'
import Home from './components/other/Home'
import Alert from './components/other/Alert'


function App() {
  return (
    <Router>
      <Navbar/>
      <Alert/>
      <div className="App">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
      </div>
    </Router>
  )
}
export default App