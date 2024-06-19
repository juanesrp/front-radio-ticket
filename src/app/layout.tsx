import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MyFooter from "@/components/Footer/MyFooter";
import { Navbar } from "@/components/Navbar/Navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "sonner";
import Refreshtoken2 from "@/components/Refreshtoken/Refreshtoken2";
import Chatbot from "@/components/ChatBot/ChatBot";
import { SearchProvider } from "@/context/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RadioTicket",
  description: "RadioTicket",
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
          <SearchProvider>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <Navbar />
                {children}
              </div>
              <Refreshtoken2 />
              <MyFooter />
              <Chatbot />
            </div>
          </SearchProvider>
        </body>
      </UserProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "toaster",
          duration: 2000,
        }}
      />
    </html>
  );
}
