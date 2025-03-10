import React, { useContext } from "react";
import "./component.css";

import { contextAPI } from "@/app/wrapper";

interface parameterType {
   voice: {
      Group: string;
      Transcription: string;
      AudioClip: string;
   };
}

export default function Voice({ voice }: parameterType) {
   const { localizationAPI } = useContext(contextAPI);

   if (!voice) return null;

   const voiceURL = `https://r2.schaledb.com/voice/${voice.AudioClip}`;

   let voiceTitle = "";
   const [x, y] = (voice?.Group.match(/^(\D+)(\d*)$/) || ["", "", ""]).slice(1);
   if (y === "") {
      voiceTitle = localizationAPI?.VoiceClip[x as keyof typeof localizationAPI.VoiceClip]?.replace("{0}", y) ?? "";
   } else {
      voiceTitle = localizationAPI?.VoiceClip[x as keyof typeof localizationAPI.VoiceClip]?.replace("{0}", y) ?? "";
   }

   return (
      <>
         <div className="h-full p-1 bg-[rgba(0,0,0,0.3)]">
            <div className="flex flex-row items-center">
               <audio controls className="h-8 w-48">
                  <source src={voiceURL} type="audio/mp3" />
               </audio>
               <div className="ml-2 font-bold tracking-wide">{voiceTitle}</div>
            </div>
            <div className="text-justify">{voice?.Transcription}</div>
         </div>
      </>
   );
}
