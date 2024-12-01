import styles from "@/styles/student detail/tab.module.css";

export default function VoiceTab({ onClick, active, label }: TabProps) {
    return (
        <>
            <div className={`${styles.tabVoice} ${active ? styles.tabVoiceActive : ""}`} onClick={onClick}>
                {label}
            </div>
        </>
    );
}

interface TabProps {
    onClick: () => void;
    active: boolean;
    label: string;
}
