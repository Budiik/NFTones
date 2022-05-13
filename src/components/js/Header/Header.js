import React, { useState } from "react";
import "../../css/Header/Header.css";


const Header = () => {
  const [rot, setRot] = useState(0);
  return {
    rot,
    render: (
      <div className="Header_Box">
        <h1>NFTones</h1>
        <div>
          <div
            className="LeftButton"
            onClick={() => {
              setRot(rot + 1);
            }} 
          >{/* Buttons to change camera rotation ↓*/}
            <p>&#60;</p>
          </div>
          <div
            className="RightButton"
            onClick={() => {
              setRot(rot - 1);
            }}
          >
            <p>&#60;</p>
          </div>
        </div>
      </div>
    ),
  };
};

export default Header;
