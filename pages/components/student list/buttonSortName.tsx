import React, { useContext, useState } from "react";
import { contextAPI } from "../../_app";
import styles from "@/styles/student list/component.module.css";

const ButtonSortName = () => {
    const { studentDataAPI, setStudentDataAPI } = useContext(contextAPI);
    const [ascSort, setAscSort] = useState(true);

    const sorting = () => {
        if (!studentDataAPI) return;

        let sortedStudents;
        if (ascSort) {
            sortedStudents = [...studentDataAPI].sort((a, b) => b.Name.localeCompare(a.Name));
            setAscSort(false);
        } else {
            sortedStudents = [...studentDataAPI].sort((a, b) => a.Name.localeCompare(b.Name));
            setAscSort(true);
        }
        setStudentDataAPI(sortedStudents);
    };

    return (
        <button onClick={sorting} className={styles.buttonFilter}>
            Name
        </button>
    );
};

export default ButtonSortName;
