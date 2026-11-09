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

/* ── Section header (centered) ── */
export const sectionHeaderSx = {
  textAlign: "center",
  mb: { xs: 5, md: 8 },
};

export const sectionLabelSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
  mb: 1.5,
};

export const labelBarSx = {
  width: 30,
  height: 3,
  borderRadius: 2,
  bgcolor: colors.secondary.main,
};

export const labelTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: { xs: "0.85rem", md: "0.9rem" },
  fontWeight: 800,
  letterSpacing: 2.5,
  textTransform: "uppercase",
  color: colors.secondary.main,
};

export const sectionTitleSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "2.2rem", md: "3rem" },
  fontWeight: 900,
  color: colors.text.primary,
  lineHeight: 1.1,
  letterSpacing: "-0.5px",
};

/* ── 2-column grid ── */
export const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
  gap: { xs: 3.5, md: 4 },
  alignItems: "stretch",
};

/* ── Shared card chrome ── */
const cardBase = {
  position: "relative",
  overflow: "hidden",
  borderRadius: { xs: "24px", md: "28px" },
  p: { xs: 3, sm: 4, md: 5 },
  display: "flex",
  flexDirection: "column",
};

/* Left: dark Preamble card */
export const preambleCardSx = {
  ...cardBase,
  bgcolor: colors.primary.dark,
  border: "1px solid rgba(212,160,23,0.25)",
  boxShadow: "0 24px 60px rgba(10,16,40,0.25)",
};

export const cardDotsSx = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage:
    "radial-gradient(rgba(212,160,23,0.06) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

export const cardGlowSx = {
  position: "absolute",
  top: "-20%",
  right: "-15%",
  width: 320,
  height: 320,
  borderRadius: "50%",
  background: `radial-gradient(circle, ${colors.secondary.main}22 0%, transparent 70%)`,
  pointerEvents: "none",
};

/* Right: light Foundation card */
export const foundationCardSx = {
  ...cardBase,
  bgcolor: "white",
  border: `1px solid ${colors.divider}`,
  boxShadow: "0 20px 50px rgba(10,16,40,0.08)",
};

export const cardTagSx = (dark) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 1.2,
  mb: 1.5,
  position: "relative",
  zIndex: 1,
  "& .tag-text": {
    fontFamily: typography.fontFamily.body,
    fontSize: "0.9rem",
    fontWeight: 800,
    letterSpacing: 2.2,
    textTransform: "uppercase",
    color: dark ? colors.secondary.light : colors.secondary.main,
  },
});

export const cardHeadingSx = (dark) => ({
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1.9rem", md: "2.4rem" },
  fontWeight: 900,
  color: dark ? "white" : colors.text.primary,
  lineHeight: 1.15,
  letterSpacing: "-0.5px",
  mb: 3,
  position: "relative",
  zIndex: 1,
});

export const bodyCopySx = (dark) => ({
  fontFamily: typography.fontFamily.body,
  fontSize: { xs: "1.08rem", md: "1.15rem" },
  fontWeight: 500,
  color: dark ? "rgba(255,255,255,0.82)" : colors.text.secondary,
  lineHeight: 1.85,
  mb: 2.5,
  position: "relative",
  zIndex: 1,
});

/* Scripture highlight inside the Preamble card */
export const scriptureBlockSx = {
  position: "relative",
  zIndex: 1,
  bgcolor: "rgba(212,160,23,0.1)",
  borderLeft: `4px solid ${colors.secondary.main}`,
  borderRadius: "0 18px 18px 0",
  px: { xs: 2.5, md: 3.5 },
  py: { xs: 2.5, md: 3 },
  mb: 3,
};

export const scriptureTextSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1.2rem", md: "1.35rem" },
  fontWeight: 700,
  fontStyle: "italic",
  color: "white",
  lineHeight: 1.65,
};

export const scriptureRefSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: "1rem",
  fontWeight: 800,
  color: colors.secondary.light,
  mt: 1.5,
};

/* Closing line highlight */
export const closingLineSx = (dark) => ({
  position: "relative",
  zIndex: 1,
  mt: "auto",
  pt: 2.5,
  borderTop: `1px solid ${dark ? "rgba(255,255,255,0.15)" : colors.divider}`,
  fontFamily: typography.fontFamily.heading,
  fontSize: { xs: "1.1rem", md: "1.2rem" },
  fontWeight: 800,
  color: dark ? colors.secondary.light : colors.text.primary,
  lineHeight: 1.6,
});

/* Registration badge in the Foundation card */
export const rcBadgeSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.8,
  bgcolor: `${colors.secondary.main}12`,
  border: `1.5px solid ${colors.secondary.main}40`,
  borderRadius: "18px",
  px: { xs: 2, md: 2.5 },
  py: 1.8,
  mb: 3,
};

export const rcBadgeLabelSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.85rem",
  fontWeight: 700,
  color: colors.text.secondary,
  lineHeight: 1.3,
};

export const rcBadgeValueSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1.2rem", md: "1.35rem" },
  fontWeight: 900,
  color: colors.text.primary,
  lineHeight: 1.25,
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
  px: { xs: 4.5, md: 5.5 },
  py: { xs: 1.8, md: 2 },
  borderRadius: "999px",
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: "1.1rem",
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
export const colSx = { display: "flex", flexDirection: "column" };
export const columnHeadingSx = cardHeadingSx(false);
export const columnBodySx = bodyCopySx(false);
export const bodyTextSx = columnBodySx;
export const headingSx = columnHeadingSx;
export const headGoldSx = {
  background: `linear-gradient(120deg, ${colors.secondary.dark}, ${colors.secondary.main}, ${colors.secondary.light})`,
  backgroundSize: "200%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "ab_gradShift 4s ease infinite",
};
