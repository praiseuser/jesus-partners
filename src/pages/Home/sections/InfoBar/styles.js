import { colors, typography } from "../../../../theme";

export const keyframes = {
  "@keyframes ib_slideDown": {
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@keyframes ib_pulse": {
    "0%,100%": { boxShadow: `0 0 0 0 ${colors.secondary.main}44` },
    "50%": { boxShadow: `0 0 0 8px ${colors.secondary.main}00` },
  },
  "@keyframes ib_ticker": {
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(-100%)" },
  },
  "@keyframes ib_blink": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.3 } },
  "@keyframes ib_glow": { "0%,100%": { opacity: 0.5 }, "50%": { opacity: 1 } },
};

export const wrapSx = {
  bgcolor: "white",
  borderBottom: `1px solid ${colors.divider}`,
  boxShadow: "0 4px 24px rgba(10,16,40,0.08)",
  position: "relative",
  zIndex: 10,
  overflow: "hidden",
};

export const topAccentSx = {
  height: 3,
  background: `linear-gradient(90deg, ${colors.primary.dark}, ${colors.secondary.main}, ${colors.primary.light}, ${colors.secondary.main}, ${colors.primary.dark})`,
};

export const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "repeat(3,1fr)" },
};

export const panelSx = (i) => ({
  px: { xs: 3, md: 4 },
  py: 2.5,
  borderRight: i < 2 ? { md: `1px solid ${colors.divider}` } : "none",
  borderBottom: {
    xs: i < 2 ? `1px solid ${colors.divider}` : "none",
    md: "none",
  },
  transition: "background .25s ease",
  "&:hover": { bgcolor: colors.background.default },
  animation: `ib_slideDown .5s cubic-bezier(.34,1.2,.64,1) ${i * 0.1}s both`,
});

export const panelLabelSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.65rem",
  fontWeight: 800,
  color: colors.text.secondary,
  letterSpacing: 3,
  textTransform: "uppercase",
  mb: 1.5,
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const dotSx = (color) => ({
  width: 6,
  height: 6,
  borderRadius: "50%",
  bgcolor: color,
  flexShrink: 0,
  animation: "ib_blink 2s ease infinite",
});

export const emptyTextSx = {
  fontFamily: typography.fontFamily.body,
  fontSize: "0.82rem",
  fontWeight: 600,
  color: colors.text.disabled,
  fontStyle: "italic",
};

export const tickerItemSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  fontFamily: typography.fontFamily.body,
  fontSize: "0.82rem",
  fontWeight: 600,
  color: colors.text.primary,
  bgcolor: `${colors.secondary.main}10`,
  border: `1px solid ${colors.secondary.main}30`,
  borderRadius: "6px",
  px: 1.5,
  py: 0.4,
  whiteSpace: "nowrap",
};

export const liveTagSx = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.6,
  bgcolor: "#DC2626",
  borderRadius: "4px",
  px: 1,
  py: 0.2,
  fontFamily: typography.fontFamily.body,
  fontSize: "0.55rem",
  fontWeight: 800,
  color: "white",
  letterSpacing: 1.5,
  textTransform: "uppercase",
  animation: "ib_pulse 2s ease infinite",
};
