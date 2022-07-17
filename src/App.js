import './App.css';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

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

    const getMint = async () => {
      const mintEvent = await wbtcContract.queryFilter('Mint', 0, 'latest')
      const eventMint = mintEvent.slice(mintEvent.length - 21, mintEvent.length - 1)
            
      setMint(eventMint)
    }
    getMint()
  
    const getBurn = async () => {
      const burnEvent = await wbtcContract.queryFilter('Burn', 0, 'latest')
      const eventBurn = burnEvent.slice(burnEvent.length - 21, burnEvent.length - 1)
            
      setBurn(eventBurn)
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
                <td>
                  {mint.map((tx, index) => (
                  <div key={index}>
                    "Transaction Hash:" {tx.transactionHash}
                  </div>
                ))}
                </td>
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
                <td> {burn.map((tx, index) => (
                  <div key={index}>
                    "Transaction Hash:" {tx.transactionHash}
                  </div>
                ))}
              </td>
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

