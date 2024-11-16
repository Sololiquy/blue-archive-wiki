import React, { FC } from "react";

import styles from "@/styles/student detail/tab.module.css";

interface TabProps {
    onClick: () => void;
    active: boolean;
    label: string;
}

const VoiceTab: FC<TabProps> = ({ onClick, active, label }) => {
    return (
        <>
            <div className={`${styles.tabVoice} ${active ? styles.active : ""}`} onClick={onClick}>
                {label}
            </div>
        </>
    );
};

export default VoiceTab;
