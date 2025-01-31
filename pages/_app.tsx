import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "./components/home/header";
import { useEffect, useState, createContext } from "react";

export default function App({ Component, pageProps }: AppProps) {
    const [localizationAPI, setLocalizationAPI] = useState<any>(null);
    const [studentDataAPI, setStudentDataAPI] = useState<any>(null);
    const [studentDefaultDataAPI, setStudentDefaultDataAPI] = useState<any>(null);
    const [enemyAPI, setEnemyAPI] = useState<any>(null);
    const [voiceDataAPI, setVoiceDataAPI] = useState<any>(null);
    const [equipmentDataAPI, setEquipmentDataAPI] = useState<any>(null);

    useEffect(() => {
        const getAPI = async () => {
            try {
                const student = await fetch("https://schaledb.com/data/en/students.min.json");
                const enemy = await fetch("https://schaledb.com/data/en/raids.min.json");
                const voice = await fetch("https://schaledb.com/data/en/voice.min.json");
                const equipment = await fetch("https://schaledb.com/data/en/equipment.min.json");
                const localization = await fetch("https://schaledb.com/data/en/localization.min.json");

                const dataLocalization: any = await localization.json();
                const dataStudent: any = await student.json();
                const dataEnemy: any = await enemy.json();
                const dataVoice: any = await voice.json();
                const dataEquipment: any = await equipment.json();
                const sortedStudentArray = Object.values(dataStudent).sort((a: any, b: any) => a.Name.localeCompare(b.Name));

                setStudentDataAPI(sortedStudentArray);
                setStudentDefaultDataAPI(sortedStudentArray);
                setEnemyAPI(dataEnemy);
                setLocalizationAPI(dataLocalization);
                setVoiceDataAPI(dataVoice);
                setEquipmentDataAPI(dataEquipment);
            } catch (error) {
                console.error("Fetch API data failed:", error);
            }
        };
        getAPI();
    }, []);
    return (
        <>
            <Header />
            <contextAPI.Provider value={{ studentDataAPI, studentDefaultDataAPI, enemyAPI, localizationAPI, equipmentDataAPI, voiceDataAPI, setStudentDataAPI }}>
                <Component {...pageProps} />
            </contextAPI.Provider>
        </>
    );
}

export const contextAPI = createContext<any>({
    localizationAPI: null,
    studentDataAPI: null,
    setStudentDataAPI: () => {},
    studentDefaultDataAPI: null,
    voiceDataAPI: null,
    equipmentDataAPI: null,
    enemyAPI: null,
});
