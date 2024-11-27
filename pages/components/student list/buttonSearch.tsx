import React, { useContext } from "react";
import { contextAPI } from "../../_app";
import styles from "@/styles/student list/component.module.css";

export default function ButtonSearch() {
    const { studentDefaultDataAPI, setStudentDataAPI } = useContext(contextAPI);

    const search = () => {
        const searchValue = (document.getElementById("value") as HTMLInputElement)?.value.toLowerCase();

        if (!searchValue) {
            setStudentDataAPI(studentDefaultDataAPI);
        } else if (studentDefaultDataAPI) {
            const filteredData = studentDefaultDataAPI.filter((student) => student.Name.toLowerCase().includes(searchValue));
            setStudentDataAPI(filteredData);
        }
    };

    return (
        <button onClick={search} className={styles.buttonSearch}>
            Search
        </button>
    );
}
