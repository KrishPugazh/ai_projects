
import './App.css'
import Navbar from './Navbar'
import Health from './Health'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup'
import HealthTips from './HealthTips'
import Home from './Home';
import Contact from './Contact';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Health />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/healthtips" element={<HealthTips />} />
        <Route path="/" element={<Home />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
