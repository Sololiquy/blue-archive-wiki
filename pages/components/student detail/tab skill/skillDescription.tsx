import React, { ChangeEvent, useContext, useState } from "react";
import Skill from "./skill";

import styles from "@/styles/student detail/tabSkill.module.css";

import { contextDetailStudent } from "../../../studentDetail";

export default function SkillDescription({ onTierWeaponChange }: PropType) {
    const { studentData, tierWeapon } = useContext(contextDetailStudent);
    const [exSkillLevel, setExSkillLevel] = useState(1);
    const [skillLevel, setSkillLevel] = useState(1);
    const studentWeaponURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/weapon/${studentData?.WeaponImg}.webp`;

    const passive = tierWeapon >= 2 ? "weaponpassive" : "passive";

    const squadType = {
        Main: ["strikerRoleColor", "STRIKER"],
        Support: ["specialRoleColor", "SUPPORT"],
    }[studentData?.SquadType as "Main" | "Support"] || ["defaultRoleColor", "DEFAULT"];

    const handleExSkillLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setExSkillLevel(parseInt(e.target.value));
    };
    const handleSkillLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSkillLevel(parseInt(e.target.value));
    };

    return (
        <>
            <div className={styles.studentName}>{studentData?.Name}</div>
            <div className={styles.role}>
                <div className={styles.starGrade}>
                    {[...Array(studentData?.StarGrade)].map((_, i) => (
                        <img className={styles.starIMG} key={i} src="/blue-archive-wiki/star.svg" alt="" />
                    ))}
                </div>
                <div className={`${styles.typeSquad} ${squadType[0]}`}>{squadType[1]}</div>
            </div>
            <div className={styles.weaponContainer}>
                <img className={styles.weaponIMG} src={studentWeaponURL} alt="" />
                <div className={styles.levelWeaponContainer}>
                    <div className={`${styles.tierWeaponContainer} ${tierWeapon >= 1 ? styles.tierWeaponContainerActived : ""}`} onClick={() => onTierWeaponChange(1)}>
                        UE1
                    </div>
                    <div className={`${styles.tierWeaponContainer} ${tierWeapon >= 2 ? styles.tierWeaponContainerActived : ""}`} onClick={() => onTierWeaponChange(2)}>
                        UE2
                    </div>
                    <div className={`${styles.tierWeaponContainer} ${tierWeapon >= 3 ? styles.tierWeaponContainerActived : ""}`} onClick={() => onTierWeaponChange(3)}>
                        UE3
                    </div>
                </div>
            </div>
            <div className={styles.skillContainer}>
                <Skill type="ex" level={exSkillLevel} />
                <input type="range" value={exSkillLevel} min="1" max="5" onChange={handleExSkillLevelChange} />
                <span>{exSkillLevel}</span>
                <Skill type="normal" level={skillLevel} />
                <Skill type={passive} level={skillLevel} />
                <Skill type="sub" level={skillLevel} />
                <input type="range" value={skillLevel} min="1" max="10" onChange={handleSkillLevelChange} />
                <span>{skillLevel}</span>
            </div>
        </>
    );
}

interface PropType {
    onTierWeaponChange: (index: number) => void;
}
