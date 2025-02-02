import React, { useContext } from "react";

import { contextDetailStudent } from "../../../studentDetail";

import styles from "@/styles/student detail/tabDescription.module.css";

export default function Stat({ typeStat, nameStat, Level, levelWeapon }: PropType) {
    const { studentData, equipments, levelEquipment, bondRank } = useContext(contextDetailStudent);

    // STUDENT VALUE CALCULATION
    let value = 0;
    if (studentData) {
        if (typeStat === "MaxHP") {
            value = Math.round(studentData?.MaxHP1 + ((studentData?.MaxHP100 - studentData?.MaxHP1) / 99) * (Level - 1));
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
        if (equipments && equipments[a]) {
            const equip = equipments[a] as { StatType: string[]; StatValue: number[][] } | null;

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

    if (studentData?.Gear?.Released && levelEquipment[3] >= 1) {
        for (let a = 0; a < studentData?.Gear?.StatType.length; a++) {
            const statInfo = studentData?.Gear?.StatType[a]?.split("_") || [];
            const stat = statInfo[0];
            const calculation = statInfo[1];
            if (typeStat === stat) {
                const equipmentValue = studentData?.Gear?.StatValue[a][0] || 0;
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

    // BOND VALUE CALCULATION
    if (studentData?.FavorStatType) {
        for (let a = 0; a < studentData?.FavorStatType.length; a++) {
            if (typeStat === studentData?.FavorStatType[a]) {
                let equipmentTrueValue = 0;
                if (bondRank >= 1 && bondRank <= 5) {
                    equipmentTrueValue += (bondRank - 1) * studentData?.FavorStatValue[0][a];
                } else if (bondRank >= 11 && bondRank <= 15) {
                    equipmentTrueValue += 4 * studentData?.FavorStatValue[0][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[1][a];
                    equipmentTrueValue += (bondRank - 10) * studentData?.FavorStatValue[2][a];
                } else if (bondRank >= 16 && bondRank <= 20) {
                    equipmentTrueValue += 4 * studentData?.FavorStatValue[0][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[1][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[2][a];
                    equipmentTrueValue += (bondRank - 15) * studentData?.FavorStatValue[3][a];
                } else if (bondRank >= 21 && bondRank <= 30) {
                    equipmentTrueValue += 4 * studentData?.FavorStatValue[0][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[1][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[2][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[3][a];
                    equipmentTrueValue += (bondRank - 20) * studentData?.FavorStatValue[4][a];
                } else if (bondRank >= 31 && bondRank <= 40) {
                    equipmentTrueValue += 4 * studentData?.FavorStatValue[0][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[1][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[2][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[3][a];
                    equipmentTrueValue += 10 * studentData?.FavorStatValue[4][a];
                    equipmentTrueValue += (bondRank - 30) * studentData?.FavorStatValue[5][a];
                } else if (bondRank >= 41 && bondRank <= 50) {
                    equipmentTrueValue += 4 * studentData?.FavorStatValue[0][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[1][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[2][a];
                    equipmentTrueValue += 5 * studentData?.FavorStatValue[3][a];
                    equipmentTrueValue += 10 * studentData?.FavorStatValue[4][a];
                    equipmentTrueValue += 10 * studentData?.FavorStatValue[5][a];
                    equipmentTrueValue += (bondRank - 40) * studentData?.FavorStatValue[6][a];
                }
                equipmentTotalValue += equipmentTrueValue;
            }
        }
    }

    // Tier Student Stat up?

    const equipmentBonus = Math.round((equipmentTotalValue + Number.EPSILON) * 10) / 10;

    const statIconURL = `https://schaledb.com/images/staticon/Stat_${typeStat}.png`;

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
