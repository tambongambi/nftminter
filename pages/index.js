import Head from 'next/head';

import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {

const { authenticate, isAuthenticated } = useMoralis();
const router = useRouter();
useEffect(() => {
  if(isAuthenticated) router.push('/dashboard');
}, [isAuthenticated]);

  return (
    <div className={"flex h-screen w-screen justify-center items-center"}>
      <Head>
        <title>NFT Minter</title> 
        <meta name="description" content="Th " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

           
       <button onClick={authenticate} className="bg-yellow-300 px-8 py-5 rounded-xl text-lg animate-pulse">
         Login using Metamask
       </button>
    </div>
  ) 
};
  