import { useContext } from "react";

import styles from "@/styles/student detail/tabDescription.module.css";

import { contextDetailStudent } from "../../../studentDetail";

export default function Terrain({ terrainType, terrainValue }: VariableType) {
    const { studentData, tierWeapon } = useContext(contextDetailStudent);
    const terrainImg = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Terrain_${terrainType}.png`;

    let trueTerrainValue = terrainValue;
    if (tierWeapon >= 3) {
        if (terrainType === studentData?.Weapon?.AdaptationType) {
            trueTerrainValue = studentData?.Weapon?.AdaptationValue + terrainValue;
        } else {
            trueTerrainValue = terrainValue;
        }
    }

    const Mood = () => {
        const y: { [key: number]: string } = {
            0: "D",
            1: "C",
            2: "B",
            3: "A",
            4: "S",
            5: "SS",
        };
        const x = y[trueTerrainValue];
        return `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Ingame_Emo_Adaptresult${x}.png`;
    };

    return (
        <>
            <div className={styles.terrainContainer}>
                <img className={styles.terrainImg} src={terrainImg} alt="" />
                <img className={styles.terrainValue} src={Mood()} alt="" />
            </div>
        </>
    );
}

interface VariableType {
    terrainType: string;
    terrainValue: number;
}
