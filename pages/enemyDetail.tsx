import React, { useContext, useState } from "react";
import Card from "./components/enemyDetail/card";
import Banner from "./components/enemyDetail/banner";
import TabDescription from "./components/enemyDetail/tabDescription";
import styles from "@/styles/enemy list/enemyDetail.module.css";
import { contextAPI } from "./_app";

export default function EnemyDetail() {
    const { enemyAPI } = useContext(contextAPI) as ContextType;

    const [enemy, setEnemy] = useState<[number, string]>([0, "Raid"]);
    const [enemyDifficulty, setEnemyDifficulty] = useState<number>(0);

    const enemyName = enemyAPI?.[enemy[1] as keyof EnemyAPI]?.[enemy[0]]?.Name;

    const handleEnemy = (index: number, name: string) => {
        setEnemy([index, name]);
    };

    console.log(enemyAPI);
    return (
        <>
            <div className={styles.background}></div>
            <div className={styles.contentContainer}>
                <div className={styles.enemyListContainer}>
                    <div className={styles.tab}>enemytype</div>
                    <div className={styles.enemyList}>
                        {enemyAPI?.Raid?.map((enemy) => (
                            <Card key={enemy.Id} ID={enemy.Id} enemyType="Raid" handleEnemyID={handleEnemy} />
                        ))}
                    </div>
                </div>
                <div className={styles.enemyDetailContainer}>
                    <div className={styles.enemyHeader}>{enemyName}</div>
                    <div className={styles.enemyBanner}>
                        <Banner enemyID={enemy} enemyDifficulty={enemyDifficulty} />
                    </div>
                    <div className={styles.difficultyTab}>
                        <TabDescription difficulty="NORMAL" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 0} />
                        <TabDescription difficulty="HARD" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 1} />
                        <TabDescription difficulty="VERY HARD" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 2} />
                        <TabDescription difficulty="HARDCORE" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 3} />
                        <TabDescription difficulty="EXTREME" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 4} />
                        <TabDescription difficulty="INSANE" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 5} />
                        <TabDescription difficulty="TORMENT" setEnemyDifficulty={setEnemyDifficulty} active={enemyDifficulty === 6} />
                    </div>
                    <div className={styles.enemyDetail}></div>
                </div>
            </div>
        </>
    );
}

interface Enemy {
    Id: number;
    PathName: string;
    Name?: string;
}

interface EnemyAPI {
    Raid?: Enemy[];
}
interface ContextType {
    enemyAPI: EnemyAPI;
}
