import './App.css';
//import Timestamp from './Timestamp';
//import FrAddress from './FrAddress'
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

function App() {
  
  const [mint, setMint] = useState([]);
  const [burn, setBurn] = useState([]);
  const [frAddress, setAddress] = useState([]);
  const [timestamp, setTimestamp] = useState([]);

  useEffect(() => {
    
    const provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/sJzaXe5o3w8nxLI19QtoP-qXT2hlvKZQ", 1);
  
    const wbtc = {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      abi: [
          "event Mint(address indexed to, uint256 amount);",
          "event Burn(address indexed burner, uint256 value);"
      ],
    };
    
    const wbtcContract = new ethers.Contract(wbtc.address, wbtc.abi, provider);

    const getMint = async () => {
      const mintFilter = await wbtcContract.queryFilter('Mint', 0, 'latest')
      const txMint = mintFilter.slice(mintFilter.length - 21, mintFilter.length - 1)
      console.log(txMint)
      
      const hash = txMint[0].transactionHash
      console.log(hash)
      
      const receipt = await provider.getTransactionReceipt(hash)
      console.log(receipt)
      const frAddress = receipt.from
      
      const blockNum = await provider.getBlock(hash)
      console.log(blockNum)
      const timestamp = blockNum.timestamp
      
      return setMint ({
        hash: hash,
        fromAddress: frAddress,
        time: timestamp,
      })
    }
    getMint()
  
    const getBurn = async () => {
      const burnFilter = await wbtcContract.queryFilter('Burn', 0, 'latest')
      const txBurn = burnFilter.slice(burnFilter.length - 21, burnFilter.length - 1)
      
      const hash = txBurn.transactionHash
      const receipt = await provider.getTransactionReceipt(hash)
            
      return setBurn({
        hash: hash,
        fromAddress: frAddress,
        time: timestamp,
      })
    }
    getBurn()
  }, [])
      
  return(
    <div className="App">
      <header className="App-header">
        <h1>WBTC</h1>
      </header>
      <div className="transaction-overview">
        <span>
          <table>
            <thead>
              <tr><td>latest 20 Mint events</td></tr>
            </thead>
            <tbody>
              {mint.map((tx, index) => 
              (
                <div classname="tx" key={index}>
                  <tr><td>"Transaction Hash:" {tx.hash}</td></tr>
                  <tr><td>From address: {/*<FrAddress transactionHash = {tx.hash}/>*/}</td></tr>
                  <tr><td>Time: {/*<Timestamp />*/}</td></tr>
                </div>
              ))}
            </tbody>
          </table>
          <table>
            <thead>
              <tr><td>latest 20 Burn events</td></tr>
            </thead>
            <tbody>
              {burn.map((tx, index) => 
              (
                <div classname="tx" key={index}>
                  <tr><td>"Transaction Hash:" {tx.hash}</td></tr>
                  <tr><td>From address: {/*<FrAddress />*/}</td></tr>
                  <tr><td>Time: {/*<Timestamp />*/}</td></tr>
                </div>
              ))}
            </tbody>
          </table>
        </span>
      </div>
    </div>
  );
}

export default App;

