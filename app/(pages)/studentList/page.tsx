"use client";

import { useContext, useState } from "react";
import CardList from "./components/cardList";
import "./studentList.css";
import { contextAPI } from "@/app/wrapper";

export default function StudentList() {
   const { studentDataAPI, setStudentDataAPI, studentDefaultDataAPI } = useContext(contextAPI);
   const [ascSort, setAscSort] = useState(true);

   const sorting = () => {
      if (!studentDataAPI) return;
      let sortedStudents;
      if (ascSort) {
         sortedStudents = [...studentDataAPI].sort((a, b) => b.Name.localeCompare(a.Name));
         setAscSort(false);
      } else {
         sortedStudents = [...studentDataAPI].sort((a, b) => a.Name.localeCompare(b.Name));
         setAscSort(true);
      }
      setStudentDataAPI(sortedStudents);
   };

   const search = () => {
      const searchValue = (document.getElementById("value") as HTMLInputElement)?.value.toLowerCase();

      if (!searchValue) {
         setStudentDataAPI(studentDefaultDataAPI);
      } else if (studentDefaultDataAPI) {
         const filteredData = studentDefaultDataAPI.filter((student: { Name: string }) => student.Name.toLowerCase().includes(searchValue));
         setStudentDataAPI(filteredData);
      }
   };

   return (
      <>
         <div className="backgroundContainer"></div>
         <div className="contentContainer -top-[40px]">
            <div className="scrollContainer">
               <div className="filter bg-opacity-60">
                  <button className="w-[80px] h-[25px] rounded-l-full bg-blue-600" onClick={sorting}>
                     Name
                  </button>
                  <input className="pl-1" id="value" type="text" placeholder="Search" style={{ color: "blue" }} />
                  <button className="w-[80px] h-[25px] rounded-r-full bg-blue-600" onClick={search}>
                     Search
                  </button>
               </div>
               <div className="pt-11 w-full relative flex flex-row flex-wrap gap-1 justify-center">
                  {studentDataAPI?.map((student: { Id: number; Name: string; School: string }) => (
                     <CardList key={student.Id} id={student.Id} name={student.Name} school={student.School} />
                  ))}
               </div>
            </div>
         </div>
      </>
   );
}
