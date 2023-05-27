import React from 'react';
import Image from 'next/image';
import { logo } from '@/assets';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
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
  )
};

export default Navbar;