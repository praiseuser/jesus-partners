import { colors, typography } from "../../../../theme";

export const keyframes = {
  "@keyframes ab_rise": {
    from: { opacity: 0, transform: "translateY(50px) scale(0.95)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ab_left": {
    from: { opacity: 0, transform: "translateX(-50px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ab_right": {
    from: { opacity: 0, transform: "translateX(50px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ab_imgFloat": {
    "0%,100%": { transform: "translateY(0) rotate(-1deg)" },
    "50%": { transform: "translateY(-16px) rotate(1deg)" },
  },
  "@keyframes ab_imgGlow": {
    "0%,100%": { opacity: 0.4, transform: "scale(1)" },
    "50%": { opacity: 0.8, transform: "scale(1.1)" },
  },
  "@keyframes ab_imgIn": {
    from: { opacity: 0, transform: "scale(0.8) rotate(-8deg)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ab_pulse": {
    "0%,100%": { boxShadow: `0 0 0 0 ${colors.secondary.main}50` },
    "50%": { boxShadow: `0 0 0 12px ${colors.secondary.main}00` },
  },
  "@keyframes ab_shimmer": { from: { left: "-80%" }, to: { left: "130%" } },
  "@keyframes ab_spin": { to: { transform: "rotate(360deg)" } },
  "@keyframes ab_gradShift": {
    "0%,100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
  "@keyframes ab_lineGrow": { from: { width: 0 }, to: { width: 48 } },
  "@keyframes ab_ringPulse": {
    "0%": { transform: "scale(1)", opacity: 0.5 },
    "100%": { transform: "scale(2)", opacity: 0 },
  },
};

export const wrapSx = {
  bgcolor: colors.background.default,
  py: { xs: 8, md: 13 },
  position: "relative",
  overflow: "hidden",
};

export const bgPatternSx = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage: `radial-gradient(${colors.secondary.main}12 1.5px, transparent 1.5px)`,
  backgroundSize: "28px 28px",
};

// Simplified orb helper — picks accent color + opacity internally
export const orbSx = (top, left, right, bottom, size, delay = "0s") => ({
  position: "absolute",
  top,
  left,
  right,
  bottom,
  pointerEvents: "none",
  width: size,
  height: size,
  borderRadius: "50%",
  background: `radial-gradient(circle, ${colors.secondary.main}10 0%, transparent 70%)`,
  animation: `ab_imgGlow 6s ease-in-out ${delay} infinite`,
});

/* ── 6 / 6 Grid layout ── */
export const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
  gap: { xs: 5, md: 7 },
  alignItems: "start",
};

export const colSx = {
  display: "flex",
  flexDirection: "column",
};

export const sectionLabelSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1.2,
  mb: 1.5,
};

export const labelBarSx = {
  width: 28,
  height: 3,
  borderRadius: 2,
  bgcolor: colors.secondary.main,
};

export const labelTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.xs,
  fontWeight: 700,
  letterSpacing: 2.5,
  textTransform: "uppercase",
  color: colors.secondary.main,
};

export const columnHeadingSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1.7rem", md: "2.1rem" },
  fontWeight: 900,
  color: colors.text.primary,
  lineHeight: 1.15,
  letterSpacing: "-0.5px",
  mb: 2,
};

export const columnBodySx = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  color: colors.text.secondary,
  lineHeight: 1.9,
  mb: 2,
};

/* ── Divider + Read More ── */
export const dividerSx = {
  height: 1,
  mt: { xs: 5, md: 7 },
  background: `linear-gradient(90deg, transparent, ${colors.secondary.main}50, transparent)`,
};

export const readMoreWrapSx = {
  display: "flex",
  justifyContent: "center",
  mt: { xs: 4, md: 5 },
};

export const readMoreBtnSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  bgcolor: colors.secondary.main,
  color: "white",
  px: 4,
  py: 1.6,
  borderRadius: "10px",
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.sm,
  fontWeight: 800,
  letterSpacing: 0.5,
  boxShadow: `0 10px 30px ${colors.secondary.main}44`,
  transition: "all .3s cubic-bezier(.34,1.2,.64,1)",
  "&:hover": {
    transform: "translateY(-4px) scale(1.04)",
    boxShadow: `0 18px 44px ${colors.secondary.main}55`,
  },
};

/* ── Legacy exports kept in case other files still import these ── */
export const headingSx = columnHeadingSx;
export const headGoldSx = {
  background: `linear-gradient(120deg, ${colors.secondary.dark}, ${colors.secondary.main}, ${colors.secondary.light})`,
  backgroundSize: "200%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "ab_gradShift 4s ease infinite",
};
export const bodyTextSx = columnBodySx;