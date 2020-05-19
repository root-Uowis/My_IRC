import React from 'react';

import'./TextContainer.css'

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div className="title" >
      <h1>D'IRC'ORD <span role="img" aria-label="emoji">🦇</span></h1>
     </div>
    {
      users
        ? (
          <div className="usersinserver">
            <h1>Users in this Server:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                 ▶ {name} ◀
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