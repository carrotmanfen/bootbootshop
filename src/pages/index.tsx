import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import Image from 'next/image';
import Navbar from "@/components/Nav";
import getAccountName from '@/hook/getAccountName';
import { useAccount } from 'wagmi';

type fetchData = {
    id: number;
    name: string;
    description: string;
    quantity: number;
    cost: number;
    size: number;
    color: string;
    picture: string;
}

const ShopPage: React.FC = () => {
    const [products, setProducts] = useState([]);
    const { address } = useAccount();
    const { data: accountName } = getAccountName(address ? address : "");
    console.log(accountName);

    const fetchProducts = async () => {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="grid grid-cols-4 gap-8 mx-24 mt-8">
                    {products.map((p: fetchData) => {
                        return (
                            <div className=''>
                                <Link href={`/${p.id}`}>
                                    <div className="border-2 rounded-lg" key={p.id} >
                                        <Image className="object-contain rounded-t-lg" src={`${p.picture}`} width={450} height={450} alt={String(p.id)}></Image>
                                        <div className="text-[24px] flex-row flex justify-between m-4">
                                            <p className="truncate overflow-hidden w-64">{p.name}</p>
                                            <p>{p.cost + " ETH"}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ShopPage;
