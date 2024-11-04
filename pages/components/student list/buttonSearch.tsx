import React, { useContext } from "react";
import { context } from "../../studentList";

import styles from "@/styles/student list/component.module.css";

const ButtonSearch = () => {
    const { setData, defaultData } = useContext(context);

    const search = () => {
        const searchValue = (document.getElementById("value") as HTMLInputElement)?.value.toLowerCase();

        if (searchValue === "") {
            setData(defaultData);
        } else {
            const filteredData = defaultData.filter((data) => data.Name.toLowerCase().includes(searchValue));
            setData(filteredData);
        }
    };

    return (
        <button onClick={search} className={styles.buttonSearch}>
            Search
        </button>
    );
};

export default ButtonSearch;
