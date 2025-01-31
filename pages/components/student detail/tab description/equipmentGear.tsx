import React, { useContext, useEffect, useState } from "react";

import styles from "@/styles/student detail/tabDescription.module.css";

import { contextDetailStudent } from "../../../layout/studentDetail";

export default function EquipmentGear({ levelEquipmentGear, setLevelEquipmentGear }: PropType) {
    const { studentData } = useContext(contextDetailStudent);
    const equipmentURL = `https://schaledb.com//images/gear/icon/${studentData?.Id}.webp`;
    const [equipmentImgSrc, setEquipmentImgSrc] = useState(equipmentURL);

    useEffect(() => {
        const check = async (url: string) => {
            try {
                const response = await fetch(equipmentURL);
                setEquipmentImgSrc(response.ok ? url : "https://schaledb.com/images/gear/empty.png");
            } catch {
                setEquipmentImgSrc("https://schaledb.com/images/gear/empty.png");
            }
        };
        if (equipmentURL) check(equipmentURL);
    }, [equipmentURL]);

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
                        <img className={styles.equipmentLevelArrowDecrease} src="./blue-archive-wiki/arrow.svg" alt="" />
                    </div>
                    <div className={styles.equipmentLevelInfo}>T{levelEquipmentGear}</div>
                    <div className={styles.equipmentLevelArrowContainer} onClick={levelEquipmentGear < 2 ? () => handleEquipmentLevelIncrease() : undefined}>
                        <img className={styles.equipmentLevelArrowIncrease} src="./blue-archive-wiki/arrow.svg" alt="" />
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
