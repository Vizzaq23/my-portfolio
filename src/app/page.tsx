export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-6">
        Hey, I’m Quintin Vizza
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-10">
        Computer Engineering student passionate about AI, web development, and
        building creative projects with a futuristic edge.
      </p>
      <div className="flex gap-4">
        <a
          href="/projects"
          className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition"
        >
          View Projects
        </a>
        <a
          href="/about"
          className="px-6 py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition"
        >
          About Me
        </a>
      </div>
    </section>
  );
}
