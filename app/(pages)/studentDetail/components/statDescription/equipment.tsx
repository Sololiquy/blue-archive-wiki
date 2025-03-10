import React, { useContext } from "react";

import "./component.css";

import { contextDetailStudent } from "../../context";

interface parameterType {
   typeEquipment: number;
   levelEquipment: number;
   setLevelEquipment: (value: number) => void;
}

export default function Equipment({ typeEquipment, levelEquipment, setLevelEquipment }: parameterType) {
   const { studentData } = useContext(contextDetailStudent);
   const maxLevel = typeEquipment === 2 ? 9 : 10;
   const equipmentURL = `https://schaledb.com/images/equipment/full/equipment_icon_${studentData?.Equipment[typeEquipment]?.toLowerCase()}_tier${levelEquipment}.webp`;

   const handleEquipmentLevelDecrease = () => {
      setLevelEquipment(levelEquipment - 1);
   };
   const handleEquipmentLevelIncrease = () => {
      setLevelEquipment(levelEquipment + 1);
   };

   return (
      <div className="m-1.5 grow-0 flex flex-col">
         <div className="flex size-16 rounded-full allCenter bg-[rgb(140,147,158)]">
            <img className="object-contain" src={equipmentURL} alt="" onError={(e) => (e.currentTarget.src = "https://schaledb.com/images/gear/empty.png")} />
         </div>
         <div className="h-8 flex flex-row allCenter">
            <div className="size-3 flex" onClick={levelEquipment > 0 ? () => handleEquipmentLevelDecrease() : undefined}>
               <img className="rotate-180 object-contain" src="/arrow.svg" alt="" />
            </div>
            <div className="font-bold mx-2">T{levelEquipment}</div>
            <div className="size-3 flex" onClick={levelEquipment < maxLevel ? () => handleEquipmentLevelIncrease() : undefined}>
               <img className="object-contain" src="/arrow.svg" alt="" />
            </div>
         </div>
      </div>
   );
}
