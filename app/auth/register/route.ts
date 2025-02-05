import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
