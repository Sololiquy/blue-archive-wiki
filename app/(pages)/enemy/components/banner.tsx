import React, { useContext } from "react";

import "./component.css";

import { contextAPI } from "@/app/wrapper";

interface parameterType {
   enemyID: [number, string];
   enemyDifficulty: number;
}

export default function Banner({ enemyID, enemyDifficulty }: parameterType) {
   const { enemyAPI } = useContext(contextAPI);

   const enemyData = enemyAPI?.Raid ? enemyAPI.Raid[enemyID[0]] : null;

   const enemyImgURL = `https://schaledb.com/images/raid/Boss_Portrait_${enemyData?.DevName}_${enemyDifficulty >= 5 ? "Insane_" : ""}Lobby.png`;
   const enemyBGImgURL = `https://schaledb.com/images/raid/Boss_Portrait_${enemyData?.DevName}_LobbyBG.png`;

   return (
      <>
         <img className="h-full left-0 absolute object-cover" src={enemyBGImgURL} alt="" />
         <img className="h-full -right-10 absolute object-cover" src={enemyImgURL} alt="" />
      </>
   );
}
