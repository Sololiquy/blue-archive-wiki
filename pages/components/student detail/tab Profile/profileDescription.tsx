import React, { useContext } from "react";
import styles from "@/styles/student detail/tabProfile.module.css";

import { contextDetailStudent } from "../../../studentDetail";

const ProfileDescription = () => {
    const { studentData } = useContext(contextDetailStudent);
    const studentWeaponURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/weapon/${studentData?.WeaponImg}.webp`;
    const studentSchoolURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/schoolicon/School_Icon_${studentData?.School?.toUpperCase()}_W.png`;
    return (
        <>
            <div className={styles.studentName}>
                {studentData?.FamilyName} {studentData?.PersonalName}
            </div>
            <div className={styles.role}>
                <div className={styles.starGrade}>
                    {[...Array(studentData?.StarGrade)].map((_, i) => (
                        <img className={styles.starIMG} key={i} src="/blue-archive-wiki/star.svg" alt="" />
                    ))}
                </div>
            </div>
            <div className={styles.weaponContainer}>
                <img className={styles.weaponIMG} src={studentWeaponURL} alt="" />
                <div className={styles.weaponName}>{studentData?.Weapon?.Name}</div>
            </div>
            <div className={styles.schoolContainer}>
                <img className={styles.schoolIMG} src={studentSchoolURL} alt="" />
                <div className={styles.schoolDescription}>
                    <div className={styles.schoolName}>{studentData?.School}</div>
                    <div className={styles.clubName}>{studentData?.Club}</div>
                </div>
            </div>
            <div className={styles.metadataContainer}>
                <div className={styles.metadataContainer2}>
                    <div className={styles.metadata}>
                        <span className={styles.metadataName}>Birthday</span>
                        <span className={styles.metadataValue}>{studentData?.Birthday}</span>
                    </div>
                    <div className={styles.metadata}>
                        <span className={styles.metadataName}>Age</span>
                        <span className={styles.metadataValue}>{studentData?.CharacterAge}</span>
                    </div>
                    <div className={styles.metadata}>
                        <span className={styles.metadataName}>Height</span>
                        <span className={styles.metadataValue}>{studentData?.CharHeightMetric}</span>
                    </div>
                </div>
                <div className={styles.metadataContainer2}>
                    <div className={styles.metadata}>
                        <span className={styles.metadataName}>CV.</span>
                        <span className={styles.metadataValue}>{studentData?.CharacterVoice}</span>
                    </div>
                    <div className={styles.metadata}>
                        <span className={styles.metadataName}>Design</span>
                        <span className={styles.metadataValue}>{studentData?.Designer}</span>
                    </div>
                    <div className={styles.metadata}>
                        <span className={styles.metadataName}>Illustrator</span>
                        <span className={styles.metadataValue}>{studentData?.Illustrator}</span>
                    </div>
                </div>
            </div>
            <div className={styles.metadata}>
                <span className={styles.metadataName}>Hobbies</span>
                <span className={styles.metadataValue}>{studentData?.Hobby}</span>
            </div>
            <div className={styles.introductionContainer}>{studentData?.ProfileIntroduction}</div>
        </>
    );
};

export default ProfileDescription;
