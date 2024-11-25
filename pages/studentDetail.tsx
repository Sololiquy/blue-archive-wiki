import { useRouter } from "next/router";
import React, { useContext, createContext, useState } from "react";
import StatDescription from "./components/student detail/tab description/statDescription";
import SkillDescription from "./components/student detail/tab skill/skillDescription";
import ProfileDescription from "./components/student detail/tab Profile/profileDescription";
import VoiceDescription from "./components/student detail/tab voice/voiceDescription";
import Tab from "./components/student detail/tab";
import styles from "@/styles/student detail/studentDetail.module.css";
import { contextAPI } from "./_app";

interface VoiceData {
    Group: string;
    Transcription: string;
    AudioClip: string;
}

interface StudentVoiceData {
    Battle: VoiceData[];
    Event: VoiceData[];
    Lobby: VoiceData[];
    Normal: VoiceData[];
}

interface ContextType {
    studentData: VariableType | null;
    studentvoiceData: StudentVoiceData | null;
    tierWeapon: number;
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
        MaxHP1: number;
        MaxHP100: number;
        AttackPower1: number;
        AttackPower100: number;
        HealPower1: number;
        HealPower100: number;
        AdaptationValue: number;
        AdaptationType: string;
    };
    Skills: {
        Icon: string;
        Name: string;
        SkillType: string;
        Desc: string;
        Cost?: number[];
        Parameters: string[];
    }[];
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
    HealPower1: number;
    HealPower100: number;
    Birthday: string;
    CharacterAge: number;
    CharHeightMetric: number;
    Hobby: string;
    CharacterVoice: string;
    Designer: string;
    Illustrator: string;
    ProfileIntroduction: string;
    Battle: string[];
    Event: string[];
    Lobby: string[];
    Normal: string[];
}

export const contextDetailStudent = createContext<ContextType>({
    studentData: null,
    studentvoiceData: null,
    tierWeapon: 0,
});

const StudentDetail = () => {
    const { query } = useRouter();
    const ID = Number(query.id);
    const [tabIndex, setTabIndex] = useState(1);
    const [tierWeapon, setTierWeapon] = useState(0);
    const { studentDefaultDataAPI, voiceDataAPI } = useContext(contextAPI);
    const studentData = studentDefaultDataAPI?.find((student) => student.Id === ID);
    const studentvoiceData = voiceDataAPI ? (voiceDataAPI[ID] as unknown as StudentVoiceData | null) : null;

    if (!studentData) {
        return <div>Student not found</div>;
    }

    const handleTabClick = (index: number) => {
        setTabIndex(index);
    };
    const handleTierWeaponChange = (index: number) => {
        setTierWeapon(index);
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
                        <Tab onClick={() => handleTabClick(1)} active={tabIndex === 1} label="Stat" />
                        <Tab onClick={() => handleTabClick(2)} active={tabIndex === 2} label="Skill" />
                        <Tab onClick={() => handleTabClick(3)} active={tabIndex === 3} label="Profile" />
                        <Tab onClick={() => handleTabClick(4)} active={tabIndex === 4} label="Voice" />
                    </div>

                    <div className={styles.contentDescriptionContainerScroll}>
                        <div className={styles.contentDescriptionContainer}>
                            <contextDetailStudent.Provider value={{ studentData: studentData as unknown as VariableType, studentvoiceData, tierWeapon }}>
                                {tabIndex === 1 && <StatDescription onTierWeaponChange={handleTierWeaponChange} />}
                                {tabIndex === 2 && <SkillDescription onTierWeaponChange={handleTierWeaponChange} />}
                                {tabIndex === 3 && <ProfileDescription />}
                                {tabIndex === 4 && <VoiceDescription />}
                            </contextDetailStudent.Provider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDetail;
