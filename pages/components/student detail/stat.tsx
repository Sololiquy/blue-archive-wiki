import React, { useContext } from "react";

import { contextDetailStudent } from "../../studentDetail";

import styles from "@/styles/student detail/component.module.css";

interface VariableType {
    typeStat: string;
    nameStat: string;
    Level: number;
}

const Stat = ({ typeStat, nameStat, Level }: VariableType) => {
    const { studentData } = useContext(contextDetailStudent);
    const statIconURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/staticon/Stat_${typeStat}.png`;

    const trueValue = () => {
        if (studentData && typeStat === "MaxHP") {
            return Math.round(studentData.MaxHP1 + ((studentData.MaxHP100 - studentData.MaxHP1) / 99) * (Level - 1));
        } else if (studentData && typeStat === "AttackPower") {
            return Math.round(studentData.AttackPower1 + ((studentData.AttackPower100 - studentData?.AttackPower1) / 99) * (Level - 1));
        } else if (studentData && typeStat === "DefensePower") {
            return Math.round(studentData.DefensePower1 + ((studentData.DefensePower100 - studentData?.DefensePower1) / 99) * (Level - 1));
        } else {
            return studentData?.[typeStat as keyof typeof studentData];
        }
    };

    return (
        <>
            <div className={styles.statContainer}>
                <img src={statIconURL} alt="" />
                <span className={styles.name}>{nameStat}</span>
                <span className={styles.value}>{trueValue()}</span>
            </div>
        </>
    );
};

export default Stat;
