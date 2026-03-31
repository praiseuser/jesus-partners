import { colors, typography } from "../../theme";

export const keyframes = {
  "@keyframes sb_slideIn": {
    from: { opacity: 0, transform: "translateX(-100%)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes sb_fadeIn": {
    from: { opacity: 0, transform: "translateX(-12px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes sb_pulse": { "0%,100%": { opacity: 0.6 }, "50%": { opacity: 1 } },
  "@keyframes sb_glow": {
    "0%,100%": { boxShadow: `0 0 0 0 ${colors.secondary.main}33` },
    "50%": { boxShadow: `0 0 0 6px ${colors.secondary.main}00` },
  },
};

export const sidebarSx = (open) => ({
  position: "fixed",
  top: 56,
  left: 0,
  bottom: 0,
  width: 240,
  zIndex: 1100,
  bgcolor: "#16202E",
  borderRight: "1px solid rgba(255,255,255,0.06)",
  overflowY: "auto",
  overflowX: "hidden",
  transform: {
    xs: open ? "translateX(0)" : "translateX(-100%)",
    md: "translateX(0)",
  },
  transition: "transform .3s ease",
  "&::-webkit-scrollbar": { width: 4 },
  "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    bgcolor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
  },
});

export const userAreaSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  px: 2.5,
  py: 2.5,
  borderBottom: "1px solid rgba(255,255,255,0.07)",
  mb: 1,
};

export const avatarSx = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  bgcolor: colors.secondary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  boxShadow: `0 0 0 2px ${colors.secondary.main}44`,
  animation: "sb_glow 3s ease infinite",
};

export const userNameSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: "0.82rem",
  fontWeight: 700,
  color: "white",
  lineHeight: 1.2,
};

export const userRoleSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.65rem",
  fontWeight: 500,
  color: colors.secondary.main,
  letterSpacing: 1,
};

export const sectionTitleSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.6rem",
  fontWeight: 700,
  color: "rgba(255,255,255,0.25)",
  letterSpacing: 2.5,
  textTransform: "uppercase",
  px: 2.5,
  py: 1,
  mt: 1,
};

export const navItemSx = (active) => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  px: 2.5,
  py: 1.15,
  mx: 1,
  borderRadius: "10px",
  textDecoration: "none",
  cursor: "pointer",
  mb: 0.3,
  bgcolor: active ? `${colors.secondary.main}18` : "transparent",
  borderLeft: `3px solid ${active ? colors.secondary.main : "transparent"}`,
  transition: "all .2s ease",
  "&:hover": {
    bgcolor: active ? `${colors.secondary.main}22` : "rgba(255,255,255,0.05)",
    borderLeftColor: active ? colors.secondary.main : "rgba(255,255,255,0.15)",
    transform: "translateX(3px)",
  },
  animation: "sb_fadeIn .4s ease both",
});

export const navIconSx = (active, color) => ({
  width: 30,
  height: 30,
  borderRadius: "8px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: active ? `${color}25` : "rgba(255,255,255,0.06)",
  transition: "all .2s ease",
});

export const navTextSx = (active) => ({
  fontFamily: typography.fontFamily.body,
  fontSize: "0.82rem",
  fontWeight: active ? 700 : 500,
  color: active ? "white" : "rgba(255,255,255,0.62)",
  transition: "color .2s",
  flex: 1,
});

export const navBadgeSx = (color) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 18,
  height: 18,
  borderRadius: "100px",
  bgcolor: color,
  color: "white",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.58rem",
  fontWeight: 800,
  px: 0.8,
});

export const overlayDrawerSx = {
  position: "fixed",
  inset: 0,
  zIndex: 1050,
  bgcolor: "rgba(0,0,0,0.5)",
  backdropFilter: "blur(2px)",
  display: { xs: "block", md: "none" },
};
