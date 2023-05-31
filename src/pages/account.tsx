import React, { useEffect } from 'react'
import Navbar from '@/components/Nav'
import Button from '@/components/Button'
import Link from 'next/link'
import getAccountName from '@/hook/getAccountName';
import { useAccount } from 'wagmi';
import useBalance from '@/hook/useBalance';
import { useState } from 'react';
import { disconnect } from '@wagmi/core'
 


function account() {
    const { address } = useAccount();
    const { data:balance } = useBalance(address ? address : "");
    const { data:name } = getAccountName(address ? address : "");
    const [accountName, setAccountName] = useState("Connect Wallet")
    const [accountBalance, setAccountBalance] = useState("")
    const [show,setShow] =useState(false);

    useEffect(() => {
        setAccountBalance(String(balance==undefined?"0.0000":balance));
        setAccountName(String(name==undefined?"Connect Wallet":name));
        
        if(name==undefined){
            setShow(false)
        }else{
            setShow(true)
        }

      }, [balance,name,accountBalance,accountName]);

    return (
        <div>
            <Navbar />
            <div className='flex flex-col justify-center items-center'>
                <p className='text-5xl font-bold mt-24 mb-28'>Your Account</p>
                <div className='flex flex-row w-[800px] justify-between mb-24'>
                    <div>
                        <p className='text-3xl font-semibold'>Account Name</p>
                        <p className='text-2xl mt-2' id='Name'>{String(accountName)}</p>
                    </div>
                    <div>
                        <p className='text-3xl font-semibold'>Account Balance</p>
                        <p className='text-2xl mt-2'>{String((parseFloat(accountBalance)/Math.pow(10,18)))} ETH</p>
                    </div>
                </div>
                <div className='flex flex-row gap-16'>
                    <Link href={'/deposit'} className={`${show?'block':'hidden'}`}>
                        <Button className=''>Deposit</Button>
                    </Link>
                    <Link href={'withdraw'} className={`${show?'block':'hidden'}`}>
                        <Button>Withdraw</Button>
                    </Link>
                    <Link href={'/register'} className={`${show?'hidden':'block'}`}>
                        <Button>Register{'>'}</Button>
                    </Link>
                    <Link href={'/'}>
                        <Button>Go to home -{'>'}</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default account