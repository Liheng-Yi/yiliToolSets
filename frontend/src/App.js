import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Testing from './compoents/Testing';


import FileTransfer from './compoents/FileTransfer';  // Importing AppContent component
import TextBoxContent from './compoents/TextBox';


function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', height: '100vh', background: '#323' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>File transfer</Link></li>
            <li><Link to="/texting" style={{ color: 'white', textDecoration: 'none' }}>Conversation</Link></li>
            <li><Link to="/Testing" style={{ color: 'white', textDecoration: 'none' }}>Conversation</Link></li>
          </ul>
        </div>


        {/* Main content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<FileTransfer />} />
            <Route path="/texting" element={<TextBoxContent />} />
            <Route path="/Testing" element={<Testing />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;


