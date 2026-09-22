import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import { BUDGETS } from '../Partnerwithus';
import { colors, typography } from '../../theme';

const EXCHANGE_RATE = 1422; // ₦ per $

const keyframes = {
    '@keyframes pd_rise': { from: { opacity: 0, transform: 'translateY(36px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pd_glow': { '0%,100%': { opacity: .3, transform: 'scale(1)' }, '50%': { opacity: .6, transform: 'scale(1.1)' } },
    '@keyframes pd_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 16px ${colors.secondary.main}00` } },
    '@keyframes pd_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes pd_shimmer': { from: { left: '-100%' }, to: { left: '110%' } },
};

const useReveal = (threshold = 0.05) => {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, vis];
};

const fmtNgn = (n) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);
const fmtUsd = (n) => `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

// ── Tier config ────────────────────────────────────────────────────────────────
const TIER_CONFIG = {
    gold: { emoji: '💛', label: 'Gold', bg: '#FEF9EC', border: '#F59E0B', badgeBg: '#F59E0B', text: '#92400E' },
    silver: { emoji: '🥈', label: 'Silver', bg: '#F8FAFC', border: '#94A3B8', badgeBg: '#64748B', text: '#1E293B' },
    diamond: { emoji: '💎', label: 'Diamond', bg: '#F0F9FF', border: '#38BDF8', badgeBg: '#0EA5E9', text: '#0C4A6E' },
};

// ── Tier Card ──────────────────────────────────────────────────────────────────
function TierCard({ tierKey, tier, budget, isVis, delay }) {
    const cfg = TIER_CONFIG[tierKey];
    return (
        <Box sx={{
            borderRadius: '20px',
            border: `2px solid ${cfg.border}`,
            bgcolor: cfg.bg,
            overflow: 'hidden',
            opacity: isVis ? 1 : 0,
            animation: isVis ? `pd_rise .7s ease ${delay}s both` : 'none',
            transition: 'transform .3s ease, box-shadow .3s',
            '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px ${cfg.border}30` },
        }}>
            {/* Header */}
            <Box sx={{ bgcolor: cfg.badgeBg, px: 3, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography sx={{ fontSize: '1.4rem' }}>{cfg.emoji}</Typography>
                    <Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase' }}>
                            {cfg.label} Partnership
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>
                            {tier.label}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Amount */}
            <Box sx={{ px: 3, py: 2.5, borderBottom: `1px solid ${cfg.border}40` }}>
                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 900, color: cfg.badgeBg, lineHeight: 1 }}>
                    {fmtNgn(tier.ngn)}
                </Typography>
                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 700, color: colors.text.secondary, mt: .4 }}>
                    {fmtUsd(tier.usd)}
                </Typography>
            </Box>

            {/* Description */}
            <Box sx={{ px: 3, py: 2.5, flex: 1 }}>
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1rem' }, color: colors.text.secondary, lineHeight: 1.85 }}>
                    {tier.desc}
                </Typography>
            </Box>

            {/* Partner button */}
            <Box sx={{ px: 3, pb: 3 }}>
                <Box
                    component={Link}
                    to="/give"
                    sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
                        bgcolor: cfg.badgeBg, color: 'white',
                        px: 3, py: 1.5, borderRadius: '10px',
                        textDecoration: 'none',
                        fontFamily: typography.fontFamily.heading,
                        fontSize: '0.95rem', fontWeight: 800,
                        boxShadow: `0 6px 20px ${cfg.badgeBg}35`,
                        transition: 'all .25s ease',
                        '&:hover': { opacity: .88 },
                    }}
                >
                    <FavoriteIcon sx={{ fontSize: 16 }} /> Partner at {cfg.label}
                </Box>
            </Box>
        </Box>
    );
}

