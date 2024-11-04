import React, { useContext, useState } from "react";
import { context } from "../../studentList";

import styles from "@/styles/student list/component.module.css";

const ButtonSortName = () => {
    const { data, setData } = useContext(context);
    const [ascSort, setAscSort] = useState(true);

    const sorting = () => {
        let sortedStudents;
        if (ascSort) {
            sortedStudents = [...data].sort((a, b) => b.Name.localeCompare(a.Name));
            setAscSort(false);
        } else {
            sortedStudents = [...data].sort((a, b) => a.Name.localeCompare(b.Name));
            setAscSort(true);
        }
        setData(sortedStudents);
    };

    return (
        <button onClick={() => sorting()} className={styles.buttonFilter}>
            Name
        </button>
    );
};

export default ButtonSortName;
