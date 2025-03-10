import { useContext } from "react";

import "./component.css";

import { contextDetailStudent } from "../../context";

interface parameterType {
   terrainType: string;
   terrainValue: number;
}

export default function Terrain({ terrainType, terrainValue }: parameterType) {
   const { studentData, tierWeapon } = useContext(contextDetailStudent);
   const terrainImg = `https://schaledb.com/images/ui/Terrain_${terrainType}.png`;

   let trueTerrainValue = terrainValue;
   if (tierWeapon >= 3) {
      if (terrainType === studentData?.Weapon?.AdaptationType) {
         trueTerrainValue = studentData?.Weapon?.AdaptationValue + terrainValue;
      } else {
         trueTerrainValue = terrainValue;
      }
   }

   const Mood = `https://schaledb.com/images/ui/Adaptresult${trueTerrainValue}.png`;

   return (
      <>
         <div className="shrink-0 flex w-24 min-w-12 h-12 items-center bg-[rgba(0,0,0,0.3)]">
            <img className="w-full h-full object-contain" src={terrainImg} alt="" />
            <img className="size-4/5 object-contain" src={Mood} alt="" />
         </div>
      </>
   );
}
