import React, { useContext } from "react";

import { contextDetailStudent } from "../../../studentDetail";

import styles from "@/styles/student detail/tabDescription.module.css";

export default function Stat({ typeStat, nameStat, Level, levelWeapon, equipment }: PropType) {
    const { studentData } = useContext(contextDetailStudent);

    // STUDENT VALUE CALCULATION
    let value = 0;
    if (studentData) {
        if (typeStat === "MaxHP") {
            value = Math.round(studentData.MaxHP1 + ((studentData.MaxHP100 - studentData.MaxHP1) / 99) * (Level - 1));
        } else if (typeStat === "AttackPower") {
            value = Math.round(studentData.AttackPower1 + ((studentData.AttackPower100 - studentData.AttackPower1) / 99) * (Level - 1));
        } else if (typeStat === "DefensePower") {
            value = Math.round(studentData.DefensePower1 + ((studentData.DefensePower100 - studentData.DefensePower1) / 99) * (Level - 1));
        } else if (typeStat === "HealPower") {
            value = Math.round(studentData.HealPower1 + ((studentData.HealPower100 - studentData.HealPower1) / 99) * (Level - 1));
        } else {
            value = Number(studentData[typeStat as keyof typeof studentData]);
        }
    }

    // WEAPONS VALUE CALCULATION
    let weaponValue = 0;
    if (studentData) {
        if (typeStat === "MaxHP") {
            weaponValue = Math.round(studentData.Weapon.MaxHP1 + ((studentData.Weapon.MaxHP100 - studentData.Weapon.MaxHP1) / 49) * (levelWeapon - 1));
        } else if (typeStat === "AttackPower") {
            weaponValue = Math.round(studentData.Weapon.AttackPower1 + ((studentData.Weapon.AttackPower100 - studentData.Weapon.AttackPower1) / 49) * (levelWeapon - 1));
        } else if (typeStat === "HealPower") {
            weaponValue = Math.round(studentData.Weapon.HealPower1 + ((studentData.Weapon.HealPower100 - studentData.Weapon.HealPower1) / 49) * (levelWeapon - 1));
        } else {
            weaponValue = 0;
        }
    }

    // EQUIPMENT VALUE CALCULATION
    let equipmentTotalValue = 0;

    for (let a = 0; a < 3; a++) {
        if (equipment && equipment[a]) {
            const equip = equipment[a] as { StatType: string[]; StatValue: number[][] } | null;

            if (equip) {
                for (let b = 0; b < equip.StatType.length; b++) {
                    const statInfo = equip.StatType[b]?.split("_") || [];
                    const stat = statInfo[0];
                    const calculation = statInfo[1];

                    if (typeStat === stat) {
                        const equipmentValue = equip.StatValue[b]?.[0] || 0;
                        let equipmentTrueValue = 0;

                        if (calculation === "Coefficient") {
                            equipmentTrueValue = (equipmentValue / 10000) * value;
                        } else if (calculation === "Base") {
                            equipmentTrueValue = equipmentValue;
                        }

                        equipmentTotalValue += equipmentTrueValue;
                    }
                }
            }
        }
    }

    const equipmentBonus = Math.round((equipmentTotalValue + Number.EPSILON) * 10) / 10;

    const statIconURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/staticon/Stat_${typeStat}.png`;

    return (
        <div className={styles.statContainer}>
            <img src={statIconURL} alt="" />
            <span className={styles.name}>{nameStat}</span>
            <span className={styles.value}>{Math.round(value + equipmentBonus + weaponValue)}</span>
        </div>
    );
}

interface PropType {
    typeStat: string;
    nameStat: string;
    Level: number;
    levelWeapon: number;
    equipment: (unknown | null)[];
}
