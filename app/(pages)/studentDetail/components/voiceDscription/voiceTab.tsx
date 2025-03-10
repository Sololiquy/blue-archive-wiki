import "./component.css";

interface parameterType {
   onClick: () => void;
   active: boolean;
   label: string;
}

export default function VoiceTab({ onClick, active, label }: parameterType) {
   return (
      <>
         <div className={`tabVoice bg-[rgba(0,0,0,0.3)] ${active ? "!font-bold !bg-white !text-black" : ""}`} onClick={onClick}>
            {label}
         </div>
      </>
   );
}
