import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Pay It Forward",
  description: "Help the next you with honest feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
} 