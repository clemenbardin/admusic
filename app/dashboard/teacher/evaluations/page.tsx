'use client';

import { useState } from "react";
import { supabase } from "../../../lib/db";

export default function CourseForm({ course, onSave }) {
  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [schedule, setSchedule] = useState(course?.schedule || "");

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase.from("courses").upsert([{ 
      id: course?.id, title, description, schedule, teacherId: "user2" 
    }]);
    if (!error) onSave();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="Horaire" required />
      <button type="submit">Enregistrer</button>
    </form>
  );
}
