import React, { useContext } from "react";
import styles from "@/styles/student detail/tabProfile.module.css";

import { contextDetailStudent } from "../../../layout/studentDetail";
import { contextAPI } from "../../../_app";

export default function ProfileDescription() {
    const { studentData } = useContext(contextDetailStudent);
    const { localizationAPI } = useContext(contextAPI);
    const school = localizationAPI?.SchoolLong[studentData?.School as keyof typeof localizationAPI.SchoolLong];
    const club = localizationAPI?.Club[studentData?.Club as keyof typeof localizationAPI.Club];

    const studentWeaponURL = `https://schaledb.com/images/weapon/${studentData?.WeaponImg}.webp`;
    const studentSchoolURL = `https://schaledb.com/images/schoolicon/${studentData?.School}.png`;

    return (
        <>
            <div className={styles.studentName}>
                {studentData?.FamilyName} {studentData?.PersonalName}
            </div>
            <div className={styles.role}>
                <div className={styles.starGrade}>
                    {[...Array(studentData?.StarGrade)].map((_, i) => (
                        <img className={styles.starIMG} key={i} src="./blue-archive-wiki/star.svg" alt="" />
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
                    <div className={styles.schoolName}>{school}</div>
                    <div className={styles.clubName}>{club}</div>
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
}
