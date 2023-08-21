import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AddContactForm from './components/AddContactForm';
// import ContactList from './components/ContactList';
// import ContactDetails from './components/ContactDetails';
import ContactPage from '../src/pages/ContactPage';
import './styles/styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
        {/* <Route path='/' element={<ContactList/>} /> */}
        {/* <Route path='/addcontact' element={<AddContactForm/>} /> */}
        {/* <Route path='/details/:id' element={<ContactDetails/>} /> */}
        <Route path='/' element={<ContactPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
