import styles from "@/styles/student detail/statDescription.module.css";
import Stat from "./stat";
import Terrain from "./terrain";

import { context } from "../../studentDetail";

import React, { useContext, useState } from "react";

const StatDescription = ({}) => {
    const { data } = useContext(context);
    const [level, setLevel] = useState(1);

    if (!data) return <div>Loading...</div>;

    const studentWeaponURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/weapon/${data?.WeaponImg}.webp`;
    const roleStudentURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Role_${data?.TacticRole}.png`;
    const attackTypeURL = "https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Type_Attack.png";
    const defenseTypeURL = "https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Type_Defense.png";

    const attackType = {
        Explosion: "explosiveAttackColor",
        Pierce: "piercingAttackColor",
        Mystic: "mysticAttackColor",
        Sonic: "sonicAttackColor",
    }[data?.BulletType as "Explosion" | "Pierce" | "Mystic" | "Sonic"];

    const defenseType = {
        LightArmor: "lightArmorColor",
        HeavyArmor: "heavyArmorColor",
        Unarmed: "specialArmorColor",
        ElasticArmor: "elasticArmorColor",
    }[data?.ArmorType as "LightArmor" | "HeavyArmor" | "Unarmed" | "ElasticArmor"];

    const squadType = {
        Main: ["strikerRoleColor", "STRIKER"],
        Support: ["specialRoleColor", "SUPPORT"],
    }[data?.SquadType as "Main" | "Support"];

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(parseInt(e.target.value));
    };

    return (
        <>
            <div className={styles.studentName}>{data?.Name}</div>
            <div className={styles.role}>
                <div className={styles.starGrade}>
                    {[...Array(data?.StarGrade)].map((_, i) => (
                        <img className={styles.starIMG} key={i} src="/blue-archive-wiki/star.svg" alt="" />
                    ))}
                </div>
                <div className={`${styles.typeSquad} ${squadType[0]}`}>{squadType[1]}</div>
            </div>
            <div className={styles.container2}>
                <img src={studentWeaponURL} alt="" />
            </div>
            <div className={styles.container3}>
                <div className={styles.roundedContainer}>
                    <img src={roleStudentURL} alt="" />
                </div>
                <div className={`${styles.roundedContainer} ${attackType}`}>
                    <img className={styles.attackTypeImg} src={attackTypeURL} alt="" />
                </div>
                <div className={`${styles.roundedContainer} ${defenseType}`}>
                    <img className={styles.defenseTypeImg} src={defenseTypeURL} alt="" />
                </div>{" "}
                <Terrain terrainType="Street" terrainValue={Number(data?.StreetBattleAdaptation) ?? 0} />
                <Terrain terrainType="Outdoor" terrainValue={Number(data?.OutdoorBattleAdaptation) ?? 0} />
                <Terrain terrainType="Indoor" terrainValue={Number(data?.IndoorBattleAdaptation) ?? 0} />
            </div>
            <div className={styles.container4}>
                <div className={styles.studentStat}>
                    <Stat typeStat="MaxHP" nameStat="Max HP" Level={level} />
                    <Stat typeStat="AttackPower" nameStat="Attack" Level={level} />
                    <Stat typeStat="DefensePower" nameStat="Defense" Level={level} />
                    <Stat typeStat="DodgePoint" nameStat="Evasion" Level={level} />
                    <Stat typeStat="CriticalPoint" nameStat="Crit Rate" Level={level} />
                    <Stat typeStat="CriticalDamageRate" nameStat="Crit Dmg" Level={level} />
                </div>
                <div className={styles.studentSkill}>a</div>
            </div>
            <input type="range" value={level} min="1" max="100" onChange={handleLevelChange} />
            <div>{level}</div>
        </>
    );
};

export default StatDescription;
