import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import Home from './components/Home';
import Student from './components/Student';
import ProfFeedback from './components/ProfFeedback';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/form" element={<Form />} />
          <Route path = "/student" element={<Student />} />
          <Route path = "/proffeedback" element={<ProfFeedback />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
