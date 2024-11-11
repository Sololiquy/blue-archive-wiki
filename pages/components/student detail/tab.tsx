import React from "react";

import styles from "@/styles/student detail/tab.module.css";

interface TabProps {
    onClick: () => void;
    active: boolean;
    label: string;
}

const Tab: React.FC<TabProps> = ({ onClick, active, label }) => {
    return (
        <div className={styles.container}>
            <div className={`${styles.circleContainer} ${active ? styles.active : ""}`} onClick={onClick}>
                <div className={styles.circleCenter}>{label}</div>
            </div>
        </div>
    );
};

export default Tab;
