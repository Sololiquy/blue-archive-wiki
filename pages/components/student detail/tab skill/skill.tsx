import React, { useContext } from "react";
import styles from "@/styles/student detail/tabSkill.module.css";
import { contextDetailStudent } from "../../../studentDetail";

interface VariableType {
    type: string;
    level: number;
}

const Skill = ({ type, level }: VariableType) => {
    const { studentData } = useContext(contextDetailStudent);

    // REGEX for description------------------------------------------------------------------------------------------
    const Skill = studentData?.Skills.find((skill) => skill.SkillType === type);
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
    // const styleFont = "font-weight: bold; margin-left:2px";

    const formattedDesc = Skill?.Desc?.replace(/<\?1>/g, `<span class="${attackType[0]}" style="font-weight: bold">${parameter1}</span>`)
        .replace(/<\?2>/g, `<span class="${attackType[0]}" style="font-weight: bold">${parameter2}</span>`)
        .replace(/<\?3>/g, `<span class="${attackType[0]}" style="font-weight: bold">${parameter3}</span>`)
        .replace(/<(\w+):(\w+)>/g, (_, effect, typeEffect) => {
            const effects = effect === "b" ? "Buff" : effect === "d" ? "Debuff" : effect === "c" ? "CC" : effect === "s" ? "Special" : "";
            const iconEffects = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/buff/${effects}_${typeEffect}.webp`;
            return `<img src="${iconEffects}" alt="${effects} ${typeEffect}" style="${styleIcon}" />`;
        });

    //-----------------------------------------------------------------------------------------------------

    const skillImgURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/skill/${Skill?.Icon}.webp`;

    return (
        <>
            <div className={styles.skillInfoContainer}>
                <div className={styles.skillInfoHeader}>
                    <div className={styles.skillIcon}>
                        <img className={styles.skillIconImg} src={skillImgURL} alt="" />
                        <img className={styles.skillIconBG} src={`/blue-archive-wiki/bg-icon_${attackType[1]}.svg`} alt="" />
                    </div>
                    <div>
                        <div className={styles.skillInfoName}>{Skill?.Name}</div>
                        <div className={styles.skillInfoType}>{Skill?.SkillType}</div>
                    </div>
                </div>
                <div className={styles.skillInfoDescription} dangerouslySetInnerHTML={{ __html: formattedDesc ?? "" }}></div>{" "}
                <div className={styles.skillInfoStat}>{type === "ex" && <div className={styles.skillInfoStatCost}>{`${Skill?.Cost?.[level - 1] || "N/A"} COST`}</div>}</div>
            </div>
        </>
    );
};

export default Skill;
