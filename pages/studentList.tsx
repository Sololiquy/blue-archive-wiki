import React, { useContext } from "react";
import ButtonSortName from "./components/student list/buttonSortName";
import ButtonSearch from "./components/student list/buttonSearch";
import CardList from "./components/student list/cardList";
import styles from "@/styles/student list/studentList.module.css";

import { contextAPI } from "./_app";

const StudentList = () => {
    const { studentDataAPI } = useContext(contextAPI);

    return (
        <>
            <div className={styles.filter}>
                <ButtonSortName />
                <input id="value" type="text" placeholder="Search" style={{ color: "blue" }} />
                <ButtonSearch />
            </div>

            <div className={styles.containerScroll}>
                <div className={styles.container}>
                    {studentDataAPI?.map((student) => (
                        <CardList key={student.Id} ID={student.Id} name={student.Name} school={student.School} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default StudentList;
