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

/* ── Header: title on the left, intro + button on the right (desktop) ── */
export const headerRowSx = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: { xs: "flex-start", md: "flex-end" },
  justifyContent: "space-between",
  gap: { xs: 3, md: 6 },
  mb: { xs: 5, md: 7 },
};

export const labelRowSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  mb: 1.5,
};

export const labelBarSx = {
  width: 30,
  height: 4,
  borderRadius: 4,
  bgcolor: colors.accent.teal,
};

export const labelTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: { xs: "0.9rem", md: "0.95rem" },
  fontWeight: 800,
  letterSpacing: 2.5,
  textTransform: "uppercase",
  color: colors.accent.teal,
};

export const titleSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "2.3rem", md: "3.3rem" },
  fontWeight: 900,
  color: colors.text.primary,
  lineHeight: 1.08,
  letterSpacing: "-0.8px",
};

export const introSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: { xs: "1.1rem", md: "1.18rem" },
  fontWeight: 500,
  color: colors.text.secondary,
  lineHeight: 1.8,
  maxWidth: 520,
};

/* ── Programme cards (2-column grid, icon left, text right) ── */
export const progGridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
  gap: { xs: 2.5, md: 3 },
};

export const progCardSx = (color, delay) => ({
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  gap: { xs: 2, md: 2.8 },
  p: { xs: 2.8, md: 3.6 },
  bgcolor: "white",
  border: `1px solid ${colors.divider}`,
  borderRadius: "24px",
  overflow: "hidden",
  opacity: 0,
  animation: `ds_rise .6s ease ${delay}s forwards`,
  transition: "transform .3s ease, box-shadow .3s ease, border-color .3s ease",
  /* colored tab along the top-left edge */
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 28,
    width: 64,
    height: 5,
    borderRadius: "0 0 6px 6px",
    bgcolor: color,
  },
  "&:hover": {
    transform: "translateY(-6px)",
    borderColor: `${color}66`,
    boxShadow: `0 22px 50px ${color}26`,
  },
  "&:hover .prog-icon": {
    bgcolor: color,
    borderColor: color,
    "& svg": { color: "white" },
  },
});

export const progIconSx = (color) => ({
  width: { xs: 58, md: 68 },
  height: { xs: 58, md: 68 },
  borderRadius: "20px",
  flexShrink: 0,
  mt: 0.5,
  bgcolor: `${color}16`,
  border: `2px solid ${color}38`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all .3s ease",
  "& svg": {
    fontSize: { xs: 28, md: 32 },
    color,
    transition: "color .3s ease",
  },
});

export const progTitleSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: { xs: "1.2rem", md: "1.35rem" },
  fontWeight: 800,
  color: colors.text.primary,
  lineHeight: 1.3,
  mb: 1,
};

export const progDescSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: { xs: "1.05rem", md: "1.1rem" },
  fontWeight: 500,
  color: colors.text.secondary,
  lineHeight: 1.75,
};

export const seeAllBtnSx = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  flexShrink: 0,
  bgcolor: colors.secondary.main,
  color: "white",
  px: { xs: 4, md: 4.5 },
  py: { xs: 1.8, md: 1.9 },
  borderRadius: "999px",
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: "1.1rem",
  fontWeight: 800,
  boxShadow: `0 10px 30px ${colors.secondary.main}44`,
  transition: "all .3s cubic-bezier(.34,1.2,.64,1)",
  "&:hover": {
    transform: "translateY(-4px) scale(1.04)",
    boxShadow: `0 18px 44px ${colors.secondary.main}55`,
  },
};

/* ── Subscribe strip: text on the left, form card on the right ── */
export const subscribeSx = {
  background: `linear-gradient(120deg, ${colors.primary.dark} 0%, #0F3460 50%, ${colors.primary.light} 100%)`,
  backgroundSize: "200% 200%",
  animation: "ds_gradShift 8s ease infinite",
  py: { xs: 7, md: 9 },
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

export const subLayoutSx = {
  position: "relative",
  zIndex: 1,
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
  gap: { xs: 4, md: 7 },
  alignItems: "center",
};

export const subChipSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  bgcolor: "rgba(212,160,23,0.15)",
  border: "1px solid rgba(212,160,23,0.35)",
  borderRadius: "999px",
  px: 2.5,
  py: 0.9,
  mb: 2.5,
};

export const subChipTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.85rem",
  fontWeight: 800,
  color: colors.secondary.light,
  letterSpacing: 2,
  textTransform: "uppercase",
};

export const subTitleSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "2rem", md: "2.8rem" },
  fontWeight: 900,
  color: "white",
  lineHeight: 1.12,
  mb: 2,
};

export const subQuoteSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: { xs: "1.1rem", md: "1.2rem" },
  fontWeight: 500,
  color: "rgba(255,255,255,0.8)",
  lineHeight: 1.8,
  fontStyle: "italic",
  maxWidth: 480,
};

export const subFormCardSx = {
  bgcolor: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.16)",
  backdropFilter: "blur(10px)",
  borderRadius: "28px",
  p: { xs: 3, md: 4 },
};

export const subInputSx = {
  width: "100%",
  boxSizing: "border-box",
  height: 60,
  px: 2.5,
  bgcolor: "rgba(255,255,255,0.1)",
  border: "1.5px solid rgba(255,255,255,0.28)",
  borderRadius: "16px",
  color: "white",
  outline: "none",
  fontFamily: typography.fontFamily.body,
  fontSize: "1.1rem",
  fontWeight: 500,
  transition: "border-color .25s, background .25s",
  "&::placeholder": { color: "rgba(255,255,255,0.55)" },
  "&:focus": {
    borderColor: colors.secondary.main,
    background: "rgba(255,255,255,0.15)",
  },
};

export const subBtnSx = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  width: "100%",
  height: 60,
  mt: 2,
  bgcolor: colors.secondary.main,
  color: "white",
  borderRadius: "16px",
  border: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: "1.1rem",
  fontWeight: 800,
  cursor: "pointer",
  transition: "all .3s cubic-bezier(.34,1.2,.64,1)",
  "&:hover": {
    bgcolor: colors.secondary.dark,
    transform: "translateY(-3px)",
    boxShadow: `0 10px 28px ${colors.secondary.main}55`,
  },
};
