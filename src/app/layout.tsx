import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../Components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css"
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MetaShot",
  description: "Generated by create next app",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/faviconNew.ico'/>
      </head>
      <body className={inter.className}>
        <div className="">
          {/* <Navbar/> */}
        {children}
        </div>
        
        
        </body>
    </html>
  );
}
