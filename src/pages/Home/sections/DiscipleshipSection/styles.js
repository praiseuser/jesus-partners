import { colors, typography } from "../../../../theme";

export const keyframes = {
  "@keyframes ds_rise": {
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ds_shimmer": { from: { left: "-80%" }, to: { left: "130%" } },
  "@keyframes ds_pulse": {
    "0%,100%": { boxShadow: `0 0 0 0 ${colors.secondary.main}50` },
    "50%": { boxShadow: `0 0 0 12px ${colors.secondary.main}00` },
  },
  "@keyframes ds_gradShift": {
    "0%,100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
  "@keyframes ds_float": {
    "0%,100%": { transform: "translateY(0) rotate(-1deg)" },
    "50%": { transform: "translateY(-10px) rotate(1deg)" },
  },
  "@keyframes ds_glow": {
    "0%,100%": { opacity: 0.5, transform: "scale(1)" },
    "50%": { opacity: 0.9, transform: "scale(1.06)" },
  },
  "@keyframes ds_spin": { to: { transform: "rotate(360deg)" } },
  "@keyframes ds_typing": { from: { width: 0 }, to: { width: "100%" } },
  "@keyframes ds_blink": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0 } },
};

export const wrapSx = {
  bgcolor: colors.background.default,
  py: { xs: 8, md: 12 },
  position: "relative",
  overflow: "hidden",
};

export const bgSx = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage: `linear-gradient(rgba(212,160,23,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.04) 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
};

export const orbSx = (top, left, right, bottom, size, color) => ({
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
  animation: "ds_glow 7s ease-in-out infinite",
});

export const sectionLabelSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
};

export const labelAccentSx = {
  width: 4,
  height: 36,
  borderRadius: "4px",
  background: `linear-gradient(180deg, ${colors.accent.teal}, ${colors.accent.teal}88)`,
};

export const labelTextSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1.7rem", md: "2.2rem" },
  fontWeight: 900,
  color: colors.text.primary,
  lineHeight: 1.1,
};

export const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
  gap: 3,
  mt: { xs: 4, md: 5 },
};

export const toolCardSx = (delay) => ({
  bgcolor: "white",
  borderRadius: "20px",
  border: `1px solid ${colors.divider}`,
  p: 3,
  position: "relative",
  overflow: "hidden",
  opacity: 0,
  animation: `ds_rise .6s cubic-bezier(.34,1.2,.64,1) ${delay}s forwards`,
  transition: "transform .35s cubic-bezier(.34,1.2,.64,1), box-shadow .3s",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: `0 28px 60px rgba(10,16,40,0.12)`,
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
      "linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.6) 50%,transparent 70%)",
  },
  "&:hover::before": { animation: "ds_shimmer .55s ease forwards" },
});

export const toolIconWrapSx = (color) => ({
  width: 60,
  height: 60,
  borderRadius: "18px",
  mb: 2.5,
  background: `linear-gradient(135deg, ${color}22, ${color}08)`,
  border: `2px solid ${color}30`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "ds_pulse 3s ease infinite",
});

export const toolTitleSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.md,
  fontWeight: 800,
  color: colors.text.primary,
  mb: 1,
};

export const toolDescSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  color: colors.text.secondary,
  lineHeight: 1.8,
  mb: 2.5,
};

export const toolBtnSx = (color) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.8,
  bgcolor: color,
  color: "white",
  px: 2.5,
  py: 1,
  borderRadius: "8px",
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: "0.78rem",
  fontWeight: 700,
  transition: "all .3s cubic-bezier(.34,1.2,.64,1)",
  "&:hover": {
    filter: "brightness(1.1)",
    transform: "translateY(-2px)",
    boxShadow: `0 8px 20px ${color}44`,
  },
});

export const emptyStateSx = {
  gridColumn: "1 / -1",
  bgcolor: "white",
  borderRadius: "20px",
  border: `2px dashed ${colors.divider}`,
  p: { xs: 5, md: 7 },
  textAlign: "center",
};

/* Subscribe Banner */
export const subscribeSx = {
  background: `linear-gradient(120deg, ${colors.primary.dark} 0%, #0F3460 50%, ${colors.primary.light} 100%)`,
  backgroundSize: "200% 200%",
  animation: "ds_gradShift 8s ease infinite",
  py: { xs: 5, md: 7 },
  position: "relative",
  overflow: "hidden",
  mt: 0,
};

export const subDotGridSx = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage: `radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)`,
  backgroundSize: "22px 22px",
};

export const subInputWrapSx = {
  display: "flex",
  gap: 1.5,
  flexDirection: { xs: "column", sm: "row" },
  maxWidth: 520,
  mx: "auto",
};

export const subInputSx = {
  flex: 1,
  px: 2.5,
  py: 1.6,
  bgcolor: "rgba(255,255,255,0.1)",
  border: "1.5px solid rgba(255,255,255,0.2)",
  borderRadius: "10px",
  color: "white",
  outline: "none",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.9rem",
  backdropFilter: "blur(8px)",
  transition: "border-color .25s, background .25s",
  "&::placeholder": { color: "rgba(255,255,255,0.4)" },
  "&:focus": {
    borderColor: `${colors.secondary.main}`,
    background: "rgba(255,255,255,0.15)",
  },
};

export const subBtnSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  bgcolor: colors.secondary.main,
  color: "white",
  px: 3.5,
  py: 1.6,
  borderRadius: "10px",
  border: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: "0.875rem",
  fontWeight: 800,
  cursor: "pointer",
  flexShrink: 0,
  transition: "all .3s cubic-bezier(.34,1.2,.64,1)",
  "&:hover": {
    bgcolor: colors.secondary.dark,
    transform: "translateY(-3px)",
    boxShadow: `0 10px 28px ${colors.secondary.main}55`,
  },
};
