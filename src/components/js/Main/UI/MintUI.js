import React, { useState } from "react";
import Button from "./Button.js";
import { ethers, BigNumber } from "ethers";
import nftones from "../json/NFTones.json";
import '../../../css/Main/MintUI.css'

const nftonesAddress = "0xc36e001AB965E72f458eAe5fC70184F454A48E95";

const MintUI = ({ accounts, setAccounts }) => {
  let isConnected = Boolean(accounts[0]);
  const [mintAmount, setMintAmount] = useState(1);
  async function connectAccount() {
    if (window.ethereum) { // checks if metamask is connected 
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    } else {
      window.open("https://metamask.io/", "_blank", "noopener,noreferrer"); //if it is not it opens a metamast login screen
    }
  }
  const price = 0.1
  async function handleMint() { // handles the mint itself, connects to ethereum and transfers the NFT
    if (window.ethereum) { 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(nftonesAddress, nftones.abi, signer);
      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1); // changes the number to mint ↓
  };
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };
  isConnected = true
  
  return (
    <>
      <div className="MintUI">
        <h1>MINT</h1>
        {isConnected ? (
          <div className="MintFlex">
            <p>
              Mint your own NFTones NFT!
              <br />
              (You can only mint maximum of 3 NFTs per wallet.)
            </p>
            <p style={{marginBottom: '15px', marginTop: '20px'}}>Price: {(mintAmount * price).toFixed(1)} ETH</p>
            <div>
              <button className="DecButton" onClick={handleDecrement}>
                -
              </button>
              <input
                className="InputField"
                type="number"
                inputMode="numeric"
                value={mintAmount}
                readOnly
              />
              <button className="IncButton" onClick={handleIncrement}>
                +
              </button>
            </div>
            <button className="MintButton" onClick={handleMint}>
              MINT!
            </button>
          </div>
        ) : (
          <p>You must connect your wallet first!</p>
        )}
        {isConnected ? (
          <Button text="Connected!" />
        ) : (
          <Button onclick={connectAccount} text="Connect your wallet!" />
        )}
      </div>
    </>
  );
};

export default MintUI;
