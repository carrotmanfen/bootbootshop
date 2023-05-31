import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import Image from 'next/image';
import Navbar from "@/components/Nav";
import useBalance from '@/hook/useBalance';
import isAccount from "@/hook/isAccount";
import getAccountName from '@/hook/getAccountName';
import { useAccount } from 'wagmi';
import useWithdraw from "@/hook/useWithdraw";

const Withdraw: React.FC = () => {

    const { address } = useAccount();
    const { data } = useBalance(address ? address : "");
    const { data: accountName } = getAccountName(address ? address : "");
    const { data: isRegister } = isAccount(address ? address : "");
    const [amount, setAmount] = useState("");
    const { write: getMoneyOff, data: Money } = useWithdraw();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (accountName == undefined) {
            setShow(false)
        } else {
            setShow(true)
        }

    }, [accountName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleWithdraw = () => {

        if (address != undefined) {

            if (String(amount).length > 0) {
                if (getMoneyOff) {
                    getMoneyOff();

                }
                window.alert("get money off");

            } else {
                window.alert("Please fill your money");
            }
        } else {
            window.alert("Please Connect wallet");
        }
    }

    return (
        <>
            <Navbar />
            <div className={`flex justify-center items-center mt-8`}>
                <div className={`${show ? 'hidden' : 'block'} `}>Please connect wallet and register</div>
                <div className={`${show ? 'flex' : 'hidden'} relative flex flex-col items-center justify-center`}>
                    <div className='border-2 rounded-2xl bg-gray-200 flex flex-col items-center justify-center py-10 px-40'>
                        <div className='text-3xl font-bold mb-8'>Withdraw Money</div>
                        {/* <p>{address?("Account : "+String(address) as string):"Please Connect Wallet"}</p> */}
                        <div className='text-xl mb-6'>Please fill ETH that you want to withdraw</div>
                        <input type="number"
                            className='w-[300px] text-xl mb-6 border-2 rounded-xl px-4 py-2 '
                            placeholder='ETH'
                            value={amount}
                            onChange={handleChange} />
                        <button className='px-4 py-2 bg-black text-xl text-white rounded-lg' onClick={handleWithdraw}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Withdraw;