// ── Custom Give Section ────────────────────────────────────────────────────────
function CustomGive({ budget, isVis }) {
    const [amountNgn, setAmountNgn] = useState('');
    const usdEquiv = amountNgn ? (parseFloat(amountNgn.replace(/,/g, '')) / EXCHANGE_RATE).toFixed(2) : '0.00';

    const handleChange = (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        setAmountNgn(raw ? parseInt(raw, 10).toLocaleString() : '');
    };

    const kingdomAmounts = budget.kingdomOptions;

    return (
        <Box sx={{
            bgcolor: colors.primary.dark,
            borderRadius: '24px',
            p: { xs: 3.5, md: 5 },
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid rgba(212,160,23,0.2)`,
            opacity: isVis ? 1 : 0,
            animation: isVis ? 'pd_rise .7s ease .4s both' : 'none',
        }}>
            <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', top: '-30%', right: '-10%', width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle,${budget.color}18 0%,transparent 70%)`, pointerEvents: 'none' }} />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: `${budget.color}20`, border: `1px solid ${budget.color}40`, borderRadius: '100px', px: 2, py: .6, mb: 2.5 }}>
                    <Typography sx={{ fontSize: '0.9rem' }}>✍️</Typography>
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.7rem', fontWeight: 700, color: budget.color, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                        Give Any Amount
                    </Typography>
                </Box>

                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 900, color: 'white', lineHeight: 1.1, mb: 1 }}>
                    Give What God Puts in Your Heart
                </Typography>
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1rem' }, color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, mb: 3.5 }}>
                    No amount is too small. Every gift goes directly to this budget area.
                </Typography>

                {/* Kingdom support quick amounts */}
                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', mb: 1.5 }}>
                    Kingdom Support Options
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3.5 }}>
                    {kingdomAmounts.map(amt => (
                        <Box
                            key={amt}
                            component="button"
                            onClick={() => setAmountNgn(amt.toLocaleString())}
                            sx={{
                                bgcolor: amountNgn === amt.toLocaleString() ? budget.color : 'rgba(255,255,255,0.08)',
                                color: amountNgn === amt.toLocaleString() ? 'white' : 'rgba(255,255,255,0.7)',
                                border: `1.5px solid ${amountNgn === amt.toLocaleString() ? budget.color : 'rgba(255,255,255,0.15)'}`,
                                borderRadius: '10px',
                                px: 2.5, py: 1.2,
                                fontFamily: typography.fontFamily.heading,
                                fontSize: '0.88rem', fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all .2s ease',
                            }}
                        >
                            {fmtNgn(amt)}
                        </Box>
                    ))}
                </Box>

                {/* Custom input */}
                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', mb: 1.5 }}>
                    Or Type Your Amount (₦)
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ position: 'relative' }}>
                            <Typography sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontFamily: typography.fontFamily.accent, fontSize: '1.1rem', fontWeight: 900, color: budget.color }}>₦</Typography>
                            <Box
                                component="input"
                                type="text"
                                inputMode="numeric"
                                value={amountNgn}
                                onChange={handleChange}
                                placeholder="0"
                                sx={{
                                    width: '100%', height: 56,
                                    pl: 5, pr: 2,
                                    bgcolor: 'rgba(255,255,255,0.06)',
                                    border: `1.5px solid ${amountNgn ? budget.color : 'rgba(255,255,255,0.15)'}`,
                                    borderRadius: '12px',
                                    fontFamily: typography.fontFamily.accent,
                                    fontSize: '1.2rem', fontWeight: 900,
                                    color: 'white',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'border .2s',
                                    '&::placeholder': { color: 'rgba(255,255,255,0.2)' },
                                    '&:focus': { border: `1.5px solid ${budget.color}` },
                                }}
                            />
                        </Box>
                        {/* USD equivalent */}
                        {amountNgn && (
                            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)' }}>
                                    ≈
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1rem', fontWeight: 900, color: budget.color }}>
                                    ${usdEquiv}
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>
                                    USD (at ₦{EXCHANGE_RATE.toLocaleString()}/$)
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box
                        component={Link}
                        to="/give"
                        sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 1,
                            bgcolor: budget.color, color: 'white',
                            px: 3.5, py: 1.8, borderRadius: '12px',
                            textDecoration: 'none',
                            fontFamily: typography.fontFamily.heading,
                            fontSize: '0.95rem', fontWeight: 800,
                            whiteSpace: 'nowrap',
                            boxShadow: `0 8px 24px ${budget.color}40`,
                            transition: 'all .25s ease',
                            '&:hover': { opacity: .88, transform: 'translateY(-2px)' },
                            flexShrink: 0,
                        }}
                    >
                        <FavoriteIcon sx={{ fontSize: 16 }} /> Give Now
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

