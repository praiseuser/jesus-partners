import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack, Dialog, IconButton, useMediaQuery } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
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
function TierCard({ tierKey, tier, isVis, delay }) {
    const cfg = TIER_CONFIG[tierKey];
    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column',
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
            <Box sx={{ bgcolor: cfg.badgeBg, px: 3, py: 2.2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography sx={{ fontSize: '1.7rem' }}>{cfg.emoji}</Typography>
                <Box>
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.85)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                        {cfg.label} Partnership
                    </Typography>
                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.3rem', fontWeight: 900, color: 'white', lineHeight: 1.15 }}>
                        {tier.label}
                    </Typography>
                </Box>
            </Box>

            {/* Amount */}
            <Box sx={{ px: 3, py: 2.5, borderBottom: `1px solid ${cfg.border}40` }}>
                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.3rem' }, fontWeight: 900, color: cfg.badgeBg, lineHeight: 1 }}>
                    {fmtNgn(tier.ngn)}
                </Typography>
                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1.15rem', fontWeight: 800, color: colors.text.secondary, mt: .6 }}>
                    {fmtUsd(tier.usd)}
                </Typography>
            </Box>

            {/* Description */}
            <Box sx={{ px: 3, py: 2.5, flex: 1 }}>
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.05rem', md: '1.08rem' }, fontWeight: 600, color: colors.text.primary, lineHeight: 1.75 }}>
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
                        px: 3, py: 1.7, borderRadius: '12px',
                        textDecoration: 'none',
                        fontFamily: typography.fontFamily.heading,
                        fontSize: '1.05rem', fontWeight: 800,
                        boxShadow: `0 6px 20px ${cfg.badgeBg}35`,
                        transition: 'all .25s ease',
                        '&:hover': { opacity: .88 },
                    }}
                >
                    <FavoriteIcon sx={{ fontSize: 18 }} /> Partner at {cfg.label}
                </Box>
            </Box>
        </Box>
    );
}

