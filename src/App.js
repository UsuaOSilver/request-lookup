import './App.css';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

function App() {
  
  const [mint, setMint] = useState([]);
  const [burn, setBurn] = useState([]);

  const provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/sJzaXe5o3w8nxLI19QtoP-qXT2hlvKZQ");
  
  const wbtc = {
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    abi: [
        "event mint(address indexed _to, uint256 _amount);",
        "event burn(address indexed burner, uint256 _value) public"
    ],
  };
  
  const wbtcContract = new ethers.Contract(wbtc.address, wbtc.abi, provider);
  
  useEffect(() => {
    const getMint = async () => {
      const mintEvent = await wbtcContract.queryFilter('mint', 'latest' - 1000, 'latest')
      
      const txHash = mintEvent.transactionHash;
      const frAddress = mintEvent.from;
      const blockNumber = mintEvent.blockNumber;
      const timestamp = mintEvent.getBlockByNumber(blockNumber).timestamp;
      
      return setMint({
        hash: txHash,
        from: frAddress,
        timestamp: timestamp,
      })
    }
    getMint()
  }, [])
  
  useEffect(() => {
    const getBurn = async () => {
      const burnEvent = await wbtcContract.queryFilter('burn', 'latest' - 1000, 'latest')
      
      const txHash = burnEvent.transactionHash;
      const frAddress = burnEvent.from;
      const blockNumber = burnEvent.blockNumber;
      const timestamp = burnEvent.getBlockByNumber(blockNumber).timestamp;
      
      return setBurn({
        hash: txHash,
        from: frAddress,
        timestamp: timestamp,  
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
              <tr>
                <td>
                  latest 20 Mint events
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Transaction Hash: </td>
                <td>{mint.hash}</td>
              </tr>
              <tr>
                <td>From address: </td>
                <td>{mint.from}</td>
              </tr>
              <tr>
                <td>Time: </td>
                <td>{mint.timestamp}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <td>
                  latest 20 Burn events
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Transaction Hash: </td>
                <td>{burn.hash}</td>
              </tr>
              <tr>
                <td>From address: </td>
                <td>{burn.from}</td>
              </tr>
              <tr>
                <td>Time: </td>
                <td>{burn.timestamp}</td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>
    </div>
  );
}

export default App;

