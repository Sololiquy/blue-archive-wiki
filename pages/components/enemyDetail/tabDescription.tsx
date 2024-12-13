import React, { Dispatch, SetStateAction } from "react";
import styles from "@/styles/enemy list/tabDescription.module.css";

export default function tabDescription({ difficulty, active, setEnemyDifficulty }: PropType) {
    const handleDifficultyChange = (x: number) => {
        setEnemyDifficulty(x);
    };

    let difficultyScale = 0;
    if (difficulty === "NORMAL") {
        difficultyScale = 0;
    } else if (difficulty === "HARD") {
        difficultyScale = 1;
    } else if (difficulty === "VERY HARD") {
        difficultyScale = 2;
    } else if (difficulty === "HARDCORE") {
        difficultyScale = 3;
    } else if (difficulty === "EXTREME") {
        difficultyScale = 4;
    } else if (difficulty === "INSANE") {
        difficultyScale = 5;
    } else if (difficulty === "TORMENT") {
        difficultyScale = 6;
    }

    return (
        <>
            <div className={`${styles.difficultyContainer} ${active ? styles.difficultyContainerActived : ""}`} onClick={() => handleDifficultyChange(difficultyScale)}>
                <div>{difficulty}</div>
            </div>
        </>
    );
}

interface PropType {
    difficulty: string;
    active: boolean;
    setEnemyDifficulty: Dispatch<SetStateAction<number>>;
}
