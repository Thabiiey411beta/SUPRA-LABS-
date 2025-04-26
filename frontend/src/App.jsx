import { useState } from 'react';
import { ThirdwebProvider, useContract, useContractWrite, Web3Button } from '@thirdweb-dev/react';

function App() {
  const [price, setPrice] = useState(null);
  const { contract: tokenContract } = useContract('0xTokenAddress'); // Replace with MindToken address
  const { contract: nftContract } = useContract('0xNFTAddress'); // Replace with MindNFT address
  const { mutateAsync: mintToken } = useContractWrite(tokenContract, 'mint');
  const { mutateAsync: mintNFT } = useContractWrite(nftContract, 'mint');

  const fetchPrice = async () => {
    const response = await fetch('http://localhost:3000/api/price/ETH_USD');
    const data = await response.json();
    setPrice(data.price);
  };

  return (
    <ThirdwebProvider activeChain={{ chainId: 128, rpc: ['https://rpc-testnet.supra.com'] }}>
      <div>
        <h1>LiquiMind App</h1>
        <button onClick={fetchPrice}>Fetch ETH/USD Price</button>
        {price && <p>ETH/USD Price: ${price}</p>}
        <Web3Button
          contractAddress="0xTokenAddress"
          action={() => mintToken({ args: [window.ethereum.selectedAddress, 1000 * 10 ** 18] })}
        >
          Claim 1000 MIND Tokens
        </Web3Button>
        <Web3Button
          contractAddress="0xNFTAddress"
          action={() => mintNFT({ args: [window.ethereum.selectedAddress] })}
        >
          Mint MindNFT
        </Web3Button>
      </div>
    </ThirdwebProvider>
  );
}

export default App;
