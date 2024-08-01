import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faImages, faThumbtack, faHeart, faChartLine, faFire, faMagic, faGem, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { faCodepen } from '@fortawesome/free-brands-svg-icons';

function NavBar() {
  return (
    <div id="nav-bar">
      <input type="checkbox" id="nav-toggle" />
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
        <div className="nav-button"><FontAwesomeIcon icon={faPalette} /><span>Your Work</span></div>
        <div className="nav-button"><FontAwesomeIcon icon={faImages} /><span>Assets</span></div>
        <div className="nav-button"><FontAwesomeIcon icon={faThumbtack} /><span>Pinned Items</span></div>
        <hr />
        <div className="nav-button"><FontAwesomeIcon icon={faHeart} /><span>Following</span></div>
        <div className="nav-button"><FontAwesomeIcon icon={faChartLine} /><span>Trending</span></div>
        <div className="nav-button"><FontAwesomeIcon icon={faFire} /><span>Challenges</span></div>
        <div className="nav-button"><FontAwesomeIcon icon={faMagic} /><span>Spark</span></div>
        <hr />
        <div className="nav-button"><FontAwesomeIcon icon={faGem} /><span>Codepen Pro</span></div>
      </div>
      <input type="checkbox" id="nav-footer-toggle" />
      <div id="nav-footer">
        <div id="nav-footer-heading">
          <div id="nav-footer-avatar">
            <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="Avatar" />
          </div>
          <div id="nav-footer-titlebox">
            <a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">uahnbu</a>
            <span id="nav-footer-subtitle">Admin</span>
          </div>
          <label htmlFor="nav-footer-toggle">
            <FontAwesomeIcon icon={faCaretUp} />
          </label>
        </div>
        <div id="nav-footer-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>
    </div>
  );
}

export default NavBar;
