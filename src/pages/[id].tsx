import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import Navbar from '@/components/Nav';
import useBalance from '@/hook/useBalance';
import getAccountName from '@/hook/getAccountName';
import { useAccount, useWaitForTransaction } from 'wagmi';
import isAccount from '@/hook/isAccount';
import useTransfer from '@/hook/useTransfer.js';
import addressContract from "../../contracts/addressContract";

type ItemData = {
    id: number;
    name: string;
    description: string;
    quantity: number;
    cost: number;
    size: number;
    color: string;
    picture: string;
};

const ProductPage: React.FC = () => {
    const [product, setProduct] = useState<ItemData[]>([]);
    const [productId, setProductId] = useState<string>('');
    const [addressFrom, setAddressFrom] = useState<string>('');
    const { address } = useAccount();
    const { data: accountName } = getAccountName(address ? address : "");
    const { data: isRegister } = isAccount(address ? address : "");
    const { data: balance } = useBalance(address ? address : "");
    const [accountBalance, setAccountBalance] = useState("")

    // push address of shop to transfer
    const _to = "0x3AaEe3cF4DefAb8D33d2961fc7b7e50fFfa5817C";

    const [amount, setAmount] = useState("");
    const { write: transfer, data: dataTransfer } = useTransfer(_to, amount);
    const [loading, setLoading] = useState(false);
    const waitForTransaction = useWaitForTransaction({
        confirmations: 1,
        hash: dataTransfer?.hash
    });

    const router = useRouter();
    const { id } = router.query;

    const successful = async () => {
        setLoading(false);
        try {
            const response = await axios.put('http://localhost:3000/api/products/updateProduct', { productId });
            console.log(response.data);
            // Handle success or display a success message
        } catch (error) {
            console.error(error);
            // Handle error or display an error message
        }

        try {
            const response = await axios.post('http://localhost:3000/api/history/createHistory', { productId, addressFrom,accountName });
            console.log(response.data);
            // Handle success or display a success message
        } catch (error) {
            console.error(error);
            // Handle error or display an error message
        }
        router.push('/');
    }

    useEffect(() => {
        if (waitForTransaction.isLoading == true) {
            setLoading(true);
            setShowModal(false);
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

    const fetchProducts = async () => {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await response.json();
        console.log('data is' + data);
        setProduct(data);
        setProductId(String(id));
        setAmount(String(data[0].cost * Math.pow(10, 18)));
        console.log(amount);
    };

    React.useEffect(() => {
        if (id) {
            fetchProducts();
        }
    }, [id]);

    useEffect(() => {
        setAccountBalance(String(balance == undefined ? "0.0000" : balance));
    }, [balance, accountBalance, accountName]);

    interface ModalProps {
        message: string;
        onClose: () => void;
    }

    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input field

    const showAlert = () => {
        if (address) {
            if (isRegister) {

                setShowModal(true);
            } else {
                window.alert("You don't have account please register first")
            }
        } else {
            window.alert("Please Connect Wallet");
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
        useEffect(() => {
            // Focus on the input field when the modal is opened
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, []);

        const handleBuyProduct = async () => {
            if (addressFrom === '') {
                window.alert("Please fill your address");
            } else {
                if (transfer) {
                    transfer();

                }
            }
        };

        return (
            <div className="modal">
                <div className="modal-content">
                    <p className='text-3xl text-black font-bold'>{message}</p>
                    <input
                        type="text"
                        className='bg-gray-300 flex w-full mt-8 p-2 rounded-xl text-xl text-black'
                        placeholder='address'
                        value={addressFrom}
                        ref={inputRef} // Assign the ref to the input field
                        onChange={(e) => {
                            setAddressFrom(e.target.value);
                        }}
                    />
                    <div className='flex justify-between mx-6 mt-10 text-2xl font-semibold'>
                        <button onClick={handleBuyProduct} className='border-2 px-12 pt-2 pb-3 rounded-xl bg-black text-white'>Buy</button>
                        <button onClick={onClose} className='border-2 px-8 pt-2 pb-3 rounded-xl bg-gray-500 text-white'>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    if (product == null) {
        return (
            <div>
                <h1>loading</h1>
            </div>
        );
    } else {
        return (
            <div className='relative'>
                <Navbar />
                <div className={`${loading ? 'flex text-3xl bg-neutral-300 py-4 font-semibold justify-center' : 'hidden'}`}>
                    Loading
                </div>
                <div className="flex justify-end mr-16">
                    <p className='text-2xl '>Account Balance : {String((parseFloat(accountBalance) / Math.pow(10, 18)))} ETH</p>
                </div>
                {product.map((p: ItemData) => {
                    return (
                        <div key={p.id} className={`pt-[20px] flex flex-row justify-center items-center `}>
                            <Image className="mr-40" src={`${p.picture}`} width={600} height={600} alt={`${p.id}`} />
                            <div className="p-8 flex flex-col w-[600px] h-[750px] justify-center text-4xl text-left">
                                <h2 className="mb-4 font-bold">{p.name}</h2>
                                <p className="text-2xl mb-12 text-gray-500 font-semibold">{p.description}</p>
                                <p className="font-bold text-3xl mb-10" >{p.cost} ETH</p>
                                <p className="text-3xl font-semibold text-gray-500 mb-4">Size : {p.size}</p>
                                <p className="text-3xl font-semibold text-gray-500 mb-4">Color : {p.color}</p>
                                <p className="text-3xl font-semibold text-gray-500 mb-20">Quantity : {p.quantity}</p>
                                <button
                                    onClick={showAlert}
                                    className="pt-4 pb-6 rounded-3xl bg-black text-white font-bold"
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    );
                })}
                {showModal && (
                    <div className="absolute flex items-center justify-center px-4 bottom-1/3 left-1/3 rounded-3xl w-[600px] h-[300px] bg-white border-black border-2">
                        <Modal message="Fill your address to buy this product" onClose={closeModal} />
                    </div>
                )}
            </div>
        );
    }
};

export default ProductPage;