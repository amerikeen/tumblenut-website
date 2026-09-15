"use client";

import type { CSSProperties } from "react";

/**
 * Logo3D — the AMERIKEEN shield, lifted verbatim from amerikeen-website.
 *
 * Ported unchanged apart from two things: `next/image` became a plain `<img>`
 * (this app is Vite, not Next) and the unused `sizes` hint went with it. The
 * geometry, the twelve edge layers, the clip path and all three animations are
 * byte-for-byte the originals, so the mark reads identically on both sites.
 * Keep it that way — it is the same logo, not a copy of it.
 *
 * Originally: Manus-style 3D AMERIKEEN shield.
 *
 * Built from 12 solid-color "edge" layers each clipped to the shield silhouette
 * and pushed progressively back along Z, plus the actual logo PNG as the front
 * face. The whole stack is rocked, floated, and glowed via three independent
 * CSS animations on nested wrappers (so the transforms don't fight each other).
 *
 * Three motion layers (in DOM order, outermost→innermost):
 *   1. shield-glow-wrap   — animates `filter: drop-shadow(...)` (3s)
 *   2. shield-float-wrap  — animates `transform: translateY()` (4s)
 *   3. shield-rock-wrap   — animates `transform: rotateY(±38°)` (20s)
 *
 * Animations are defined in globals.css under @layer utilities.
 *
 * Size is controlled via the `className` prop using Tailwind classes
 * (e.g., "w-24 h-24 md:w-[115px] md:h-[115px]") so the same component
 * adapts to mobile and desktop without rendering twice.
 */

const SHIELD_CLIP_PATH =
  'polygon(49.92% 19.39%, 53.48% 19.82%, 56.99% 20.52%, 60.60% 21.13%, 64.27% 22.07%, 68.23% 23.07%, 72.43% 24.42%, 76.57% 26.48%, 76.64% 31.50%, 76.62% 35.87%, 76.33% 39.85%, 76.44% 43.44%, 76.09% 46.93%, 76.06% 50.37%, 75.38% 53.75%, 74.46% 57.10%, 73.09% 60.31%, 71.45% 63.46%, 69.39% 66.40%, 67.04% 69.24%, 64.27% 71.79%, 61.20% 74.18%, 57.80% 76.36%, 54.07% 78.49%, 49.92% 80.33%, 45.76% 78.49%, 42.03% 76.36%, 38.63% 74.18%, 35.46% 71.96%, 32.79% 69.24%, 30.44% 66.40%, 28.38% 63.46%, 26.74% 60.31%, 25.37% 57.10%, 24.45% 53.75%, 23.77% 50.37%, 23.55% 46.93%, 23.39% 43.44%, 23.50% 39.85%, 23.21% 35.87%, 23.19% 31.50%, 23.26% 26.48%, 27.54% 24.56%, 31.60% 23.07%, 35.46% 21.90%, 39.23% 21.13%, 42.79% 20.33%, 46.35% 19.82%)';

// Each entry is a depth layer: how far back along Z it sits and what
// shade of navy fills it. The progression matches the Manus reference —
// darkest deepest layer, brighter as we approach the front face.
const EDGE_LAYERS: { z: number; color: string }[] = [
  { z: -13.2, color: 'rgb(11,17,46)' },
  { z: -12.1, color: 'rgb(12,19,50)' },
  { z: -11.0, color: 'rgb(14,22,58)' },
  { z: -9.9, color: 'rgb(15,24,63)' },
  { z: -8.8, color: 'rgb(17,27,71)' },
  { z: -7.7, color: 'rgb(18,28,75)' },
  { z: -6.6, color: 'rgb(20,32,84)' },
  { z: -5.5, color: 'rgb(21,33,88)' },
  { z: -4.4, color: 'rgb(23,36,96)' },
  { z: -3.3, color: 'rgb(24,38,100)' },
  { z: -2.2, color: 'rgb(26,41,109)' },
  { z: -1.1, color: 'rgb(27,43,113)' },
];

interface Logo3DProps {
  /** Tailwind sizing classes for the outer container (e.g. "w-24 h-24"). */
  className?: string;
}

export function Logo3D({ className = "" }: Logo3DProps) {
  const layerBase: CSSProperties = {
    position: 'absolute',
    inset: 0,
    clipPath: SHIELD_CLIP_PATH,
    WebkitClipPath: SHIELD_CLIP_PATH,
    backfaceVisibility: 'hidden',
  };

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        perspective: '500px',
        perspectiveOrigin: '50% 50%',
      }}
      aria-label="AMERIKEEN"
    >
      {/* glow → float → rock — three nested animation wrappers */}
      <div className="shield-glow-wrap">
        <div className="shield-float-wrap">
          <div className="shield-rock-wrap">
            {EDGE_LAYERS.map((layer, i) => (
              <div
                key={i}
                aria-hidden
                style={{
                  ...layerBase,
                  backgroundColor: layer.color,
                  transform: `translateZ(${layer.z}px)`,
                }}
              />
            ))}
            {/* Front face: actual logo, clipped to shield silhouette so it
                aligns perfectly with the edge stack during rotation. */}
            <div
              style={{
                ...layerBase,
                transform: 'translateZ(0px)',
                zIndex: 20,
              }}
            >
              <img
                src="/brand/amerikeen/logo.png"
                alt="AMERIKEEN"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
