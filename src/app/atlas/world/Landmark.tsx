import Image from "next/image";
import type { Project } from "@/data/projects";
import type { LandmarkKind } from "./journey";

/** Original code-drawn scenery; the window is always the real project media. */
export default function Landmark({ kind, project, place }: { kind: LandmarkKind; project: Project; place: string }) {
  return <div className={`journey-landmark journey-landmark-${kind}`} aria-hidden="true">
    <svg viewBox="0 0 320 320" className="journey-building" shapeRendering="crispEdges" focusable="false">
      {kind === "ship" ? <>
        <path fill="#163c50" d="M20 244h280v24h-16v16h-24v12H68v-12H44v-16H20z" />
        <path fill="#b66d3f" d="M28 248h264v16h-16v12h-24v12H76v-12H52v-12H28z" />
        <path fill="#f4d17e" d="M20 240h280v12H20zM152 16h8v226h-8z" />
        <path fill="#fff0c5" d="M168 38h84v12h12v98h-96zM144 46H80v14H64v90h80z" />
        <path fill="#c95549" d="M168 40h20v106h-20zM218 40h20v106h-20z" />
        <path fill="#193c51" d="M76 162h168v80H76z" />
        <path fill="#e8b565" d="M68 154h184v12H68z" />
        <path fill="#163c50" d="M88 266h24v12H88zM148 266h24v12h-24zM208 266h24v12h-24z" />
      </> : kind === "arcade" ? <>
        <path fill="#17394d" d="M72 44h180v16h16v40h-16v124h24v24h-12v56H56v-56H44v-24h28V104H56V60h16z" />
        <path fill="#c9564c" d="M80 52h164v44H80zM64 256h192v40H64z" />
        <path fill="#f3cf75" d="M72 104h180v8H72zM72 244h180v8H72z" />
        <path fill="#305b73" d="M80 112h164v124H80z" />
        <path fill="#5e8190" d="M52 228h216v16H52z" />
        <path fill="#142f43" d="M104 216h8v16h-8zM184 216h8v16h-8zM140 266h40v20h-40z" />
        <path fill="#f3d06f" d="M100 212h16v8h-16zM180 212h16v8h-16zM124 232h8v4h-8zM204 232h8v4h-8z" />
        <path fill="#efaaa0" d="M76 58h8v32h-8zM240 58h8v32h-8z" />
        <path fill="#16374b" d="M44 304h232v8H44z" />
      </> : kind === "trainer" ? <>
        <path fill="#1c4357" d="M36 112h248v184H36z" />
        <path fill="#56818a" d="M44 120h232v168H44z" />
        <path fill="#e5c77b" d="M28 92h264v24H28z" />
        <path fill="#244b5d" d="M60 72h200v24H60zM60 288h200v16H60z" />
        <path fill="#e6c273" d="M136 16h48v8h16v16h8v32h-8v16h-16v8h-48v-8h-16V72h-8V40h8V24h16z" />
        <path fill="#ad4840" d="M140 28h40v8h12v40h-12v8h-40v-8h-12V36h12z" />
        <path fill="#f9e6b3" d="M148 40h24v24h-24z" />
        <path fill="#183749" d="M60 144h200v124H60z" />
        <path fill="#f5de9d" d="M48 128h8v148h-8zM264 128h8v148h-8z" />
      </> : kind === "workshop" ? <>
        <path fill="#17394d" d="M40 108h240v192H40zM28 92h264v16H28zM48 76h224v16H48zM68 60h184v16H68zM88 44h144v16H88zM108 28h104v16H108z" />
        <path fill="#b8764c" d="M48 116h224v176H48z" />
        <path fill="#eccb87" d="M72 88h176v24H72zM60 132h200v140H60z" />
        <path fill="#794b35" d="M44 144h12v8H44zM264 180h12v8h-12zM44 220h12v8H44zM264 252h12v8h-12z" />
        <path fill="#17394d" d="M68 148h184v112H68z" />
        <path fill="#45677a" d="M32 296h256v16H32z" />
      </> : kind === "garden" ? <>
        <path fill="#496d43" d="M44 148h12v148H44zM264 148h12v148h-12zM44 144h232v12H44z" />
        <path fill="#946daf" d="M36 104h16V88h20V72h36v16h24v20h-20v24H52v-12H36zM204 88h24V72h32v16h20v24h-12v20h-64z" />
        <path fill="#b59bcc" d="M52 96h20V84h24v24H84v12H52zM220 92h32v24h-32z" />
        <path fill="#ead3a0" d="M68 156h184v124H68z" />
        <path fill="#234f3c" d="M24 280h64v16H24zM236 280h64v16h-64z" />
      </> : <>
        <path fill="#16374b" d="M48 100h224v196H48z" />
        <path fill={kind === "shop" || kind === "cards" ? "#e6c287" : "#346279"} d="M56 108h208v180H56z" />
        <path fill="#122e43" d="M36 60h248v52H36z" />
        <path fill={kind === "shop" ? "#bb4e49" : kind === "research" ? "#569c8a" : "#eac46e"} d="M44 68h232v32H44z" />
        {(kind === "shop" || kind === "cards") && <>
          <path fill="#fff0cf" d="M40 110h240v28H40z" />
          <path fill="#be514c" d="M40 110h24v32H40zM88 110h24v32H88zM136 110h24v32h-24zM184 110h24v32h-24zM232 110h24v32h-24z" />
        </>}
        <path fill="#142c3c" d="M72 150h176v114H72z" />
        <path fill="#f2cc72" d="M68 146h184v8H68zM68 258h184v8H68z" />
        <path fill="#153448" d="M100 280h120v16H100z" />
        <path fill="#e8c786" d="M44 292h232v12H44zM32 304h256v8H32z" />
        {(kind === "lab" || kind === "research") && <>
          <path fill="#193d50" d="M152 16h8v44h-8zM124 28h64v8h-64z" />
          <path fill="#ffe39a" d="M148 8h16v16h-16z" />
          {kind === "research" && <><path fill="#366677" d="M216 40h16V16h16v8h24v16h-24v8h-16v12h-16z" /><path fill="#e9cc84" d="M264 20h12v24h-12z" /></>}
          {kind === "lab" && <><path fill="#294b60" d="M80 24h20v32H80zM64 40h52v16H64z" /><path fill="#f0c86c" d="M84 12h12v20H84zM52 44h20v8H52zM108 44h20v8h-20z" /></>}
        </>}
      </>}
    </svg>
    <span className="journey-building-name">{place}</span>
    <span className="journey-building-media">
      <Image src={project.image} alt="" fill sizes="180px" unoptimized={project.image.endsWith(".svg")} loading="lazy" />
    </span>
  </div>;
}
