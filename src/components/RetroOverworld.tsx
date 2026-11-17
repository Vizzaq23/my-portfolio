import styles from "./hero-landscape.module.css";

/** Decorative image layer; game objects and their collision bounds remain separate. */
export default function RetroOverworld() {
  return (
    <svg className="retro-overworld" viewBox="0 0 960 260" preserveAspectRatio="none" aria-hidden="true">
      <g className={styles.far}>
        <image href="/worlds/hero-polish/landscape.webp" x="-8" y="0" width="976" height="260" preserveAspectRatio="none" />
      </g>
    </svg>
  );
}
