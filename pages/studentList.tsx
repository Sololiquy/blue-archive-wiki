import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from "react";
import ButtonSortName from "./components/student list/buttonSortName";
import ButtonSearch from "./components/student list/buttonSearch";
import CardList from "./components/student list/cardList";
import styles from "@/styles/student list/studentList.module.css";

interface ContextType {
    data: VariableType[];
    setData: Dispatch<SetStateAction<VariableType[]>>;
    defaultData: VariableType[];
}
interface VariableType {
    Id: number;
    Name: string;
    School: string;
    CollectionBG: string;
    WeaponImg: string;
}

export const context = createContext<ContextType>({
    data: [],
    setData: () => {},
    defaultData: [],
});

const apiURL = "https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/data/en/students.json";

const StudentList = () => {
    const [data, setData] = useState<VariableType[]>([]);
    const [defaultData, setDefaultData] = useState<VariableType[]>([]);

    useEffect(() => {
        const getAPI = async () => {
            const response = await fetch(apiURL);
            const data: VariableType[] = await response.json();
            setData(data.sort((a, b) => a.Name.localeCompare(b.Name)));
            setDefaultData(data);
        };
        getAPI();
    }, []);

    return (
        <>
            <div className={styles.filter}>
                <context.Provider value={{ data, setData, defaultData }}>
                    <ButtonSortName />
                    <input id="value" type="text" placeholder="Search" style={{ color: "blue" }} />
                    <ButtonSearch />
                </context.Provider>
            </div>

            <div className={styles.containerScroll}>
                <div className={styles.container}>
                    {data.map((student) => (
                        <CardList key={student.Id} ID={student.Id} name={student.Name} school={student.School} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default StudentList;
