import React, { useContext } from "react";
import styles from "@/styles/student detail/tabSkill.module.css";
import { contextDetailStudent } from "../../../layout/studentDetail";
import { contextAPI } from "../../../_app";

export default function Skill({ type, level }: VariableType) {
    const { studentData } = useContext(contextDetailStudent);
    const { localizationAPI } = useContext(contextAPI);

    const Skill = studentData?.Skills[type];
    const parameter1 = Skill?.Parameters?.[0]?.[level - 1] || "";
    const parameter2 = Skill?.Parameters?.[1]?.[level - 1] || "";
    const parameter3 = Skill?.Parameters?.[2]?.[level - 1] || "";

    const attackType = {
        Explosion: ["explosiveAttackFontColor", "explosive"],
        Pierce: ["piercingAttackFontColor", "piercing"],
        Mystic: ["mysticAttackFontColor", "mystic"],
        Sonic: ["sonicAttackFontColor", "sonic"],
    }[studentData?.BulletType as "Explosion" | "Pierce" | "Mystic" | "Sonic"] || ["", ""];

    const styleIcon = "translate: 0px -2px; height:22px; width:auto; display:inline-flex";
    const styleFont = "font-weight: bold; margin-left:2px";

    // REGEX for desription-----------------------------------------------------------------------------------------------------------

    const description = Skill?.Desc?.replace(/<\?1>/g, `<span class="${attackType[0]}" style="${styleFont}">${parameter1}</span>`)
        .replace(/<\?2>/g, `<span class="${attackType[0]}" style="${styleFont}">${parameter2}</span>`)
        .replace(/<\?3>/g, `<span class="${attackType[0]}" style="${styleFont}">${parameter3}</span>`)
        .replace(/<(\w+):(\w+)>/g, (_: string, effect: string, typeEffect: string) => {
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
    const skillImgURL = `https://schaledb.com/images/skill//${Skill?.Icon}.webp`;

    return (
        <div className={styles.skillInfoContainer}>
            <div className={styles.skillInfoHeader}>
                <div className={styles.skillIcon}>
                    <img className={styles.skillIconImg} src={skillImgURL} alt="" />
                    <img className={styles.skillIconBG} src={`/blue-archive-wiki/bg-Icon_${attackType[1]}.svg`} alt="" />
                </div>
                <div>
                    <div className={styles.skillInfoName}>{Skill?.Name}</div>
                    <div className={styles.skillInfoStat}>
                        {type === "ex" && <div className={styles.skillInfoStatCost}>{`${Skill?.Cost?.[level - 1] || "N/A"} COST`}</div>}
                        <div className={styles.skillInfoType}>{type === "ex" ? "Ex Skill" : type}</div>
                    </div>
                </div>
            </div>
            <div className={styles.skillInfoDescription} dangerouslySetInnerHTML={{ __html: description ?? "" }}></div>
        </div>
    );
}

interface VariableType {
    type: string;
    level: number;
}
