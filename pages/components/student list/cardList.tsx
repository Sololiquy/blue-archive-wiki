import Link from "next/link";
import styles from "@/styles/student list/component.module.css";

export default function CardList({ ID, name, school }: ProbType) {
    const studentPotraitURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/collection/${ID}.webp`;
    const studentSchoolURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/schoolicon/School_Icon_${school?.toUpperCase()}_W.png`;

    return (
        <div className={styles.card}>
            <Link href={`/studentDetail?id=${ID}`}>
                <img className={styles.studentPotrait} src={studentPotraitURL} alt="" />
            </Link>
            <img className={styles.studentSchool} src={studentSchoolURL} alt="" />
            <div className={styles.studentName}>{name}</div>
        </div>
    );
}

interface ProbType {
    ID: number;
    name: string;
    school: string;
}
