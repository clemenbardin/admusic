import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "../lib/db";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const { data: existingUser, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (existingUser) {
            return NextResponse.json({ message: "Cet e-mail est déjà utilisé." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase.from("users").insert([
            { email, password: hashedPassword, role: "Élève" },
        ]);

        if (error) throw error;

        return NextResponse.json({ message: "Utilisateur créé avec succès." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Erreur lors de l'inscription." }, { status: 500 });
    }
}