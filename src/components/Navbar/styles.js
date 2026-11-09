import { colors, typography } from "../../theme";

const GOLD = colors.secondary.main;
const GOLD_LIGHT = colors.secondary.light;

export const keyframes = {
  "@keyframes nav_slideDown": {
    from: { opacity: 0, transform: "translateY(-30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "@keyframes nav_dropIn": {
    from: { opacity: 0, transform: "translateY(-10px) scale(.97)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes nav_pulse": {
    "0%,100%": { boxShadow: "0 0 0 0 rgba(220,38,38,0.45)" },
    "50%": { boxShadow: "0 0 0 8px rgba(220,38,38,0)" },
  },
  "@keyframes nav_logoGlow": {
    "0%,100%": { filter: "drop-shadow(0 0 5px rgba(212,160,23,0.45))" },
    "50%": { filter: "drop-shadow(0 0 12px rgba(212,160,23,0.85))" },
  },
  "@keyframes nav_drawerItem": {
    from: { opacity: 0, transform: "translateX(24px)" },
    to: { opacity: 1, transform: "none" },
  },
};

/* Outer shell: fixed, transparent, lets clicks pass through the gaps */
export const navShellSx = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
  px: { xs: 1.25, sm: 2, lg: 3 },
  pt: { xs: 1, md: 1.5 },
  pointerEvents: "none",
};

/* The floating capsule */
export const navCapsuleSx = (scrolled) => ({
  pointerEvents: "auto",
  maxWidth: 1280,
  mx: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: { xs: 1, md: 2 },
  px: { xs: 1.25, sm: 2, md: 2.5 },
  py: scrolled ? { xs: 0.6, md: 0.7 } : { xs: 0.8, md: 1 },
  borderRadius: { xs: "20px", md: "999px" },
  bgcolor: scrolled ? `${colors.primary.dark}F5` : `${colors.primary.dark}D9`,
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: scrolled
    ? "1px solid rgba(212,160,23,0.4)"
    : "1px solid rgba(255,255,255,0.12)",
  boxShadow: scrolled
    ? "0 14px 40px rgba(0,0,0,0.45)"
    : "0 8px 30px rgba(0,0,0,0.25)",
  transition: "all .35s ease",
  animation: "nav_slideDown .7s cubic-bezier(.34,1.2,.64,1) both",
});

export const logoWrapSx = {
  display: "flex",
  alignItems: "center",
  gap: { xs: 1, md: 1.4 },
  textDecoration: "none",
  flexShrink: 0,
  minWidth: 0,
};

export const logoImgSx = {
  width: { xs: 42, md: 50 },
  height: { xs: 42, md: 50 },
  objectFit: "contain",
  animation: "nav_logoGlow 3.5s ease-in-out infinite",
};

export const logoTextSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1rem", md: "1.15rem" },
  fontWeight: 900,
  color: "white",
  lineHeight: 1.1,
  letterSpacing: "-0.3px",
  whiteSpace: "nowrap",
};

export const logoSubSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: { xs: "0.68rem", md: "0.72rem" },
  fontWeight: 700,
  color: GOLD_LIGHT,
  letterSpacing: 2.4,
  textTransform: "uppercase",
  lineHeight: 1.3,
};

/* Desktop links are soft pills; the active one is tinted gold */
export const navLinkSx = (active) => ({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  textDecoration: "none",
  whiteSpace: "nowrap",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.95rem",
  fontWeight: active ? 800 : 600,
  color: active ? GOLD_LIGHT : "rgba(255,255,255,0.85)",
  bgcolor: active ? "rgba(212,160,23,0.16)" : "transparent",
  px: 1.7,
  py: 0.9,
  borderRadius: "999px",
  transition: "all .25s ease",
  "&:hover": {
    color: "white",
    bgcolor: active ? "rgba(212,160,23,0.22)" : "rgba(255,255,255,0.09)",
  },
});

export const giveBtnSx = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 0.8,
  bgcolor: "#DC2626",
  color: "white",
  minWidth: 42,
  height: 42,
  px: { xs: 1.3, sm: 2.6 },
  borderRadius: "999px",
  fontFamily: typography.fontFamily.heading,
  fontSize: "0.95rem",
  fontWeight: 800,
  textDecoration: "none",
  cursor: "pointer",
  flexShrink: 0,
  letterSpacing: 1,
  textTransform: "uppercase",
  animation: "nav_pulse 2.6s ease infinite",
  transition: "transform .3s cubic-bezier(.34,1.2,.64,1), box-shadow .3s",
  "&:hover": {
    transform: "translateY(-2px) scale(1.04)",
    boxShadow: "0 10px 26px rgba(220,38,38,0.5)",
  },
  /* on very small phones the Give button is just the heart */
  "& .give-text": {
    display: "none",
    "@media (min-width:420px)": { display: "inline" },
  },
};

export const mobileMenuBtnSx = {
  color: "white",
  width: 44,
  height: 44,
  display: { xs: "flex", lg: "none" },
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "14px",
  bgcolor: "rgba(255,255,255,0.06)",
  transition: "all .25s ease",
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.12)",
    borderColor: "rgba(212,160,23,0.6)",
  },
};

/* More dropdown (desktop) */
export const dropdownPanelSx = {
  position: "absolute",
  top: "calc(100% + 14px)",
  right: 0,
  width: 320,
  borderRadius: "20px",
  overflow: "hidden",
  bgcolor: "#0D1117",
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
  animation: "nav_dropIn .25s cubic-bezier(.34,1.2,.64,1) both",
  zIndex: 100,
};

/* Mobile drawer */
export const drawerSx = {
  width: "min(88vw, 360px)",
  height: "100dvh",
  bgcolor: colors.primary.dark,
  borderLeft: "1px solid rgba(212,160,23,0.2)",
  backgroundImage:
    "radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
  display: "flex",
  flexDirection: "column",
};

export const drawerHeaderSx = {
  px: 2.5,
  py: 2,
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  flexShrink: 0,
};

export const drawerLinkSx = (active, i = 0) => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: 2,
  py: 1.5,
  minHeight: 56,
  borderRadius: "16px",
  mb: 0.7,
  textDecoration: "none",
  cursor: "pointer",
  bgcolor: active ? "rgba(212,160,23,0.14)" : "transparent",
  border: `1px solid ${active ? "rgba(212,160,23,0.35)" : "transparent"}`,
  transition: "background .22s ease, border-color .22s ease",
  animation: `nav_drawerItem .4s ease ${0.05 + i * 0.04}s both`,
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.07)",
    borderColor: "rgba(255,255,255,0.12)",
  },
});

export const drawerLinkTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "1.08rem",
  fontWeight: 600,
  color: "rgba(255,255,255,0.9)",
};

export const drawerLinkIconSx = (active, color) => ({
  width: 40,
  height: 40,
  borderRadius: "12px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: active ? `${color}28` : "rgba(255,255,255,0.07)",
  border: `1px solid ${active ? `${color}55` : "rgba(255,255,255,0.1)"}`,
});

export const drawerGroupLabelSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.8rem",
  fontWeight: 800,
  color: "rgba(255,255,255,0.5)",
  letterSpacing: 2,
  textTransform: "uppercase",
  px: 2,
  mt: 2.5,
  mb: 1,
};