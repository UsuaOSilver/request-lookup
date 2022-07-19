import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import Timestamp from './components/Timestamp';
import FrAddress from './components/FrAddress'

import './App.css';


function App() {
  
  const [mint, setMint] = useState([]);
  const [burn, setBurn] = useState([]);

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

    const getTx = async () => {
      const mintFilter = await wbtcContract.queryFilter('Mint', 0, 'latest')
      const txMint = mintFilter.slice(mintFilter.length - 21, mintFilter.length - 1)      
      setMint(txMint)
      
      const burnFilter = await wbtcContract.queryFilter('Burn', 0, 'latest')
      const txBurn = burnFilter.slice(burnFilter.length - 21, burnFilter.length - 1)
      setBurn(txBurn)
    }
    getTx()
  }, [])
      
  return(
      <div className="App">
        <header className="App-header">
          <h1>WBTC</h1>
        </header>
        <div className="container">
          <div className="column">
            <h2>Mint</h2>
            <table className='card'>
              <tbody>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Transaction Hash</th>
                <th scope="col">From</th>
                <th scope="col">Time</th>
              </tr>
              {mint.map((tx, index) => 
              (
                <tr className="tx" key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="ml12">{tx.transactionHash}</td>
                  <FrAddress transactionHash={tx.transactionHash} />
                  <Timestamp blockNumber={tx.blockNumber} />
                </tr>
              ))}
            </tbody>
            </table>
          </div>
          <div className="column">
            <h2>Burn</h2>
            <table className='card'>
            <tbody>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Transaction Hash</th>
                <th scope="col">From</th>
                <th scope="col">Time</th>
              </tr>
              {burn.map((tx, index) => 
              (
                <tr className="tx" key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="ml12">{tx.transactionHash}</td>
                  <FrAddress transactionHash={tx.transactionHash} />
                  <Timestamp blockNumber={tx.blockNumber} />
                  </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>      
  );
}

export default App;

