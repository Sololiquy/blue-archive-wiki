import React, { useContext, useEffect, useState } from "react";

import styles from "@/styles/student detail/tabDescription.module.css";

import { contextDetailStudent } from "../../../studentDetail";

export default function EquipmentGear({ levelEquipmentGear, setLevelEquipmentGear }: PropType) {
    const { studentData } = useContext(contextDetailStudent);
    const [equipmentImgSrc, setEquipmentImgSrc] = useState<string>(``);
    useEffect(() => {
        if (studentData.Gear && Object.keys(studentData.Gear).length > 0) {
            setEquipmentImgSrc(`https://schaledb.com/images/gear/icon/${studentData?.Id}.webp`);
        } else {
            setEquipmentImgSrc(`https://schaledb.com/images/gear/empty.png`);
        }
    }, [levelEquipmentGear]);

    const handleEquipmentLevelDecrease = () => {
        setLevelEquipmentGear(levelEquipmentGear - 1);
    };
    const handleEquipmentLevelIncrease = () => {
        setLevelEquipmentGear(levelEquipmentGear + 1);
    };
    return (
        <>
            <div className={styles.equipmentContainer} style={{ bottom: 0 }}>
                <div className={styles.containerImg}>
                    <img className={styles.equipmentImg} src={equipmentImgSrc} alt="" />
                </div>
                <div className={styles.equipmentLevel}>
                    <div className={styles.equipmentLevelArrowContainer} onClick={levelEquipmentGear > 0 ? () => handleEquipmentLevelDecrease() : undefined}>
                        <img className={styles.equipmentLevelArrowDecrease} src="/blue-archive-wiki/arrow.svg" alt="" />
                    </div>
                    <div className={styles.equipmentLevelInfo}>T{levelEquipmentGear}</div>
                    <div className={styles.equipmentLevelArrowContainer} onClick={levelEquipmentGear < 2 ? () => handleEquipmentLevelIncrease() : undefined}>
                        <img className={styles.equipmentLevelArrowIncrease} src="/blue-archive-wiki/arrow.svg" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

interface PropType {
    levelEquipmentGear: number;
    setLevelEquipmentGear: (value: number) => void;
}