// ── Generous Tier (4th level — give any amount) ───────────────────────────────
function GenerousCard({ budget, isVis, delay }) {
    const [amountNgn, setAmountNgn] = useState('');
    const usdEquiv = amountNgn ? (parseFloat(amountNgn.replace(/,/g, '')) / EXCHANGE_RATE).toFixed(2) : '0.00';

    const handleChange = (e) => {
        const raw = e.target.value.replace(/[^0-9]/g, '');
        setAmountNgn(raw ? parseInt(raw, 10).toLocaleString() : '');
    };

    const accent = budget.color;

    return (
        <Box sx={{
            mt: { xs: 3, md: 3 },
            bgcolor: colors.primary.dark,
            borderRadius: '24px',
            border: `2px solid ${accent}`,
            position: 'relative',
            overflow: 'hidden',
            opacity: isVis ? 1 : 0,
            animation: isVis ? `pd_rise .7s ease ${delay}s both` : 'none',
            transition: 'transform .3s ease, box-shadow .3s',
            '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px ${accent}35` },
        }}>
            <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', top: '-30%', right: '-8%', width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle,${accent}22 0%,transparent 70%)`, pointerEvents: 'none' }} />

            {/* Header strip, same style as the other tiers */}
            <Box sx={{ bgcolor: accent, px: 3, py: 2.2, display: 'flex', alignItems: 'center', gap: 1.5, position: 'relative', zIndex: 1 }}>
                <Typography sx={{ fontSize: '1.7rem' }}>🤲</Typography>
                <Box>
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.85)', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                        Generous Partnership
                    </Typography>
                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.3rem', fontWeight: 900, color: 'white', lineHeight: 1.15 }}>
                        Give Any Amount
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1, p: { xs: 3, md: 4.5 }, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.25fr' }, gap: { xs: 3.5, md: 5 }, alignItems: 'center' }}>
                {/* Left text */}
                <Box>
                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 900, color: 'white', lineHeight: 1.15, mb: 1.5 }}>
                        Give What God Puts in Your Heart
                    </Typography>
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.08rem', md: '1.15rem' }, fontWeight: 600, color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>
                        No amount is too small. Every gift goes directly to {budget.title}.
                    </Typography>
                </Box>

                {/* Right form */}
                <Box>
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', mb: 1.5 }}>
                        Kingdom Support Options
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
                        {budget.kingdomOptions.map(amt => {
                            const active = amountNgn === amt.toLocaleString();
                            return (
                                <Box
                                    key={amt}
                                    component="button"
                                    type="button"
                                    onClick={() => setAmountNgn(amt.toLocaleString())}
                                    sx={{
                                        bgcolor: active ? accent : 'rgba(255,255,255,0.08)',
                                        color: 'white',
                                        border: `1.5px solid ${active ? accent : 'rgba(255,255,255,0.25)'}`,
                                        borderRadius: '12px',
                                        px: 2.5, py: 1.3,
                                        fontFamily: typography.fontFamily.heading,
                                        fontSize: '1rem', fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all .2s ease',
                                        '&:hover': { borderColor: accent },
                                    }}
                                >
                                    {fmtNgn(amt)}
                                </Box>
                            );
                        })}
                    </Box>

                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, textTransform: 'uppercase', mb: 1.5 }}>
                        Or Type Your Amount (₦)
                    </Typography>
                    <Box sx={{ position: 'relative' }}>
                        <Typography sx={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', fontFamily: typography.fontFamily.accent, fontSize: '1.3rem', fontWeight: 900, color: accent }}>₦</Typography>
                        <Box
                            component="input"
                            type="text"
                            inputMode="numeric"
                            value={amountNgn}
                            onChange={handleChange}
                            placeholder="0"
                            sx={{
                                width: '100%', height: 62,
                                pl: 5.5, pr: 2,
                                bgcolor: 'rgba(255,255,255,0.07)',
                                border: `1.5px solid ${amountNgn ? accent : 'rgba(255,255,255,0.25)'}`,
                                borderRadius: '14px',
                                fontFamily: typography.fontFamily.accent,
                                fontSize: '1.4rem', fontWeight: 900,
                                color: 'white',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border .2s',
                                '&::placeholder': { color: 'rgba(255,255,255,0.3)' },
                                '&:focus': { border: `1.5px solid ${accent}` },
                            }}
                        />
                    </Box>
                    {amountNgn && (
                        <Box sx={{ mt: 1.2, display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap' }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>≈</Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.3rem', fontWeight: 900, color: accent }}>${usdEquiv}</Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
                                USD (at ₦{EXCHANGE_RATE.toLocaleString()}/$)
                            </Typography>
                        </Box>
                    )}

                    <Box
                        component={Link}
                        to="/give"
                        sx={{
                            mt: 3,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
                            bgcolor: accent, color: 'white',
                            px: 3, py: 1.7, borderRadius: '12px',
                            textDecoration: 'none',
                            fontFamily: typography.fontFamily.heading,
                            fontSize: '1.05rem', fontWeight: 800,
                            boxShadow: `0 8px 24px ${accent}40`,
                            transition: 'all .25s ease',
                            '&:hover': { opacity: .88 },
                        }}
                    >
                        <FavoriteIcon sx={{ fontSize: 18 }} /> Partner at Generous
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

// ── Budget Breakdown Modal (slow auto-scroll) ─────────────────────────────────
const SCROLL_SPEED = 26;      // pixels per second — slow and easy to read
const START_DELAY = 1600;     // ms to wait after opening before scrolling begins
const RESUME_DELAY = 3000;    // ms to wait after the person touches/scrolls

function BreakdownModal({ open, onClose, budget }) {
    const fullScreen = useMediaQuery('(max-width:600px)');
    const [scrollEl, setScrollEl] = useState(null);
    const [playing, setPlaying] = useState(true);

    // reset to playing each time it opens
    useEffect(() => { if (open) setPlaying(true); }, [open]);

    useEffect(() => {
        if (!scrollEl || !playing) return undefined;

        let raf;
        let last = performance.now();
        let pos = scrollEl.scrollTop;
        let pausedUntil = performance.now() + START_DELAY;

        const pause = () => { pausedUntil = performance.now() + RESUME_DELAY; };
        const events = ['wheel', 'touchstart', 'touchmove', 'pointerdown', 'keydown'];
        events.forEach(ev => scrollEl.addEventListener(ev, pause, { passive: true }));

        const tick = (now) => {
            const dt = now - last;
            last = now;
            const max = scrollEl.scrollHeight - scrollEl.clientHeight;
            if (now < pausedUntil) {
                pos = scrollEl.scrollTop; // follow the person's own scrolling
            } else if (pos >= max - 1) {
                setPlaying(false); // reached the end
                return;
            } else {
                pos += (SCROLL_SPEED * dt) / 1000;
                scrollEl.scrollTop = pos;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            events.forEach(ev => scrollEl.removeEventListener(ev, pause));
        };
    }, [scrollEl, playing]);

    const togglePlay = () => {
        if (!playing && scrollEl) {
            const max = scrollEl.scrollHeight - scrollEl.clientHeight;
            if (scrollEl.scrollTop >= max - 1) scrollEl.scrollTo({ top: 0 });
        }
        setPlaying(p => !p);
    };

    const Icon = budget.icon;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: fullScreen ? 0 : '28px',
                    height: fullScreen ? '100%' : '86vh',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                    bgcolor: 'white',
                },
            }}
            slotProps={{ backdrop: { sx: { backdropFilter: 'blur(6px)', bgcolor: 'rgba(10,16,40,0.7)' } } }}
        >
            {/* Header */}
            <Box sx={{ bgcolor: colors.primary.dark, px: { xs: 2.5, md: 4 }, py: { xs: 2.5, md: 3 }, position: 'relative', flexShrink: 0, borderBottom: `3px solid ${budget.color}` }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.06) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: `${budget.color}22`, border: `2px solid ${budget.color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon sx={{ fontSize: 30, color: budget.color }} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.85rem', fontWeight: 800, color: budget.color, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                            Budget Breakdown
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.4rem', md: '1.9rem' }, fontWeight: 900, color: 'white', lineHeight: 1.15 }}>
                            {budget.title}
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} aria-label="Close" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.12)', width: 48, height: 48, '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' } }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Notice: items are clickable */}
            <Box sx={{ flexShrink: 0, bgcolor: `${budget.color}14`, borderBottom: `1px solid ${budget.color}30`, px: { xs: 2, md: 4 }, py: 1.6, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FavoriteIcon sx={{ fontSize: 22, color: budget.color, flexShrink: 0 }} />
                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 800, color: colors.text.primary, lineHeight: 1.4 }}>
                    Every item below is clickable. Tap any one to give directly toward it.
                </Typography>
            </Box>

            {/* Scrolling list */}
            <Box
                ref={setScrollEl}
                sx={{
                    flex: 1, overflowY: 'auto',
                    px: { xs: 2, md: 4 }, py: { xs: 2.5, md: 3.5 },
                    bgcolor: colors.background.default,
                    '&::-webkit-scrollbar': { width: 10 },
                    '&::-webkit-scrollbar-thumb': { bgcolor: `${budget.color}66`, borderRadius: 10 },
                }}
            >
                <Stack gap={2}>
                    {budget.lineItems.map((item, i) => (
                        <Box
                            key={item.label}
                            component={Link}
                            to="/give"
                            state={{ budgetId: budget.id, budgetTitle: budget.title, itemLabel: item.label, amountNgn: item.ngn, amountUsd: item.usd }}
                            sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2,
                                p: { xs: 2.2, md: 3 },
                                bgcolor: 'white',
                                borderRadius: '18px',
                                border: `1px solid ${colors.divider}`,
                                borderLeft: `6px solid ${budget.color}`,
                                boxShadow: '0 2px 10px rgba(10,16,40,0.04)',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'all .25s ease',
                                '&:hover, &:focus-visible': { borderColor: budget.color, boxShadow: `0 10px 30px ${budget.color}30`, transform: 'translateX(4px)' },
                            }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.08rem', md: '1.2rem' }, fontWeight: 700, color: colors.text.primary, lineHeight: 1.45 }}>
                                    {item.label}
                                </Typography>
                                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: .7, mt: .8, bgcolor: `${budget.color}15`, color: budget.color, borderRadius: '100px', px: 1.6, py: .5 }}>
                                    <FavoriteIcon sx={{ fontSize: 15 }} />
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.9rem', fontWeight: 800 }}>
                                        Give to this item
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 900, color: budget.color }}>
                                    {fmtNgn(item.ngn)}
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.95rem', fontWeight: 700, color: colors.text.secondary }}>
                                    {fmtUsd(item.usd)}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>

            {/* Footer: total + play/pause */}
            <Box sx={{ flexShrink: 0, bgcolor: 'white', borderTop: `1px solid ${colors.divider}`, px: { xs: 2, md: 4 }, py: { xs: 2, md: 2.5 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                <Box>
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.85rem', fontWeight: 800, color: colors.text.secondary, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                        Total Budget
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 900, color: budget.color, lineHeight: 1.1 }}>
                            {fmtNgn(budget.totalNgn)}
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1.1rem', fontWeight: 800, color: colors.text.secondary }}>
                            {fmtUsd(budget.totalUsd)}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    component="button"
                    type="button"
                    onClick={togglePlay}
                    sx={{
                        display: 'inline-flex', alignItems: 'center', gap: 1,
                        bgcolor: `${budget.color}15`, color: budget.color,
                        border: `2px solid ${budget.color}55`, borderRadius: '12px',
                        px: 2.5, py: 1.2, cursor: 'pointer',
                        fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 800,
                        '&:hover': { bgcolor: `${budget.color}25` },
                    }}
                >
                    {playing ? <PauseIcon /> : <PlayArrowIcon />}
                    {playing ? 'Pause scrolling' : 'Auto-scroll'}
                </Box>
            </Box>
        </Dialog>
    );
}

// ── Main Detail Page ───────────────────────────────────────────────────────────
export default function PartnerDetailPage() {
    const { id } = useParams();
    const budget = BUDGETS.find(b => b.id === id);

    const [heroRef, heroVis] = useReveal(0.05);
    const [tiersRef, tiersVis] = useReveal(0.05);
    const [itemsRef, itemsVis] = useReveal(0.05);
    const [ctaRef, ctaVis] = useReveal(0.05);
    const [breakdownOpen, setBreakdownOpen] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); setBreakdownOpen(false); }, [id]);

    if (!budget) {
        return (
            <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '2rem', fontWeight: 900, color: colors.text.primary }}>Budget not found</Typography>
                <Box component={Link} to="/partners" sx={{ color: colors.secondary.main, fontFamily: typography.fontFamily.heading, fontWeight: 700, textDecoration: 'none', fontSize: '1.1rem' }}>← Back to Partner With Us</Box>
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
                    <Box component={Link} to="/partners" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.05rem', fontWeight: 700, mb: 5, transition: 'color .2s', '&:hover': { color: budget.color } }}>
                        <ArrowBackIcon sx={{ fontSize: 20 }} /> Back to Partner With Us
                    </Box>

                    <Box ref={heroRef}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap', opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .6s ease both' : 'none' }}>
                            <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: `${budget.color}20`, border: `2px solid ${budget.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon sx={{ fontSize: 28, color: budget.color }} />
                            </Box>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: `${budget.color}18`, border: `1px solid ${budget.color}35`, borderRadius: '100px', px: 2, py: .8 }}>
                                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: budget.color }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.85rem', fontWeight: 800, color: budget.color, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                                    {budget.subtitle}
                                </Typography>
                            </Box>
                        </Box>

                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.3rem', sm: '3rem', md: '3.8rem' }, fontWeight: 900, color: 'white', lineHeight: 1.06, letterSpacing: '-1.5px', mb: 2, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .7s ease .1s both' : 'none' }}>
                            {budget.title}
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 500, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, maxWidth: 640, mb: 3.5, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .7s ease .2s both' : 'none' }}>
                            {budget.description}
                        </Typography>

                        {/* Total budget hero display */}
                        <Box sx={{ display: 'inline-flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap', bgcolor: 'rgba(255,255,255,0.06)', border: `1px solid rgba(255,255,255,0.14)`, borderRadius: '16px', px: 3, py: 2, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .7s ease .28s both' : 'none' }}>
                            <Box>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Total Budget</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.4rem' }, fontWeight: 900, color: budget.color, lineHeight: 1 }}>
                                    {fmtNgn(budget.totalNgn)}
                                </Typography>
                            </Box>
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1.2rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>·</Typography>
                            <Box>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.8rem', fontWeight: 800, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>In Dollars</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.4rem' }, fontWeight: 900, color: 'rgba(255,255,255,0.8)', lineHeight: 1 }}>
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

            {/* ══ FOUR TIERS: Gold · Silver · Diamond · Generous ══ */}
            <Box ref={tiersRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, opacity: tiersVis ? 1 : 0, animation: tiersVis ? 'pd_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: budget.color }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.9rem', fontWeight: 800, color: budget.color, letterSpacing: 2.5, textTransform: 'uppercase' }}>Partnership Tiers</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: budget.color }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12, mb: 1.5 }}>
                            Choose Your Level
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.08rem', md: '1.15rem' }, fontWeight: 600, color: colors.text.secondary, maxWidth: 620, mx: 'auto', lineHeight: 1.8 }}>
                            Four ways to give — 💛 Gold, 🥈 Silver, 💎 Diamond, and 🤲 Generous. Pick the one that matches what God has placed on your heart.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                        {Object.entries(budget.tiers).map(([key, tier], i) => (
                            <TierCard key={key} tierKey={key} tier={tier} isVis={tiersVis} delay={i * 0.1} />
                        ))}
                    </Box>

                    <GenerousCard budget={budget} isVis={tiersVis} delay={0.35} />
                </Container>
            </Box>

            {/* ══ BUDGET BREAKDOWN (opens in a modal) ══ */}
            <Box ref={itemsRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 11 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: itemsVis ? 1 : 0, animation: itemsVis ? 'pd_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: budget.color }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.9rem', fontWeight: 800, color: budget.color, letterSpacing: 2.5, textTransform: 'uppercase' }}>Budget Breakdown</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: budget.color }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.15, mb: 1.5 }}>
                            Where Every Naira Goes
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.08rem', md: '1.15rem' }, fontWeight: 600, color: colors.text.secondary, maxWidth: 560, mx: 'auto', lineHeight: 1.8, mb: 4 }}>
                            See exactly how the full budget for {budget.title} is spent, item by item. Every item is clickable, so you can fund one single item directly.
                        </Typography>
                        <Box
                            component="button"
                            type="button"
                            onClick={() => setBreakdownOpen(true)}
                            sx={{
                                display: 'inline-flex', alignItems: 'center', gap: 1.5,
                                bgcolor: budget.color, color: 'white',
                                border: 'none', cursor: 'pointer',
                                px: { xs: 3.5, md: 5 }, py: 2, borderRadius: '14px',
                                fontFamily: typography.fontFamily.heading,
                                fontSize: { xs: '1.05rem', md: '1.2rem' }, fontWeight: 800,
                                boxShadow: `0 10px 30px ${budget.color}45`,
                                transition: 'all .3s cubic-bezier(.34,1.2,.64,1)',
                                '&:hover': { transform: 'translateY(-4px) scale(1.03)' },
                            }}
                        >
                            <ReceiptLongIcon sx={{ fontSize: 26 }} /> See Full Budget Breakdown
                        </Box>
                    </Box>
                </Container>
            </Box>

            <BreakdownModal open={breakdownOpen} onClose={() => setBreakdownOpen(false)} budget={budget} />

            {/* ══ PREV / NEXT ══ */}
            {(prevBudget || nextBudget) && (
                <Box sx={{ bgcolor: 'white', py: { xs: 5, md: 7 }, borderTop: `1px solid ${colors.divider}` }}>
                    <Container maxWidth="lg">
                        <Box sx={{ display: 'grid', gridTemplateColumns: prevBudget && nextBudget ? '1fr 1fr' : '1fr', gap: 3 }}>
                            {prevBudget && (
                                <Box component={Link} to={`/partners/${prevBudget.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, borderRadius: '16px', border: `1px solid ${colors.divider}`, textDecoration: 'none', transition: 'all .25s', '&:hover': { borderColor: prevBudget.color, boxShadow: `0 8px 24px ${prevBudget.color}18`, transform: 'translateX(-4px)' } }}>
                                    <ArrowBackIcon sx={{ fontSize: 22, color: prevBudget.color, flexShrink: 0 }} />
                                    <Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.85rem', fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Previous</Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '1rem', md: '1.15rem' }, fontWeight: 800, color: colors.text.primary, lineHeight: 1.3 }}>{prevBudget.title}</Typography>
                                    </Box>
                                </Box>
                            )}
                            {nextBudget && (
                                <Box component={Link} to={`/partners/${nextBudget.id}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, p: 3, borderRadius: '16px', border: `1px solid ${colors.divider}`, textDecoration: 'none', transition: 'all .25s', '&:hover': { borderColor: nextBudget.color, boxShadow: `0 8px 24px ${nextBudget.color}18`, transform: 'translateX(4px)' } }}>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.85rem', fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Next</Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '1rem', md: '1.15rem' }, fontWeight: 800, color: colors.text.primary, lineHeight: 1.3 }}>{nextBudget.title}</Typography>
                                    </Box>
                                    <ArrowForwardIcon sx={{ fontSize: 22, color: nextBudget.color, flexShrink: 0 }} />
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
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 900, color: 'white', lineHeight: 1.15, mb: 1.5 }}>
                            Ready to Partner for {budget.title}?
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.08rem', md: '1.2rem' }, fontWeight: 500, color: 'rgba(255,255,255,0.75)', mb: 5, maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}>
                            Choose a tier above or give any amount. After your transfer, let us know via our contact page so we can confirm and celebrate with you.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component={Link} to="/give" sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1.2, bgcolor: budget.color, color: 'white', px: 4.5, py: 1.9, borderRadius: '12px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.15rem', fontWeight: 800, boxShadow: `0 8px 28px ${budget.color}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteIcon sx={{ fontSize: 20 }} /> Partner Now
                            </Box>
                            <Box component={Link} to="/partners" sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', px: 4.5, py: 1.9, borderRadius: '12px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.15rem', fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' } }}>
                                <ArrowBackIcon sx={{ fontSize: 20 }} /> All Budgets
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}