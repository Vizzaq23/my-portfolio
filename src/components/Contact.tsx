"use client";

import FlagPole from "@/components/FlagPole";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative text-center py-20 bg-sky-300 overflow-hidden"
    >
      <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
      <p className="mb-6">Let’s connect and build something amazing!</p>

      {/* FlagPole animation */}
      <FlagPole />

      <div className="mt-8">
        <a
          href="mailto:youremail@example.com"
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Email Me
        </a>
      </div>
    </section>
  );
}
