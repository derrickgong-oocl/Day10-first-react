import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './TodoList';
import About from './pages/About';         
import NotFound from './pages/Notfound';   
import Contact from './pages/Contact';
import Help from './pages/Help';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <main className="container section">
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;