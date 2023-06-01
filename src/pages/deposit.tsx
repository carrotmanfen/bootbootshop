import { useState, useEffect } from "react";
import React from "react";
import Navbar from "@/components/Nav";
import useBalance from '@/hook/useBalance';
import isAccount from "@/hook/isAccount";
import getAccountName from '@/hook/getAccountName';
import { useAccount, useWaitForTransaction } from 'wagmi';
import useDeposit from "@/hook/useDeposit.js";


const Deposit: React.FC = () => {
    const { address } = useAccount();
    const { data: accountName } = getAccountName(address ? address : "");
    const { data: isRegister } = isAccount(address ? address : "");
    const [amount, setAmount] = useState("");
    const { write: addMoney, data: Money } = useDeposit(amount);
    const { data: balance } = useBalance(address ? address : "");
    const [accountBalance, setAccountBalance] = useState("")
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const waitForTransaction = useWaitForTransaction({
        confirmations: 1,
        hash: Money?.hash
    });

    const successful = () => {
        setLoading(false);
        window.location.reload()
    }

    useEffect(() => {
        if (waitForTransaction.isLoading == true) {
            setLoading(true);

        } else {
            setLoading(false);
        }
    }, [waitForTransaction.isLoading])

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleDeposit = async () => {

        if (address != undefined) {

            if (String(amount).length > 0) {
                if (addMoney) {
                    await addMoney();
                }
            } else {
                window.alert("Please fill your money");
            }
        } else {
            window.alert("Please Connect wallet");
        }
    }

    useEffect(() => {
        if (waitForTransaction.isSuccess) {
            window.alert("Transaction successful");
            successful();
        }
    }, [waitForTransaction.isSuccess]);

    useEffect(() => {
        setAccountBalance(String(balance == undefined ? "0.0000" : balance));
    }, [balance, accountBalance, accountName]);

    return (
        <>
            <Navbar />
            <div className={`${loading ? 'flex text-3xl bg-neutral-300 py-4 font-semibold justify-center' : 'hidden'}`}>
                Loading
            </div>
            <div className="flex justify-center ">
                <p className='text-2xl '>Account Balance : {String((parseFloat(accountBalance) / Math.pow(10, 18)))} ETH</p>
            </div>
            <div className={`flex justify-center items-center mt-8`}>
                <div className={`${show ? 'hidden' : 'block'} `}>Please connect wallet and register</div>
                <div className={`${show ? 'flex' : 'hidden'} relative flex flex-col items-center justify-center`}>
                    <div className='border-2 rounded-2xl bg-neutral-300 flex flex-col items-center justify-center py-10 px-40'>
                        <div className='text-3xl font-bold mb-8'>Add Money</div>
                        <div className='text-xl mb-6'>Please fill ETH that you want to add</div>
                        <input type="number"
                            className='w-[300px] text-xl mb-6 border-2 rounded-xl px-4 py-2 '
                            placeholder='ETH'
                            value={amount}
                            onChange={handleChange} />
                        <button className='px-4 py-2 bg-black text-xl text-white rounded-lg' onClick={handleDeposit}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Deposit;
