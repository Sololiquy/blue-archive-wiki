import React, { useContext } from "react";

import "./component.css";

import { contextAPI } from "@/app/wrapper";

interface parameterType {
   data: {
      Name: string;
      SkillType: string;
      Desc: string;
      Icon: string;
      ATGCost: number;
      Parameters: string[][] | null;
   };
   difficulty: number;
}

export default function Skill({ data, difficulty }: parameterType) {
   const skillSelected = data;
   const { localizationAPI } = useContext(contextAPI);

   const parameter1 = skillSelected?.Parameters?.[0]?.[difficulty] || "";
   const parameter2 = skillSelected?.Parameters?.[1]?.[difficulty] || "";
   const parameter3 = skillSelected?.Parameters?.[2]?.[difficulty] || "";
   const parameter4 = skillSelected?.Parameters?.[4]?.[difficulty] || "";
   const parameter5 = skillSelected?.Parameters?.[5]?.[difficulty] || "";

   const styleIcon = "translate: 0px -2px; height:22px; width:auto; display:inline-flex";
   const styleFont = "font-weight: bold; margin-left:2px";

   // REGEX for desription-----------------------------------------------------------------------------------------------------------

   const description = skillSelected?.Desc?.replace(/<\?1>/g, `<span style="${styleFont}">${parameter1}</span>`)
      .replace(/<\?2>/g, `<span style="${styleFont}">${parameter2}</span>`)
      .replace(/<\?3>/g, `<span style="${styleFont}">${parameter3}</span>`)
      .replace(/<\?4>/g, `<span style="${styleFont}">${parameter4}</span>`)
      .replace(/<\?5>/g, `<span style="${styleFont}">${parameter5}</span>`)
      ?.replace(/<(\w+):(\w+)>/g, (_, effect, typeEffect) => {
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

   //-------------------------------------------------------------------------------------------------------------------------------

   const iconSkill = `https://schaledb.com/images/skill/raid/${skillSelected?.Icon}.webp`;

   if (skillSelected?.SkillType !== "raidautoattack") {
      return (
         <>
            <div className="mt-1 w-full overflow-y-auto bg-[rgba(0,0,0,0.3)]">
               <div className="w-full h-24 flex flex-row items-center">
                  <div className="relative size-24 flex allCenter">
                     <img className="absolute size-20 object-contain z-40" src={iconSkill} alt="" />
                  </div>
                  <div>
                     <div className="font-bold text-xl tracking-normal">{skillSelected?.Name}</div>
                     <div className="my-1 flex flex-row">
                        {skillSelected?.ATGCost > 0 && <div className="infoATGCost bg-[rgba(255,255,255,0.7)]">{skillSelected?.ATGCost}</div>}
                        <div className="italic text-base tracking-wide">{skillSelected?.SkillType}</div>
                     </div>
                  </div>
               </div>

               <div className="pl-2 pr-4 text-base text-justify" dangerouslySetInnerHTML={{ __html: description ?? "" }}></div>
            </div>
         </>
      );
   }
}
