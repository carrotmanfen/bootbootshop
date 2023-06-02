import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import Image from 'next/image';
import Navbar from "@/components/Nav";
import useBalance from '@/hook/useBalance';
import isAccount from "@/hook/isAccount";
import getAccountName from '@/hook/getAccountName';
import { useAccount, useWaitForTransaction } from 'wagmi';
import useWithdraw from "@/hook/useWithdraw";
import { useRouter } from "next/router";

const Withdraw: React.FC = () => {
    const router = useRouter();
    const { address } = useAccount();
    const { data: accountName } = getAccountName(address ? address : "");
    const { data: isRegister } = isAccount(address ? address : "");
    const { data: balance } = useBalance(address ? address : "");
    const [accountBalance, setAccountBalance] = useState("")
    const [amount, setAmount] = useState("");
    const { write: getMoneyOff, data: Money } = useWithdraw();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const waitForTransaction = useWaitForTransaction({
        confirmations: 1,
        hash: Money?.hash
    });

    const successful = () => {
        setLoading(false);
        router.push('/account')
    }

    useEffect(() => {
        if (waitForTransaction.isLoading == true) {
            setLoading(true);

        } else {
            setLoading(false);
        }
    }, [waitForTransaction.isLoading])

    useEffect(() => {
        if (waitForTransaction.isSuccess) {
            window.alert("Transaction successful");
            successful();
        }
    }, [waitForTransaction.isSuccess]);

    useEffect(() => {
        if (isRegister) {

            if (accountName == undefined) {
                setShow(false)
            } else {
                setShow(true)
            }
        } else {
            setShow(false)
        }

    }, [isRegister]);

    useEffect(() => {
        setAccountBalance(String(balance == undefined ? "0.0000" : balance));
    }, [balance, accountBalance, accountName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleWithdraw = () => {

        if (address != undefined) {


            if (getMoneyOff) {
                setAmount(amount);
                getMoneyOff();
            }
            window.alert("get money off");
        } else {
            window.alert("Please Connect wallet");
        }
    }

    return (
        <>
            <Navbar />
            <div className={`${loading ? 'flex text-3xl bg-neutral-300 py-4 font-semibold justify-center' : 'hidden'}`}>
                Loading
            </div>
            <div className="flex justify-center">
                <p className='text-2xl '>Account Balance : {String((parseFloat(accountBalance) / Math.pow(10, 18)))} ETH</p>
            </div>
            <div className={`flex justify-center items-center mt-8`}>
                <div className={`${show ? 'hidden' : 'block'} `}>Please connect wallet and register</div>
                <div className={`${show ? 'flex' : 'hidden'} relative flex flex-col items-center justify-center`}>
                    <div className='border-2 rounded-2xl bg-neutral-300 flex flex-col items-center justify-center py-10 px-40'>
                        <div className='text-3xl font-bold mb-8'>Withdraw Money</div>
                        {/* <p>{address?("Account : "+String(address) as string):"Please Connect Wallet"}</p> */}
                        <div className='text-xl mb-6'>Press the button to withdraw all your money</div>
                        <button className='px-4 py-2 bg-black text-xl text-white rounded-lg' onClick={handleWithdraw}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Withdraw;
