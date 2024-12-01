import React, { useContext } from "react";
import styles from "@/styles/student detail/tabVoiceDescription.module.css";

import { contextAPI } from "../../../_app";

export default function Voice({ voice }: variableType) {
    const { localizationAPI } = useContext(contextAPI);

    if (!voice) return null;

    const voiceURL = `https://r2.schaledb.com/voice/${voice.AudioClip}`;

    let voiceTitle = "";
    const [x, y] = (voice?.Group.match(/^(\D+)(\d*)$/) || ["", "", ""]).slice(1);
    if (y === "") {
        voiceTitle = localizationAPI?.VoiceClip[x as keyof typeof localizationAPI.VoiceClip]?.replace("{0}", y) ?? "";
    } else {
        voiceTitle = localizationAPI?.VoiceClip[x as keyof typeof localizationAPI.VoiceClip]?.replace("{0}", y) ?? "";
    }

    return (
        <>
            <div className={styles.voiceContainer}>
                <div className={styles.audioControl}>
                    <audio controls className="h-8 w-48">
                        <source src={voiceURL} type="audio/mp3" />
                    </audio>
                    <div className={styles.voiceTitle}>{voiceTitle}</div>
                </div>
                <div className={styles.voiceDescription}>{voice?.Transcription}</div>
            </div>
        </>
    );
}

interface variableType {
    voice: {
        Group: string;
        Transcription: string;
        AudioClip: string;
    };
}
