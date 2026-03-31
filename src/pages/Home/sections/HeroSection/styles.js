import { typography } from "../../../../theme";

export const keyframes = {
  "@keyframes hero_fadeUp": {
    from: { opacity: 0, transform: "translateY(60px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes hero_fadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
  "@keyframes hero_scaleIn": {
    from: { opacity: 0, transform: "scale(0.85)" },
    to: { opacity: 1, transform: "scale(1)" },
  },
  "@keyframes hero_shimmer": { from: { left: "-100%" }, to: { left: "150%" } },
  "@keyframes hero_float": {
    "0%,100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-14px)" },
  },
  "@keyframes hero_pulse": {
    "0%,100%": { opacity: 0.6, transform: "scale(1)" },
    "50%": { opacity: 1, transform: "scale(1.08)" },
  },
  "@keyframes hero_cloudDrift": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(40px)" },
  },
  "@keyframes hero_gradShift": {
    "0%,100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
  "@keyframes hero_wordGlow": {
    "0%,100%": {
      textShadow:
        "0 0 20px rgba(212,160,23,0.6), 0 0 40px rgba(212,160,23,0.3)",
    },
    "50%": {
      textShadow:
        "0 0 40px rgba(212,160,23,1), 0 0 80px rgba(212,160,23,0.6), 0 0 120px rgba(212,160,23,0.3)",
    },
  },
  "@keyframes hero_lineGrow": {
    from: { width: 0, opacity: 0 },
    to: { width: "100%", opacity: 1 },
  },
  "@keyframes hero_btnPulse": {
    "0%,100%": { boxShadow: "0 0 0 0 rgba(26,26,46,0.6)" },
    "50%": { boxShadow: "0 0 0 14px rgba(26,26,46,0)" },
  },
  "@keyframes hero_particleFloat": {
    "0%": { transform: "translateY(0px) translateX(0px)", opacity: 0 },
    "10%": { opacity: 1 },
    "90%": { opacity: 1 },
    "100%": { transform: "translateY(-120px) translateX(30px)", opacity: 0 },
  },
  "@keyframes hero_crossSpin": {
    "0%": { transform: "rotate(0deg) scale(1)", opacity: 0.15 },
    "50%": { transform: "rotate(180deg) scale(1.1)", opacity: 0.25 },
    "100%": { transform: "rotate(360deg) scale(1)", opacity: 0.15 },
  },
  "@keyframes hero_scrollBounce": {
    "0%,100%": { transform: "translateY(0) translateX(-50%)" },
    "50%": { transform: "translateY(8px) translateX(-50%)" },
  },
};

export const heroWrapSx = {
  position: "relative",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

export const bgImgSx = {
  position: "absolute",
  inset: 0,
  backgroundImage: "url(/hero.png)",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  backgroundRepeat: "no-repeat",
  transform: "scale(1.05)",
  animation: "hero_float 12s ease-in-out infinite",
};

export const overlayLayersSx = [
  /* deep navy gradient from bottom */
  {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(10,16,40,0.92) 0%, rgba(10,16,40,0.55) 40%, rgba(10,16,40,0.15) 70%, transparent 100%)",
  },
  /* subtle top darkening for navbar contrast */
  {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(10,16,40,0.55) 0%, transparent 30%)",
  },
  /* center radial light burst */
  {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(255,255,255,0.07) 0%, transparent 70%)",
  },
];

export const decoCircleSx = (size, top, left, right, bottom, delay) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
  top,
  left,
  right,
  bottom,
  pointerEvents: "none",
  border: "1px solid rgba(212,160,23,0.18)",
  animation: `hero_pulse ${5 + delay}s ease-in-out ${delay}s infinite`,
});

export const crossDecoSx = (size, top, left, right, bottom, delay) => ({
  position: "absolute",
  top,
  left,
  right,
  bottom,
  width: size,
  height: size,
  pointerEvents: "none",
  opacity: 0.15,
  animation: `hero_crossSpin ${18 + delay * 4}s linear ${delay}s infinite`,
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    bgcolor: "rgba(212,160,23,0.6)",
    borderRadius: "3px",
  },
  "&::before": { width: "12%", height: "100%", left: "44%", top: 0 },
  "&::after": { width: "100%", height: "12%", top: "44%", left: 0 },
});

export const particleSx = (left, delay, duration) => ({
  position: "absolute",
  bottom: "15%",
  left,
  width: 4,
  height: 4,
  borderRadius: "50%",
  bgcolor: "rgba(212,160,23,0.7)",
  boxShadow: "0 0 8px rgba(212,160,23,0.8)",
  animation: `hero_particleFloat ${duration}s ease-in-out ${delay}s infinite`,
  pointerEvents: "none",
});

export const contentWrapSx = {
  position: "relative",
  zIndex: 10,
  textAlign: "center",
  px: { xs: 3, md: 4 },
  maxWidth: 820,
  mx: "auto",
  pt: { xs: 2, md: 0 },
};

