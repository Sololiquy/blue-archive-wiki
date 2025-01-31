import React, { useContext } from "react";
import styles from "@/styles/enemy list/banner.module.css";

import { contextAPI } from "../../_app";

export default function Banner({ enemyID, enemyDifficulty }: PropType) {
    const { enemyAPI } = useContext(contextAPI) as ContextType;

    const enemyData = enemyAPI?.Raid ? enemyAPI.Raid[enemyID[0]] : null;

    const enemyImgURL = `https://schaledb.com/refs/heads/main/images/raid/Boss_Portrait_${enemyData?.PathName}_${enemyDifficulty >= 5 ? "Insane_" : ""}Lobby.png`;
    const enemyBGImgURL = `https://schaledb.com/refs/heads/main/images/raid/Boss_Portrait_${enemyData?.PathName}_LobbyBG.png`;

    return (
        <>
            <img className={styles.enemyBGImg} src={enemyBGImgURL} alt="" />
            <img className={styles.enemyImg} src={enemyImgURL} alt="" />
        </>
    );
}

interface PropType {
    enemyID: [number, string];
    enemyDifficulty: number;
}

interface Enemy {
    PathName: string;
}
interface EnemyAPI {
    Raid?: Enemy[];
}
interface ContextType {
    enemyAPI: EnemyAPI;
}
