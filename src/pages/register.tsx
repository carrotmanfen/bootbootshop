import React from 'react'
import { useEffect } from 'react';
import Navbar from '@/components/Nav'
import { useAccount,useWaitForTransaction } from 'wagmi';
import { useState } from 'react';
import createAccount from '@/hook/createAccount';
import getAccountName from '@/hook/getAccountName';
import { useRouter } from 'next/router';

function Register() {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const { address } = useAccount();
    const { write: handleCreateAccount, data } = createAccount(name);
    const {data:accountName} = getAccountName(address?address:"");
    const [loading, setLoading] = useState(false);
    const waitForTransaction = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    });

    const successful = () => {
        setLoading(false);
        router.push('/account');
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleRegister = async () => {
        if (address != undefined) {
            if(accountName != undefined){
                window.alert("You already have account");
            }else{
                if (name.length > 0) {
                    if (handleCreateAccount) {
                        handleCreateAccount();
                    }
                } else {
                    window.alert("Please fill your name");
                }
            }
        } else {
            window.alert("Please Connect wallet");
        }

    }
    return (
        <div>
            <Navbar />
            <div className={`${loading?'flex text-3xl bg-neutral-300 py-4 font-semibold justify-center':'hidden'}`}>
                Loading
            </div>
            <div className="relative flex flex-col items-center justify-center mt-16">
                <div className='border-2 rounded-2xl bg-gray-200 flex flex-col items-center justify-center py-10 px-40'>
                    <div className='text-3xl font-bold mb-8'>Register</div>
                    <div className='text-xl mb-6'>Please fill your name to register</div>
                    <input type="text"
                        className='w-[300px] text-xl mb-6 border-2 rounded-xl px-4 py-2'
                        placeholder='Name'
                        value={name}
                        onChange={handleChange} />
                    <button className='px-4 py-2 bg-black text-xl text-white rounded-lg' onClick={handleRegister}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Register