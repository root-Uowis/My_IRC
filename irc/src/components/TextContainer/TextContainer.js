import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi, faPlus } from '@fortawesome/free-solid-svg-icons'

import './TextContainer.css'

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div className="title" >
      <h1>D'IRC'ORD <span role="img" aria-label="emoji">🦇</span></h1>
    </div>
    <div className="searchcontainer">
<input className="searchbar" type="text" placeholder="Create Channels"/>
<button type="submit" className="btn-create">
      <FontAwesomeIcon classname="searchicon"icon={faPlus} />
      </button>
    </div>
    {
      users
        ? (
          <div className="usersinserver">
            <h1>Users Online :</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({ name }) => (
                  <div key={name} className="activeItem">
                    {name}
                    <div className="blank">

                      <FontAwesomeIcon icon={faWifi} />

                    </div>
                    {/* <img alt="Online Icon" src={onlineIcon}/> */}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;