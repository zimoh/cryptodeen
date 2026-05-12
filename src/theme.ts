import { HalalGrade } from "@/types";

export const colors = {
  background: "#f7f8f6",
  surface: "#ffffff",
  surfaceMuted: "#eef2ef",
  ink: "#17211d",
  muted: "#65736d",
  border: "#dfe5e1",
  accent: "#0f7a4f",
  danger: "#9f1d21",
  warning: "#a96500",
};

export const gradeColors: Record<HalalGrade, { bg: string; fg: string; border: string }> = {
  A: { bg: "#d8f4e5", fg: "#08613c", border: "#9ed8b8" },
  B: { bg: "#e7f7d4", fg: "#3f6f0c", border: "#bee58b" },
  C: { bg: "#fff0c2", fg: "#805000", border: "#e7c35c" },
  D: { bg: "#ffe0d9", fg: "#9a2b18", border: "#eead9d" },
  E: { bg: "#2b1114", fg: "#fff4f0", border: "#6b2429" },
};

export const typeScale = {
  h1: 30,
  h2: 21,
  body: 15,
  small: 13,
  tiny: 11,
};
