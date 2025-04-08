import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import Wrapper from "./wrapper";
import Navbar from "./layoutComponents/navbar";
import "./globals.css";

export const metadata: Metadata = {
   title: "Blue Archive",
   description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body>
            <Analytics />
            <div className=" w-full h-full flex flex-col">
               <Navbar />
               <Wrapper>{children}</Wrapper>
            </div>
         </body>
      </html>
   );
}
