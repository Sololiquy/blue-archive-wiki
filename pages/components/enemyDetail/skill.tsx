import React from "react";
import styles from "@/styles/enemy list/skill.module.css";

export default function Skill({ data }: SkillProps) {
    const skillSelected = data;
    console.log(skillSelected);

    const iconSkill = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/raid/skill/${skillSelected?.Icon}.png`;

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

                <div className={styles.skillInfoDescription}>{skillSelected?.Desc}</div>
            </div>
        </>
    );
}

interface SkillProps {
    data: {
        Name: string;
        SkillType: string;
        Desc: string;
        Icon: string;
        ATGCost: number;
    };
}
