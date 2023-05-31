import React from 'react'
import Navbar from '@/components/Nav'
import { useAccount } from 'wagmi';
import { useState } from 'react';
import createAccount from '@/hook/createAccount';
import getAccountName from '@/hook/getAccountName';

function Register() {
    const [name, setName] = useState<string>("");
    const { address } = useAccount();
    const { write: handleCreateAccount, data } = createAccount(name);
    const {data:accountName} = getAccountName(address?address:"");


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