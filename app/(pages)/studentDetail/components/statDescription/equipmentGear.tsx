import { useContext, useEffect, useState } from "react";

import "./component.css";

import { contextDetailStudent } from "../../context";

interface parameterType {
   levelEquipmentGear: number;
   setLevelEquipmentGear: (value: number) => void;
}

export default function EquipmentGear({ levelEquipmentGear, setLevelEquipmentGear }: parameterType) {
   const { studentData } = useContext(contextDetailStudent);
   const [equipmentImgSrc, setEquipmentImgSrc] = useState<string>("");
   const maxLevel = studentData?.Gear?.StatValue?.[0]?.length || 0;
   useEffect(() => {
      if (levelEquipmentGear > 0) {
         setEquipmentImgSrc(`https://schaledb.com/images/gear/icon/${studentData?.Id}.webp`);
      } else {
         setEquipmentImgSrc(`https://schaledb.com/images/gear/empty.png`);
      }
   }, [levelEquipmentGear]);

   const handleEquipmentLevelDecrease = () => {
      setLevelEquipmentGear(levelEquipmentGear - 1);
   };
   const handleEquipmentLevelIncrease = () => {
      setLevelEquipmentGear(levelEquipmentGear + 1);
   };
   return (
      <>
         <div className="m-1.5 grow-0 flex flex-col" style={{ bottom: 0 }}>
            <div className="flex size-16 rounded-full allCenter bg-[rgb(140,147,158)]">
               <img className="object-contain" src={equipmentImgSrc} alt="" />
            </div>
            {studentData?.Gear && Object.keys(studentData.Gear).length > 0 ? (
               <div className="h-8 flex flex-row allCenter">
                  <div className="size-3 flex" onClick={levelEquipmentGear > 0 ? () => handleEquipmentLevelDecrease() : undefined}>
                     <img className="rotate-180 object-contain" src="/arrow.svg" alt="" />
                  </div>
                  <div className="font-bold mx-2">T{levelEquipmentGear}</div>
                  <div className="size-3 flex" onClick={levelEquipmentGear < maxLevel ? () => handleEquipmentLevelIncrease() : undefined}>
                     <img className="object-contain" src="/arrow.svg" alt="" />
                  </div>
               </div>
            ) : null}
         </div>
      </>
   );
}
