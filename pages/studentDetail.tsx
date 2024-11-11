import { useRouter } from "next/router";
import React, { useContext, createContext, useState } from "react";

import StatDescription from "./components/student detail/tab description/statDescription";
import SkillDescription from "./components/student detail/tab skill/skillDescription";
import ProfileDescription from "./components/student detail/tab Profile/profileDescription";
import Tab from "./components/student detail/tab";

import styles from "@/styles/student detail/studentDetail.module.css";

import { contextAPI } from "./_app";

interface ContextType {
    studentData: VariableType | null;
}

interface VariableType {
    BulletType: string;
    ArmorType: string;
    SquadType: string;
    Equipment: string;
    Id: number;
    CollectionBG: string;
    WeaponImg: string;
    Weapon: {
        Name: string;
    };
    Skills: {
        [key: number]: {
            Icon: string;
            Name: string;
            SkillType: number;
            Desc: string;
            Cost: number[];
        };
    };
    Club: string;
    School: string;
    TacticRole: string;
    Name: string;
    FamilyName: string;
    PersonalName: string;
    StarGrade: number;
    StreetBattleAdaptation: string;
    OutdoorBattleAdaptation: string;
    IndoorBattleAdaptation: string;
    MaxHP1: number;
    MaxHP100: number;
    AttackPower1: number;
    AttackPower100: number;
    DefensePower1: number;
    DefensePower100: number;
    Birthday: string;
    CharacterAge: number;
    CharHeightMetric: number;
    Hobby: string;
    CharacterVoice: string;
    Designer: string;
    Illustrator: string;
    ProfileIntroduction: string;
}

export const contextDetailStudent = createContext<ContextType>({
    studentData: null,
});

const StudentDetail = () => {
    const { query } = useRouter();
    const ID = Number(query.id);
    const [tabIndex, setTabIndex] = useState(1);
    const { studentDefaultDataAPI } = useContext(contextAPI);
    const studentData = studentDefaultDataAPI?.find((student) => student.Id === ID);
    if (!studentData) {
        return <div>Student not found</div>;
    }

    const handleTabClick = (index: number) => {
        setTabIndex(index);
    };

    const studentSpriteURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/portrait/${studentData.Id}.webp`;
    const backgroundURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/background/${studentData.CollectionBG}.jpg`;

    return (
        <>
            <div className={styles.background}>
                <img className={styles.backgroundImg} src={backgroundURL} alt="Background" />
            </div>
            <div className={styles.container}>
                <div className={styles.characterSpriteContainer}>
                    <img src={studentSpriteURL} alt="Student" />
                </div>
                <div className={styles.descriptionContainer}>
                    <div className={styles.tabDescriptionContainer}>
                        <Tab onClick={() => handleTabClick(1)} active={tabIndex === 1} label="1" />
                        <Tab onClick={() => handleTabClick(2)} active={tabIndex === 2} label="2" />
                        <Tab onClick={() => handleTabClick(3)} active={tabIndex === 3} label="3" />
                    </div>
                    <div className={styles.contentDescriptionContainer}>
                        <contextDetailStudent.Provider value={{ studentData: studentData as unknown as VariableType }}>
                            {tabIndex === 1 && <StatDescription />}
                            {tabIndex === 2 && <SkillDescription />}
                            {tabIndex === 3 && <ProfileDescription />}
                        </contextDetailStudent.Provider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDetail;
