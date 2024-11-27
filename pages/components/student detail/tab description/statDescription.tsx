import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Stat from "./stat";
import Terrain from "./terrain";
import Equipment from "./equipment";
import EquipmentGear from "./equipmentGear";

import styles from "@/styles/student detail/tabDescription.module.css";

import { contextDetailStudent } from "../../../studentDetail";
import { contextAPI } from "../../../_app";

export default function StatDescription({ onTierWeaponChange }: ProbType) {
    const { studentData, tierWeapon } = useContext(contextDetailStudent);

    const { equipmentDataAPI } = useContext(contextAPI);
    const [level, setLevel] = useState(1);
    const [levelWeapon, setLevelWeapon] = useState(1);
    const [levelEquipment, setLevelEquipment] = useState([1, 1, 1, 0]);
    const [equipments, setEquipments] = useState<(unknown | null)[]>([null, null, null]);

    useEffect(() => {
        if (studentData?.Equipment && studentData.Equipment.length > 0) {
            const findEquipment = (category: string, tier: number) => equipmentDataAPI?.find((equipment) => equipment.Category === category && equipment.Tier === tier);

            const newEquipments = [
                findEquipment(studentData.Equipment[0], levelEquipment[0]) ?? null,
                findEquipment(studentData.Equipment[1], levelEquipment[1]) ?? null,
                findEquipment(studentData.Equipment[2], levelEquipment[2]) ?? null,
            ];

            setEquipments(newEquipments);
        }
    }, [studentData, equipmentDataAPI, levelEquipment]);

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

    const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLevel(parseInt(e.target.value));
    };
    const handleLevelWeaponChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLevelWeapon(parseInt(e.target.value));
    };

    return (
        <>
            <div className={styles.studentName}>{studentData?.Name}</div>
            <div className={styles.role}>
                <div className={styles.starGrade}>
                    {[...Array(studentData?.StarGrade)].map((_, i) => (
                        <img className={styles.starIMG} key={i} src="/blue-archive-wiki/star.svg" alt="" />
                    ))}
                </div>
                <div className={`${styles.typeSquad} ${squadType[0]}`}>{squadType[1]}</div>
            </div>
            <div className={styles.weaponContainer}>
                <img className={styles.weaponIMG} src={studentWeaponURL} alt="" />
                <div className={styles.levelWeaponContainer}>
                    <div className={`${styles.tierWeaponContainer} ${tierWeapon >= 1 ? styles.tierWeaponContainerActived : ""}`} onClick={() => onTierWeaponChange(1)}>
                        UE1
                    </div>
                    <div className={`${styles.tierWeaponContainer} ${tierWeapon >= 2 ? styles.tierWeaponContainerActived : ""}`} onClick={() => onTierWeaponChange(2)}>
                        UE2
                    </div>
                    <div className={`${styles.tierWeaponContainer} ${tierWeapon >= 3 ? styles.tierWeaponContainerActived : ""}`} onClick={() => onTierWeaponChange(3)}>
                        UE3
                    </div>
                    <input className={styles.sliderLevelWeapon} type="range" value={levelWeapon} min="1" max="50" onChange={handleLevelWeaponChange} />
                    <div className={styles.infolevelWeapon}>{levelWeapon}</div>
                </div>
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
            <div className={styles.studentStatContainer}>
                <Stat typeStat="MaxHP" nameStat="Max HP" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
                <Stat typeStat="AttackPower" nameStat="Attack" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
                <Stat typeStat="DefensePower" nameStat="Defense" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
                <Stat typeStat="DodgePoint" nameStat="Evasion" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
                <Stat typeStat="CriticalPoint" nameStat="Crit Rate" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
                <Stat typeStat="CriticalDamageRate" nameStat="Crit Dmg" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
                <Stat typeStat="HealPower" nameStat="Healing" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
                <Stat typeStat="Range" nameStat="Attack Range" equipment={equipments} Level={level} levelWeapon={levelWeapon} />
            </div>
            <div className={styles.studentEquipmentContainer}>
                <Equipment
                    typeEquipment={0}
                    levelEquipment={levelEquipment[0]}
                    setLevelEquipment={(value: number) =>
                        setLevelEquipment((prev) => {
                            const updated = [...prev];
                            updated[0] = value;
                            return updated;
                        })
                    }
                />
                <Equipment
                    typeEquipment={1}
                    levelEquipment={levelEquipment[1]}
                    setLevelEquipment={(value: number) =>
                        setLevelEquipment((prev) => {
                            const updated = [...prev];
                            updated[1] = value;
                            return updated;
                        })
                    }
                />
                <Equipment
                    typeEquipment={2}
                    levelEquipment={levelEquipment[2]}
                    setLevelEquipment={(value: number) =>
                        setLevelEquipment((prev) => {
                            const updated = [...prev];
                            updated[2] = value;
                            return updated;
                        })
                    }
                />
                <div className={styles.separator}>
                    <div className={styles.separatorLine}></div>
                </div>
                <EquipmentGear
                    levelEquipmentGear={levelEquipment[3]}
                    setLevelEquipmentGear={(value: number) =>
                        setLevelEquipment((prev) => {
                            const updated = [...prev];
                            updated[3] = value;
                            return updated;
                        })
                    }
                />
            </div>
            <span>
                <input type="range" value={level} min="1" max="100" onChange={handleLevelChange} />
                {level}
            </span>
        </>
    );
}

interface ProbType {
    onTierWeaponChange: (index: number) => void;
}
