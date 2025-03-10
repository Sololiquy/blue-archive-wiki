import React, { ChangeEvent, useContext, useState } from "react";
import Skill from "./skill";

import "./component.css";
import { contextDetailStudent } from "../../context";

export default function SkillDescription({ onTierWeaponChange }: PropType) {
   const { studentData, tierWeapon, levelEquipment } = useContext(contextDetailStudent);
   const [exSkillLevel, setExSkillLevel] = useState(1);
   const [skillLevel, setSkillLevel] = useState(1);
   const studentWeaponURL = `https://schaledb.com/images/weapon/${studentData?.WeaponImg}.webp`;

   const passiveSkill = tierWeapon >= 2 ? "WeaponPassive" : "Passive";
   const basicSkill = studentData?.Gear?.Released && levelEquipment[3] >= 1 ? "GearPublic" : "Public";

   const squadType = {
      Main: ["strikerRoleColor", "STRIKER"],
      Support: ["specialRoleColor", "SUPPORT"],
   }[studentData?.SquadType as "Main" | "Support"] || ["defaultRoleColor", "DEFAULT"];

   const handleExSkillLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
      setExSkillLevel(parseInt(e.target.value));
   };
   const handleSkillLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSkillLevel(parseInt(e.target.value));
   };

   return (
      <>
         <div className="ml-1 font-bold text-2xl italic">{studentData?.Name}</div>
         <div className="flex flex-row items-center">
            <div className="starGradeContainer">
               {[...Array(studentData?.StarGrade)].map((_, i) => (
                  <img className="h-5 shrink-0 mx-0.5" key={i} src="/star.svg" alt="" />
               ))}
            </div>
            <div className={`typeSquad ${squadType[0]}`}>{squadType[1]}</div>
         </div>
         <div className="weaponContainer">
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
            </div>
         </div>
         <div className="mt-1 w-full overflow-y-auto bg-[rgba(0,0,0,0.3)]">
            <Skill type="Ex" level={exSkillLevel} />
            <div className="w-full p-1 flex flex-row">
               <input className="mr-1 w-full" type="range" value={exSkillLevel} min="1" max="5" onChange={handleExSkillLevelChange} />
               <div className="LevelSkillInfo">Lv.{exSkillLevel}</div>
            </div>
            <Skill type={basicSkill} level={skillLevel} />
            <Skill type={passiveSkill} level={skillLevel} />
            <Skill type="ExtraPassive" level={skillLevel} />
            <div className="w-full p-1 flex flex-row">
               <input className="mr-1 w-full" type="range" value={skillLevel} min="1" max="10" onChange={handleSkillLevelChange} />
               <div className="LevelSkillInfo">Lv.{skillLevel}</div>
            </div>
         </div>
      </>
   );
}

interface PropType {
   onTierWeaponChange: (index: number) => void;
}
