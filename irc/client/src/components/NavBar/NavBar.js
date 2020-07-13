import React from 'react';
import'./NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faServer, faDoorOpen } from '@fortawesome/free-solid-svg-icons'


const NavBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
    <FontAwesomeIcon className="icons" icon={faServer} />
      <h4>{room}</h4>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><FontAwesomeIcon className="icons" icon={faDoorOpen} /></a>
    </div>
  </div>
);

export default NavBar;