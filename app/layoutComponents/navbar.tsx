import Link from "next/link";
import React from "react";

import "./navbar.css";

export default function Navbar() {
   return (
      <>
         <div className="headerContainer bg-[rgba(0,0,0,0.626)]">
            <div className="mr-4">
               <img className="h-10 flex mr-5" src="/Blue_Archive_EN_logo.svg" alt="" />
            </div>
            <div className="mr-7 text-lg font-semibold italic">
               <Link href="/home">Home</Link>
            </div>
            <div className="mr-7 text-lg font-semibold italic">
               <Link href="/studentList">Student</Link>
            </div>
            <div className="mr-7 text-lg font-semibold italic">
               <Link href="/enemy">Enemy</Link>
            </div>
         </div>
      </>
   );
}
