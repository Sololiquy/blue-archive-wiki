import "./component.css";

interface parameterType {
   onClick: () => void;
   active: boolean;
   label: string;
}

export default function Tab({ onClick, active, label }: parameterType) {
   return (
      <div className="flex cursor-pointer">
         <div className={`tabContainer ${active ? `!bg-black` : ``}`} onClick={onClick}>
            <div className={`tabInnerContainer ${active ? `!font-bold` : ``}`}>{label}</div>
         </div>
      </div>
   );
}
