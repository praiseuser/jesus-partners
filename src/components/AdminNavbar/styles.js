import { colors, typography } from "../../theme/";

export const keyframes = {
  "@keyframes an_slideDown": {
    from: { opacity: 0, transform: "translateY(-100%)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes an_ticker": {
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(-100%)" },
  },
  "@keyframes an_pulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.4 } },
  "@keyframes an_glow": {
    "0%,100%": { boxShadow: `0 0 0 0 ${colors.secondary.main}44` },
    "50%": { boxShadow: `0 0 0 8px ${colors.secondary.main}00` },
  },
};

export const navbarSx = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1200,
  height: 56,
  bgcolor: "#1E2A3A",
  borderBottom: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  animation: "an_slideDown .5s ease both",
};

export const logoAreaSx = {
  width: 240,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  px: 2,
  gap: 1.5,
  borderRight: "1px solid rgba(255,255,255,0.07)",
  height: "100%",
  overflow: "hidden",
};

export const logoImgSx = {
  width: 40,
  height: 40,
  objectFit: "contain",
  flexShrink: 0,
  filter: "drop-shadow(0 2px 6px rgba(212,160,23,0.5))",
};

export const tickerWrapSx = {
  flex: 1,
  overflow: "hidden",
  position: "relative",
};

export const tickerTextSx = {
  display: "inline-block",
  whiteSpace: "nowrap",
  fontFamily: typography.fontFamily.accent,
  fontSize: "0.82rem",
  fontWeight: 800,
  background: `linear-gradient(120deg, ${colors.secondary.dark}, ${colors.secondary.main}, ${colors.secondary.light}, ${colors.secondary.main})`,
  backgroundSize: "200%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "an_ticker 12s linear infinite",
};

export const middleAreaSx = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  px: 3,
  gap: 3,
};

export const navLinkSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "rgba(255,255,255,0.75)",
  textDecoration: "none",
  transition: "color .2s",
  "&:hover": { color: "white" },
};

export const rightAreaSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 2,
};

export const iconBtnSx = {
  width: 34,
  height: 34,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(255,255,255,0.6)",
  cursor: "pointer",
  transition: "all .2s ease",
  "&:hover": { bgcolor: "rgba(255,255,255,0.08)", color: "white" },
};

export const logoutBtnSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  bgcolor: "#DC2626",
  color: "white",
  px: 2,
  py: 0.7,
  borderRadius: "7px",
  fontFamily: typography.fontFamily.heading,
  fontSize: "0.75rem",
  fontWeight: 800,
  letterSpacing: 1,
  textTransform: "uppercase",
  cursor: "pointer",
  border: "none",
  transition: "all .25s ease",
  "&:hover": {
    bgcolor: "#B91C1C",
    transform: "translateY(-1px)",
    boxShadow: "0 6px 18px rgba(220,38,38,0.5)",
  },
};
