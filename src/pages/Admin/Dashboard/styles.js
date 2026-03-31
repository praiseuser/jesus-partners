import { colors, typography } from "../../../theme";

export const dashboardWrapper = {
  p: { xs: 2.5, md: 3.5 },
  minHeight: "100vh",
};

export const headerSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: 4,
  flexWrap: "wrap",
  gap: 1.5,
};

export const greetingText = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1.8rem", md: "2.4rem" },
  fontWeight: typography.fontWeight.black,
  color: "#fff",
  lineHeight: 1.15,
  letterSpacing: "-0.8px",
};

export const subGreeting = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  color: "rgba(255,255,255,0.38)",
  mt: 0.6,
};

export const liveBadge = {
  background: "rgba(16,185,129,0.1)",
  border: "1px solid rgba(16,185,129,0.28)",
  color: "#10B981",
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semiBold,
  letterSpacing: "0.3px",
  "& .MuiChip-icon": { color: "#10B981" },
};

export const overviewLabel = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.bold,
  color: "rgba(255,255,255,0.28)",
  textTransform: "uppercase",
  letterSpacing: "1.4px",
  mb: 2.5,
};

export const cardGrid = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
  },
  gap: 2,
};

export const card = {
  position: "relative",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "16px",
  p: "18px 20px",
  overflow: "hidden",
  cursor: "default",
  transition:
    "transform 0.28s ease, border-color 0.28s ease, background 0.28s ease",
  animation: "fadeUp 0.42s ease both",
  "@keyframes fadeUp": {
    from: { opacity: 0, transform: "translateY(18px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
  "&:hover": {
    transform: "translateY(-3px)",
  },
};

export const cardIconWrap = {
  width: 44,
  height: 44,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export const cardLabel = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.medium,
  color: "rgba(255,255,255,0.42)",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
};

export const cardValue = {
  fontFamily: typography.fontFamily.accent,
  fontSize: "1.75rem",
  fontWeight: typography.fontWeight.black,
  lineHeight: 1.1,
  letterSpacing: "-0.5px",
};

export const cardTrendBadge = {
  display: "inline-flex",
  alignItems: "center",
  gap: "3px",
  px: 0.9,
  py: 0.3,
  borderRadius: "6px",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.7rem",
  fontWeight: typography.fontWeight.bold,
  letterSpacing: "0.2px",
  mb: "2px",
};

export const cardSubText = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.xs,
  color: "rgba(255,255,255,0.25)",
  fontWeight: typography.fontWeight.medium,
  mt: 0.3,
};
