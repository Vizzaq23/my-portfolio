export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 drop-shadow-lg mb-6">
        Hey, I’m <span className="text-green-400">Quintin Vizza</span> 👾
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
        Computer Engineering student passionate about AI, web development, 
        and building creative projects with a game-inspired edge.
      </p>
      <div className="flex gap-4">
        <a
          href="/projects"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          View Projects
        </a>
        <a
          href="/about"
          className="px-6 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-gray-900 transition"
        >
          About Me
        </a>
      </div>
      <div className="flex gap-6 mt-8 text-gray-400">
        <a href="https://github.com/Vizzaq23" target="_blank" className="hover:text-blue-400">
          GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" className="hover:text-blue-400">
          LinkedIn
        </a>
      </div>
    </main>
  );
}
