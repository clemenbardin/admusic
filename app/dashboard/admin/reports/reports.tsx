import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/db';

export default function Reports() {
  const [userCount, setUserCount] = useState<number>(0);
  const [courseCount, setCourseCount] = useState<number>(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: userCount, error: userError } = await supabase.from('users').select('*', { count: 'exact' });
      const { count: courseCount, error: courseError } = await supabase.from('courses').select('*', { count: 'exact' });
      const { count: enrollmentsCount, error: enrollmentError } = await supabase.from('enrollments').select('*', { count: 'exact' });

      if (userError || courseError || enrollmentError) {
        console.error('Erreur lors de la récupération des statistiques:', userError, courseError, enrollmentError);
        return;
      }

      setUserCount(userCount || 0);
      setCourseCount(courseCount || 0);
      setEnrollmentsCount(enrollmentsCount || 0);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1>Rapports et Statistiques</h1>
      <ul>
        <li>Nombre d'utilisateurs : {userCount}</li>
        <li>Nombre de cours : {courseCount}</li>
        <li>Nombre d'inscriptions : {enrollmentsCount}</li>
      </ul>
    </div>
  );
}