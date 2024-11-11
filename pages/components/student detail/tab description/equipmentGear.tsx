import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

import styles from "@/styles/student detail/tabDescription.module.css";

import { contextDetailStudent } from "../../../studentDetail";

interface VariableType {
    levelEquipmentGear: number;
    setLevelEquipmentGear: Dispatch<SetStateAction<number>>;
}

const EquipmentGear = ({ levelEquipmentGear, setLevelEquipmentGear }: VariableType) => {
    const { studentData } = useContext(contextDetailStudent);
    const equipmentURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/gear/full/${studentData?.Id}.webp`;
    const [equipmentImgSrc, setEquipmentImgSrc] = useState(equipmentURL);

    useEffect(() => {
        const check = async (url: string) => {
            try {
                const response = await fetch(equipmentURL);
                setEquipmentImgSrc(response.ok ? url : "https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/gear/empty.png");
            } catch {
                setEquipmentImgSrc("https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/gear/empty.png");
            }
        };
        if (equipmentURL) check(equipmentURL);
    }, [equipmentURL]);

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLevelEquipmentGear(parseInt(e.target.value));
    };
    return (
        <>
            <div className={styles.equipmentContainer} style={{ bottom: 0 }}>
                <div className={styles.containerImg}>
                    <img className={styles.equipmentImg} src={equipmentImgSrc} alt="" />
                </div>
                <input className={styles.equipmentLevel} style={{ color: "black" }} type="number" min="0" max="2" value={levelEquipmentGear} onChange={handleLevelChange} />
            </div>
        </>
    );
};

export default EquipmentGear;
