import { colors, typography } from "../../theme";

export const keyframes = {
  "@keyframes ft_rise": {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ft_glow": {
    "0%,100%": { opacity: 0.4, transform: "scale(1)" },
    "50%": { opacity: 0.7, transform: "scale(1.1)" },
  },
  "@keyframes ft_scroll": {
    "0%": { transform: "translateY(0)" },
    "100%": { transform: "translateY(-50%)" },
  },
  "@keyframes ft_pulse": {
    "0%,100%": { boxShadow: "0 0 0 0 rgba(212,160,23,0.4)" },
    "50%": { boxShadow: "0 0 0 10px rgba(212,160,23,0)" },
  },
  "@keyframes ft_spin": { to: { transform: "rotate(360deg)" } },
};

export const footerSx = {
  bgcolor: colors.primary.dark,
  position: "relative",
  overflow: "hidden",
  borderTop: `1px solid rgba(212,160,23,0.2)`,
};

export const gridBgSx = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`,
  backgroundSize: "28px 28px",
};

export const orbSx = (top, left, right, bottom, size, color) => ({
  position: "absolute",
  top,
  left,
  right,
  bottom,
  width: size,
  height: size,
  borderRadius: "50%",
  pointerEvents: "none",
  background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
  animation: "ft_glow 6s ease-in-out infinite",
});

export const topBorderSx = {
  height: 3,
  background: `linear-gradient(90deg, transparent, ${colors.secondary.dark}, ${colors.secondary.main}, ${colors.secondary.light}, ${colors.secondary.main}, ${colors.secondary.dark}, transparent)`,
};

export const logoAreaSx = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const logoCircleSx = {
  width: 60,
  height: 60,
  borderRadius: "50%",
  flexShrink: 0,
  background: `linear-gradient(135deg, ${colors.secondary.dark}, ${colors.secondary.main})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 6px 24px ${colors.secondary.main}44`,
  animation: "ft_pulse 3s ease infinite",
};

export const logoNameSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: "1.4rem",
  fontWeight: 900,
  color: "white",
  lineHeight: 1.1,
};

export const logoTaglineSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.82rem",
  color: "rgba(255,255,255,0.45)",
  lineHeight: 1.7,
  maxWidth: 240,
  fontStyle: "italic",
};

export const colHeadSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: "0.7rem",
  fontWeight: 800,
  color: colors.secondary.main,
  letterSpacing: 3,
  textTransform: "uppercase",
  mb: 2.5,
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const colHeadLineSx = {
  flex: 1,
  height: 1,
  bgcolor: "rgba(212,160,23,0.2)",
  borderRadius: 1,
};

export const footerLinkSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.2,
  textDecoration: "none",
  py: 0.7,
  px: 1,
  borderRadius: "8px",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.875rem",
  color: "rgba(255,255,255,0.6)",
  fontWeight: 500,
  transition: "all .22s ease",
  position: "relative",
  "&:hover": {
    color: "white",
    bgcolor: "rgba(255,255,255,0.05)",
    pl: 1.8,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    width: 3,
    height: "60%",
    borderRadius: "0 2px 2px 0",
    bgcolor: colors.secondary.main,
    opacity: 0,
    transition: "opacity .2s ease",
  },
  "&:hover::before": { opacity: 1 },
};

export const socialBtnSx = (color) => ({
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  textDecoration: "none",
  py: 0.9,
  px: 1.5,
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)",
  bgcolor: "rgba(255,255,255,0.04)",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.85rem",
  color: "rgba(255,255,255,0.65)",
  fontWeight: 600,
  transition: "all .25s ease",
  "&:hover": {
    bgcolor: `${color}18`,
    borderColor: `${color}40`,
    color: "white",
    transform: "translateX(4px)",
  },
});

export const dividerSx = {
  borderColor: "rgba(255,255,255,0.07)",
  my: 0,
};

export const bottomBarSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 2,
  py: 2.5,
};

export const copyrightSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.78rem",
  color: "rgba(255,255,255,0.3)",
  fontWeight: 400,
};

export const backToTopSx = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  bgcolor: colors.secondary.main,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: `0 4px 16px ${colors.secondary.main}55`,
  transition: "all .3s cubic-bezier(.34,1.2,.64,1)",
  "&:hover": {
    transform: "translateY(-4px) scale(1.1)",
    boxShadow: `0 10px 24px ${colors.secondary.main}66`,
  },
};
