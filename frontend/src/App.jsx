import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Library from './pages/Library';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
