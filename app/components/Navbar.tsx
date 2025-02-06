"use client";

import Link from "next/link";
import { supabase } from "../lib/db";
import { useState, useEffect } from 'react';

export default function NavBar() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        async function getUser() {
            const { data : { user }} = await supabase.auth.getUser();
            setUser(user);
        }
        getUser();
    }, []);

    async function logout() {
        await supabase.auth.signOut();
        setUser(null);
    }

    return (
        <nav className="bg-blue-600 text-white p-6">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                🎵 AdMusic
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:underline">Accueil</Link>
                    {user?.role === "professeur" && (
                        <Link href="/dashboard/teacher/courses" className="hover:underline">Tableau de bord</Link>
                    )}
                    {user?.role === "eleves" && (
                        <Link href="/dashboard/student/courses" className="hover:underline">Tableau de bord</Link>
                    )}
                    {user?.role === "admin" && (
                        <Link href="/dashboard/admin/reports" className="hover:underline">Pannel administrateur</Link>
                    )}
                </div>

                {/* Boutons de connexion / déconnexion */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Déconnexion
            </button>
          ) : (
            <Link href="/auth/login" className="bg-green-500 px-4 py-2 rounded">
              Connexion
            </Link>
          )}
        </div>

        {/* Menu burger mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link href="/" className="hover:underline">Accueil</Link>
          {user?.role === "professeur" && (
            <Link href="/dashboard/professor" className="hover:underline">Dashboard Prof</Link>
          )}
          {user?.role === "eleve" && (
            <Link href="/dashboard/student" className="hover:underline">Mes Cours</Link>
          )}
          {user ? (
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Déconnexion
            </button>
          ) : (
            <Link href="/auth/login" className="bg-green-500 px-4 py-2 rounded">
              Connexion
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}