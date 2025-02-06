import Link from "next/link";
import { Card } from "./components/Card";

export default function Home() {
  const courses = [
    {
      title: "Mon tableau de bord",
      description: "Retrouvez l'intégralité de vos cours, votre emploi du temps et votre suivi de notes.",
      image: "https://source.unsplash.com/400x300/?piano",
      link: "/dashboard/",
    },
    {
      title: "Actualité de l'école",
      description: "Suivez l'actualité de l'école et inscrivez-vous aux cours disponibles.",
      image: "",
      link: "/courses/guitar",
    },
  ];
  return (
    <div className="mx-auto min-h-8">
      <header className="flex justify-center mt-10">
        <Link href="/" className="text-2xl font-bold">
          Bienvenue sur votre site 🎵 AdMusic
        </Link>
      </header>

      <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-6">Nos Cours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <Card key={index} {...course} />
        ))}
      </div>
    </div>
  </div>
  )
};