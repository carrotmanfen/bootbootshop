import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import {logo,pictest} from "@/assets";
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

  const testData =[
    {
      "id": 1,
      "picture" : "sdasd",
      "name": "nike asd",
      "cost": 2300
    },
    {
      "id": 2,
      "picture" : "sdasd",
      "name": "nike asd",
      "cost": 2300
    },
    {
      "id": 3,
      "picture" : "sdasd",
      "name": "nike asd",
      "cost": 2300
    },
    {
      "id": 4,
      "picture" : "sdasd",
      "name": "nike asd",
      "cost": 2300
    },
    {
      "id": 5,
      "picture" : "sdasd",
      "name": "nike asd",
      "cost": 2300
    },
    {
      "id": 6,
      "picture" : "sdasd",
      "name": "nike asd",
      "cost": 2300
    },
  ]

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
        <div className="grid grid-cols-4 gap-8 mx-24 mt-8">

          {/* {products.map((p: fetchData) => { */}
            {testData.map((p: any) => {
            return (
              
              <Link href={`shop/${p.id}`}>

                <div className="border-2 rounded-lg" key={p.id} >
                  {/* <p>{p.picture}</p> */}
                  <Image className="object-contain rounded-t-lg" src={pictest} alt={String(p.id)}></Image>
                  <div className="text-[24px] flex-row flex justify-between m-4">
                    <p className="">{p.name}</p>
                    <p>{p.cost+" ฿"}</p>
                  </div>
                          
                </div>

              </Link>
              
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShopPage;