// ── Main Detail Page ───────────────────────────────────────────────────────────
export default function PartnerDetailPage() {
    const { id } = useParams();
    const budget = BUDGETS.find(b => b.id === id);

    const [heroRef, heroVis] = useReveal(0.05);
    const [tiersRef, tiersVis] = useReveal(0.05);
    const [itemsRef, itemsVis] = useReveal(0.05);
    const [customRef, customVis] = useReveal(0.05);
    const [ctaRef, ctaVis] = useReveal(0.05);

    useEffect(() => { window.scrollTo(0, 0); }, [id]);

    if (!budget) {
        return (
            <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '2rem', fontWeight: 900, color: colors.text.primary }}>Budget not found</Typography>
                <Box component={Link} to="/partners" sx={{ color: colors.secondary.main, fontFamily: typography.fontFamily.heading, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>← Back to Partner With Us</Box>
            </Box>
        );
    }

    const Icon = budget.icon;
    const currentIndex = BUDGETS.findIndex(b => b.id === id);
    const prevBudget = BUDGETS[currentIndex - 1] || null;
    const nextBudget = BUDGETS[currentIndex + 1] || null;

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 12, md: 16 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${budget.color}14 0%,transparent 70%)`, animation: 'pd_glow 7s ease infinite', pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box component={Link} to="/partners" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '0.9rem', fontWeight: 700, mb: 5, transition: 'color .2s', '&:hover': { color: budget.color } }}>
                        <ArrowBackIcon sx={{ fontSize: 18 }} /> Back to Partner With Us
                    </Box>

                    <Box ref={heroRef}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .6s ease both' : 'none' }}>
                            <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: `${budget.color}20`, border: `2px solid ${budget.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon sx={{ fontSize: 28, color: budget.color }} />
                            </Box>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: `${budget.color}18`, border: `1px solid ${budget.color}35`, borderRadius: '100px', px: 2, py: .7 }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: budget.color }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.7rem', fontWeight: 700, color: budget.color, letterSpacing: 2, textTransform: 'uppercase' }}>
                                    {budget.subtitle}
                                </Typography>
                            </Box>
                        </Box>

                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem' }, fontWeight: 900, color: 'white', lineHeight: 1.06, letterSpacing: '-1.5px', mb: 2, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .7s ease .1s both' : 'none' }}>
                            {budget.title}
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, maxWidth: 580, mb: 3.5, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .7s ease .2s both' : 'none' }}>
                            {budget.description}
                        </Typography>

                        {/* Total budget hero display */}
                        <Box sx={{ display: 'inline-flex', alignItems: 'baseline', gap: 2, bgcolor: 'rgba(255,255,255,0.05)', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: '16px', px: 3, py: 2, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .7s ease .28s both' : 'none' }}>
                            <Box>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Total Budget</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 900, color: budget.color, lineHeight: 1 }}>
                                    {fmtNgn(budget.totalNgn)}
                                </Typography>
                            </Box>
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1.1rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)' }}>·</Typography>
                            <Box>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>In Dollars</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 900, color: 'rgba(255,255,255,0.6)', lineHeight: 1 }}>
                                    {fmtUsd(budget.totalUsd)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>

                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={colors.background.default} />
                    </svg>
                </Box>
            </Box>

            {/* ══ THREE TIERS ══ */}
            <Box ref={tiersRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, opacity: tiersVis ? 1 : 0, animation: tiersVis ? 'pd_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: budget.color }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: budget.color, letterSpacing: 2.5, textTransform: 'uppercase' }}>Partnership Tiers</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: budget.color }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12, mb: 1 }}>
                            Choose Your Level
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, maxWidth: 500, mx: 'auto', lineHeight: 1.85 }}>
                            Three tiers — 💛 Gold, 🥈 Silver, and 💎 Diamond — each covering a meaningful portion of this budget. Pick the one that matches what God has placed on your heart.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 3, md: 3 } }}>
                        {Object.entries(budget.tiers).map(([key, tier], i) => (
                            <TierCard key={key} tierKey={key} tier={tier} budget={budget} isVis={tiersVis} delay={i * 0.1} />
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ BUDGET LINE ITEMS ══ */}
            <Box ref={itemsRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ mb: { xs: 5, md: 7 }, opacity: itemsVis ? 1 : 0, animation: itemsVis ? 'pd_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: budget.color }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: budget.color, letterSpacing: 2.5, textTransform: 'uppercase' }}>Budget Breakdown</Typography>
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.15 }}>
                            Where Every Naira Goes
                        </Typography>
                    </Box>

                    <Stack gap={2}>
                        {budget.lineItems.map((item, i) => (
                            <Box
                                key={item.label}
                                sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3,
                                    p: { xs: 2.5, md: 3 },
                                    bgcolor: colors.background.default,
                                    borderRadius: '16px',
                                    border: `1px solid ${colors.divider}`,
                                    opacity: itemsVis ? 1 : 0,
                                    animation: itemsVis ? `pd_rise .6s ease ${i * .06}s both` : 'none',
                                    transition: 'box-shadow .3s, transform .3s',
                                    '&:hover': { boxShadow: `0 8px 30px ${budget.color}12`, transform: 'translateX(4px)' },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: budget.color, flexShrink: 0 }} />
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1rem' }, color: colors.text.primary, lineHeight: 1.4 }}>
                                        {item.label}
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '0.9rem', md: '1rem' }, fontWeight: 900, color: budget.color }}>
                                        {fmtNgn(item.ngn)}
                                    </Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', color: colors.text.secondary }}>
                                        {fmtUsd(item.usd)}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}

                        {/* Total row */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3, p: { xs: 2.5, md: 3 }, bgcolor: `${budget.color}0E`, borderRadius: '16px', border: `2px solid ${budget.color}30`, opacity: itemsVis ? 1 : 0, animation: itemsVis ? `pd_rise .6s ease ${budget.lineItems.length * .06}s both` : 'none' }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 900, color: colors.text.primary }}>
                                Total Budget
                            </Typography>
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 900, color: budget.color }}>
                                    {fmtNgn(budget.totalNgn)}
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.9rem', fontWeight: 700, color: colors.text.secondary }}>
                                    {fmtUsd(budget.totalUsd)}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            {/* ══ CUSTOM GIVE ══ */}
            <Box ref={customRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="md">
                    <CustomGive budget={budget} isVis={customVis} />
                </Container>
            </Box>

            {/* ══ PREV / NEXT ══ */}
            {(prevBudget || nextBudget) && (
                <Box sx={{ bgcolor: 'white', py: { xs: 5, md: 7 }, borderTop: `1px solid ${colors.divider}` }}>
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'grid', gridTemplateColumns: prevBudget && nextBudget ? '1fr 1fr' : '1fr', gap: 3 }}>
                            {prevBudget && (
                                <Box component={Link} to={`/partners/${prevBudget.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, borderRadius: '16px', border: `1px solid ${colors.divider}`, textDecoration: 'none', transition: 'all .25s', '&:hover': { borderColor: prevBudget.color, boxShadow: `0 8px 24px ${prevBudget.color}18`, transform: 'translateX(-4px)' } }}>
                                    <ArrowBackIcon sx={{ fontSize: 20, color: prevBudget.color, flexShrink: 0 }} />
                                    <Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 600, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Previous</Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 800, color: colors.text.primary, lineHeight: 1.3 }}>{prevBudget.title}</Typography>
                                    </Box>
                                </Box>
                            )}
                            {nextBudget && (
                                <Box component={Link} to={`/partners/${nextBudget.id}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, p: 3, borderRadius: '16px', border: `1px solid ${colors.divider}`, textDecoration: 'none', transition: 'all .25s', '&:hover': { borderColor: nextBudget.color, boxShadow: `0 8px 24px ${nextBudget.color}18`, transform: 'translateX(4px)' } }}>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 600, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Next</Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 800, color: colors.text.primary, lineHeight: 1.3 }}>{nextBudget.title}</Typography>
                                    </Box>
                                    <ArrowForwardIcon sx={{ fontSize: 20, color: nextBudget.color, flexShrink: 0 }} />
                                </Box>
                            )}
                        </Box>
                    </Container>
                </Box>
            )}

            {/* ══ CTA ══ */}
            <Box ref={ctaRef} sx={{ background: `linear-gradient(120deg,${colors.primary.dark} 0%,#0F3460 55%,${colors.primary.light} 100%)`, py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'pd_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.7rem', md: '2.4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Ready to Partner for {budget.title}?
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1rem', md: '1.1rem' }, color: 'rgba(255,255,255,0.5)', mb: 5, maxWidth: 460, mx: 'auto', lineHeight: 1.9 }}>
                            Choose a tier above or give any amount. After your transfer, let us know via our contact page so we can confirm and celebrate with you.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component={Link} to="/give" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: budget.color, color: 'white', px: 4.5, py: 1.9, borderRadius: '12px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.05rem', fontWeight: 800, boxShadow: `0 8px 28px ${budget.color}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteIcon sx={{ fontSize: 18 }} /> Partner Now
                            </Box>
                            <Box component={Link} to="/partners" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'white', border: '1.5px solid rgba(255,255,255,0.22)', px: 4.5, py: 1.9, borderRadius: '12px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.05rem', fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', transform: 'translateY(-4px)' } }}>
                                <ArrowBackIcon sx={{ fontSize: 18 }} /> All Budgets
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}