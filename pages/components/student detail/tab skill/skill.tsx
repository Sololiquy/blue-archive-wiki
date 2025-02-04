import React, { useContext } from "react";
import styles from "@/styles/student detail/tabSkill.module.css";
import { contextDetailStudent } from "../../../studentDetail";
import { contextAPI } from "../../../_app";

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
            <div className={styles.skillInfoContainer}>
                <div className={styles.skillInfoHeader}>
                    <div className={styles.skillIcon}>
                        <img className={styles.skillIconImg} src={skillImgURL} alt="" />
                        <img className={styles.skillIconBG} src={`/blue-archive-wiki/bg-Icon_${attackType[1]}.svg`} alt="" />
                    </div>
                    <div>
                        <div className={styles.skillInfoName}>{studentData?.Skills[type]?.Name}</div>
                        <div className={styles.skillInfoStat}>
                            {type === "Ex" && <div className={styles.skillInfoStatCost}>{`${studentData?.Skills[type]?.Cost?.[level - 1] || "0"} COST`}</div>}
                            <div className={styles.skillInfoType}>{type === "Ex" ? "Ex Skill" : type}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.skillInfoDescription} dangerouslySetInnerHTML={{ __html: description ?? "" }}></div>
            </div>
            {Array.from({ length: studentData?.Skills?.[type]?.ExtraSkills?.length }, (_, i) => (
                <div className={styles.skillInfoContainer} key={i}>
                    <div className={styles.skillInfoHeader}>
                        <div className="h-[80%] w-1 bg-white ml-2"></div>
                        <div className={styles.skillIcon}>
                            <img className={styles.skillIconImg} src={extraSkillImgURL[i]} alt="" />
                            <img className={styles.skillIconBG} src={`/blue-archive-wiki/bg-Icon_${attackType[1]}.svg`} alt="" />
                        </div>
                        <div>
                            <div className={styles.skillInfoName}>{studentData?.Skills?.[type]?.ExtraSkills[i]?.Name}</div>
                            <div className={styles.skillInfoStat}>
                                {type === "Ex" && <div className={styles.skillInfoStatCost}>{`${studentData?.Skills?.[type]?.ExtraSkills[i]?.Cost?.[level - 1] || "0"} COST`}</div>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.skillInfoDescription} dangerouslySetInnerHTML={{ __html: extraDescription[i] ?? "" }}></div>
                </div>
            ))}
        </>
    );
}

interface parameterType {
    type: string;
    level: number;
}