export const eyebrowSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
  bgcolor: "rgba(212,160,23,0.12)",
  border: "1px solid rgba(212,160,23,0.35)",
  borderRadius: "100px",
  px: 2.5,
  py: 0.8,
  mb: 3.5,
  backdropFilter: "blur(10px)",
  animation: "hero_fadeUp .7s cubic-bezier(.34,1.2,.64,1) .2s both",
};

export const eyebrowDotSx = {
  width: 7,
  height: 7,
  borderRadius: "50%",
  bgcolor: "#D4A017",
  boxShadow: "0 0 8px rgba(212,160,23,0.9)",
  animation: "hero_pulse 2s ease infinite",
};

export const eyebrowTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.72rem",
  fontWeight: 700,
  color: "#F0C040",
  letterSpacing: 2.5,
  textTransform: "uppercase",
};

export const titleSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "2.4rem", sm: "3.4rem", md: "4.6rem", lg: "5.2rem" },
  fontWeight: 900,
  color: "white",
  lineHeight: 1.08,
  letterSpacing: "-1px",
  mb: 0.5,
  animation: "hero_fadeUp .8s cubic-bezier(.34,1.2,.64,1) .4s both",
  textShadow: "0 4px 30px rgba(0,0,0,0.5)",
};

export const titleGoldSx = {
  background:
    "linear-gradient(120deg, #B8860B, #D4A017, #F0C040, #D4A017, #B8860B)",
  backgroundSize: "200% 200%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "hero_gradShift 4s ease infinite",
};

export const subtitleSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.75rem" },
  fontWeight: 600,
  color: "rgba(255,255,255,0.88)",
  lineHeight: 1.5,
  mb: 2,
  animation: "hero_fadeUp .8s cubic-bezier(.34,1.2,.64,1) .6s both",
  textShadow: "0 2px 20px rgba(0,0,0,0.6)",
};

export const wordGoldSx = {
  fontStyle: "italic",
  fontWeight: 800,
  color: "#F0C040",
  animation: "hero_wordGlow 3s ease-in-out infinite",
};

export const dividerLineSx = {
  width: 80,
  height: 2,
  mx: "auto",
  mb: 2.5,
  background: "linear-gradient(90deg, transparent, #D4A017, transparent)",
  animation: "hero_lineGrow .8s ease .8s both",
};

export const taglineSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: { xs: "0.9rem", md: "1.05rem" },
  color: "rgba(255,255,255,0.65)",
  lineHeight: 1.8,
  maxWidth: 500,
  mx: "auto",
  mb: 5,
  animation: "hero_fadeUp .8s ease .8s both",
  fontStyle: "italic",
};

export const btnPrimarySx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1.2,
  bgcolor: "#1A1A2E",
  color: "white",
  px: { xs: 4, md: 5 },
  py: { xs: 1.6, md: 1.9 },
  borderRadius: "6px",
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: { xs: "0.85rem", md: "0.92rem" },
  fontWeight: 800,
  letterSpacing: 2.5,
  textTransform: "uppercase",
  border: "2px solid rgba(255,255,255,0.25)",
  position: "relative",
  overflow: "hidden",
  animation:
    "hero_scaleIn .7s cubic-bezier(.34,1.2,.64,1) 1s both, hero_btnPulse 2.5s ease 2s infinite",
  transition: "all .35s cubic-bezier(.34,1.2,.64,1)",
  "&:hover": {
    bgcolor: "#D4A017",
    borderColor: "#D4A017",
    transform: "translateY(-4px) scale(1.04)",
    boxShadow: "0 20px 50px rgba(212,160,23,0.5)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "60%",
    left: "-100%",
    pointerEvents: "none",
    background:
      "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
  },
  "&:hover::before": { animation: "hero_shimmer .6s ease forwards" },
};

export const btnSecSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1.2,
  bgcolor: "transparent",
  color: "white",
  px: { xs: 4, md: 5 },
  py: { xs: 1.6, md: 1.9 },
  borderRadius: "6px",
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: { xs: "0.85rem", md: "0.92rem" },
  fontWeight: 700,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  border: "2px solid rgba(255,255,255,0.35)",
  animation: "hero_scaleIn .7s cubic-bezier(.34,1.2,.64,1) 1.1s both",
  transition: "all .3s ease",
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.12)",
    borderColor: "rgba(255,255,255,0.7)",
    transform: "translateY(-4px)",
  },
};

export const scrollIndicatorSx = {
  position: "absolute",
  bottom: 32,
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
  animation: "hero_scrollBounce 2s ease-in-out infinite",
  cursor: "pointer",
  zIndex: 10,
};

export const statsRowSx = {
  display: "flex",
  justifyContent: "center",
  gap: { xs: 3, md: 6 },
  flexWrap: "wrap",
  mt: 6,
  mb: 1,
  animation: "hero_fadeUp .8s ease 1.2s both",
};

export const statItemSx = {
  textAlign: "center",
  px: { xs: 2, md: 3 },
  py: 1.5,
  bgcolor: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "14px",
  backdropFilter: "blur(12px)",
  minWidth: 100,
};
