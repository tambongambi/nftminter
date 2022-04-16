import React, {useState, useEffect} from 'react';
const Web3 = require('web3');



const Balances = () => {
    //set params
    const [etherBalance, setEtherBalance] = useState("");

  const Address = "0x93F89534482F075a5D3dAd8817ab0BC43D2A48dA";
  const RpcHttpUrl = "https://rinkeby.infura.io/v3/124669aba5194804984ab53e797c3f8c";
  const web3 = new Web3(new Web3.providers.HttpProvider(RpcHttpUrl));


  console.log(Address);
  console.log(web3);
  console.log(RpcHttpUrl);

    //get balance function
    useEffect(() => {

        async function getBalance(){
            const balance = await web3.eth.getBalance(Address);
            setEtherBalance(balance);
        }
        getBalance();

    }, [etherBalance])
    
    
  return (
    <div>
        <div>
            Welcome to DappBlocks
        </div>
        <div>
            {Address}  :  {etherBalance}
        </div>
    </div>
  )
}

export default Balances