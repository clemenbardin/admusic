"use client";

import { useState } from "react";

export default function CourseList({ courses }) {
  const [courseList, setCourseList] = useState(courses);

  return (
    <div>
      <h2>Mes Cours</h2>
      <ul>
        {courseList.map((course) => (
          <li key={course.id}>
            {course.title} - {course.schedule}
          </li>
        ))}
      </ul>
    </div>
  );
}
