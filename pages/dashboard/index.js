import React from 'react'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Moralis from 'moralis';
import { contractABI, contractAddress } from '../../contract';
import Balances from '../balances';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);



const Dashboard = () => {
       
    const {isAuthenticated, logout, user} = useMoralis();
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    console.log(file)
    console.log(name)
    console.log(description)
    console.log(user)
    console.log(web3)
    


    useEffect(() => {
        if(!isAuthenticated) router.push('/');
    }, [isAuthenticated]);

    const balances = async (e) => {
      router.push('/balances');
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // save image to ipfs
            const file1 = new Moralis.File(file.name, file);
            await file1.saveIPFS();
            // get URL of the file
            const file1url = file1.ipfs();
            // generate metadata and save to ipfs
            const metadata = {
                name, description, image: file1url
            }
            const file2 = new Moralis.File(`${name}metadata.json`, {
                base64: Buffer.from(JSON.stringify(metadata)).toString('base64')
            });
            await file2.saveIPFS();
            const metadataurl = file2.ipfs();
            console.log(metadataurl);
            // interact with smart contract
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log(contractABI);
            console.log(contractAddress);
            console.log(contract);
            const response = await contract.methods.mint(metadataurl).send({ from: user.get("ethAddress") });
            console.log(response);
            //get tokenId
            const tokenId = response.events.Transfer.returnValues.tokenId;
            console.log(tokenId);
            alert(`NFT successfully minted. Contract address - ${contractAddress} and Token ID - ${tokenId}`);

        } catch ( err ) {
              console.error(err)
              alert('something went wrong!')
        }
    };

  return (
    <div className={"flex h-screen w-screen justify-center items-center"}>
    <form onSubmit={onSubmit}>
        <div>
          <input 
          type="text" 
          className="border-[1px] p-2 text-lg border-black w-full" 
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <input 
          type="text" 
          className="border-[1px] p-2 text-lg border-black w-full" 
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <input 
          type="file"   
          className="border-[1px] p-2 text-lg border-black w-full" 
         
          onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
     <button type="submit" className="mt-5 w-full p-5 bg-green-700 text-white text-lg rounded-xl animate-pulse">
         Mint Now
     </button>
     <button onClick={balances} className="mt-5 w-full p-5 bg-red-700 text-white text-lg rounded-xl">
         Balances
     </button>
     <button onClick={logout} className="mt-5 w-full p-5 bg-red-700 text-white text-lg rounded-xl">
         Log Out
     </button>
    </form>
    
    </div>
  )
}

export default Dashboard