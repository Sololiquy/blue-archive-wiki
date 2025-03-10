"use client";

import React, { useContext, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";

import StatDescription from "../components/statDescription/statDescription";
import SkillDescription from "../components/skillDescription/skillDescription";
import ProfileDescription from "../components/profileDescription/profileDescription";
import VoiceDescription from "../components/voiceDscription/voiceDescription";
import Tab from "../components/tab";

import "./studentDetail.css";

import { contextAPI } from "@/app/wrapper";
import { contextDetailStudent } from "../context"; // Import the context

export default function StudentDetail() {
   const id = Number(useParams().id);
   const { studentDefaultDataAPI, voiceDataAPI } = useContext(contextAPI);
   const studentData = studentDefaultDataAPI?.find((student: { Id: number }) => student.Id === id);
   const studentvoiceData = voiceDataAPI?.[id];

   const [tabIndex, setTabIndex] = useState(1);
   const [tierWeapon, setTierWeapon] = useState(0);
   const [tierStudent, setTierStudent] = useState(1);
   const [level, setLevel] = useState(1);
   const [levelWeapon, setLevelWeapon] = useState(1);
   const [levelEquipment, setLevelEquipment] = useState([1, 1, 1, 0]);
   const [bondRank, setBondRank] = useState(1);
   const [equipments, setEquipments] = useState([null, null, null]);

   if (!studentData) {
      return <div>Student not found</div>;
   }

   const handleTabClick = (index: number) => {
      setTabIndex(index);
   };
   const handleTierWeaponChange = (index: number) => {
      setTierWeapon(index);
   };

   const handleBondLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
      let x = parseInt(e.target.value);
      if (x < 1) {
         x = 1;
      } else if (x > 50) {
         x = 50;
      }
      setBondRank(x);
   };

   const studentSpriteURL = `https://schaledb.com/images/student/portrait/${studentData.Id}.webp`;
   const backgroundURL = `https://schaledb.com/images/background/${studentData.CollectionBG}.jpg`;

   return (
      <>
         <div className="backgroundContainer">
            <img className="w-full h-full object-cover blur-md brightness-[0.75] scale-[1.1]" src={backgroundURL} alt="Background" />
         </div>
         <div className="studentDetailContainer">
            <div className="characterSpriteContainer">
               <img className="h-full object-cover" src={studentSpriteURL} alt="Student" />
            </div>
            <div className="descriptionContainer">
               <div className="tabGroupContainer">
                  <Tab onClick={() => handleTabClick(1)} active={tabIndex === 1} label="Stat" />
                  <Tab onClick={() => handleTabClick(2)} active={tabIndex === 2} label="Skill" />
                  <Tab onClick={() => handleTabClick(3)} active={tabIndex === 3} label="Profile" />
                  <Tab onClick={() => handleTabClick(4)} active={tabIndex === 4} label="Voice" />
               </div>

               <div className="contentDescriptionContainerScroll">
                  <div className="contentDescriptionContainer">
                     <contextDetailStudent.Provider
                        value={{
                           studentData,
                           studentvoiceData,
                           tierWeapon,
                           levelEquipment,
                           levelWeapon,
                           setLevelEquipment,
                           setLevelWeapon,
                           level,
                           setLevel,
                           equipments,
                           setEquipments,
                           tierStudent,
                           setTierStudent,
                           bondRank,
                           setBondRank,
                        }}
                     >
                        {tabIndex === 1 && <StatDescription onTierWeaponChange={handleTierWeaponChange} handleBondLevelChange={handleBondLevelChange} />}
                        {tabIndex === 2 && <SkillDescription onTierWeaponChange={handleTierWeaponChange} />}
                        {tabIndex === 3 && <ProfileDescription />}
                        {tabIndex === 4 && <VoiceDescription />}
                     </contextDetailStudent.Provider>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
