import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TodoList from './pages/TodoList';
import ByPage from './pages/ByPage';         
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
          <Route path="/bypage" element={<ByPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;