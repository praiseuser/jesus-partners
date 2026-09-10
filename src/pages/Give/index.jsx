import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes gv_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes gv_left': { from: { opacity: 0, transform: 'translateX(-40px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes gv_right': { from: { opacity: 0, transform: 'translateX(40px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes gv_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes gv_glow': { '0%,100%': { opacity: .3, transform: 'scale(1)' }, '50%': { opacity: .65, transform: 'scale(1.1)' } },
    '@keyframes gv_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 16px ${colors.secondary.main}00` } },
    '@keyframes gv_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes gv_spinR': { to: { transform: 'rotate(-360deg)' } },
    '@keyframes gv_float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
    '@keyframes gv_countUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes gv_shimmer': { from: { left: '-100%' }, to: { left: '110%' } },
    '@keyframes gv_copiedPop': { '0%': { transform: 'scale(0.8)', opacity: 0 }, '60%': { transform: 'scale(1.15)' }, '100%': { transform: 'scale(1)', opacity: 1 } },
};

const useReveal = (threshold = 0.08) => {
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

// ── Copy to clipboard hook ─────────────────────────────────────────────────────
function useCopy() {
    const [copiedKey, setCopiedKey] = useState(null);
    const copy = (text, key) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2200);
        });
    };
    return [copiedKey, copy];
}

// ── Account data ───────────────────────────────────────────────────────────────
const ACCOUNTS = [
    {
        id: 'usd',
        currency: 'USD',
        label: 'US Dollar Account',
        flag: '🇺🇸',
        color: '#22C55E',
        accentColor: '#16A34A',
        icon: AttachMoneyIcon,
        bank: 'UBA — United Bank for Africa',
        accountName: 'Jesus Partners Outreach',
        accountNumber: '3004316777',
        note: 'For partners giving in US Dollars from the USA and international',
        available: true,
    },
    {
        id: 'ngn',
        currency: 'NGN',
        label: 'Nigerian Naira Account',
        flag: '🇳🇬',
        color: colors.secondary.main,
        accentColor: colors.secondary.dark,
        icon: AccountBalanceIcon,
        bank: 'UBA — United Bank for Africa',
        accountName: 'Jesus Partners Outreach',
        accountNumber: '1026836213',
        note: 'For partners giving in Nigerian Naira locally',
        available: true,
    },
    {
        id: 'gbp',
        currency: 'GBP',
        label: 'British Pounds Account',
        flag: '🇬🇧',
        color: '#6366F1',
        accentColor: '#4F46E5',
        icon: CurrencyExchangeIcon,
        bank: 'Coming Soon',
        accountName: '—',
        accountNumber: '—',
        note: 'Pounds account details will be added shortly',
        available: false,
    },
    {
        id: 'eur',
        currency: 'EUR',
        label: 'Euro Account',
        flag: '🇪🇺',
        color: '#F59E0B',
        accentColor: '#D97706',
        icon: CurrencyExchangeIcon,
        bank: 'Coming Soon',
        accountName: '—',
        accountNumber: '—',
        note: 'Euro account details will be added shortly',
        available: false,
    },
];

const STATS = [
    { value: '2007', label: 'Serving Since', icon: EmojiEventsIcon, color: colors.secondary.main },
    { value: '400+', label: 'Widows Supported', icon: VolunteerActivismIcon, color: colors.accent.red },
    { value: '4', label: 'Currencies Accepted', icon: PublicIcon, color: colors.accent.teal },
    { value: '1000s', label: 'Lives Touched', icon: GroupsIcon, color: '#8B5CF6' },
];

const WHY_GIVE = [
    { title: '100% Goes to Ministry', body: 'Every kobo, dollar, and pound given goes directly to the work — crusades, widows, orphans, education, and training.' },
    { title: 'Registered & Accountable', body: 'Jesus Partners Outreach is formally incorporated in Nigeria (RC: 6922346) — a trusted, accountable organisation.' },
    { title: 'Eternal Impact', body: 'Your giving funds Gospel crusades, cares for the vulnerable, and trains the next generation of ministers.' },
];

