import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MyFooter from "@/components/Footer/MyFooter";
import { Navbar } from "@/components/Navbar/Navbar";
import { UserProvider } from '@auth0/nextjs-auth0/client';



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
              <Navbar />
              {children}
            </div>
            <MyFooter />
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
