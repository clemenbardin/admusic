'use client'

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/db';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [progresses, setProgresses] = useState([]);

  useEffect(() => {
    // Récupérer les cours inscrits pour l'élève connecté
    const fetchCourses = async () => {
      const user = supabase.auth.user();

      if (!user) return;  // Si pas d'utilisateur connecté, ne rien faire

      const { data: enrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select('courseId')
        .eq('studentId', user.id);

      if (enrollError) {
        console.error('Erreur de récupération des inscriptions:', enrollError);
        return;
      }

      const courseIds = enrollments.map((enrollment) => enrollment.courseId);
      const { data: coursesData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds);

      if (courseError) {
        console.error('Erreur de récupération des cours:', courseError);
        return;
      }

      setCourses(coursesData);
    };

    const fetchProgress = async () => {
      const user = supabase.auth.user();
      if (!user) return;

      const { data: progressData, error: progressError } = await supabase
        .from('progress')
        .select('*')
        .eq('studentId', user.id);

      if (progressError) {
        console.error('Erreur de récupération des progrès:', progressError);
        return;
      }

      setProgresses(progressData);
    };

    fetchCourses();
    fetchProgress();
  }, []);

  return (
    <div>
      <h1>Tableau de bord</h1>

      <h2>Cours inscrits</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.title} - {course.schedule}
          </li>
        ))}
      </ul>

      <h2>Suivi de progression</h2>
      <ul>
        {progresses.map((progress) => (
          <li key={progress.id}>
            {progress.courseId} - Évaluation: {progress.evaluation} - Commentaires: {progress.comments}
          </li>
        ))}
      </ul>
    </div>
  );
}
