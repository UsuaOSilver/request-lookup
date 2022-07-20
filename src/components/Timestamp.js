import { ethers } from 'ethers';
import { fromUnixTime, format } from 'date-fns'
import { useEffect, useState } from 'react';

export default function Timestamp({blockNumber}) {
    
    const [time, setTime] = useState(null);
    
    useEffect(() => {
        const provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/sJzaXe5o3w8nxLI19QtoP-qXT2hlvKZQ", 1);
        
        const getTime = async () => {
            const block = await provider.getBlock(blockNumber)
            const timestamp = block.timestamp
            const time = format(fromUnixTime(timestamp), 'MM/dd/yyyy ppp')
            console.log(time)
            setTime(time)
        }
        getTime()
    // eslint-disable-next-line 
    }, []);
    
    return (
        <td className="ml12">{time}</td>
    )
}