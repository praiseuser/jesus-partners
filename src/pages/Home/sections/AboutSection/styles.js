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

export const orbSx = (top, left, right, bottom, size, color, delay = "0s") => ({
  position: "absolute",
  top,
  left,
  right,
  bottom,
  pointerEvents: "none",
  width: size,
  height: size,
  borderRadius: "50%",
  background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
  animation: `ab_imgGlow 6s ease-in-out ${delay} infinite`,
});

export const sectionLabelSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1.5,
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

export const headingSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" },
  fontWeight: 900,
  color: colors.text.primary,
  lineHeight: 1.12,
  letterSpacing: "-0.5px",
  mb: 1.5,
};

export const headGoldSx = {
  background: `linear-gradient(120deg, ${colors.secondary.dark}, ${colors.secondary.main}, ${colors.secondary.light})`,
  backgroundSize: "200%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "ab_gradShift 4s ease infinite",
};

export const bodyTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.base,
  color: colors.text.secondary,
  lineHeight: 1.9,
  mb: 3,
};

export const logoWrapSx = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "ab_imgIn .9s cubic-bezier(.34,1.2,.64,1) .3s both",
};

export const logoImgSx = {
  width: { xs: "70%", md: "85%" },
  maxWidth: 320,
  height: "auto",
  position: "relative",
  zIndex: 2,
  animation: "ab_imgFloat 5s ease-in-out infinite",
  filter:
    "drop-shadow(0 20px 50px rgba(212,160,23,0.35)) drop-shadow(0 0 30px rgba(26,26,46,0.2))",
};

export const logoGlowSx = {
  position: "absolute",
  width: "80%",
  height: "80%",
  borderRadius: "50%",
  pointerEvents: "none",
  zIndex: 1,
  background:
    "radial-gradient(circle, rgba(212,160,23,0.2) 0%, rgba(26,26,46,0.1) 50%, transparent 75%)",
  animation: "ab_imgGlow 4s ease-in-out infinite",
};

export const logoRingSx = (size, delay) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
  border: `1px dashed rgba(212,160,23,${delay === 0 ? 0.2 : 0.12})`,
  animation: `ab_spin ${20 + delay * 7}s linear ${delay}s infinite`,
  pointerEvents: "none",
});

export const logoShadowSx = {
  position: "absolute",
  bottom: -12,
  left: "50%",
  transform: "translateX(-50%)",
  width: "50%",
  height: 16,
  borderRadius: "50%",
  background: "rgba(0,0,0,0.15)",
  filter: "blur(10px)",
  pointerEvents: "none",
  zIndex: 0,
};

export const cardGridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
  gap: 3,
  mt: { xs: 6, md: 9 },
};

export const cardSx = (delay) => ({
  bgcolor: "white",
  borderRadius: "22px",
  border: `1px solid ${colors.divider}`,
  overflow: "hidden",
  position: "relative",
  opacity: 0,
  animation: `ab_rise .65s cubic-bezier(.34,1.2,.64,1) ${delay}s forwards`,
  transition:
    "transform .35s cubic-bezier(.34,1.2,.64,1), box-shadow .3s, border-color .3s",
  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: `0 36px 70px rgba(10,16,40,0.15), 0 0 0 1px ${colors.secondary.main}40`,
    borderColor: `${colors.secondary.main}50`,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "55%",
    left: "-80%",
    zIndex: 10,
    pointerEvents: "none",
    background:
      "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.5) 50%,transparent 70%)",
  },
  "&:hover::before": { animation: "ab_shimmer .6s ease forwards" },
});

export const cardImgSx = {
  width: "100%",
  height: 210,
  objectFit: "cover",
  display: "block",
  transition: "transform .5s ease",
  ".card-root:hover &": { transform: "scale(1.06)" },
};

export const cardImgWrapSx = {
  overflow: "hidden",
  position: "relative",
};

export const cardOverlaySx = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(10,16,40,0.5) 0%, transparent 60%)",
};

export const cardTopBarSx = (color) => ({
  height: 4,
  flexShrink: 0,
  background: `linear-gradient(90deg, ${color}, ${color}88)`,
});

export const cardBodySx = { p: 3 };

export const cardIconWrapSx = (color) => ({
  width: 46,
  height: 46,
  borderRadius: "14px",
  mb: 2,
  flexShrink: 0,
  background: `linear-gradient(135deg, ${color}25, ${color}10)`,
  border: `1.5px solid ${color}35`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "ab_pulse 3s ease infinite",
});

export const cardTitleSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.lg,
  fontWeight: 800,
  color: colors.text.primary,
  mb: 1.2,
  lineHeight: 1.2,
};

export const cardDescSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  color: colors.text.secondary,
  lineHeight: 1.8,
};

export const cardLinkSx = (color) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.8,
  mt: 2,
  color,
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.sm,
  fontWeight: 700,
  transition: "gap .2s ease",
  "&:hover": { gap: 1.5 },
});
