import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  // Insertion des utilisateurs
  const { data: users, error: userError } = await supabase.from("users").upsert([
    { id: "user1", email: "admin@example.com", password: "password", name: "Admin", role: "admin", createdAt: new Date() },
    { id: "user2", email: "prof@example.com", password: "password", name: "Professeur", role: "professeur", createdAt: new Date() },
    { id: "user3", email: "eleve@example.com", password: "password", name: "Élève", role: "eleve", createdAt: new Date() },
  ]);

  if (userError) {
    console.error("Erreur lors de l'insertion des utilisateurs:", userError);
    return;
  }

  console.log("Utilisateurs insérés:", users);

  // Insertion des cours
  const { data: courses, error: courseError } = await supabase.from("courses").upsert([
    { id: "course1", title: "Mathematics", description: "Cours de mathématiques", instrument: "Math", teacherId: "user2", level: "Beginner", schedule: "Lundi 10h", capacity: 30 },
    { id: "course2", title: "Science", description: "Cours de sciences", instrument: "Science", teacherId: "user2", level: "Intermediate", schedule: "Mardi 14h", capacity: 25 },
  ]);

  if (courseError) {
    console.error("Erreur lors de l'insertion des cours:", courseError);
    return;
  }

  console.log("Cours insérés:", courses);

  // Insertion des inscriptions
  const { data: enrollments, error: enrollmentError } = await supabase.from("enrollments").upsert([
    { id: "enroll1", studentId: "user3", courseId: "course1", enrollmentDate: new Date(), status: "active" },
    { id: "enroll2", studentId: "user3", courseId: "course2", enrollmentDate: new Date(), status: "active" },
  ]);

  if (enrollmentError) {
    console.error("Erreur lors de l'insertion des inscriptions:", enrollmentError);
    return;
  }

  console.log("Inscriptions insérées:", enrollments);

  // Insertion des progrès
  const { data: progresses, error: progressError } = await supabase.from("progress").upsert([
    { id: "progress1", studentId: "user3", courseId: "course1", date: new Date(), evaluation: "A", comments: "Très bon progrès" },
    { id: "progress2", studentId: "user3", courseId: "course2", date: new Date(), evaluation: "B", comments: "Bon progrès, mais peut mieux faire" },
  ]);

  if (progressError) {
    console.error("Erreur lors de l'insertion des progrès:", progressError);
    return;
  }

  console.log("Progrès insérés:", progresses);
}

seed().catch((err) => console.error("Erreur du script de seed:", err));