type WorldLabelProps = {
  world: number;
  subtitle: string;
  tone?: "light" | "dark" | "sky";
};

const toneClass = {
  light: "text-ink/80",
  dark: "text-white/90 drop-shadow-[2px_2px_0_#000]",
  sky: "text-sky-100 drop-shadow-[2px_2px_0_#000]",
};

/** Shared “World N — Theme” eyebrow for section flow */
export default function WorldLabel({
  world,
  subtitle,
  tone = "dark",
}: WorldLabelProps) {
  return (
    <p
      className={`mb-2 text-center font-display text-[9px] uppercase tracking-widest sm:text-[10px] ${toneClass[tone]}`}
    >
      World {world} — {subtitle}
    </p>
  );
}
