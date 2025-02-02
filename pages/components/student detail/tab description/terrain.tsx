import { useContext } from "react";

import styles from "@/styles/student detail/tabDescription.module.css";

import { contextDetailStudent } from "../../../layout/studentDetail/[id]";

export default function Terrain({ terrainType, terrainValue }: VariableType) {
    const { studentData, tierWeapon } = useContext(contextDetailStudent);
    const terrainImg = `https://schaledb.com/images/ui/Terrain_${terrainType}.png`;

    let trueTerrainValue = terrainValue;
    if (tierWeapon >= 3) {
        if (terrainType === studentData?.Weapon?.AdaptationType) {
            trueTerrainValue = studentData?.Weapon?.AdaptationValue + terrainValue;
        } else {
            trueTerrainValue = terrainValue;
        }
    }

    const Mood = `https://schaledb.com/images/ui/Adaptresult${trueTerrainValue}.png`;

    return (
        <>
            <div className={styles.terrainContainer}>
                <img className={styles.terrainImg} src={terrainImg} alt="" />
                <img className={styles.terrainValue} src={Mood} alt="" />
            </div>
        </>
    );
}

interface VariableType {
    terrainType: string;
    terrainValue: number;
}
