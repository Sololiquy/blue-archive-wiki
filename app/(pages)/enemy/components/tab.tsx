import React, { Dispatch, SetStateAction } from "react";

import "./component.css";

interface parameterType {
   difficulty: string;
   active: boolean;
   setEnemyDifficulty: Dispatch<SetStateAction<number>>;
}

export default function tabDescription({ difficulty, active, setEnemyDifficulty }: parameterType) {
   const handleDifficultyChange = (x: number) => {
      setEnemyDifficulty(x);
   };

   let difficultyScale = 0;
   if (difficulty === "NORMAL") {
      difficultyScale = 0;
   } else if (difficulty === "HARD") {
      difficultyScale = 1;
   } else if (difficulty === "VERY HARD") {
      difficultyScale = 2;
   } else if (difficulty === "HARDCORE") {
      difficultyScale = 3;
   } else if (difficulty === "EXTREME") {
      difficultyScale = 4;
   } else if (difficulty === "INSANE") {
      difficultyScale = 5;
   } else if (difficulty === "TORMENT") {
      difficultyScale = 6;
   } else if (difficulty === "LUNATIC") {
      difficultyScale = 7;
   }

   return (
      <>
         <div className={`p-1 text-nowrap relative ${active ? "!font-bold !bg-white !text-black" : ""}`} onClick={() => handleDifficultyChange(difficultyScale)}>
            <div>{difficulty}</div>
         </div>
      </>
   );
}
