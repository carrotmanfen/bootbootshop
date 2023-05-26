import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import {logo} from "@/assets";
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

type fetchData = {
    id:number;
    name: string;
    description: string;
    quantity:number;
    cost:number;
    size:number;
    color:string;
    picture:string;
 }

const ShopPage:React.FC = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const buyProduct = async (product: any) => {
    //web 3
  };

  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <div className="min-h-screen bg-white">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-0 bg-gradient-to-t from-neutral-300 mb-3">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="flex-row w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <a
                className="flex items-center text-sm font-bold text-[24px] tracking-wide leading-relaxed inline-block mr-4 py-0 whitespace-nowrap text-black "
                href="#HHH"
              >
                <Image className='mr-[6px]' src={logo} width={100} height={100} alt="Logo of Bootbootshop"/>
                Bootbootshop
              </a>
              
            </div>
            <div>
              <ConnectButton/>
            </div>
          </div>
        </nav>

        {products.map((p: fetchData) => {
          return (
            <div key={p.id} style={{ paddingTop: "20px" }}>
              <h2>{p.name}</h2>
              <p>{p.cost}</p>
              <p>{p.picture}</p>
              <Link href={`shop/${p.id}`}>
                      <button>Buy</button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShopPage;
