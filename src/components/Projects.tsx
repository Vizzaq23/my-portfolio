"use client";

import Image from "next/image";

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "AI Game Balancer",
    description:
      "A tool that analyzes multiplayer matches and balances weapons using K/D ratios. Built with Flask + Streamlit.",
    image: "/projects/game-balancer.png",
    link: "https://github.com/Vizzaq23/ai-game-balancer",
  },
  {
    title: "Unity AI Trainer",
    description:
      "An FPS prototype where enemies adapt dynamically to the player’s performance. Built with Unity + C#.",
    image: "/projects/unity-trainer.png",
    link: "https://github.com/Vizzaq23/unity-ai-trainer",
  },
  {
    title: "Sentari Dashboard",
    description:
      "Admin dashboard for referral tracking and user analytics at Sentari AI. Built with Next.js + Supabase.",
    image: "/projects/sentari-dashboard.png",
    link: "https://github.com/Vizzaq23",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-sky-200 to-sky-100 py-20 px-6"
    >
      <h2 className="text-3xl md:text-5xl font-extrabold text-yellow-500 mb-12 text-center drop-shadow-[2px_2px_0px_#000000]">
        My Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-yellow-200 border-4 border-yellow-600 
                       shadow-[4px_4px_0px_#000000] rounded-md overflow-hidden 
                       hover:translate-y-[-6px] hover:shadow-[6px_6px_0px_#000000] transition"
          >
            {/* Project Image with Pixel Border */}
            <div
              className="relative w-full h-40 border-b-4 border-yellow-600 
                         flex items-center justify-center bg-black"
            >
              <div className="relative w-[95%] h-[90%] border-4 border-yellow-600 shadow-[3px_3px_0px_#000000]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="p-4 text-black flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-2 text-center">
                {project.title}
              </h3>
              <p className="text-sm font-normal flex-1">{project.description}</p>
            </div>

            {/* Hover Label */}
            <div className="bg-yellow-600 text-white text-center py-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition">
              ➡ View Project
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
