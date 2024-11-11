import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/student detail/tabSkill.module.css";

import { contextDetailStudent } from "../../../studentDetail";

const Skill = ({ type }: { type: number }) => {
    const { studentData } = useContext(contextDetailStudent);
    const [skillType, setSkillType] = useState(0);
    useEffect(() => {
        if (studentData?.SquadType === "Main") {
            setSkillType(type + 1);
        } else {
            setSkillType(type);
        }
    });
    const skillImgURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/skill/${studentData?.Skills[skillType]?.Icon}.webp`;
    return (
        <>
            <div className={styles.skillInfoContainer}>
                <div className={styles.skillInfoHeader}>
                    <div className={styles.skillIcon}>
                        <img className={styles.skillIconImg} src={skillImgURL} alt="" />
                        <img className={styles.skillIconBG} src="/stage-tile.svg" alt="" />
                    </div>
                    <div>
                        <div className={styles.skillInfoName}>{studentData?.Skills[skillType]?.Name}</div>
                        <div className={styles.skillInfoType}>{studentData?.Skills[skillType]?.SkillType}</div>
                    </div>
                </div>
                <div className={styles.skillInfoDescription}>{studentData?.Skills[skillType]?.Desc}</div>
                <div className={styles.skillInfoStat}>{type === 0 && <div className={styles.skillInfoStatCost}>{`${studentData?.Skills[skillType]?.Cost?.[0] || "N/A"} COST`}</div>}</div>
            </div>
        </>
    );
};

export default Skill;
