import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700"], // Corrected "weights" to "weight"
});

export const metadata = {
  title: "Solana Rewind",
  description: "Welcome to Solana Rewind", // Capitalized for proper formatting
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
