// lib/db.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl =  process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and key are required");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single(); // Assure-toi de récupérer un seul utilisateur par email

  if (error) {
    throw new Error('Unable to fetch user: ' + error.message);
  }

  return data;
};
