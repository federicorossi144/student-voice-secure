import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { ReactNode } from 'react';

const config = getDefaultConfig({
  appName: 'Student Voice Secure',
  projectId: '2ec9743d0d0cd7fb94dee1a7e6d33475',
  chains: [sepolia],
  ssr: false,
});

interface WalletProviderProps {
  children: ReactNode;
}

const WalletProvider = ({ children }: WalletProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
};

export default WalletProvider;