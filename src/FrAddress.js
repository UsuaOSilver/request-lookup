/**import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export default function FrAddress() {
    
    const [address, setAddress] = useState([]);
    
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
        
        const getFrAddress = async () => {
            const receipt = provider.getTransactionReceipt(hash)
            const frAddress = await wbtcContract.queryFilter('Mint', 0, 'latest')
            setAddress(frAddress)
        }
        getFrAddress()
    }, []);
}*/