import React from "react";
import styles from "@/styles/student detail/tabVoiceDescription.module.css";

interface variableType {
    voice?: {
        Group: string;
        Transcription: string;
        AudioClip: string;
    };
}

const Voice = ({ voice }: variableType) => {
    if (!voice) return null;
    const voiceURL = `https://r2.schaledb.com/voice/${voice.AudioClip}`;
    console.log(voice);
    return (
        <>
            <div className={styles.voiceContainer}>
                <div className={styles.audioControl}>
                    <audio controls className="h-8 w-48">
                        <source src={voiceURL} type="audio/mp3" />
                    </audio>
                    <div className={styles.voiceTitle}>{voice?.Group}</div>
                </div>
                <div className={styles.voiceDescription}>{voice?.Transcription}</div>
            </div>
        </>
    );
};

export default Voice;
