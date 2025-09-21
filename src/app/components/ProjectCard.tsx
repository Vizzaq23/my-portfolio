type ProjectCardProps = {
  title: string;
  description: string;
  color: "blue" | "green" | "purple";
};

export default function ProjectCard({ title, description, color }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:scale-105 transition">
      <h3 className={`text-xl font-bold mb-2 text-${color}-600`}>{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <a
        href="https://github.com/Vizzaq23"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block bg-${color}-600 text-white px-4 py-2 rounded-lg hover:bg-${color}-700`}
      >
        View on GitHub
      </a>
    </div>
  );
}
