import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export default function FrAddress({transactionHash}) {
    
    const [address, setAddress] = useState("");
    
    useEffect(() => {
        const provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/sJzaXe5o3w8nxLI19QtoP-qXT2hlvKZQ", 1);
              
        const getFrAddress = async () => {
            const receipt = await provider.getTransactionReceipt(transactionHash)
            const frAddress = receipt.from
            setAddress(frAddress)
        }
        getFrAddress()
    // eslint-disable-next-line 
    }, []);
    
    return (
        <td className="ml12">{address}</td>
    )
}