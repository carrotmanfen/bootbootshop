import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Navbar from '@/components/Nav';
import Register from '@/components/Register';


export default function Home() {
  return (
    <>
        <Navbar/>
        <Register/>
    </>
  )
}
