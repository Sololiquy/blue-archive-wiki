import React, { useContext, useState } from "react";
import Voice from "./voice";
import VoiceTab from "./voiceTab";

import "./component.css";

import { contextDetailStudent } from "../../context";

export default function VoiceDescription() {
   const { studentvoiceData } = useContext(contextDetailStudent) as { studentvoiceData?: VoiceData };
   const [voicetabIndex, setvoicetabIndex] = useState<number>(1);

   if (!studentvoiceData) {
      return <div>Voice data not found</div>;
   }

   const handleTabClick = (index: number) => {
      setvoicetabIndex(index);
   };

   return (
      <>
         <div className="relative flex flex-row justify-center">
            <VoiceTab onClick={() => handleTabClick(1)} active={voicetabIndex === 1} label="Battle" />
            <VoiceTab onClick={() => handleTabClick(2)} active={voicetabIndex === 2} label="Event" />
            <VoiceTab onClick={() => handleTabClick(3)} active={voicetabIndex === 3} label="Lobby" />
            <VoiceTab onClick={() => handleTabClick(4)} active={voicetabIndex === 4} label="Normal" />
         </div>

         <div className="flex flex-col gap-1">
            {voicetabIndex === 1 && studentvoiceData.Battle?.map((voice, index) => <Voice key={index} voice={voice} />)}
            {voicetabIndex === 2 && studentvoiceData.Event?.map((voice, index) => <Voice key={index} voice={voice} />)}
            {voicetabIndex === 3 && studentvoiceData.Lobby?.map((voice, index) => <Voice key={index} voice={voice} />)}
            {voicetabIndex === 4 && studentvoiceData.Normal?.map((voice, index) => <Voice key={index} voice={voice} />)}
         </div>
      </>
   );
}

interface VoiceData {
   Battle?: VoiceType[];
   Event?: VoiceType[];
   Lobby?: VoiceType[];
   Normal?: VoiceType[];
}

interface VoiceType {
   Group: string;
   Transcription: string;
   AudioClip: string;
}
