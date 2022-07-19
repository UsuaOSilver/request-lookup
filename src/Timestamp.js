import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './App.css';

export default function Timestamp({blockNumber}) {
    
    const [timestamp, setTimestamp] = useState(null);
    
    useEffect(() => {
        const provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/sJzaXe5o3w8nxLI19QtoP-qXT2hlvKZQ", 1);
        
        const getTimestamp = async () => {
            const block = await provider.getBlock(blockNumber)
            const timestamp = block.timestamp
            setTimestamp(timestamp)
        }
        getTimestamp()
        // eslint-disable-next-line 
    }, []);
    
    return (
        <td className="ml12">{timestamp}</td>
    )
}