import { supabase } from "../../../lib/db";
import CourseList from "../../../components/CourseList"; // On va créer ce composant après

export default async function CoursesPage() {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("teacherId", "user2"); // Remplace par l'ID du professeur connecté

  if (error) {
    return <p>Erreur lors du chargement des cours.</p>;
  }

  return (
    <div>
      <h1>Tableau de bord - Professeur</h1>
      <CourseList courses={courses} />
    </div>
  );
}
