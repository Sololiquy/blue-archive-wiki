import Link from "next/link";
import styles from "@/styles/student list/component.module.css";

interface Variable {
    ID: number;
    name: string;
    school: string;
}

const CardList = ({ ID, name, school }: Variable) => {
    const studentPotraitURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/collection/${ID}.webp`;
    const studentSchoolURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/schoolicon/School_Icon_${school?.toUpperCase()}_W.png`;

    return (
        <div className={styles.card}>
            <Link href={`/studentDetail?id=${ID}`}>
                <img className={styles.studentPotrait} src={studentPotraitURL} alt="" />
            </Link>
            <img className={styles.studentSchool} src={studentSchoolURL} alt="" />
            <p>{name}</p>
        </div>
    );
};

export default CardList;
