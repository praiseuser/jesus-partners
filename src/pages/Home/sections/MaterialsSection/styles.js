import { colors, typography } from "../../../../theme";

export const keyframes = {
  "@keyframes ms_rise": {
    from: { opacity: 0, transform: "translateY(50px) scale(0.96)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ms_left": {
    from: { opacity: 0, transform: "translateX(-50px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ms_right": {
    from: { opacity: 0, transform: "translateX(50px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ms_shimmer": { from: { left: "-80%" }, to: { left: "130%" } },
  "@keyframes ms_gradShift": {
    "0%,100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
  "@keyframes ms_pulse": {
    "0%,100%": { boxShadow: "0 0 0 0 rgba(212,160,23,0.45)" },
    "50%": { boxShadow: "0 0 0 14px rgba(212,160,23,0)" },
  },
  "@keyframes ms_iconFloat": {
    "0%,100%": { transform: "translateY(0) rotate(-3deg)" },
    "50%": { transform: "translateY(-8px) rotate(3deg)" },
  },
  "@keyframes ms_glow": {
    "0%,100%": { opacity: 0.4, transform: "scale(1)" },
    "50%": { opacity: 0.8, transform: "scale(1.08)" },
  },
  "@keyframes ms_lineGrow": {
    from: { width: 0, opacity: 0 },
    to: { width: "60px", opacity: 1 },
  },
  "@keyframes ms_spin": { to: { transform: "rotate(360deg)" } },
  "@keyframes ms_btnGrad": {
    "0%,100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
};

export const wrapSx = {
  bgcolor: colors.background.default,
  py: { xs: 8, md: 12 },
  position: "relative",
  overflow: "hidden",
};

export const bgPatternSx = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage: `radial-gradient(${colors.secondary.main}0D 1.5px, transparent 1.5px)`,
  backgroundSize: "30px 30px",
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
  animation: `ms_glow 7s ease-in-out ${delay} infinite`,
});

export const labelRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  mb: { xs: 5, md: 7 },
};

export const labelAccentSx = {
  width: 4,
  height: 40,
  borderRadius: "4px",
  flexShrink: 0,
  background: `linear-gradient(180deg, ${colors.secondary.main}, ${colors.secondary.dark})`,
};

export const labelTextSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1.8rem", md: "2.4rem" },
  fontWeight: 900,
  color: colors.text.primary,
  lineHeight: 1.1,
};

export const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
  gap: { xs: 3, md: 4 },
};

export const cardSx = (delay, color) => ({
  bgcolor: "white",
  borderRadius: "24px",
  border: `1px solid ${colors.divider}`,
  overflow: "hidden",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  opacity: 0,
  animation: `ms_rise .7s cubic-bezier(.34,1.2,.64,1) ${delay}s forwards`,
  transition:
    "transform .38s cubic-bezier(.34,1.2,.64,1), box-shadow .3s, border-color .3s",
  "&:hover": {
    transform: "translateY(-14px) scale(1.01)",
    boxShadow: `0 40px 80px rgba(10,16,40,0.15), 0 0 0 1.5px ${color}40`,
    borderColor: `${color}50`,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "55%",
    left: "-80%",
    zIndex: 20,
    pointerEvents: "none",
    background:
      "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)",
  },
  "&:hover::before": { animation: "ms_shimmer .6s ease forwards" },
});

export const cardTopSx = (color) => ({
  height: 5,
  flexShrink: 0,
  background: `linear-gradient(90deg, ${color}, ${color}99, ${color}44)`,
});

export const cardInnerSx = {
  p: { xs: 3, md: 4 },
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

export const iconRowSx = {
  display: "flex",
  alignItems: "flex-start",
  gap: 2,
  mb: 3,
};

export const iconBoxSx = (color) => ({
  width: 58,
  height: 58,
  borderRadius: "18px",
  flexShrink: 0,
  background: `linear-gradient(135deg, ${color}28, ${color}0E)`,
  border: `2px solid ${color}35`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  animation: "ms_pulse 3s ease infinite",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "140%",
    height: "140%",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
    animation: "ms_glow 3s ease-in-out infinite",
  },
});

export const cardTitleSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: { xs: typography.fontSize.lg, md: typography.fontSize.xl },
  fontWeight: 900,
  color: colors.text.primary,
  lineHeight: 1.2,
};

export const cardSubSx = (color) => ({
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.sm,
  fontWeight: 700,
  color,
  mb: 2.5,
  mt: 0.5,
  display: "flex",
  alignItems: "center",
  gap: 0.8,
});

export const dividerLineSx = (color) => ({
  height: 2,
  width: 0,
  borderRadius: 2,
  mb: 2.5,
  background: `linear-gradient(90deg, ${color}, ${color}44)`,
  animation: "ms_lineGrow .8s ease .5s forwards",
});

export const bodyTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  color: colors.text.secondary,
  lineHeight: 1.9,
  flex: 1,
  mb: 3.5,
};

export const ctaBtnSx = (color) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1.5,
  bgcolor: color,
  color: "white",
  py: 1.7,
  borderRadius: "12px",
  textDecoration: "none",
  cursor: "pointer",
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.sm,
  fontWeight: 800,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  border: "none",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  backgroundSize: "200% 200%",
  animation: "ms_btnGrad 4s ease infinite",
  transition:
    "transform .3s cubic-bezier(.34,1.2,.64,1), box-shadow .3s, filter .2s",
  "&:hover": {
    transform: "translateY(-3px) scale(1.02)",
    boxShadow: `0 14px 36px ${color}55`,
    filter: "brightness(1.08)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    left: "-80%",
    pointerEvents: "none",
    background:
      "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.3) 50%,transparent 70%)",
  },
  "&:hover::before": { animation: "ms_shimmer .5s ease forwards" },
});

export const featureTagSx = (color) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.6,
  bgcolor: `${color}14`,
  border: `1px solid ${color}30`,
  borderRadius: "100px",
  px: 1.5,
  py: 0.4,
  mr: 1,
  mb: 1,
  fontFamily: typography.fontFamily.body,
  fontSize: "0.68rem",
  fontWeight: 700,
  color,
});
