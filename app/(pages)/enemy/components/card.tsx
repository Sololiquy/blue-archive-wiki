import React, { useContext } from "react";

import "./component.css";

import { contextAPI } from "@/app/wrapper";

interface parameterType {
   handleEnemyID: (index: number, name: string) => void;
   enemyType: string;
   ID: number;
}

export default function Card({ ID, enemyType, handleEnemyID }: parameterType) {
   const { enemyAPI } = useContext(contextAPI);

   const enemyData = enemyAPI?.Raid?.find((enemy: { Id: number }) => enemy.Id === ID);
   const arrayIndex: number = enemyAPI?.Raid?.findIndex((enemy: { Id: number }) => enemy.Id === ID) || 0;

   const enemyImgURL = `https://schaledb.com/images/raid/Boss_Portrait_${enemyData?.DevName}_Lobby.png`;
   const enemyBGImgURL = `https://schaledb.com/images/raid/Boss_Portrait_${enemyData?.DevName}_LobbyBG.png`;
   return (
      <>
         <div className="containerCard bg-[rgba(0,0,0,0.3)]" onClick={() => handleEnemyID(arrayIndex, enemyType)}>
            <img className="h-full left-0 absolute object-cover" src={enemyBGImgURL} alt="" />
            <img className="h-full -right-10 absolute object-cover" src={enemyImgURL} alt="" />
         </div>
      </>
   );
}
