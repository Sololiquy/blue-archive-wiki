import React, { ChangeEvent, useContext, useEffect } from "react";
import Stat from "./stat";
import Terrain from "./terrain";
import Equipment from "./equipment";
import EquipmentGear from "./equipmentGear";

import "./component.css";

import { contextDetailStudent } from "../../context";
import { contextAPI } from "@/app/wrapper";

interface parameterType {
   onTierWeaponChange: (index: number) => void;
   handleBondLevelChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function StatDescription({ onTierWeaponChange, handleBondLevelChange }: parameterType) {
   const { studentData, tierWeapon, equipments, setEquipments, levelEquipment, setLevelEquipment, levelWeapon, setLevelWeapon, level, setLevel, tierStudent, setTierStudent, bondRank } =
      useContext(contextDetailStudent);
   const { equipmentDataAPI } = useContext(contextAPI);

   useEffect(() => {
      if (studentData?.Equipment && studentData.Equipment.length > 0) {
         const findEquipment = (category: string, tier: number) => Object.values(equipmentDataAPI || {}).find((equipment: any) => equipment.Category === category && equipment.Tier === tier);

         const newEquipments = [
            findEquipment(studentData.Equipment[0], levelEquipment[0]) ?? null,
            findEquipment(studentData.Equipment[1], levelEquipment[1]) ?? null,
            findEquipment(studentData.Equipment[2], levelEquipment[2]) ?? null,
         ];

         setEquipments(newEquipments);
      }
   }, [studentData, equipmentDataAPI, levelEquipment]);

   studentData;
   if (!studentData) return <div>Loading...</div>;

   const studentWeaponURL = `https://schaledb.com/images/weapon/${studentData?.WeaponImg}.webp`;
   const roleStudentURL = `https://schaledb.com/images/ui/Role_${studentData?.TacticRole}.png`;
   const attackTypeURL = "https://schaledb.com/images/ui/Type_Attack.png";
   const defenseTypeURL = "https://schaledb.com/images/ui/Type_Defense.png";
   const studentPotraitURL = `https://schaledb.com/images/student/collection/${studentData.Id}.webp`;

   const attackType = {
      Explosion: "explosiveAttackColor",
      Pierce: "piercingAttackColor",
      Mystic: "mysticAttackColor",
      Sonic: "sonicAttackColor",
   }[studentData?.BulletType as "Explosion" | "Pierce" | "Mystic" | "Sonic"];

   const defenseType = {
      LightArmor: "lightArmorColor",
      HeavyArmor: "heavyArmorColor",
      Unarmed: "specialArmorColor",
      ElasticArmor: "elasticArmorColor",
   }[studentData?.ArmorType as "LightArmor" | "HeavyArmor" | "Unarmed" | "ElasticArmor"];

   const squadType = {
      Main: ["strikerRoleColor", "STRIKER"],
      Support: ["specialRoleColor", "SUPPORT"],
   }[studentData?.SquadType as "Main" | "Support"];

   const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLevel(parseInt(e.target.value));
   };
   const handleLevelWeaponChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLevelWeapon(parseInt(e.target.value));
   };

   const handleTierStudentChange = (index: number) => {
      setTierStudent(index);
   };

   return (
      <>
         <div className="ml-1 font-bold text-2xl italic">{studentData?.Name}</div>
         <div className="flex flex-row items-center">
            <div className="starGrade bg-[rgba(0,0,0,0.675)]">
               {Array.from({ length: studentData?.StarGrade }, (_, i) => (
                  <img className="h-5 shrink-0 mx-0.5" key={i} src="/star.svg" alt="" />
               ))}
            </div>
            <div className={`typeSquad ${squadType[0]}`}>{squadType[1]}</div>
         </div>
         <div className="weaponContainer bg-[rgba(0,0,0,0.3)]">
            <img className="h-[122px] object-contain" src={studentWeaponURL} alt="" />
            <div className="h-7 px-1 gap-1 flex flex-row items-center">
               <div className={`tierWeaponContainer ${tierWeapon >= 1 ? "font-bold !text-black !bg-white" : ""}`} onClick={() => onTierWeaponChange(1)}>
                  UE1
               </div>
               <div className={`tierWeaponContainer ${tierWeapon >= 2 ? "font-bold !text-black !bg-white" : ""}`} onClick={() => onTierWeaponChange(2)}>
                  UE2
               </div>
               <div className={`tierWeaponContainer ${tierWeapon >= 3 ? "font-bold !text-black !bg-white" : ""}`} onClick={() => onTierWeaponChange(3)}>
                  UE3
               </div>
               <input className="mr-1 w-full" type="range" value={levelWeapon} min="1" max="50" onChange={handleLevelWeaponChange} />
               <div className="infoSliderLevel">Lv.{levelWeapon}</div>
            </div>
         </div>
         <div className="mt-1 w-full gap-1 flex flex-row flex-wrap justify-center bg-[rgba(0,0,0,0.3)]">
            <div className="roundedContainer bg-[rgba(0,0,0,0.3)]">
               <img src={roleStudentURL} alt="" />
            </div>
            <div className={`roundedContainer bg-[rgba(0,0,0,0.3)] ${attackType}`}>
               <img className="size-4/6 object-contain" src={attackTypeURL} alt="" />
            </div>
            <div className={`roundedContainer bg-[rgba(0,0,0,0.3)] ${defenseType}`}>
               <img className="size-4/6 object-contain" src={defenseTypeURL} alt="" />
            </div>
            <div className="flex flex-row gap-1">
               <Terrain terrainType="Street" terrainValue={Number(studentData?.StreetBattleAdaptation) ?? 0} />
               <Terrain terrainType="Outdoor" terrainValue={Number(studentData?.OutdoorBattleAdaptation) ?? 0} />
               <Terrain terrainType="Indoor" terrainValue={Number(studentData?.IndoorBattleAdaptation) ?? 0} />
            </div>
         </div>
         <div className="statContainer bg-[rgba(0,0,0,0.3)]">
            <Stat typeStat="MaxHP" nameStat="Max HP" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
            <Stat typeStat="AttackPower" nameStat="Attack" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
            <Stat typeStat="DefensePower" nameStat="Defense" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
            <Stat typeStat="DodgePoint" nameStat="Evasion" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
            <Stat typeStat="CriticalPoint" nameStat="Crit Rate" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
            <Stat typeStat="CriticalDamageRate" nameStat="Crit Dmg" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
            <Stat typeStat="HealPower" nameStat="Healing" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
            <Stat typeStat="Range" nameStat="Attack Range" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
         </div>
         <div className="equipmentContainer bg-[rgba(0,0,0,0.3)]">
            <Equipment
               typeEquipment={0}
               levelEquipment={levelEquipment[0]}
               setLevelEquipment={(value: number) => {
                  const updated = [...levelEquipment];
                  updated[0] = value;
                  setLevelEquipment(updated);
               }}
            />
            <Equipment
               typeEquipment={1}
               levelEquipment={levelEquipment[1]}
               setLevelEquipment={(value: number) => {
                  const updated = [...levelEquipment];
                  updated[1] = value;
                  setLevelEquipment(updated);
               }}
            />
            <Equipment
               typeEquipment={2}
               levelEquipment={levelEquipment[2]}
               setLevelEquipment={(value: number) => {
                  const updated = [...levelEquipment];
                  updated[2] = value;
                  setLevelEquipment(updated);
               }}
            />
            <div className="p-1 flex allCenter">
               <div className="h-full border-l border-white"></div>
            </div>
            <EquipmentGear
               levelEquipmentGear={levelEquipment[3]}
               setLevelEquipmentGear={(value: number) => {
                  const updated = [...levelEquipment];
                  updated[3] = value;
                  setLevelEquipment(updated);
               }}
            />
         </div>
         <div className="mt-1 p-1 w-full flex flex-row">
            <input className="mr-1 w-full" type="range" value={level} min="1" max="100" onChange={handleLevelChange} />
            <div className="infoSliderLevel">Lv.{level}</div>
         </div>
         <div className="flex flex-row items-center">
            <div className="starContainer bg-[rgba(0,0,0,0.4)]">
               <img className="h-5 shrink-0 mx-[1px]" src={tierStudent >= 1 ? "/star-gold.svg" : "/star-empty.svg"} alt="" onClick={() => handleTierStudentChange(1)} />
               <img className="h-5 shrink-0 mx-[1px]" src={tierStudent >= 2 ? "/star-gold.svg" : "/star-empty.svg"} alt="" onClick={() => handleTierStudentChange(2)} />
               <img className="h-5 shrink-0 mx-[1px]" src={tierStudent >= 3 ? "/star-gold.svg" : "/star-empty.svg"} alt="" onClick={() => handleTierStudentChange(3)} />
               <img className="h-5 shrink-0 mx-[1px]" src={tierStudent >= 4 ? "/star-gold.svg" : "/star-empty.svg"} alt="" onClick={() => handleTierStudentChange(4)} />
               <img className="h-5 shrink-0 mx-[1px]" src={tierStudent >= 5 ? "/star-gold.svg" : "/star-empty.svg"} alt="" onClick={() => handleTierStudentChange(5)} />
               <div className="mx-1"></div>
               <img className="h-5 shrink-0 mx-[1px]" src={tierStudent >= 6 ? "/star-blue.svg" : "/star-empty.svg"} alt="" onClick={() => handleTierStudentChange(6)} />
               <img className="h-5 shrink-0 mx-[1px]" src={tierStudent >= 7 ? "/star-blue.svg" : "/star-empty.svg"} alt="" onClick={() => handleTierStudentChange(7)} />
               <img className="h-5 shrink-0 mx-[1px]" src={tierStudent >= 8 ? "/star-blue.svg" : "/star-empty.svg"} alt="" onClick={() => handleTierStudentChange(8)} />
            </div>
            <div className="bondContainer bg-[rgba(0,0,0,0.4)]">
               <img className="size-10 h-full rounded-full object-cover" src={studentPotraitURL} alt="" />
               <input className="bondInfo bg-transparent" type="number" min="1" max="50" defaultValue="1" value={bondRank} onChange={handleBondLevelChange} />
            </div>
         </div>
      </>
   );
}
