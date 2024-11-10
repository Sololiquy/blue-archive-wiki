import { useRouter } from "next/router";
import React, { useContext, createContext } from "react";
import StatDescription from "./components/student detail/statDescription";
import styles from "@/styles/student detail/studentDetail.module.css";
import { contextAPI } from "./_app";

export const contextDetailStudent = createContext({});

const StudentDetail = () => {
    const { query } = useRouter();
    const ID = Number(query.id);
    const { studentDefaultDataAPI } = useContext(contextAPI);
    const studentData = studentDefaultDataAPI?.find((student) => student.Id === ID);

    if (!studentData) {
        return <div>Student not found</div>;
    }

    const studentSpriteURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/images/student/portrait/${studentData.Id}.webp`;
    const backgroundURL = `https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/images/background/${studentData.CollectionBG}.jpg`;

    return (
        <>
            <div className={styles.background}>
                <img className={styles.backgroundImg} src={backgroundURL} alt="" />
            </div>
            <div className={styles.container}>
                <div className={styles.characterSpriteContainer}>
                    <img src={studentSpriteURL} alt="" />
                </div>
                <div className={styles.descriptionContainer}>
                    <contextDetailStudent.Provider value={{ studentData }}>
                        <StatDescription />
                    </contextDetailStudent.Provider>
                </div>
            </div>
        </>
    );
};

export default StudentDetail;