// ── Account Card ───────────────────────────────────────────────────────────────
function AccountCard({ account, index, isVis, copiedKey, onCopy }) {
    const Icon = account.icon;
    const isCopiedNum = copiedKey === `${account.id}-num`;
    const isCopiedName = copiedKey === `${account.id}-name`;

    return (
        <Box
            sx={{
                borderRadius: '24px',
                overflow: 'hidden',
                border: account.available
                    ? `1px solid ${account.color}30`
                    : `1px solid ${colors.divider}`,
                opacity: isVis ? 1 : 0,
                animation: isVis ? `gv_rise .75s ease ${index * .12}s both` : 'none',
                transition: 'transform .3s ease, box-shadow .3s',
                '&:hover': account.available ? {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 28px 70px ${account.color}22`,
                } : {},
                position: 'relative',
            }}
        >
            {/* Coming soon overlay */}
            {!account.available && (
                <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(2px)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px' }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.4rem', fontWeight: 900, color: colors.text.primary, mb: .5 }}>Coming Soon</Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.8rem', color: colors.text.secondary }}>{account.note}</Typography>
                    </Box>
                </Box>
            )}

            {/* Header band */}
            <Box sx={{
                background: `linear-gradient(135deg, ${account.accentColor} 0%, ${account.color} 100%)`,
                p: { xs: 3, md: 3.5 },
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`, backgroundSize: '18px 18px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-40%', right: '-10%', width: 160, height: 160, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
                            <Typography sx={{ fontSize: '1.6rem', lineHeight: 1 }}>{account.flag}</Typography>
                            <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '100px', px: 1.5, py: .4 }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.65rem', fontWeight: 800, color: 'white', letterSpacing: 1.5 }}>
                                    {account.currency}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.1rem', md: '1.25rem' }, fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
                            {account.label}
                        </Typography>
                    </Box>
                    <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon sx={{ fontSize: 24, color: 'white' }} />
                    </Box>
                </Box>
            </Box>

            {/* Body */}
            <Box sx={{ bgcolor: 'white', p: { xs: 3, md: 3.5 } }}>
                {/* Bank */}
                <Box sx={{ mb: 3 }}>
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.8, mb: .6 }}>
                        Bank
                    </Typography>
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.95rem', fontWeight: 800, color: colors.text.primary }}>
                        {account.bank}
                    </Typography>
                </Box>

                {/* Account Name */}
                <Box sx={{ mb: 2.5, p: 2, bgcolor: colors.background.default, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                    <Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.62rem', fontWeight: 700, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .4 }}>
                            Account Name
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.9rem', fontWeight: 800, color: colors.text.primary }}>
                            {account.accountName}
                        </Typography>
                    </Box>
                    {account.available && (
                        <Box
                            component="button"
                            onClick={() => onCopy(account.accountName, `${account.id}-name`)}
                            sx={{ width: 34, height: 34, borderRadius: '10px', border: `1.5px solid ${isCopiedName ? account.color : colors.divider}`, bgcolor: isCopiedName ? `${account.color}12` : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .2s' }}
                        >
                            {isCopiedName
                                ? <CheckIcon sx={{ fontSize: 15, color: account.color, animation: 'gv_copiedPop .3s ease both' }} />
                                : <ContentCopyIcon sx={{ fontSize: 15, color: colors.text.secondary }} />
                            }
                        </Box>
                    )}
                </Box>

                {/* Account Number */}
                <Box sx={{ p: 2.5, bgcolor: `${account.color}08`, border: `1.5px solid ${account.color}25`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
                    <Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.62rem', fontWeight: 700, color: account.available ? account.color : colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .5 }}>
                            Account Number
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.5rem', md: '1.8rem' }, fontWeight: 900, color: account.available ? account.color : colors.text.secondary, letterSpacing: '0.06em', lineHeight: 1 }}>
                            {account.accountNumber}
                        </Typography>
                    </Box>
                    {account.available && (
                        <Box
                            component="button"
                            onClick={() => onCopy(account.accountNumber, `${account.id}-num`)}
                            sx={{ width: 42, height: 42, borderRadius: '12px', border: `1.5px solid ${isCopiedNum ? account.color : `${account.color}40`}`, bgcolor: isCopiedNum ? account.color : `${account.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all .25s', '&:hover': { bgcolor: account.color }, '&:hover svg': { color: 'white' } }}
                        >
                            {isCopiedNum
                                ? <CheckIcon sx={{ fontSize: 18, color: 'white', animation: 'gv_copiedPop .3s ease both' }} />
                                : <ContentCopyIcon sx={{ fontSize: 18, color: account.color }} />
                            }
                        </Box>
                    )}
                </Box>

                {/* Note */}
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.78rem', color: colors.text.secondary, lineHeight: 1.7 }}>
                    {account.note}
                </Typography>
            </Box>
        </Box>
    );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function GivePage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [statsRef, statsVis] = useReveal();
    const [accountsRef, accountsVis] = useReveal(0.05);
    const [whyRef, whyVis] = useReveal();
    const [quoteRef, quoteVis] = useReveal();
    const [ctaRef, ctaVis] = useReveal();

    const [copiedKey, copy] = useCopy();

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 12, md: 18 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.06) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'gv_glow 8s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-8%', width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0C 0%,transparent 70%)`, pointerEvents: 'none' }} />
                {/* Spinning rings */}
                <Box sx={{ position: 'absolute', top: '8%', right: '6%', width: 200, height: 200, borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.14)`, animation: 'gv_spin 28s linear infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '11%', right: '9%', width: 130, height: 130, borderRadius: '50%', border: `1px dashed rgba(14,165,233,0.12)`, animation: 'gv_spinR 18s linear infinite', pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 6 }, alignItems: 'center' }}>

                        {/* Left */}
                        <Box ref={heroRef}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3.5, opacity: heroVis ? 1 : 0, animation: heroVis ? 'gv_rise .6s ease both' : 'none' }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'gv_pulse 2s ease infinite' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.62rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.8, textTransform: 'uppercase' }}>Give Today</Typography>
                            </Box>

                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.6rem' }, fontWeight: 900, color: 'white', lineHeight: 1.02, letterSpacing: '-2px', mb: 1, opacity: heroVis ? 1 : 0, animation: heroVis ? 'gv_rise .7s ease .1s both' : 'none' }}>
                                Sow Into
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.6rem' }, fontWeight: 900, lineHeight: 1.02, letterSpacing: '-2px', mb: 4, background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light},${colors.secondary.main})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: heroVis ? 'gv_gradShift 4s ease infinite, gv_rise .7s ease .18s both' : 'none', opacity: heroVis ? 1 : 0 }}>
                                Eternity.
                            </Typography>

                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1rem', md: '1.1rem' }, color: 'rgba(255,255,255,0.5)', lineHeight: 1.95, maxWidth: 480, mb: 5, opacity: heroVis ? 1 : 0, animation: heroVis ? 'gv_rise .7s ease .26s both' : 'none' }}>
                                Your giving fuels Gospel crusades, feeds widows, sends orphans to school, and trains the next generation of ministers. Every amount — large or small — makes an eternal difference.
                            </Typography>

                            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ opacity: heroVis ? 1 : 0, animation: heroVis ? 'gv_rise .7s ease .34s both' : 'none' }}>
                                <Box component="a" href="#accounts" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                    <FavoriteIcon sx={{ fontSize: 16 }} /> Give Now
                                </Box>
                                <Box component={Link} to="/partners" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.18)', px: 3.5, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)' } }}>
                                    Partner With Us <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                </Box>
                            </Stack>
                        </Box>

                        {/* Right — floating currency icons */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: heroVis ? 1 : 0, animation: heroVis ? 'gv_right .9s cubic-bezier(.34,1.2,.64,1) .3s both' : 'none' }}>
                            <Box sx={{ position: 'relative', width: { xs: 280, md: 360 }, height: { xs: 280, md: 360 } }}>
                                {/* Orbit rings */}
                                <Box sx={{ position: 'absolute', inset: '-18%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.18)`, animation: 'gv_spin 22s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 10, height: 10, borderRadius: '50%', bgcolor: colors.secondary.main, boxShadow: `0 0 14px ${colors.secondary.main}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: '-6%', borderRadius: '50%', border: `1px dashed rgba(34,197,94,0.2)`, animation: 'gv_spinR 16s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', bottom: '-4px', left: '46%', width: 8, height: 8, borderRadius: '50%', bgcolor: '#22C55E', boxShadow: `0 0 10px #22C55E` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}16 0%,transparent 70%)`, animation: 'gv_glow 4s ease-in-out infinite', pointerEvents: 'none' }} />

                                {/* Center content */}
                                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                    <Box sx={{ animation: 'gv_float 5s ease-in-out infinite', textAlign: 'center' }}>
                                        {/* Big heart */}
                                        <Box sx={{ width: { xs: 90, md: 110 }, height: { xs: 90, md: 110 }, borderRadius: '50%', bgcolor: `${colors.secondary.main}18`, border: `2px solid ${colors.secondary.main}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, boxShadow: `0 0 40px ${colors.secondary.main}20` }}>
                                            <FavoriteIcon sx={{ fontSize: { xs: 42, md: 52 }, color: colors.secondary.main }} />
                                        </Box>
                                        {/* Currency flags */}
                                        <Box sx={{ display: 'flex', gap: 1.2, justifyContent: 'center' }}>
                                            {['🇳🇬', '🇺🇸', '🇬🇧', '🇪🇺'].map((flag, i) => (
                                                <Box key={i} sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                                                    {flag}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>

                {/* Wave */}
                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={colors.background.default} />
                    </svg>
                </Box>
            </Box>

            {/* ══ STATS ══ */}
            <Box ref={statsRef} sx={{ bgcolor: colors.background.default, py: { xs: 7, md: 10 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 2.5, md: 2 } }}>
                        {STATS.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <Box key={s.label} sx={{ textAlign: 'center', bgcolor: 'white', borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: `1px solid ${colors.divider}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `gv_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${s.color}30` } }}>
                                    <Box sx={{ width: 44, height: 44, borderRadius: '13px', bgcolor: `${s.color}14`, border: `1.5px solid ${s.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
                                        <Icon sx={{ fontSize: 22, color: s.color }} />
                                    </Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, fontWeight: 600, mt: .5, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ══ ACCOUNT CARDS ══ */}
            <Box id="accounts" ref={accountsRef} sx={{ bgcolor: colors.background.default, pb: { xs: 8, md: 14 } }}>
                <Container maxWidth="lg">
                    {/* Section header */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 9 }, opacity: accountsVis ? 1 : 0, animation: accountsVis ? 'gv_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>Bank Accounts</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12, mb: 1.5 }}>
                            Give in Your Currency
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, maxWidth: 500, mx: 'auto', lineHeight: 1.85 }}>
                            Use the account that matches your currency. Tap the copy button to copy the account number instantly.
                        </Typography>
                    </Box>

                    {/* 2×2 grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
                        {ACCOUNTS.map((account, i) => (
                            <AccountCard
                                key={account.id}
                                account={account}
                                index={i}
                                isVis={accountsVis}
                                copiedKey={copiedKey}
                                onCopy={copy}
                            />
                        ))}
                    </Box>

                    {/* After transfer note */}
                    <Box sx={{ mt: 5, p: { xs: 3, md: 4 }, bgcolor: `${colors.secondary.main}0A`, border: `1px solid ${colors.secondary.main}25`, borderRadius: '18px', display: 'flex', gap: 2, alignItems: 'flex-start', opacity: accountsVis ? 1 : 0, animation: accountsVis ? 'gv_rise .7s ease .5s both' : 'none' }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.secondary.main, flexShrink: 0, mt: '6px' }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.85rem', md: '0.92rem' }, color: colors.text.secondary, lineHeight: 1.85 }}>
                            After making your transfer, please send us a message via our{' '}
                            <Box component={Link} to="/contact" sx={{ color: colors.secondary.main, fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                contact page
                            </Box>
                            {' '}so we can confirm receipt and send you a thank-you. God bless you richly for your generosity. ❤️
                        </Typography>
                    </Box>
                </Container>
            </Box>

            {/* ══ WHY GIVE ══ */}
            <Box ref={whyRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, opacity: whyVis ? 1 : 0, animation: whyVis ? 'gv_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>Why Give</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.5rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12 }}>
                            Your Gift Makes a Real Difference
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 3 }}>
                        {WHY_GIVE.map((w, i) => (
                            <Box key={w.title} sx={{ bgcolor: colors.background.default, borderRadius: '22px', p: { xs: 3.5, md: 4 }, border: `1px solid ${colors.divider}`, opacity: whyVis ? 1 : 0, animation: whyVis ? `gv_rise .65s ease ${i * .1}s both` : 'none', transition: 'transform .3s, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.08)` } }}>
                                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: colors.secondary.main, mb: 2.5, boxShadow: `0 0 12px ${colors.secondary.main}` }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.2rem', fontWeight: 900, color: colors.text.primary, mb: 1.5 }}>
                                    {w.title}
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.9rem', color: colors.text.secondary, lineHeight: 1.85 }}>
                                    {w.body}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ SCRIPTURE QUOTE ══ */}
            <Box ref={quoteRef} sx={{ bgcolor: colors.background.default, py: { xs: 6, md: 10 } }}>
                <Container maxWidth="md">
                    <Box sx={{ bgcolor: colors.primary.dark, borderRadius: '28px', p: { xs: 4, md: 7 }, textAlign: 'center', position: 'relative', overflow: 'hidden', border: `1px solid rgba(212,160,23,0.18)`, opacity: quoteVis ? 1 : 0, animation: quoteVis ? 'gv_rise .7s ease both' : 'none' }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                        <Box sx={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}10 0%,transparent 70%)`, pointerEvents: 'none' }} />
                        <FormatQuoteIcon sx={{ fontSize: 56, color: `${colors.secondary.main}35`, mb: 2, position: 'relative', zIndex: 1 }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.1rem', md: '1.45rem' }, fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontStyle: 'italic', mb: 3, position: 'relative', zIndex: 1, maxWidth: 600, mx: 'auto' }}>
                            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                        </Typography>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ width: 28, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, color: colors.secondary.main }}>2 Corinthians 9:7</Typography>
                            <Box sx={{ width: 28, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ══ CTA ══ */}
            <Box ref={ctaRef} sx={{ background: `linear-gradient(120deg,${colors.primary.dark} 0%,#0F3460 55%,${colors.primary.light} 100%)`, py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'gv_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Ready to Give?
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.5)', mb: 5, maxWidth: 460, mx: 'auto', lineHeight: 1.9 }}>
                            Pick your account above, make your transfer, and let us know. We will celebrate with you and keep you updated on the impact of your giving.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component="a" href="#accounts" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', px: 4, py: 1.8, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteIcon sx={{ fontSize: 16 }} /> Give Now
                            </Box>
                            <Box component={Link} to="/contact" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'white', border: '1.5px solid rgba(255,255,255,0.22)', px: 4, py: 1.8, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', transform: 'translateY(-4px)' } }}>
                                Contact Us <ArrowForwardIcon sx={{ fontSize: 16 }} />
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}