import React, { useContext } from "react";
import styles from "@/styles/enemy list/skill.module.css";
import { contextAPI } from "../../_app";

export default function Skill({ data, difficulty }: SkillProps) {
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
                <div className={styles.skillContainer}>
                    <div className={styles.skillInfoHeader}>
                        <div className={styles.skillIcon}>
                            <img className={styles.skillIconImg} src={iconSkill} alt="" />
                        </div>
                        <div>
                            <div className={styles.skillInfoName}>{skillSelected?.Name}</div>
                            <div className={styles.skillInfoStat}>
                                {skillSelected?.ATGCost > 0 && <div className={styles.skillInfoATGCost}>{skillSelected?.ATGCost}</div>}
                                <div className={styles.skillInfoType}>{skillSelected?.SkillType}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.skillInfoDescription} dangerouslySetInnerHTML={{ __html: description ?? "" }}></div>
                </div>
            </>
        );
    }
}

interface SkillProps {
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
