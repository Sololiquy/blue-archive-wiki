import React, { useContext } from "react";

import { context } from "../../studentDetail";

import styles from "@/styles/student detail/component.module.css";

interface VariableType {
    typeStat: string;
    nameStat: string;
    Level: number;
}

const Stat = ({ typeStat, nameStat, Level }: VariableType) => {
    const { data } = useContext(context);
    const statIconURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/staticon/Stat_${typeStat}.png`;

    const trueValue = () => {
        if (data && typeStat === "MaxHP") {
            return Math.round(data.MaxHP1 + ((data.MaxHP100 - data.MaxHP1) / 99) * (Level - 1));
        } else if (data && typeStat === "AttackPower") {
            return Math.round(data.AttackPower1 + ((data.AttackPower100 - data?.AttackPower1) / 99) * (Level - 1));
        } else if (data && typeStat === "DefensePower") {
            return Math.round(data.DefensePower1 + ((data.DefensePower100 - data?.DefensePower1) / 99) * (Level - 1));
        } else {
            return data?.[typeStat as keyof typeof data];
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
