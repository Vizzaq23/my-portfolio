"use client";

export default function NavBar() {
  return (
    <nav
      className="fixed top-0 left-0 w-full h-12 border-b-4 border-black z-50 pixelated animate-brick-scroll flex items-center"
      style={{
        backgroundImage: "url('/brickBlock.png')",
        backgroundRepeat: "repeat-x",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="w-full flex items-center justify-between px-4">
        {/* === Title pinned left === */}
        <h1 className="text-yellow-300 text-lg md:text-xl font-bold pixelated drop-shadow-[2px_2px_0px_#000]">
          Quintin’s Portfolio
        </h1>

        {/* === Mario-style Nav Links === */}
        <ul className="flex space-x-2 text-sm font-bold uppercase">
          <li>
            <a
              href="#projects"
              className="flex items-center space-x-2 px-2 py-1 bg-gray-300 text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_#000] transition"
            >
              <img src="/coin.png" alt="Coin" className="w-4 h-4 pixelated" />
              <span>Projects</span>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="flex items-center space-x-2 px-2 py-1 bg-red-500 text-white border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_#000] transition"
            >
              <img src="/letter.png" alt="Letter" className="w-4 h-4 pixelated" />
              <span>Contact</span>
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="flex items-center space-x-2 px-2 py-1 bg-green-500 text-white border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_#000] transition"
            >
              <img src="/flag.png" alt="Flag" className="w-4 h-4 pixelated" />
              <span>About</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

