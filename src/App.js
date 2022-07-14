import './App.css';
import { ethers } from 'ethers';

function App() {
  
  const provider = new InfuraProvider("homestead", {
    projectID: REACT_APP_PROJECT_ID,
    projectSecret: REACT_APP_PROJECT_SECRET 
  });
  
  const wbtc = {
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    abi: [
        "function mint(addres _to, uint256 _amount) public returns (bool)",
        "function burn(uint256 _amount) public"
    ],
  };
  
  const wbtcContract = new ethers.Contract(wbtc.address, wbtc.abi, provider);

  async function fetchMint() {
    const balance = await wbtcContract.balanceOf(wbtc.address);
    console.log(balance);
  }
  
  return (
    
  );
}

export default App;


