import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { colors, typography } from '../../theme';

const fmt = (n) =>
    new Intl.NumberFormat('en-NG', {
        style: 'currency', currency: 'NGN', maximumFractionDigits: 0,
    }).format(n);

const TIERS = [
    { key: 'gold', emoji: '💛', label: 'Gold' },
    { key: 'silver', emoji: '🥈', label: 'Silver' },
    { key: 'diamond', emoji: '💎', label: 'Diamond' },
];

export default function BudgetCard({ budget, index, isVis }) {
    const Icon = budget.icon;

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '260px 1fr' },
                borderRadius: '20px',
                overflow: 'hidden',
                border: `1px solid ${budget.color}25`,
                opacity: isVis ? 1 : 0,
                animation: isVis ? `pt_rise .7s ease ${index * 0.1}s both` : 'none',
                transition: 'box-shadow .4s ease, transform .4s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 28px 64px ${budget.color}20, 0 0 0 1px ${budget.color}30`,
                },
            }}
        >
            {/* ── Left colour panel ── */}
            <Box
                sx={{
                    position: 'relative',
                    background: `linear-gradient(160deg, ${budget.color}EE 0%, ${budget.color} 100%)`,
                    p: { xs: 3.5, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: { xs: 'auto', md: 280 },
                    overflow: 'hidden',
                    // shimmer on hover
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0, bottom: 0, left: '-100%',
                        width: '60%',
                        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
                        pointerEvents: 'none',
                    },
                    'article:hover &::after': {
                        animation: 'budgetShimmer .6s ease forwards',
                    },
                }}
            >
                {/* Icon */}
                <Box
                    sx={{
                        width: 56, height: 56,
                        borderRadius: '16px',
                        bgcolor: 'rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mb: 3,
                    }}
                >
                    <Icon sx={{ fontSize: 28, color: 'white' }} />
                </Box>

                {/* Big budget number — the hero */}
                <Box>
                    <Typography
                        sx={{
                            fontFamily: typography.fontFamily.body,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.6)',
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            mb: .8,
                        }}
                    >
                        2026 Budget
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: typography.fontFamily.accent,
                            fontSize: { xs: '1.8rem', md: '2.2rem' },
                            fontWeight: 900,
                            color: 'white',
                            lineHeight: 1,
                            mb: .5,
                        }}
                    >
                        {fmt(budget.totalNgn)}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: typography.fontFamily.heading,
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: 'rgba(255,255,255,0.55)',
                        }}
                    >
                        ${budget.totalUsd.toLocaleString()} USD
                    </Typography>
                </Box>
            </Box>

            {/* ── Right white panel ── */}
            <Box
                component="article"
                sx={{
                    bgcolor: 'white',
                    p: { xs: 3.5, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2.5,
                }}
            >
                {/* Title + subtitle */}
                <Box>
                    <Typography
                        sx={{
                            fontFamily: typography.fontFamily.body,
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            color: budget.color,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            mb: .6,
                        }}
                    >
                        {budget.subtitle}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: typography.fontFamily.accent,
                            fontSize: { xs: '1.3rem', md: '1.55rem' },
                            fontWeight: 900,
                            color: colors.text.primary,
                            lineHeight: 1.2,
                        }}
                    >
                        {budget.title}
                    </Typography>
                </Box>

                {/* Description */}
                <Typography
                    sx={{
                        fontFamily: typography.fontFamily.body,
                        fontSize: { xs: '0.9rem', md: '0.95rem' },
                        color: colors.text.secondary,
                        lineHeight: 1.85,
                        flex: 1,
                    }}
                >
                    {budget.description}
                </Typography>

                {/* Tier chips */}
                <Box>
                    <Typography
                        sx={{
                            fontFamily: typography.fontFamily.body,
                            fontSize: '0.62rem',
                            fontWeight: 600,
                            color: colors.text.secondary,
                            letterSpacing: 1.5,
                            textTransform: 'uppercase',
                            mb: 1,
                        }}
                    >
                        Partnership tiers
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {TIERS.map(t => (
                            <Box
                                key={t.key}
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: .7,
                                    bgcolor: colors.background.default,
                                    border: `1.5px solid ${colors.divider}`,
                                    borderRadius: '8px',
                                    px: 1.5, py: .8,
                                    transition: 'border-color .2s, background .2s',
                                    '&:hover': {
                                        borderColor: budget.color,
                                        bgcolor: `${budget.color}08`,
                                    },
                                }}
                            >
                                <Typography sx={{ fontSize: '0.85rem', lineHeight: 1 }}>{t.emoji}</Typography>
                                <Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.62rem', fontWeight: 700, color: colors.text.secondary, lineHeight: 1 }}>
                                        {t.label}
                                    </Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.72rem', fontWeight: 900, color: budget.color, lineHeight: 1.2 }}>
                                        {fmt(budget.tiers[t.key].ngn)}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        <Box
                            sx={{
                                display: 'inline-flex', alignItems: 'center', gap: .7,
                                bgcolor: colors.background.default,
                                border: `1.5px solid ${colors.divider}`,
                                borderRadius: '8px', px: 1.5, py: .8,
                            }}
                        >
                            <Typography sx={{ fontSize: '0.85rem', lineHeight: 1 }}>✍️</Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.68rem', fontWeight: 700, color: colors.text.secondary, lineHeight: 1 }}>
                                Any Amount
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* CTA */}
                <Box
                    component={Link}
                    to={`/partners/${budget.id}`}
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1.2,
                        alignSelf: 'flex-start',
                        bgcolor: budget.color,
                        color: 'white',
                        px: 3, py: 1.4,
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontFamily: typography.fontFamily.heading,
                        fontSize: '0.92rem',
                        fontWeight: 800,
                        boxShadow: `0 6px 22px ${budget.color}35`,
                        transition: 'all .25s ease',
                        '&:hover': { opacity: .88, gap: '14px' },
                    }}
                >
                    <FavoriteIcon sx={{ fontSize: 15 }} />
                    Partner Now
                    <ArrowForwardIcon sx={{ fontSize: 15 }} />
                </Box>
            </Box>
        </Box>
    );
}