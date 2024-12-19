'use client'
import { Poppins } from "next/font/google";
import "./globals.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl, Transaction } from "@solana/web3.js";
import { useMemo } from "react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700"], // Corrected "weights" to "weight"
});

// export const metadata = {
//   title: "Solana Rewind",
//   description: "Welcome to Solana Rewind", // Capitalized for proper formatting
// };

export default function RootLayout({ children }) {

  const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // Configure supported wallets
    const wallets = useMemo(
      () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
      [network]
    );
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
      <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
        {children}
        </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>

      </body>
    </html>
  );
}
