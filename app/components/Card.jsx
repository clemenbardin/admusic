// components/Card.jsx
import Link from "next/link";

export function Card ({ title, description, image, link }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-80 transform transition-transform duration-300 hover:scale-105">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <Link href={link} className="inline-block mt-3 text-blue-500 hover:underline">
          En savoir plus →
        </Link>
      </div>
    </div>
  );
};