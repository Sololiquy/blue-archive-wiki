import React, { useContext } from "react";

import "./component.css";
import { contextDetailStudent } from "../../context";
import { contextAPI } from "@/app/wrapper";

export default function Skill({ type, level }: parameterType) {
   const { studentData } = useContext(contextDetailStudent);
   const { localizationAPI } = useContext(contextAPI);

   const attackType = {
      Explosion: ["explosiveAttackFontColor", "explosive"],
      Pierce: ["piercingAttackFontColor", "piercing"],
      Mystic: ["mysticAttackFontColor", "mystic"],
      Sonic: ["sonicAttackFontColor", "sonic"],
   }[studentData?.BulletType as "Explosion" | "Pierce" | "Mystic" | "Sonic"] || ["", ""];

   const styleIcon = "translate: 0px -2px; height:22px; width:auto; display:inline-flex";
   const styleFont = "font-weight: bold; margin-left:2px";

   // REGEX for description -----------------------------------------------------------------------------------------------------------

   const description = studentData?.Skills[type]?.Desc?.replace(/<\?(\d+)>/g, (_: string, index: number) => {
      const parameter = studentData?.Skills[type]?.Parameters?.[index - 1]?.[level - 1] || "";
      return `<span class="${attackType[0]}" style="${styleFont}">${parameter || "?"}</span>`;
   }).replace(/<(\w+):(\w+)>/g, (_: string, effect: string, typeEffect: string) => {
      const effects = effect === "b" ? "Buff" : effect === "d" ? "Debuff" : effect === "c" ? "CC" : effect === "s" ? "Special" : "";
      const x = `${effects}_${typeEffect}`;
      const stat = localizationAPI?.BuffName[x as keyof typeof localizationAPI.BuffName];
      const effectsType = {
         Buff: ["explosiveAttackFontColor"],
         Special: ["piercingAttackFontColor"],
         Debuff: ["mysticAttackFontColor"],
         CC: ["sonicAttackFontColor"],
      }[effects as "Buff" | "CC" | "Debuff" | "CC"] || [""];

      const iconEffects = `https://schaledb.com/images/buff/${effects}_${typeEffect}.webp`;
      return `<img src="${iconEffects}" alt="${effects} ${typeEffect}" style="${styleIcon}" /><span class="${effectsType}" style="${styleFont}">${stat}</span>`;
   });

   const skillImgURL = `https://schaledb.com/images/skill//${studentData?.Skills[type]?.Icon}.webp`;

   const extraSkillCount = studentData?.Skills[type]?.ExtraSkills?.length;
   const extraDescription: string[] = [];
   const extraSkillImgURL: string[] = [];
   if (extraSkillCount > 0) {
      for (let i = 0; i < extraSkillCount; i++) {
         extraDescription[i] = studentData?.Skills[type]?.ExtraSkills[i]?.Desc?.replace(/<\?(\d+)>/g, (_: string, index: number) => {
            const parameter = studentData?.Skills[type]?.ExtraSkills[i]?.Parameters?.[index - 1]?.[level - 1] || "";
            return `<span class="${attackType[0]}" style="${styleFont}">${parameter || "?"}</span>`;
         }).replace(/<(\w+):(\w+)>/g, (_: string, effect: string, typeEffect: string) => {
            const effects = effect === "b" ? "Buff" : effect === "d" ? "Debuff" : effect === "c" ? "CC" : effect === "s" ? "Special" : "";
            const x = `${effects}_${typeEffect}`;
            const stat = localizationAPI?.BuffName[x as keyof typeof localizationAPI.BuffName];
            const effectsType = {
               Buff: ["explosiveAttackFontColor"],
               Special: ["piercingAttackFontColor"],
               Debuff: ["mysticAttackFontColor"],
               CC: ["sonicAttackFontColor"],
            }[effects as "Buff" | "CC" | "Debuff" | "CC"] || [""];

            const iconEffects = `https://schaledb.com/images/buff/${effects}_${typeEffect}.webp`;
            return `<img src="${iconEffects}" alt="${effects} ${typeEffect}" style="${styleIcon}" /><span class="${effectsType}" style="${styleFont}">${stat}</span>`;
         });

         extraSkillImgURL[i] = `https://schaledb.com/images/skill/${studentData?.Skills[type]?.ExtraSkills[i]?.Icon}.webp`;
      }
   }

   //----------------------------------------------------------------------------------------------------------------------------

   return (
      <>
         <div className="flex flex-col">
            <div className="w-full h-24 flex flex-row items-center">
               <div className="relative size-24 flex allCenter">
                  <img className="absolute size-20 object-contain z-40" src={skillImgURL} alt="" />
                  <img className="absolute size-24 object-contain" src={`/bg-Icon_${attackType[1]}.svg`} alt="" />
               </div>
               <div>
                  <div className="font-bold text-xl tracking-normal">{studentData?.Skills[type]?.Name}</div>
                  <div className="my-1 flex flex-row">
                     {type === "Ex" && <div className="skillInfoStatCost">{`${studentData?.Skills[type]?.Cost?.[level - 1] || "0"} COST`}</div>}
                     <div className="pl-2 pr-4 text-base text-justify">{type === "Ex" ? "Ex Skill" : type}</div>
                  </div>
               </div>
            </div>
            <div className="pl-2 pr-4 text-base text-justify" dangerouslySetInnerHTML={{ __html: description ?? "" }}></div>
         </div>
         {Array.from({ length: studentData?.Skills?.[type]?.ExtraSkills?.length }, (_, i) => (
            <div className="mt-1 w-full overflow-y-auto" key={i}>
               <div className="w-full h-24 flex flex-row items-center">
                  <div className="h-[80%] w-1 bg-white ml-2"></div>
                  <div className="relative size-24 flex items-center justify-center">
                     <img className="absolute size-20 object-contain z-40" src={extraSkillImgURL[i]} alt="" />
                     <img className="absolute size-20 object-contain" src={`/bg-Icon_${attackType[1]}.svg`} alt="" />
                  </div>
                  <div>
                     <div className="font-bold text-xl tracking-normal">{studentData?.Skills?.[type]?.ExtraSkills[i]?.Name}</div>
                     <div className="my-1 flex flex-row">
                        {type === "Ex" && <div className="skillInfoStatCost">{`${studentData?.Skills?.[type]?.ExtraSkills[i]?.Cost?.[level - 1] || "0"} COST`}</div>}
                     </div>
                  </div>
               </div>
               <div className="pl-2 pr-4 text-base text-justify" dangerouslySetInnerHTML={{ __html: extraDescription[i] ?? "" }}></div>
            </div>
         ))}
      </>
   );
}

interface parameterType {
   type: string;
   level: number;
}
