import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="max-w-5xl mx-auto py-20 px-6 text-center">
      <h2 className="text-4xl font-extrabold mb-10 text-gray-900">
        My Projects
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          title="AI Game Balancer"
          color="blue"
          description="Full-stack tool analyzing multiplayer match data and detecting weapon imbalance."
        />
        <ProjectCard
          title="AI Enemy Balancer"
          color="green"
          description="FPS prototype where enemies adapt difficulty based on player performance."
        />
        <ProjectCard
          title="Sentari AI Pipeline"
          color="purple"
          description="13-step empathy pipeline: transcript → embedding → AI reply → profile update."
        />
      </div>
    </section>
  );
}
