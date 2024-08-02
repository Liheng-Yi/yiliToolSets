import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faImages, faThumbtack, faHeart, faChartLine, faFire, faMagic, faGem, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';


import FileTransfer from './components/FileTransfer';  // Importing AppContent component
import TextBoxContent from './components/TextBox';
import "./css/NavBar.sass";

function App() {
  return (
    <Router>
      <div id ="nav-bar" >
        <input type="checkbox" id="nav-toggle" />
        <div id="nav-header">
          <a id="nav-title" href="https://github.com/Liheng-Yi/yiliToolSets" target="_blank">
            <FontAwesomeIcon icon={faCodepen} /> YiliTools
          </a>
          <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
          </label>
          <hr />
        </div>

        <ul id="nav-content" >
          <li className='nav-button'><FontAwesomeIcon icon={faPalette}></FontAwesomeIcon><Link to="/FileTransfer">File transfer</Link></li>
          <li className='nav-button'><FontAwesomeIcon icon={faPalette}></FontAwesomeIcon><Link to="/texting">Conversation</Link></li>
          <div id="nav-content-highlight">
          </div>
        </ul>
        <hr />

      </div>


      {/* Main content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="/FileTransfer" element={<FileTransfer />} />
          <Route path="/texting" element={<TextBoxContent />} />

        </Routes>
      </div>
      
    </Router>
  );
}
export default App;


