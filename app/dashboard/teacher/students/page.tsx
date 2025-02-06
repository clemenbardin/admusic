'use client';

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/db";

export default function SuiviEleves() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*, students(*)");
      if (!error) setStudents(data);
    }
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Suivi des élèves</h1>
      <ul>
        {students.map((enrollment) => (
          <li key={enrollment.id}>
            {enrollment.students.name} - {enrollment.courseId}
          </li>
        ))}
      </ul>
    </div>
  );
}
