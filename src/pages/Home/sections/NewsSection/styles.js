import { colors, typography } from "../../../../theme";

export const keyframes = {
  "@keyframes ns_rise": {
    from: { opacity: 0, transform: "translateY(40px) scale(0.96)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ns_left": {
    from: { opacity: 0, transform: "translateX(-40px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ns_shimmer": { from: { left: "-80%" }, to: { left: "130%" } },
  "@keyframes ns_gradShift": {
    "0%,100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
  "@keyframes ns_pulse": {
    "0%,100%": { boxShadow: `0 0 0 0 ${colors.secondary.main}44` },
    "50%": { boxShadow: `0 0 0 10px ${colors.secondary.main}00` },
  },
  "@keyframes ns_float": {
    "0%,100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-6px)" },
  },
  "@keyframes ns_lineGrow": {
    from: { width: 0, opacity: 0 },
    to: { width: "100%", opacity: 1 },
  },
  "@keyframes ns_tagIn": {
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ns_imgZoom": {
    from: { transform: "scale(1.08)" },
    to: { transform: "scale(1)" },
  },
};

export const wrapSx = {
  bgcolor: "white",
  py: { xs: 8, md: 12 },
  position: "relative",
  overflow: "hidden",
};

export const bgPatternSx = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`,
  backgroundSize: "24px 24px",
  opacity: 0.6,
};

export const labelRowSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 2,
  mb: { xs: 4, md: 5 },
};

export const sectionLabelSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
};

export const labelAccentSx = {
  width: 4,
  height: 36,
  borderRadius: "4px",
  background: `linear-gradient(180deg, ${colors.secondary.main}, ${colors.secondary.dark})`,
  flexShrink: 0,
};

export const labelTextSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1.7rem", md: "2.2rem" },
  fontWeight: 900,
  color: colors.text.primary,
  lineHeight: 1.1,
};

export const viewAllBtnSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  bgcolor: "transparent",
  color: colors.primary.main,
  border: `2px solid ${colors.primary.main}`,
  px: 2.5,
  py: 1,
  borderRadius: "8px",
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.sm,
  fontWeight: 700,
  transition: "all .3s cubic-bezier(.34,1.2,.64,1)",
  "&:hover": {
    bgcolor: colors.primary.main,
    color: "white",
    transform: "translateY(-2px)",
    boxShadow: `0 8px 24px ${colors.primary.main}44`,
  },
};

export const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4,1fr)" },
  gap: 3,
};

export const featuredCardSx = {
  gridColumn: { xs: "1", sm: "1 / -1", lg: "1 / 3" },
};

export const cardSx = (delay) => ({
  bgcolor: "white",
  borderRadius: "18px",
  border: `1px solid ${colors.divider}`,
  overflow: "hidden",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  opacity: 0,
  animation: `ns_rise .6s cubic-bezier(.34,1.2,.64,1) ${delay}s forwards`,
  transition:
    "transform .35s cubic-bezier(.34,1.2,.64,1), box-shadow .3s, border-color .3s",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: `0 32px 64px rgba(10,16,40,0.14), 0 0 0 1px ${colors.secondary.main}30`,
    borderColor: `${colors.secondary.main}40`,
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
  "&:hover::before": { animation: "ns_shimmer .6s ease forwards" },
});

export const imgWrapSx = (featured) => ({
  overflow: "hidden",
  position: "relative",
  height: featured ? { xs: 200, md: 260 } : 170,
  flexShrink: 0,
});

export const imgSx = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "transform .6s ease",
  ".news-card:hover &": { transform: "scale(1.06)" },
};

export const imgOverlaySx = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to top, rgba(10,16,40,0.65) 0%, transparent 55%)",
};

export const imgFallbackSx = (color) => ({
  width: "100%",
  height: "100%",
  background: `linear-gradient(135deg, ${color}22, ${color}08)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const categoryTagSx = (color) => ({
  position: "absolute",
  top: 12,
  left: 12,
  zIndex: 5,
  display: "inline-flex",
  alignItems: "center",
  gap: 0.6,
  bgcolor: color,
  color: "white",
  px: 1.5,
  py: 0.4,
  borderRadius: "6px",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.6rem",
  fontWeight: 800,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  animation: "ns_tagIn .4s ease both",
  backdropFilter: "blur(8px)",
});

export const dateSx = {
  position: "absolute",
  bottom: 12,
  right: 12,
  zIndex: 5,
  fontFamily: typography.fontFamily.body,
  fontSize: "0.65rem",
  fontWeight: 600,
  color: "rgba(255,255,255,0.75)",
};

export const cardBodySx = {
  p: 2.5,
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

export const cardTitleSx = (featured) => ({
  fontFamily: typography.fontFamily.heading,
  fontSize: featured
    ? { xs: typography.fontSize.md, md: typography.fontSize.lg }
    : typography.fontSize.sm,
  fontWeight: 800,
  color: colors.text.primary,
  lineHeight: 1.35,
  mb: 1,
  flex: 1,
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const cardDescSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.8rem",
  color: colors.text.secondary,
  lineHeight: 1.7,
  mb: 2,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export const readMoreSx = (color) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.7,
  mt: "auto",
  color,
  textDecoration: "none",
  fontFamily: typography.fontFamily.heading,
  fontSize: "0.78rem",
  fontWeight: 700,
  transition: "gap .2s ease",
  "&:hover": { gap: 1.3 },
});

export const scriptureBannerSx = {
  mt: { xs: 5, md: 7 },
  bgcolor: `${colors.primary.dark}`,
  borderRadius: "18px",
  p: { xs: 3, md: 4 },
  position: "relative",
  overflow: "hidden",
  border: `1px solid rgba(212,160,23,0.2)`,
};

export const scriptureTextSx = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1rem", md: "1.2rem" },
  fontWeight: 600,
  color: "rgba(255,255,255,0.85)",
  lineHeight: 1.8,
  fontStyle: "italic",
  textAlign: "center",
};

export const scriptureRefSx = {
  fontFamily: typography.fontFamily.heading,
  fontSize: "0.75rem",
  fontWeight: 700,
  color: colors.secondary.main,
  textAlign: "center",
  mt: 1.5,
  letterSpacing: 1,
};
