import { Box } from '@mui/material';
import { colors, typography } from '../../../theme';

const VARIANTS = {
    primary: {
        background: colors.secondary.main,
        color: colors.primary.dark,
        border: 'none',
        '&:hover': {
            background: colors.secondary.light,
            boxShadow: `0 8px 20px ${colors.secondary.main}44`,
        },
    },
    danger: {
        background: 'rgba(231,76,60,0.12)',
        color: '#E74C3C',
        border: '1px solid rgba(231,76,60,0.28)',
        '&:hover': {
            background: 'rgba(231,76,60,0.22)',
        },
    },
    ghost: {
        background: 'rgba(255,255,255,0.05)',
        color: 'rgba(255,255,255,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        '&:hover': {
            background: 'rgba(255,255,255,0.09)',
            color: '#fff',
        },
    },
};

const SIZES = {
    sm: { px: 1.6, py: 0.8, fontSize: typography.fontSize.xs },
    md: { px: 2.2, py: 1.1, fontSize: typography.fontSize.sm },
};

export default function AdminButton({
    onClick,
    icon: Icon,
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
}) {
    const variantStyles = VARIANTS[variant] ?? VARIANTS.primary;
    const sizeStyles = SIZES[size] ?? SIZES.md;

    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.8,
                borderRadius: '10px',
                fontFamily: typography.fontFamily.heading,
                fontWeight: typography.fontWeight.bold,
                cursor: 'pointer',
                flexShrink: 0,
                width: fullWidth ? '100%' : 'fit-content',
                transition: 'all 0.22s ease',
                '&:hover': { transform: 'translateY(-2px)' },
                ...variantStyles,
                ...sizeStyles,
            }}
        >
            {Icon && <Icon sx={{ fontSize: size === 'sm' ? 15 : 18 }} />}
            {children}
        </Box>
    );
}