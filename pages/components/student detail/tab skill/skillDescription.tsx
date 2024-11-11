import React, { useContext } from "react";
import Skill from "./skill";
import styles from "@/styles/student detail/tabSkill.module.css";

import { contextDetailStudent } from "../../../studentDetail";

const SkillDescription = () => {
    const { studentData } = useContext(contextDetailStudent);
    const studentWeaponURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/weapon/${studentData?.WeaponImg}.webp`;

    const squadType = {
        Main: ["strikerRoleColor", "STRIKER"],
        Support: ["specialRoleColor", "SUPPORT"],
    }[studentData?.SquadType as "Main" | "Support"] || ["defaultRoleColor", "DEFAULT"]; // Default fallback

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
            </div>
            <div className={styles.skillContainer}>
                <Skill type={0} />
                <Skill type={1} />
                <Skill type={2} />
                <Skill type={4} />
            </div>
        </>
    );
};

export default SkillDescription;
