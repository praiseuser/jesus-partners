import { colors, typography } from "../../../theme";

export const pageWrapper = {
  p: { xs: 2.5, md: 3.5 },
  minHeight: "100vh",
};

export const pageHeader = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  mb: 3,
  flexWrap: "wrap",
  gap: 2,
};

export const pageTitleText = {
  fontFamily: typography.fontFamily.accent,
  fontSize: { xs: "1.7rem", md: "2.2rem" },
  fontWeight: typography.fontWeight.black,
  color: "#fff",
  lineHeight: 1.15,
  letterSpacing: "-0.5px",
};

export const pageSubText = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  color: "rgba(255,255,255,0.35)",
  mt: 0.4,
};

export const addBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.8,
  px: 2.2,
  py: 1.1,
  borderRadius: "10px",
  background: colors.secondary.main,
  color: colors.primary.dark,
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.bold,
  cursor: "pointer",
  flexShrink: 0,
  transition: "all 0.22s ease",
  "&:hover": {
    background: colors.secondary.light,
    transform: "translateY(-2px)",
    boxShadow: `0 8px 20px ${colors.secondary.main}44`,
  },
};

// ── Search bar ─────────────────────────────────────
export const searchBar = {
  display: "flex",
  alignItems: "center",
  gap: 1.2,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  px: 1.8,
  py: 1.1,
  transition: "border-color 0.2s ease",
  "&:focus-within": {
    borderColor: `${colors.secondary.main}60`,
  },
};

export const filterSelect = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  px: 1.8,
  py: 1.1,
  color: "rgba(255,255,255,0.55)",
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  outline: "none",
  cursor: "pointer",
  minWidth: 160,
  "& option": {
    background: colors.primary.dark,
    color: "#fff",
  },
};

// ── Table ──────────────────────────────────────────
export const tableWrap = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "16px",
  overflow: "hidden",
};

export const tableHeader = {
  display: "flex",
  alignItems: "center",
  px: 2.5,
  py: 1.5,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.03)",
};

export const tableHeaderCell = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.xs,
  fontWeight: typography.fontWeight.semiBold,
  color: "rgba(255,255,255,0.28)",
  textTransform: "uppercase",
  letterSpacing: "0.8px",
};

export const tableRow = {
  display: "flex",
  alignItems: "center",
  px: 2.5,
  py: 1.8,
  borderBottom: "1px solid rgba(255,255,255,0.04)",
  transition: "background 0.2s ease",
  animation: "rowIn 0.35s ease both",
  "@keyframes rowIn": {
    from: { opacity: 0, transform: "translateX(-8px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  },
  "&:last-child": { borderBottom: "none" },
  "&:hover": { background: "rgba(255,255,255,0.03)" },
};

export const tableCell = {
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.sm,
  color: "rgba(255,255,255,0.6)",
  fontWeight: typography.fontWeight.medium,
};

export const categoryPill = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  px: 1.2,
  py: 0.4,
  borderRadius: "6px",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.65rem",
  fontWeight: typography.fontWeight.bold,
  letterSpacing: "0.3px",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

export const featuredBadge = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.4,
  px: 1,
  py: 0.3,
  borderRadius: "5px",
  background: `${colors.secondary.main}18`,
  color: colors.secondary.main,
  fontFamily: typography.fontFamily.body,
  fontSize: "0.6rem",
  fontWeight: typography.fontWeight.bold,
  letterSpacing: "0.3px",
  border: `1px solid ${colors.secondary.main}30`,
};

export const statusDot = {
  width: 6,
  height: 6,
  borderRadius: "50%",
  flexShrink: 0,
};

export const actionBtn = {
  width: 30,
  height: 30,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "rgba(255,255,255,0.35)",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.07)",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
  },
};

export const emptyState = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  py: 10,
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "16px",
};

// ── Modal ──────────────────────────────────────────
export const modalBox = {
  background: colors.primary.dark,
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
};

export const modalHeader = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: 3,
  pt: 2.5,
  pb: 2,
  borderBottom: "1px solid rgba(255,255,255,0.07)",
};

export const modalTitle = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.base,
  fontWeight: typography.fontWeight.bold,
  color: "#fff",
};

export const modalCloseBtn = {
  width: 28,
  height: 28,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "rgba(255,255,255,0.4)",
  background: "rgba(255,255,255,0.05)",
  transition: "all 0.2s ease",
  "&:hover": { background: "rgba(255,255,255,0.1)", color: "#fff" },
};

export const modalSection = {
  display: "flex",
  flexDirection: "column",
  gap: 0.3,
};

export const modalLabel = {
  display: "flex",
  alignItems: "center",
  gap: 0.4,
  fontFamily: typography.fontFamily.body,
  fontSize: typography.fontSize.xs,
  color: "rgba(255,255,255,0.3)",
  textTransform: "uppercase",
  letterSpacing: "0.6px",
  fontWeight: typography.fontWeight.semiBold,
};

export const modalValue = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semiBold,
  color: "rgba(255,255,255,0.8)",
};

export const modalCategoryPill = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  px: 1.4,
  py: 0.5,
  borderRadius: "6px",
  fontFamily: typography.fontFamily.body,
  fontSize: "0.68rem",
  fontWeight: typography.fontWeight.bold,
  letterSpacing: "0.3px",
  textTransform: "uppercase",
};
