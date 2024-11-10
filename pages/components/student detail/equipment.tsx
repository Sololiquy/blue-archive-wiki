import React, { Dispatch, SetStateAction, useContext } from "react";
import styles from "@/styles/student detail/component.module.css";
import { contextDetailStudent } from "../../studentDetail";

interface EquipmentProps {
    typeEquipment: number;
    levelEquipment: number;
    setLevelEquipment: Dispatch<SetStateAction<number>>;
}

const Equipment = ({ typeEquipment, levelEquipment, setLevelEquipment }: EquipmentProps) => {
    const { studentData } = useContext(contextDetailStudent);
    const equipmentURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/equipment/full/equipment_icon_${studentData?.Equipment[
        typeEquipment
    ]?.toLowerCase()}_tier${levelEquipment}.webp`;

    return (
        <div className={styles.equipmentContainer}>
            <div className={styles.containerImg}>
                <img
                    className={styles.equipmentImg}
                    src={equipmentURL}
                    alt=""
                    onError={(e) => (e.currentTarget.src = "https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/gear/empty.png")}
                />
            </div>
            <input className={styles.equipmentLevel} style={{ color: "black" }} type="number" min="0" max="9" value={levelEquipment} onChange={(e) => setLevelEquipment(parseInt(e.target.value))} />
        </div>
    );
};

export default Equipment;
