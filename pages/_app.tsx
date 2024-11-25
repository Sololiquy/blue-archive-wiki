import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "./components/home/header";
import { useEffect, useState, createContext, Dispatch, SetStateAction } from "react";

interface LocalizationAPI {
    BuffName: Record<string, string>;
    ui: Record<string, string>;
    Club: Record<string, string>;
    SchoolLong: Record<string, string>;
}

interface ContextType {
    localizationAPI: LocalizationAPI | null;
    studentDataAPI: VariableType[] | null;
    setStudentDataAPI: Dispatch<SetStateAction<VariableType[] | null>>;
    studentDefaultDataAPI: VariableType[] | null;
    voiceDataAPI: VariableType[] | null;
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
    Category: string;
    Tier: number;
}

export const contextAPI = createContext<ContextType>({
    localizationAPI: null,
    studentDataAPI: null,
    setStudentDataAPI: () => {},
    studentDefaultDataAPI: null,
    voiceDataAPI: null,
    equipmentDataAPI: null,
    setEquipmentDataAPI: () => {},
});

export default function App({ Component, pageProps }: AppProps) {
    const [localizationAPI, setLocalizationAPI] = useState<LocalizationAPI | null>(null);
    const [studentDataAPI, setStudentDataAPI] = useState<VariableType[] | null>(null);
    const [studentDefaultDataAPI, setStudentDefaultDataAPI] = useState<VariableType[] | null>(null);
    const [voiceDataAPI, setVoiceDataAPI] = useState<VariableType[] | null>(null);
    const [equipmentDataAPI, setEquipmentDataAPI] = useState<VariableType[] | null>(null);

    useEffect(() => {
        const getAPI = async () => {
            try {
                const student = await fetch("https://raw.githubusercontent.com/SchaleDB/SchaleDB/main/data/en/students.json");
                const voice = await fetch("https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/data/en/voice.json");
                const equipment = await fetch("https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/data/en/equipment.json");
                const localization = await fetch("https://raw.githubusercontent.com/SchaleDB/SchaleDB/refs/heads/main/data/en/localization.json");

                const dataLocalization: LocalizationAPI = await localization.json();
                const dataStudent: VariableType[] = await student.json();
                const dataVoice: VariableType[] = await voice.json();
                const dataEquipment: VariableType[] = await equipment.json();
                setStudentDataAPI(dataStudent.sort((a, b) => a.Name.localeCompare(b.Name)));
                setStudentDefaultDataAPI(dataStudent.sort((a, b) => a.Name.localeCompare(b.Name)));
                setLocalizationAPI(dataLocalization);
                setVoiceDataAPI(dataVoice);
                setEquipmentDataAPI(dataEquipment);
            } catch (error) {
                console.error("Failed to fetch API data:", error);
            }
        };
        getAPI();
    }, []);

    return (
        <>
            <Header />
            <contextAPI.Provider value={{ studentDataAPI, studentDefaultDataAPI, localizationAPI, equipmentDataAPI, voiceDataAPI, setStudentDataAPI, setEquipmentDataAPI }}>
                <Component {...pageProps} />
            </contextAPI.Provider>
        </>
    );
}
