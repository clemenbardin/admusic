'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Réinitialiser les erreurs

        // Vérification basique des champs
        if (!email || !password || !confirmPassword) {
            setError("Tous les champs sont requis.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                console.log("Inscription réussie !");
                router.push('/login'); // Redirection après succès
            } else {
                const data = await res.json();
                setError(data.message || "Une erreur s'est produite.");
            }
        } catch (error) {
            setError("Erreur de connexion au serveur.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Créer un compte</h2>

                {error && <div className="text-red-600 text-sm text-center mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">E-Mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre e-mail"
                            required
                            className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Choisissez un mot de passe"
                            required
                            className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Répétez votre mot de passe"
                            required
                            className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-l"
                    />
                </form>
            </div>
        </div>
    )
};