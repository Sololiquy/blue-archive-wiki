import styles from "@/styles/student detail/tab.module.css";

interface ProbType {
    onClick: () => void;
    active: boolean;
    label: string;
}

export default function Tab({ onClick, active, label }: ProbType) {
    return (
        <div className={styles.container}>
            <div className={`${styles.circleContainer} ${active ? styles.active : ""}`} onClick={onClick}>
                <div className={styles.circleCenter}>{label}</div>
            </div>
        </div>
    );
}
