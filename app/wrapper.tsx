"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export const contextAPI = createContext<any>({});

export default function Wrapper({ children }: { children: ReactNode }) {
   const [localizationAPI, setLocalizationAPI] = useState<any>(null);
   const [studentDataAPI, setStudentDataAPI] = useState<any>(null);
   const [studentDefaultDataAPI, setStudentDefaultDataAPI] = useState<any>(null);
   const [enemyAPI, setEnemyAPI] = useState<any>(null);
   const [voiceDataAPI, setVoiceDataAPI] = useState<any>(null);
   const [equipmentDataAPI, setEquipmentDataAPI] = useState<any>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const [student, enemy, voice, equipment, localization] = await Promise.all([
               fetch("/api/student").then((res) => res.json()),
               fetch("/api/enemy").then((res) => res.json()),
               fetch("/api/voice").then((res) => res.json()),
               fetch("/api/equipment").then((res) => res.json()),
               fetch("/api/localization").then((res) => res.json()),
            ]);
            const sortedStudent = Object.values(student).sort((a: any, b: any) => a.Name.localeCompare(b.Name));

            setStudentDataAPI(sortedStudent);
            setStudentDefaultDataAPI(sortedStudent);
            setEnemyAPI(enemy);
            setVoiceDataAPI(voice);
            setEquipmentDataAPI(equipment);
            setLocalizationAPI(localization);
         } catch (error) {
            console.error("Failed to fetch API data:", error);
         }
      };
      fetchData();
   }, []);
   return (
      <>
         <contextAPI.Provider value={{ studentDataAPI, studentDefaultDataAPI, enemyAPI, localizationAPI, equipmentDataAPI, voiceDataAPI, setStudentDataAPI }}>{children}</contextAPI.Provider>
      </>
   );
}
