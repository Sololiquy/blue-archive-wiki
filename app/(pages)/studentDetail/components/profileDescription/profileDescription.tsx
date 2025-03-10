import React, { useContext } from "react";

import "./component.css";

import { contextDetailStudent } from "../../context";
import { contextAPI } from "@/app/wrapper";

export default function ProfileDescription() {
   const { studentData } = useContext(contextDetailStudent);
   const { localizationAPI } = useContext(contextAPI);
   const school = localizationAPI?.SchoolLong[studentData?.School as keyof typeof localizationAPI.SchoolLong];
   const club = localizationAPI?.Club[studentData?.Club as keyof typeof localizationAPI.Club];

   const studentWeaponURL = `https://schaledb.com/images/weapon/${studentData?.WeaponImg}.webp`;
   const studentSchoolURL = `https://schaledb.com/images/schoolicon/${studentData?.School}.png`;

   return (
      <>
         <div className="ml-1 font-bold text-2xl italic">
            {studentData?.FamilyName} {studentData?.PersonalName}
         </div>
         <div className="flex flex-row items-center">
            <div className="starGrade bg-[rgba(0,0,0,0.675)]">
               {[...Array(studentData?.StarGrade)].map((_, i) => (
                  <img className="h-5 shrink-0 mx-0.5" key={i} src="/star.svg" alt="" />
               ))}
            </div>
         </div>
         <div className="weaponContainer bg-[rgba(0,0,0,0.3)]">
            <img className="h-[122px] object-contain" src={studentWeaponURL} alt="" />
            <div className="ml-2 font-bold text-lg italic">{studentData?.Weapon?.Name}</div>
         </div>
         <div className="schoolContainer bg-[rgba(0,0,0,0.3)]">
            <img className="" src={studentSchoolURL} alt="" />
            <div className="flex flex-col justify-center">
               <div className="font-bold text-xl italic tracking-wider">{school}</div>
               <div className="text-base italic tracking-wider">{club}</div>
            </div>
         </div>
         <div className="mt-1 grid grid-cols-2">
            <div className="flex flex-col">
               <div className="w-full h-12 flex flex-row items-center">
                  <span className="metadataName">Birthday</span>
                  <span className="metadataValue">{studentData?.Birthday}</span>
               </div>
               <div className="w-full h-12 flex flex-row items-center">
                  <span className="metadataName">Age</span>
                  <span className="metadataValue">{studentData?.CharacterAge}</span>
               </div>
               <div className="w-full h-12 flex flex-row items-center">
                  <span className="metadataName">Height</span>
                  <span className="metadataValue">{studentData?.CharHeightMetric}</span>
               </div>
            </div>
            <div className="flex flex-col">
               <div className="w-full h-12 flex flex-row items-center">
                  <span className="metadataName">CV.</span>
                  <span className="metadataValue">{studentData?.CharacterVoice}</span>
               </div>
               <div className="w-full h-12 flex flex-row items-center">
                  <span className="metadataName">Design</span>
                  <span className="metadataValue">{studentData?.Designer}</span>
               </div>
               <div className="w-full h-12 flex flex-row items-center">
                  <span className="metadataName">Illustrator</span>
                  <span className="metadataValue">{studentData?.Illustrator}</span>
               </div>
            </div>
         </div>
         <div className="w-full h-12 flex flex-row items-center">
            <span className="metadataName">Hobbies</span>
            <span className="metadataValue">{studentData?.Hobby}</span>
         </div>
         <div className="introductionContainer bg-[rgba(0,0,0,0.3)]">{studentData?.ProfileIntroduction}</div>
      </>
   );
}
