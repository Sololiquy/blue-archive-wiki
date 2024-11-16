import React, { useContext, useState } from "react";
import Voice from "./voice";
import VoiceTab from "./voiceTab";
import styles from "@/styles/student detail/tabVoiceDescription.module.css";
import { contextDetailStudent } from "../../../studentDetail";

const VoiceDescription = () => {
    const { studentvoiceData } = useContext(contextDetailStudent);
    const [voicetabIndex, setvoicetabIndex] = useState(1);

    if (!studentvoiceData) {
        return <div>Voice data not found</div>;
    }

    const handleTabClick = (index: number) => {
        setvoicetabIndex(index);
    };

    return (
        <>
            <div className={styles.tabVoiceContainer}>
                <VoiceTab onClick={() => handleTabClick(1)} active={voicetabIndex === 1} label="Battle" />
                <VoiceTab onClick={() => handleTabClick(2)} active={voicetabIndex === 2} label="Event" />
                <VoiceTab onClick={() => handleTabClick(3)} active={voicetabIndex === 3} label="Lobby" />
                <VoiceTab onClick={() => handleTabClick(4)} active={voicetabIndex === 4} label="Normal" />
            </div>

            <div>
                <div>
                    {voicetabIndex === 1 && studentvoiceData?.Battle?.length > 0 ? studentvoiceData.Battle.map((voice, index) => <Voice key={index} voice={voice} />) : null}

                    {voicetabIndex === 2 && studentvoiceData?.Event?.length > 0 ? studentvoiceData.Event.map((voice, index) => <Voice key={index} voice={voice} />) : null}

                    {voicetabIndex === 3 && studentvoiceData?.Lobby?.length > 0 ? studentvoiceData.Lobby.map((voice, index) => <Voice key={index} voice={voice} />) : null}

                    {voicetabIndex === 4 && studentvoiceData?.Normal?.length > 0 ? studentvoiceData.Normal.map((voice, index) => <Voice key={index} voice={voice} />) : null}
                </div>
            </div>
        </>
    );
};

export default VoiceDescription;
