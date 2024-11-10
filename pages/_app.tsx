import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "./components/home/header";
import { useEffect, useState, createContext, Dispatch, SetStateAction } from "react";

interface ContextType {
    studentDataAPI: VariableType[] | null;
    setStudentDataAPI: Dispatch<SetStateAction<VariableType[] | null>>;
    studentDefaultDataAPI: VariableType[] | null;
    equipmentDataAPI: VariableType[] | null;
    setEquipmentDataAPI: Dispatch<SetStateAction<VariableType[] | null>>;
}

interface VariableType {
    ArmorType: string;
    CollectionBG: string;
    Equipment: string;
    Id: number;
    Name: string;
    School: string;
}

export const contextAPI = createContext<ContextType>({
    studentDataAPI: null,
    setStudentDataAPI: () => {},
    studentDefaultDataAPI: null,
    equipmentDataAPI: null,
    setEquipmentDataAPI: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
    const [studentDataAPI, setStudentDataAPI] = useState<VariableType[] | null>(null);
    const [studentDefaultDataAPI, setStudentDefaultDataAPI] = useState<VariableType[] | null>(null);
    const [equipmentDataAPI, setEquipmentDataAPI] = useState<VariableType[] | null>(null);

    useEffect(() => {
        const getAPI = async () => {
            const student = await fetch("https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/data/en/students.json");
            const equipment = await fetch("https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/data/en/equipment.json");
            const dataStudent: VariableType[] = await student.json();
            const dataEquipment: VariableType[] = await equipment.json();
            setStudentDataAPI(dataStudent.sort((a, b) => a.Name.localeCompare(b.Name)));
            setStudentDefaultDataAPI(dataStudent.sort((a, b) => a.Name.localeCompare(b.Name)));
            setEquipmentDataAPI(dataEquipment);
        };
        getAPI();
    }, []);

    return (
        <>
            <Header />
            <contextAPI.Provider value={{ studentDataAPI, studentDefaultDataAPI, equipmentDataAPI, setStudentDataAPI, setEquipmentDataAPI }}>
                <Component {...pageProps} />
            </contextAPI.Provider>
        </>
    );
}
