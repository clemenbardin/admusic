'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false // Pour gérer la redirection nous-mêmes
            });

            if (res?.error) {
                setError(res.error);
            } else {
                // Rediriger l'utilisateur après la connexion
            }
        } catch (err) {
            setError('Une erreur est survenue.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... Formulaire de connexion avec les champs email et mot de passe ... */}
            {error && <p>{error}</p>}
            <button type="submit">Se connecter</button>
        </form>
    );
}