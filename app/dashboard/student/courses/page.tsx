'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export default function Dashboard() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    export async function GET() {
        const { data, error } = await supabase.from("courses").select("*");

        if (error) {
            return NextResponse.json({ message: "Erreur de récupération des cours." }, { status: 500 });
        }
    
        return NextResponse.json(data, { status: 200 });
    }
    }

    const { data: session } = useSession();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await fetch('/api/courses');
            const data = await res.json();
            setCourses(data);
        };

        fetchCourses();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Bienvenue, {session?.user?.email} 👋</h1>

            <h2 className="mt-4 text-xl font-semibold">Liste des cours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {courses.map((course: any) => (
                    <div key={course.id} className="p-4 bg-white shadow-lg rounded-lg">
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.description}</p>
                        <p className="mt-2 text-blue-500">{course.instrument} - {course.level}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}