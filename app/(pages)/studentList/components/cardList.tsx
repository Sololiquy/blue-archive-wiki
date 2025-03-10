import Link from "next/link";
import "../studentList.css";

export default function CardList({ id, name, school }: parameterType) {
   const studentPotraitURL = `https://schaledb.com/images/student/collection/${id}.webp`;
   const studentSchoolURL = `https://schaledb.com/images/schoolicon/${school}.png`;

   return (
      <div className="card">
         <Link href={`/studentDetail/${id}`}>
            <img className="studentPotrait" src={studentPotraitURL} alt="" />
         </Link>
         <img className="hidden md:block my-1 w-20 h-auto" src={studentSchoolURL} alt="" />
         <div className="text-[12px]/[14px] md:text-base text-center">{name}</div>
      </div>
   );
}

interface parameterType {
   id: number;
   name: string;
   school: string;
}
