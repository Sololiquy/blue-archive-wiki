import React, { useContext } from "react";

import styles from "@/styles/student detail/tabDescription.module.css";

import { contextDetailStudent } from "../../../layout/studentDetail";

export default function Equipment({ typeEquipment, levelEquipment, setLevelEquipment }: PropType) {
    const { studentData } = useContext(contextDetailStudent);
    const equipmentURL = `https://schaledb.com/images/equipment/full/equipment_icon_${studentData?.Equipment[typeEquipment]?.toLowerCase()}_tier${levelEquipment}.webp`;

    const handleEquipmentLevelDecrease = () => {
        setLevelEquipment(levelEquipment - 1);
    };
    const handleEquipmentLevelIncrease = () => {
        setLevelEquipment(levelEquipment + 1);
    };

    return (
        <div className={styles.equipmentContainer}>
            <div className={styles.containerImg}>
                <img className={styles.equipmentImg} src={equipmentURL} alt="" onError={(e) => (e.currentTarget.src = "https://schaledb.com/images/gear/empty.png")} />
            </div>
            <div className={styles.equipmentLevel}>
                <div className={styles.equipmentLevelArrowContainer} onClick={levelEquipment > 0 ? () => handleEquipmentLevelDecrease() : undefined}>
                    <img className={styles.equipmentLevelArrowDecrease} src="/blue-archive-wiki/arrow.svg" alt="" />
                </div>
                <div className={styles.equipmentLevelInfo}>T{levelEquipment}</div>
                <div className={styles.equipmentLevelArrowContainer} onClick={levelEquipment < 9 ? () => handleEquipmentLevelIncrease() : undefined}>
                    <img className={styles.equipmentLevelArrowIncrease} src="/blue-archive-wiki/arrow.svg" alt="" />
                </div>
            </div>
        </div>
    );
}

interface PropType {
    typeEquipment: number;
    levelEquipment: number;
    setLevelEquipment: (value: number) => void;
}
