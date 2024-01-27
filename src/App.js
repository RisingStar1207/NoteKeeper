import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import NotesState from './contexts/notes/NotesStates';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <h1>Jai Shree Ganesh</h1> */}
      <NotesState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </NotesState>
    </div>
  );
}

export default App;
