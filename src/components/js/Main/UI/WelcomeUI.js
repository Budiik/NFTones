import React from 'react'
import '../../../css/Main/WelcomeUI.css'
/* the welcome screen html (first one you see) */ 
const WelcomeUI = () => {
  return (
    <div className='WelcomeUI'>
      <h1>Join the wave!</h1>
      <p>
        NFTones is the first 8-bit NFT short song collection based on the
        Ethereum blockchain. Join our discord to become a part of the project!
      </p>
      <a
        href="https://discord.gg/VmsvurjwEF"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "white" }}
      >
        <button className="discord_btn">Join NFTones Discord</button>
      </a>
    </div>
  );
}

export default WelcomeUI