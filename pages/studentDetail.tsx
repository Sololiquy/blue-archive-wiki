import { useRouter } from "next/router";
import React, { useContext, createContext } from "react";
import StatDescription from "./components/student detail/statDescription";
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
    TacticRole: string;
    Name: string;
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
}

export const contextDetailStudent = createContext<ContextType>({
    studentData: null,
});

const StudentDetail = () => {
    const { query } = useRouter();
    const ID = Number(query.id);
    const { studentDefaultDataAPI } = useContext(contextAPI);
    const studentData = studentDefaultDataAPI?.find((student) => student.Id === ID);

    if (!studentData) {
        return <div>Student not found</div>;
    }

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
                    <contextDetailStudent.Provider value={{ studentData: studentData as unknown as VariableType }}>
                        <StatDescription />
                    </contextDetailStudent.Provider>
                </div>
            </div>
        </>
    );
};

export default StudentDetail;
