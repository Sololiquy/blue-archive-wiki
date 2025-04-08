"use client";

import React, { useContext, useState } from "react";
import Card from "./components/card";
import Banner from "./components/banner";
import Skill from "./components/skill";
import Tab from "./components/tab";

import "./enemy.css";

import { contextAPI } from "@/app/wrapper";

export default function EnemyDetail() {
   const { enemyAPI } = useContext(contextAPI);

   const [enemy, setEnemy] = useState<[number, string]>([0, "Raid"]);
   const [enemyDifficulty, setEnemyDifficulty] = useState<number>(0);

   const enemySelected = enemyAPI?.[enemy[1]]?.[enemy[0]];

   const handleEnemy = (index: number, name: string) => {
      setEnemy([index, name]);
   };

   return (
      <>
         <div className="backgroundContainer bg-gray-600"></div>
         <div className="enemyContainer">
            <div className="h-full relative flex flex-col bg-[rgba(0,0,0,0.3)]">
               <div className="w-full flex flex-row bg-[rgba(0,0,0,0.3)]">RAID</div>
               <div className="listScroller">
                  {enemyAPI?.Raid?.map((enemy: { Id: number }) => (
                     <Card key={enemy.Id} ID={enemy.Id} enemyType="Raid" handleEnemyID={handleEnemy} />
                  ))}
               </div>
            </div>
            <div className="detailContainer bg-[rgba(0,0,0,0.3)]">
               <div className="header bg-[rgba(0,0,0,0.3)]">{enemySelected?.Name}</div>
               <div className="banner bg-[rgba(0,0,0,0.3)]">
                  <Banner enemyID={enemy} enemyDifficulty={enemyDifficulty} />
               </div>
               <div className="difficultyTabGroup bg-[rgba(0,0,0,0.3)]">
                  <Tab difficulty="NORMAL" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 0} />
                  <Tab difficulty="HARD" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 1} />
                  <Tab difficulty="VERY HARD" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 2} />
                  <Tab difficulty="HARDCORE" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 3} />
                  <Tab difficulty="EXTREME" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 4} />
                  <Tab difficulty="INSANE" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 5} />
                  <Tab difficulty="TORMENT" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 6} />
                  <Tab difficulty="LUNATIC" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 7} />
               </div>
               <div className="detail">
                  <div className="w-full flex flex-col bg-[rgba(0,0,0,0.3)]">
                     {enemySelected?.RaidSkill?.map((skill: any) => (
                        <Skill key={skill.Id} data={skill} difficulty={enemyDifficulty} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
