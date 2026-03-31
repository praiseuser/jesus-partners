import { colors, typography } from "../../theme";

export const keyframes = {
  "@keyframes nav_slideDown": {
    from: { opacity: 0, transform: "translateY(-100%)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "@keyframes nav_fadeIn": {
    from: { opacity: 0, transform: "translateY(-8px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes nav_pulse": {
    "0%,100%": { boxShadow: "0 0 0 0 rgba(220,38,38,0.5)" },
    "50%": { boxShadow: "0 0 0 8px rgba(220,38,38,0)" },
  },
  "@keyframes nav_logoPulse": {
    "0%,100%": {
      transform: "scale(1)",
      filter: "drop-shadow(0 0 6px rgba(212,160,23,0.5))",
    },
    "50%": {
      transform: "scale(1.06)",
      filter: "drop-shadow(0 0 14px rgba(212,160,23,0.85))",
    },
  },
  "@keyframes nav_shimmer": {
    from: { left: "-80%" },
    to: { left: "130%" },
  },
  "@keyframes nav_spin": {
    to: { transform: "rotate(360deg)" },
  },
};

export const navbarSx = (scrolled) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1300,
  bgcolor: scrolled ? `${colors.primary.dark}F2` : `${colors.primary.dark}E8`,
  backdropFilter: "blur(20px)",
  borderBottom: scrolled
    ? `1px solid rgba(212,160,23,0.25)`
    : `1px solid rgba(255,255,255,0.06)`,
  boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.45)" : "none",
  transition: "all 0.4s ease",
  animation: "nav_slideDown .6s cubic-bezier(.34,1.2,.64,1) both",
});

export const logoWrapSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  textDecoration: "none",
  flexShrink: 0,
};

export const logoCircleSx = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${colors.secondary.dark}, ${colors.secondary.main}, ${colors.secondary.light})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 4px 16px ${colors.secondary.main}55`,
  animation: "nav_logoPulse 3s ease-in-out infinite",
  flexShrink: 0,
};

export const logoTextSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: "1.05rem",
  fontWeight: 900,
  color: "white",
  lineHeight: 1.1,
  letterSpacing: "-0.3px",
};

export const logoSubSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.52rem",
  fontWeight: 600,
  color: colors.secondary.light,
  letterSpacing: 2.2,
  textTransform: "uppercase",
};

export const navLinkSx = (active) => ({
  position: "relative",
  textDecoration: "none",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.875rem",
  fontWeight: active ? 700 : 500,
  color: active ? "white" : "rgba(255,255,255,0.72)",
  px: 0.5,
  py: 1,
  transition: "color .25s ease",
  "&:hover": { color: "white" },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "2px",
    borderRadius: "2px",
    bgcolor: colors.secondary.main,
    transform: active ? "scaleX(1)" : "scaleX(0)",
    transition: "transform .3s ease",
    transformOrigin: "center",
  },
  "&:hover::after": { transform: "scaleX(1)" },
});

export const giveBtnSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.8,
  bgcolor: "#DC2626",
  color: "white",
  px: 2.8,
  py: 1.1,
  borderRadius: "8px",
  fontFamily: typography.fontFamily.heading,
  fontSize: "0.875rem",
  fontWeight: 800,
  textDecoration: "none",
  cursor: "pointer",
  flexShrink: 0,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  position: "relative",
  overflow: "hidden",
  animation: "nav_pulse 2.5s ease infinite",
  transition: "transform .3s cubic-bezier(.34,1.2,.64,1), box-shadow .3s",
  "&:hover": {
    transform: "translateY(-3px) scale(1.05)",
    boxShadow: "0 12px 30px rgba(220,38,38,0.55)",
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
  "&:hover::before": { animation: "nav_shimmer .55s ease forwards" },
};

export const mobileMenuBtnSx = {
  color: "rgba(255,255,255,0.85)",
  display: { xs: "flex", md: "none" },
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "8px",
  p: 0.8,
  transition: "all .25s ease",
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(212,160,23,0.4)",
  },
};

export const drawerSx = {
  width: 300,
  bgcolor: colors.primary.dark,
  borderLeft: `1px solid rgba(212,160,23,0.15)`,
};

export const drawerHeaderSx = {
  px: 3,
  py: 2.5,
  borderBottom: "1px solid rgba(255,255,255,0.07)",
};

export const drawerLinkSx = (active) => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: 2.5,
  py: 1.6,
  borderRadius: "12px",
  mb: 0.5,
  textDecoration: "none",
  cursor: "pointer",
  bgcolor: active ? "rgba(212,160,23,0.12)" : "transparent",
  border: `1px solid ${active ? "rgba(212,160,23,0.25)" : "transparent"}`,
  transition: "all .22s ease",
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.06)",
    borderColor: "rgba(255,255,255,0.1)",
  },
});

export const drawerLinkTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.92rem",
  fontWeight: 600,
  color: "rgba(255,255,255,0.85)",
};

export const drawerLinkIconSx = (active, color) => ({
  width: 34,
  height: 34,
  borderRadius: "9px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: active ? `${color}22` : "rgba(255,255,255,0.06)",
  border: `1px solid ${active ? `${color}40` : "rgba(255,255,255,0.08)"}`,
});
