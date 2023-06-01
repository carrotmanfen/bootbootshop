import React, { useEffect } from 'react'
import Navbar from '@/components/Nav'
import Button from '@/components/Button'
import Link from 'next/link'
import getAccountName from '@/hook/getAccountName';
import useDeleteAccount from '@/hook/useDeleteAccount';
import { useAccount, useWaitForTransaction } from 'wagmi';
import useBalance from '@/hook/useBalance';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import isAccount from '@/hook/isAccount';
import Register from './register';

type historyData = {
    historyId:number;
    productId:number;
    addressFrom:string;
    accountName:string;
 }

function account() {
    const router = useRouter();
    const { address } = useAccount();
    const { data: balance } = useBalance(address ? address : "");
    const { data: name } = getAccountName(address ? address : "");
    const { data: isRegister } = isAccount(address ? address : "");
    const [accountName, setAccountName] = useState("Connect Wallet")
    const [accountBalance, setAccountBalance] = useState("")
    const [history,setHistory] = useState<historyData[]>([]);
    const [show, setShow] = useState(false);
    const { write: deleteAccount, data: deleteData } = useDeleteAccount();
    const [loading, setLoading] = useState(false);
    const waitForTransaction = useWaitForTransaction({
        confirmations: 1,
        hash: deleteData?.hash
    });

    const successful = () => {
        setLoading(false);
        router.push('/register')
    }
    
    useEffect(()=>{
        if(waitForTransaction.isLoading == true) {
            setLoading(true);
            
        }else{
            setLoading(false);
        }
    },[waitForTransaction.isLoading])

    useEffect(() => {
        if (waitForTransaction.isSuccess) {
          window.alert("Transaction successful");
          successful();
        }
      }, [waitForTransaction.isSuccess]);

    const handleDeleteAccount = async () => {
        if (address != undefined) {
            if(isRegister){

                if (deleteAccount) {
                    await deleteAccount();
                }
            }else{
                window.alert("Account not register");
            }

        } else {
            window.alert("Please Connect wallet");
        }
    }

    useEffect(() => {
        if(isRegister){

            setAccountBalance(String(balance == undefined ? "0.0000" : balance));
            setAccountName(String(name == undefined ? "Connect Wallet" : name));
            
            if (name == undefined) {
                setShow(false)
            } else {
                setShow(true)
            }
        }else{
            setShow(false)
        }

    }, [isRegister,name,address]);

    const fetchHistory = async () => {
        const response = await fetch(`http://localhost:3000/api/history/name?name=${String(name)}`);
        const data = await response.json();
        setHistory(data);
        console.log('data is' + name);
        console.log('data is' + data);
    };

    useEffect(() => {
        if (name) {
            fetchHistory();
        }
    }, [name]);

    return (
        <div>
            <Navbar />
            <div className={`${loading?'flex text-3xl bg-neutral-300 py-4 font-semibold justify-center':'hidden'}`}>
                Loading
            </div>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-5xl font-bold mt-24 mb-28'>Your Account</p>
                <div className='flex flex-row w-[800px] justify-between mb-24'>
                    <div>
                        <p className='text-3xl font-semibold'>Account Name</p>
                        <p className='text-2xl mt-2' id='Name'>{String(accountName)}</p>
                    </div>
                    <div>
                        <p className='text-3xl font-semibold'>Account Balance</p>
                        <p className='text-2xl mt-2'>{String((parseFloat(accountBalance) / Math.pow(10, 18)))} ETH</p>
                    </div>
                </div>
                <div className='flex flex-row gap-16'>
                    <Link href={'/deposit'} className={`${show ? 'block' : 'hidden'}`}>
                        <Button className=''>Deposit</Button>
                    </Link>
                    <Link href={'withdraw'} className={`${show ? 'block' : 'hidden'}`}>
                        <Button>Withdraw</Button>
                    </Link>
                    <Link href={'/register'} className={`${show ? 'hidden' : 'block'}`}>
                        <Button>Register</Button>
                    </Link>
                    <Link href={'/'}>
                        <Button>Go to home -{'>'}</Button>
                    </Link>
                </div>
                <div className='flex mt-16'>
                    <button
                        className={`${show ? 'block' : 'hidden'} bg-neutral-300 hover:bg-red-500 hover:text-white text-black text-center text-3xl font-semibold py-4  w-[350px] rounded-3xl`} onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
                {/* {history.map((h:historyData)=>{
                    return(
                        <div className='flex flex-col text-black' key={h.historyId}>
                            <p>{h.productId}</p>
                            <p>{h.addressFrom}</p>
                        </div>
                    )
                })} */}
                </div>
        </div>
    )
}

export default account