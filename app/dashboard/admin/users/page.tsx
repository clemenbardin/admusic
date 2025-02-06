import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/db';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Erreur de récupération des utilisateurs:', error);
        return;
      }
      setUsers(data || []);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    const { error } = await supabase.from('users').delete().eq('id', userId);
    if (error) {
      alert('Erreur lors de la suppression');
    } else {
      setUsers(users.filter(user => user.id !== userId));
      alert('Utilisateur supprimé');
    }
  };

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.role}
            <button onClick={() => handleDelete(user.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
