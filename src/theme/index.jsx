import { createTheme } from '@mui/material/styles';

export const colors = {
    primary: {
        dark: '#1A1A2E',
        main: '#16213E',
        light: '#0F3460',
    },
    secondary: {
        dark: '#B8860B',
        main: '#D4A017',
        light: '#F0C040',
    },
    accent: {
        red: '#C0392B',
        green: '#27AE60',
        teal: '#1ABC9C',
        purple: '#8E44AD',
        cream: '#FDF6E3',
    },
    text: {
        primary: '#1A1A2E',
        secondary: '#5A6A7A',
        disabled: '#A0AEC0',
        light: '#FFFFFF',
    },
    background: {
        default: '#F9F7F4',
        paper: '#FFFFFF',
        dark: '#1A1A2E',
    },
    divider: '#E8E0D0',
};

export const typography = {
    fontFamily: {
        accent: "'Sora', sans-serif",
        heading: "'Plus Jakarta Sans', sans-serif",
        body: "'Inter', sans-serif",
    },
    fontSize: {
        xs: '0.72rem',
        sm: '0.875rem',
        base: '1rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '1.875rem',
        '3xl': '2.25rem',
    },
    fontWeight: {
        normal: 400, medium: 500, semiBold: 600,
        bold: 700, extraBold: 800, black: 900,
    },
};

const theme = createTheme({
    palette: {
        primary: { main: colors.primary.main, dark: colors.primary.dark, light: colors.primary.light },
        secondary: { main: colors.secondary.main, dark: colors.secondary.dark, light: colors.secondary.light },
        background: { default: colors.background.default, paper: colors.background.paper },
        text: { primary: colors.text.primary, secondary: colors.text.secondary, disabled: colors.text.disabled },
        divider: colors.divider,
    },
    typography: {
        fontFamily: typography.fontFamily.body,
        h1: { fontFamily: typography.fontFamily.accent, fontWeight: 900 },
        h2: { fontFamily: typography.fontFamily.accent, fontWeight: 800 },
        h3: { fontFamily: typography.fontFamily.heading, fontWeight: 800 },
        h4: { fontFamily: typography.fontFamily.heading, fontWeight: 700 },
        h5: { fontFamily: typography.fontFamily.heading, fontWeight: 700 },
        h6: { fontFamily: typography.fontFamily.heading, fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
                'html,body': { scrollBehavior: 'smooth' },
                '::-webkit-scrollbar': { width: 6 },
                '::-webkit-scrollbar-track': { background: '#f1f1f1' },
                '::-webkit-scrollbar-thumb': { background: colors.secondary.main, borderRadius: 3 },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: { textTransform: 'none', fontFamily: typography.fontFamily.heading, fontWeight: 700, borderRadius: 10 },
            },
        },
        MuiContainer: { defaultProps: { maxWidth: 'lg' } },
    },
});

export default theme;