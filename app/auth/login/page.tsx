// 'use client';

// import { signIn } from 'next-auth/react';
// import { useState } from 'react';
// import { redirect } from 'next/navigation';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             const res = await signIn('credentials', {
//                 email,
//                 password,
//                 redirect: false
//             });

//             if (res) {
//                 console.log("Connexion réussie.");
//                 redirect('/dashboard');
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//                 <label htmlFor="email" className="text-sm font-semibold text-grey-700">E-Mail</label>
//                 <input type="text" 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Entrez votre e-mail"
//                 required
//                 className="w-64 md:w-32 border rounded-md shadow-lg"
//                 />
//             </div>
//             <div className="mb-3">
//                 <label htmlFor="password" className="text-sm font-semibold text-grey-700">Mot de passe</label>
//                 <input type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-64 md:w-32 border rounded-md shadow-lg" 
//             />
//             </div>
//             <button type="submit">Se connecter</button>
//         </form>
//     );
// }