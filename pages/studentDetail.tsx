import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";

import StatDescription from "./components/student detail/statDescription";

import styles from "@/styles/student detail/studentDetail.module.css";

interface ContextType {
    data: VariableType | null;
    setData: Dispatch<SetStateAction<VariableType | null>>;
}
interface VariableType {
    Name: string;
    StarGrade: string;
    Id: number;
    CollectionBG: string;
    WeaponImg: string;
    TacticRole: string;
    BulletType: string;
    ArmorType: string;
    SquadType: string;
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

export const context = createContext<ContextType>({
    data: null,
    setData: () => {},
});

const apiURL = "https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/data/en/students.json";

const StudentDetail = () => {
    const searchParams = useSearchParams();
    const ID = searchParams.get("id");
    const [data, setData] = useState<VariableType | null>(null);

    useEffect(() => {
        const getAPI = async () => {
            const data = await (await fetch(apiURL)).json();
            setData(data.find((x: VariableType) => x.Id === parseInt(ID !== null ? ID : "")));
        };
        if (ID) {
            getAPI();
        }
    }, [ID]);

    if (!data) {
        return <div>Loading...</div>;
    }

    console.log(data);
    const studentSpriteURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/portrait/${data.Id}.webp`;
    const backgroundURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/background/${data.CollectionBG}.jpg`;

    return (
        <>
            <div className={styles.background}>
                <img className={styles.backgroundImg} src={backgroundURL} alt="" />
            </div>
            <div className={styles.container}>
                <div className={styles.characterSpriteContainer}>
                    <img src={studentSpriteURL} alt="" />
                </div>
                <div className={styles.descriptionContainer}>
                    <context.Provider value={{ data, setData }}>
                        <StatDescription />
                    </context.Provider>
                </div>
            </div>
        </>
    );
};

export default StudentDetail;
