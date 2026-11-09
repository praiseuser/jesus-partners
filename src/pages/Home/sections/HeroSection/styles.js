import { typography } from "../../../../theme";

const GOLD = "#D4A017";
const GOLD_LIGHT = "#F0C040";
const NAVY = "#0A1028";

export const keyframes = {
  "@keyframes hero_fadeUp": {
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes hero_fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
  "@keyframes hero_lineGrow": {
    from: { width: 0, opacity: 0 },
    to: { width: 90, opacity: 1 },
  },
  "@keyframes hero_gradShift": {
    "0%,100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
  // slow, gentle zoom on the background photos
  "@keyframes hero_zoom": {
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.09)" },
  },
  "@keyframes hero_scrollDot": {
    "0%": { transform: "translateY(0)", opacity: 0 },
    "30%": { opacity: 1 },
    "100%": { transform: "translateY(18px)", opacity: 0 },
  },
};

export const heroWrapSx = {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  bgcolor: NAVY,
};

/* Overlays: an even navy tint for readability, a darker base, and a soft vignette */
export const overlayLayersSx = [
  {
    position: "absolute",
    inset: 0,
    background: "rgba(10,16,40,0.5)",
    zIndex: 1,
  },
  {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,16,40,0.9) 0%, rgba(10,16,40,0.35) 45%, rgba(10,16,40,0.55) 100%)",
    zIndex: 1,
  },
  {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, rgba(10,16,40,0.55) 100%)",
    zIndex: 1,
  },
];

export const contentWrapSx = {
  position: "relative",
  zIndex: 10,
  textAlign: "center",
  px: { xs: 3, md: 4 },
  py: { xs: 12, md: 14 },
  maxWidth: 900,
  mx: "auto",
};

/* Eyebrow: text with a small gold line on each side */
export const eyebrowSx = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: { xs: 1.5, md: 2 },
  mb: { xs: 3, md: 4 },
  animation: "hero_fadeUp .7s ease .2s both",
};

export const eyebrowLineSx = {
  width: { xs: 24, md: 44 },
  height: 2,
  bgcolor: GOLD,
  borderRadius: 2,
  flexShrink: 0,
};

export const eyebrowTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: { xs: "0.8rem", md: "0.9rem" },
  fontWeight: 700,
  color: GOLD_LIGHT,
  letterSpacing: 2.5,
  textTransform: "uppercase",
  lineHeight: 1.5,
};

export const titleSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "2.9rem", sm: "4rem", md: "5.2rem", lg: "5.8rem" },
  fontWeight: 900,
  color: "white",
  lineHeight: 1.05,
  letterSpacing: "-1.5px",
  mb: { xs: 2.5, md: 3 },
  animation: "hero_fadeUp .8s ease .4s both",
  textShadow: "0 4px 30px rgba(0,0,0,0.45)",
};

export const titleGoldSx = {
  display: "block",
  background: `linear-gradient(120deg, #B8860B, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, #B8860B)`,
  backgroundSize: "200% 200%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "hero_gradShift 6s ease infinite",
  textShadow: "none",
};

export const subtitleSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
  fontWeight: 600,
  color: "rgba(255,255,255,0.92)",
  lineHeight: 1.5,
  mb: { xs: 3, md: 3.5 },
  animation: "hero_fadeUp .8s ease .6s both",
  textShadow: "0 2px 18px rgba(0,0,0,0.55)",
};

export const wordGoldSx = {
  fontStyle: "italic",
  fontWeight: 800,
  color: GOLD_LIGHT,
};

export const dividerLineSx = {
  width: 90,
  height: 3,
  mx: "auto",
  borderRadius: 2,
  background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
  animation: "hero_lineGrow .8s ease .8s both",
};

export const buttonsRowSx = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  alignItems: "center",
  justifyContent: "center",
  gap: { xs: 2, sm: 3 },
  mt: { xs: 5, md: 6 },
  animation: "hero_fadeUp .8s ease 1s both",
};

const btnBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1.2,
  minWidth: { xs: 240, sm: 200 },
  px: { xs: 4, md: 5 },
  py: { xs: 1.7, md: 2 },
  borderRadius: "999px",
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: { xs: "1rem", md: "1.05rem" },
  fontWeight: 800,
  letterSpacing: 1,
  transition: "all .3s ease",
};

export const btnPrimarySx = {
  ...btnBase,
  bgcolor: GOLD,
  color: NAVY,
  border: `2px solid ${GOLD}`,
  boxShadow: "0 10px 30px rgba(212,160,23,0.35)",
  "&:hover": {
    bgcolor: GOLD_LIGHT,
    borderColor: GOLD_LIGHT,
    transform: "translateY(-3px)",
    boxShadow: "0 16px 40px rgba(212,160,23,0.5)",
  },
};

export const btnSecSx = {
  ...btnBase,
  bgcolor: "rgba(255,255,255,0.08)",
  color: "white",
  border: "2px solid rgba(255,255,255,0.55)",
  backdropFilter: "blur(8px)",
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.18)",
    borderColor: "white",
    transform: "translateY(-3px)",
  },
};

export const scrollIndicatorSx = {
  position: "absolute",
  bottom: 28,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
  cursor: "pointer",
  zIndex: 10,
  animation: "hero_fadeIn 1s ease 1.6s both",
};

export const scrollTrackSx = {
  position: "relative",
  width: 2,
  height: 34,
  bgcolor: "rgba(255,255,255,0.25)",
  borderRadius: 2,
  overflow: "hidden",
};

export const scrollDotSx = {
  position: "absolute",
  top: 0,
  left: 0,
  width: 2,
  height: 14,
  bgcolor: GOLD_LIGHT,
  borderRadius: 2,
  animation: "hero_scrollDot 1.8s ease-in-out infinite",
};
