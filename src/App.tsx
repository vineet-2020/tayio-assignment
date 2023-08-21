import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import './styles/styles.css';
import './styles/leaflet.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
        <Route path='/' element={<ContactPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
