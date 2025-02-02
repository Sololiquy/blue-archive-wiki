import Link from "next/link";
import styles from "@/styles/student list/cardList.module.css";

export default function CardList({ id, name, school }: ParameterType) {
    const studentPotraitURL = `https://schaledb.com/images/student/collection/${id}.webp`;
    const studentSchoolURL = `https://schaledb.com/images/schoolicon/${school}.png`;

    return (
        <div className={styles.card}>
            <Link href={`/studentDetail/${id}`}>
                <img className={styles.studentPotrait} src={studentPotraitURL} alt="" />
            </Link>
            <img className={styles.studentSchool} src={studentSchoolURL} alt="" />
            <div className={styles.studentName}>{name}</div>
        </div>
    );
}

interface ParameterType {
    id: number;
    name: string;
    school: string;
}
