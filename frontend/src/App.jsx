import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.js'
import Signin from './pages/Signin'
import Signup from "./pages/Signup.js";
// import Signup from './pages/Signup'

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
