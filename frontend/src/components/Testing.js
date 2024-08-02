import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faImages, faThumbtack, faHeart, faChartLine, faFire, faMagic, faGem, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';
import "../css/NavBar.sass";
function NavBar() {
  return (
    <div id="nav-bar">
      <div id="nav-header">
        <a id="nav-title" href="https://codepen.io" target="_blank">
          <FontAwesomeIcon icon={faCodepen} />DEPEN
        </a>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>
      <div id="nav-content">
        <div className="nav-button"><FontAwesomeIcon icon={faPalette} /><span>File transfer</span></div>
        <div className="nav-button"><FontAwesomeIcon icon={faImages} /><span>Conversation</span></div>
      </div>
    </div>
  );
}

export default NavBar;
