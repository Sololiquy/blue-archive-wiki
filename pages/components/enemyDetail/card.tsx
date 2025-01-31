import React, { useContext } from "react";
import styles from "@/styles/enemy list/card.module.css";

import { contextAPI } from "../../_app";

export default function Card({ ID, enemyType, handleEnemyID }: PropType) {
    const { enemyAPI } = useContext(contextAPI) as ContextType;

    const enemyData = enemyAPI?.Raid?.find((enemy) => enemy.Id === ID);
    const arrayIndex: number = enemyAPI?.Raid?.findIndex((enemy) => enemy.Id === ID) || 0;

    const enemyImgURL = `https://schaledb.com/refs/heads/main/images/raid/Boss_Portrait_${enemyData?.PathName}_Lobby.png`;
    const enemyBGImgURL = `https://schaledb.com/refs/heads/main/images/raid/Boss_Portrait_${enemyData?.PathName}_LobbyBG.png`;
    return (
        <>
            <div className={styles.containerCard} onClick={() => handleEnemyID(arrayIndex, enemyType)}>
                <img className={styles.enemyBGImg} src={enemyBGImgURL} alt="" />
                <img className={styles.enemyImg} src={enemyImgURL} alt="" />
            </div>
        </>
    );
}

interface PropType {
    handleEnemyID: (index: number, name: string) => void;
    enemyType: string;
    ID: number;
}

interface Enemy {
    Id: number;
    PathName: string;
}
interface EnemyAPI {
    Raid?: Enemy[];
}
interface ContextType {
    enemyAPI: EnemyAPI;
}
