import styles from "@/styles/student detail/tabDescription.module.css";
import Stat from "./stat";
import Terrain from "./terrain";
import Equipment from "./equipment";
import EquipmentGear from "./equipmentGear";

import { contextDetailStudent } from "../../../studentDetail";

import React, { useContext, useState } from "react";

const StatDescription = ({}) => {
    const { studentData } = useContext(contextDetailStudent);
    const [level, setLevel] = useState(1);
    const [levelEquipment1, setLevelEquipment1] = useState(1);
    const [levelEquipment2, setLevelEquipment2] = useState(1);
    const [levelEquipment3, setLevelEquipment3] = useState(1);
    const [levelEquipmentGear, setLevelEquipmentGear] = useState(0);

    console.log(studentData);
    if (!studentData) return <div>Loading...</div>;

    const studentWeaponURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/weapon/${studentData?.WeaponImg}.webp`;
    const roleStudentURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Role_${studentData?.TacticRole}.png`;
    const attackTypeURL = "https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Type_Attack.png";
    const defenseTypeURL = "https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/ui/Type_Defense.png";

    const attackType = {
        Explosion: "explosiveAttackColor",
        Pierce: "piercingAttackColor",
        Mystic: "mysticAttackColor",
        Sonic: "sonicAttackColor",
    }[studentData?.BulletType as "Explosion" | "Pierce" | "Mystic" | "Sonic"];

    const defenseType = {
        LightArmor: "lightArmorColor",
        HeavyArmor: "heavyArmorColor",
        Unarmed: "specialArmorColor",
        ElasticArmor: "elasticArmorColor",
    }[studentData?.ArmorType as "LightArmor" | "HeavyArmor" | "Unarmed" | "ElasticArmor"];

    const squadType = {
        Main: ["strikerRoleColor", "STRIKER"],
        Support: ["specialRoleColor", "SUPPORT"],
    }[studentData?.SquadType as "Main" | "Support"];

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevel(parseInt(e.target.value));
    };

    return (
        <>
            <div className={styles.studentName}>{studentData?.Name}</div>
            <div className={styles.role}>
                <div className={styles.starGrade}>
                    {[...Array(studentData?.StarGrade)].map((_, i) => (
                        <img className={styles.starIMG} key={i} src="/star.svg" alt="" />
                    ))}
                </div>
                <div className={`${styles.typeSquad} ${squadType[0]}`}>{squadType[1]}</div>
            </div>
            <div className={styles.weaponContainer}>
                <img className={styles.weaponIMG} src={studentWeaponURL} alt="" />
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
                <Terrain terrainType="Street" terrainValue={Number(studentData?.StreetBattleAdaptation) ?? 0} />
                <Terrain terrainType="Outdoor" terrainValue={Number(studentData?.OutdoorBattleAdaptation) ?? 0} />
                <Terrain terrainType="Indoor" terrainValue={Number(studentData?.IndoorBattleAdaptation) ?? 0} />
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
                <div className={styles.studentEquipment}>
                    <Equipment typeEquipment={0} levelEquipment={levelEquipment1} setLevelEquipment={setLevelEquipment1} />
                    <Equipment typeEquipment={1} levelEquipment={levelEquipment2} setLevelEquipment={setLevelEquipment2} />
                    <Equipment typeEquipment={2} levelEquipment={levelEquipment3} setLevelEquipment={setLevelEquipment3} />
                    <div className={styles.separator}>
                        <hr className="w-full" />
                    </div>
                    <EquipmentGear levelEquipmentGear={levelEquipmentGear} setLevelEquipmentGear={setLevelEquipmentGear} />
                </div>
            </div>
            <input type="range" value={level} min="1" max="100" onChange={handleLevelChange} />
            <div>{level}</div>
        </>
    );
};

export default StatDescription;
