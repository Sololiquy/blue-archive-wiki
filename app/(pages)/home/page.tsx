import React from "react";
import "./home.css";

export default function Home() {
   return (
      <>
         <div className="backgroundContainer bg-gray-900"></div>
         <div className="contentContainer flex flex-col gap-2 allCenter">
            <img className="rounded-[150px]" src="/Arona_pyrox.png" alt="" />
            <div className="text-6xl italic font-semibold tracking-widest">Arona</div>
         </div>
      </>
   );
}
