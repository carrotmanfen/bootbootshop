import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum,goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum,goerli],
    [
      
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

export default function App({ Component, pageProps }: AppProps) {
  return (
    
    <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} theme={lightTheme({
        accentColor: '#000000',
        accentColorForeground: 'white',
        borderRadius: 'medium',
        fontStack: 'system',
      })}
      >
        <Component {...pageProps} />
      
    </RainbowKitProvider>
  </WagmiConfig>
      )
}
