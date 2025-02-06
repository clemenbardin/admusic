'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (res?.error) {
                setError("Email ou mot de passe incorrect.");
                return;
            }

            router.push('/dashboard');
        } catch (err) {
            setError("Erreur lors de la connexion.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h2>

                {error && <div className="text-red-600 text-sm text-center mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">E-Mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Entrez votre e-mail...'
                            className="w-full p-3 mt-1 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Choisissez votre mot de passe...'
                            className="w-full p-3 mt-1 border rounded-md"
                        />
                    </div>

                    <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}