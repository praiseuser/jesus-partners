import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CloseIcon from '@mui/icons-material/Close';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes ab_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes ab_left': { from: { opacity: 0, transform: 'translateX(-44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes ab_right': { from: { opacity: 0, transform: 'translateX(44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes ab_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes ab_glow': { '0%,100%': { opacity: .35, transform: 'scale(1)' }, '50%': { opacity: .7, transform: 'scale(1.08)' } },
    '@keyframes ab_float': { '0%,100%': { transform: 'translateY(0) rotate(-1deg)' }, '50%': { transform: 'translateY(-14px) rotate(1deg)' } },
    '@keyframes ab_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes ab_spinR': { to: { transform: 'rotate(-360deg)' } },
    '@keyframes ab_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 12px ${colors.secondary.main}00` } },
    '@keyframes ab_lineGrow': { from: { width: 0 }, to: { width: '100%' } },
    '@keyframes ab_shimmer': { from: { left: '-80%' }, to: { left: '130%' } },
    '@keyframes ab_countUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes ab_modalIn': { from: { opacity: 0, transform: 'scale(0.94) translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes ab_fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
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

const STATS = [
    { value: '2023', label: 'Formally Incorporated', icon: EmojiEventsIcon, color: colors.secondary.main },
    { value: '400+', label: 'Widows Supported', icon: FavoriteIcon, color: colors.accent.red },
    { value: '2', label: 'Boarding Schools', icon: GroupsIcon, color: colors.accent.green },
    { value: '1000s', label: 'Lives Transformed', icon: PublicIcon, color: colors.accent.teal },
];

// ── Pillars — short preview + full text shown in modal ───────────────
const PILLARS = [
    {
        key: 'vision',
        icon: VisibilityIcon,
        color: colors.secondary.main,
        title: 'Our Vision',
        preview: 'Reaching the generations of the world with the word and love of Christ that men may possess their inheritance in Christ.',
        full: `Reaching the generations of the world with the word and love of Christ that men may possess their inheritance in Christ.`,
    },
    {
        key: 'mission',
        icon: FlagIcon,
        color: colors.accent.teal,
        title: 'Our Mission',
        preview: 'To preach and teach biblical truth for salvation; raise godly disciples; and demonstrate the love of Christ to the needy in practical ways.',
        full: `To preach and teach biblical truth for salvation; raise godly disciples; train men and women for acceptable and fruitful ministry; and demonstrate the love of Christ to the needy in practical ways.`,
    },
    {
        key: 'anthem',
        icon: MusicNoteIcon,
        color: colors.accent.red,
        title: 'Anthem',
        preview: 'Partnering with Christ, advancing the gospel beyond the Pulpit-Pew to the troubled needy, meeting spiritual and physical needs.',
        full: `Partnering with Christ, advancing the gospel beyond the Pulpit-Pew to the troubled needy, meeting spiritual and physical needs, with the helping hand of God, lifting the despised vulnerable hopeless out of mere survival into their God-given inheritance in Christ.`,
    },
    {
        key: 'prayer',
        icon: VolunteerActivismIcon,
        color: colors.accent.green,
        title: 'JPO Prayer',
        preview: 'Oh, Lord of all creation, we pray that no child should grow up without family care, no widow without support.',
        full: `Oh, Lord of all creation, we pray that no child should grow up without family care, no widow without support, and no generation without the word and hope of Christ.`,
    },
    {
        key: 'story',
        icon: HistoryEduIcon,
        color: '#8B5CF6',
        title: 'Our Story',
        preview: 'As a couple in ministry, we found ourselves serving under crushing conditions. In 2007, God sent help through John Kanis, a missionary brother from the USA.',
        full: `As a couple in ministry, we found ourselves serving under crushing conditions. Feeding, clothing, and training children felt impossible. Ministry was frustrating.

In 2007, God sent help through John Kanis, a missionary brother from the USA who came for a medical mission in Mkar-Gboko. He chose to stand with our family and ministry. Since then, he has been a faithful vessel of Christ's love — supporting us in ways only God could orchestrate.

Then the Lord spoke clearly: "Share with others as I share with you." James 1:27 became our compass: "Pure religion before God is this: to visit orphans and widows in their trouble…"

Over the years, we have shared with widows, orphans, churches, and ministers. We've committed our lives to Christ through Gospel Crusades and Revivals with testimonies of salvation, praying for the sick, and assisting families with medical care as God provides.

This is the core of all we do: seeking the salvation of the lost, discipling them for Christ, and meeting needs under God's gracious provision. Brother John Kanis has been a key supporter in this journey for over 17 years.

In 2023, we formally organized what we'd been passionately doing for years. Here we have JESUS PARTNERS OUTREACH today.`,
    },
];

// ── Modal ──────────────────────────────────────────────────────────
function PillarModal({ pillar, onClose }) {
    if (!pillar) return null;
    const Icon = pillar.icon;

    useEffect(() => {
        const fn = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', fn);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
    }, [onClose]);

    return (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 1.5, md: 3 } }}>
            <Box onClick={onClose} sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', animation: 'ab_fadeIn .2s ease both' }} />

            <Box sx={{
                position: 'relative', width: '100%', maxWidth: 620, maxHeight: '85vh',
                bgcolor: 'white', borderRadius: '22px', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                animation: 'ab_modalIn .35s cubic-bezier(.34,1.2,.64,1) both',
                boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            }}>
                <Box sx={{ height: 4, background: `linear-gradient(90deg,${pillar.color},${pillar.color}66)`, flexShrink: 0 }} />

                <Box sx={{ px: { xs: 3, md: 4 }, py: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2, flexShrink: 0, borderBottom: `1px solid ${colors.divider}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
                        <Box sx={{ width: 46, height: 46, borderRadius: '14px', bgcolor: `${pillar.color}14`, border: `1.5px solid ${pillar.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon sx={{ fontSize: 22, color: pillar.color }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '1.2rem', md: '1.4rem' }, fontWeight: 900, color: colors.text.primary }}>
                            {pillar.title}
                        </Typography>
                    </Box>
                    <Box onClick={onClose} sx={{ width: 34, height: 34, borderRadius: '10px', bgcolor: colors.background.default, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, '&:hover': { bgcolor: colors.divider } }}>
                        <CloseIcon sx={{ fontSize: 18, color: colors.text.secondary }} />
                    </Box>
                </Box>

                <Box sx={{ px: { xs: 3, md: 4 }, py: 3, overflowY: 'auto', '&::-webkit-scrollbar': { width: 4 }, '&::-webkit-scrollbar-thumb': { bgcolor: `${pillar.color}40`, borderRadius: 2 } }}>
                    {pillar.full.split('\n\n').map((para, i) => (
                        <Typography key={i} sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, lineHeight: 1.95, mb: i < pillar.full.split('\n\n').length - 1 ? 2.2 : 0 }}>
                            {para}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default function AboutPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [statsRef, statsVis] = useReveal();
    const [pillarsRef, pillarsVis] = useReveal();
    const [certRef, certVis] = useReveal();
    const [ctaRef, ctaVis] = useReveal();
    const [activePillar, setActivePillar] = useState(null);

    return (
        <>
            <GlobalStyles styles={keyframes} />

            <PillarModal pillar={activePillar} onClose={() => setActivePillar(null)} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'ab_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 6 }, alignItems: 'center' }}>

                        <Box ref={heroRef}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'ab_rise .6s ease both' : 'none' }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'ab_pulse 2s ease infinite' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                    Our Story
                                </Typography>
                            </Box>

                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-1px', mb: 1, opacity: heroVis ? 1 : 0, animation: heroVis ? 'ab_rise .7s ease .1s both' : 'none' }}>
                                We Exist to
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1px', mb: 3, background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light},${colors.secondary.main})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: heroVis ? 'ab_gradShift 4s ease infinite, ab_rise .7s ease .18s both' : 'none', opacity: heroVis ? 1 : 0 }}>
                                Transform Lives.
                            </Typography>

                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 460, mb: 4, opacity: heroVis ? 1 : 0, animation: heroVis ? 'ab_rise .7s ease .26s both' : 'none' }}>
                                For years, the founders of Jesus Partners Outreach quietly ministered under difficult conditions — feeding, clothing, training, and preaching the Gospel. In 2023, what began as a passionate calling was formally incorporated in Nigeria as Jesus Partners Outreach, bringing structure to years of faithful service.
                            </Typography>

                            <Box component={Link} to="/give" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', opacity: heroVis ? 1 : 0, animation: heroVis ? 'ab_rise .7s ease .34s both' : 'none', '&:hover': { transform: 'translateY(-4px) scale(1.04)', boxShadow: `0 16px 40px ${colors.secondary.main}55` } }}>
                                <FavoriteIcon sx={{ fontSize: 16 }} />
                                Become a Partner
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: heroVis ? 1 : 0, animation: heroVis ? 'ab_right .9s cubic-bezier(.34,1.2,.64,1) .3s both' : 'none' }}>
                            <Box sx={{ position: 'relative', width: { xs: 220, md: 300 }, height: { xs: 220, md: 300 } }}>
                                <Box sx={{ position: 'absolute', inset: '-18%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.18)`, animation: 'ab_spin 22s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 10, height: 10, borderRadius: '50%', bgcolor: colors.secondary.main, boxShadow: `0 0 14px ${colors.secondary.main}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: '-6%', borderRadius: '50%', border: `1px dashed rgba(14,165,233,0.14)`, animation: 'ab_spinR 15s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', bottom: '-4px', left: '46%', width: 8, height: 8, borderRadius: '50%', bgcolor: colors.accent.teal, boxShadow: `0 0 10px ${colors.accent.teal}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}20 0%,transparent 70%)`, animation: 'ab_glow 4s ease-in-out infinite', pointerEvents: 'none' }} />
                                <Box component="img" src="/jesus1.png" alt="JPO" sx={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 2, animation: 'ab_float 5s ease-in-out infinite', filter: `drop-shadow(0 20px 50px ${colors.secondary.main}40)` }} />
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

            {/* ══ STATS ══ */}
            <Box ref={statsRef} sx={{ bgcolor: colors.background.default, py: { xs: 7, md: 10 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 3, md: 2 } }}>
                        {STATS.map((s, i) => {
                            const Icon = s.icon;
                            return (
                                <Box key={s.label} sx={{ textAlign: 'center', bgcolor: 'white', borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: `1px solid ${colors.divider}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `ab_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${s.color}30` } }}>
                                    <Box sx={{ width: 44, height: 44, borderRadius: '14px', bgcolor: `${s.color}14`, border: `1.5px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
                                        <Icon sx={{ fontSize: 22, color: s.color }} />
                                    </Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 900, color: colors.primary.main, lineHeight: 1 }}>{s.value}</Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, fontWeight: 600, mt: .5, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ══ VISION / MISSION / ANTHEM / PRAYER / STORY — preview cards ══ */}
            <Box ref={pillarsRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .6, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, opacity: pillarsVis ? 1 : 0, animation: pillarsVis ? 'ab_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>Our Foundation</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12 }}>
                            What Drives Everything We Do
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3,1fr)' }, gap: 3 }}>
                        {PILLARS.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <Box key={p.key} sx={{
                                    bgcolor: colors.background.default, borderRadius: '22px', p: { xs: 3, md: 3.5 },
                                    border: `1px solid ${colors.divider}`, position: 'relative', overflow: 'hidden',
                                    display: 'flex', flexDirection: 'column',
                                    opacity: pillarsVis ? 1 : 0, animation: pillarsVis ? `ab_rise .65s cubic-bezier(.34,1.2,.64,1) ${i * .1}s both` : 'none',
                                    transition: 'transform .35s cubic-bezier(.34,1.2,.64,1), box-shadow .3s',
                                    '&:hover': { transform: 'translateY(-10px)', boxShadow: `0 30px 65px rgba(10,16,40,0.1), 0 0 0 1px ${p.color}30` },
                                    '&::before': { content: '""', position: 'absolute', top: 0, bottom: 0, width: '55%', left: '-80%', zIndex: 5, pointerEvents: 'none', background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.7) 50%,transparent 70%)' },
                                    '&:hover::before': { animation: 'ab_shimmer .6s ease forwards' },
                                }}>
                                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.color},${p.color}55)` }} />
                                    <Box sx={{ width: 50, height: 50, borderRadius: '15px', bgcolor: `${p.color}14`, border: `2px solid ${p.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.2, animation: 'ab_pulse 3s ease infinite' }}>
                                        <Icon sx={{ fontSize: 24, color: p.color }} />
                                    </Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.lg, fontWeight: 900, color: colors.text.primary, mb: 1.3 }}>{p.title}</Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.8, mb: 2.5, flex: 1 }}>{p.preview}</Typography>
                                    <Box onClick={() => setActivePillar(p)} sx={{
                                        display: 'inline-flex', alignItems: 'center', gap: .8,
                                        color: p.color, cursor: 'pointer',
                                        fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700,
                                        transition: 'gap .2s ease', width: 'fit-content',
                                        '&:hover': { gap: 1.4 },
                                    }}>
                                        Read More <ArrowForwardIcon sx={{ fontSize: 15 }} />
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ══ CERTIFICATE — unchanged ══ */}
            <Box ref={certRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '10%', left: '-5%', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}07 0%,transparent 70%)`, pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '10%', right: '-5%', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}07 0%,transparent 70%)`, pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>

                    <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 }, opacity: certVis ? 1 : 0, animation: certVis ? 'ab_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>Official Recognition</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12 }}>
                            Our Certificate of Incorporation
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, mt: 1.5, maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}>
                            Jesus Partners Outreach is a duly registered and incorporated ministry in Nigeria.
                        </Typography>
                    </Box>

                    <Box sx={{ mx: 'auto', maxWidth: 600, position: 'relative', opacity: certVis ? 1 : 0, animation: certVis ? 'ab_rise .8s cubic-bezier(.34,1.2,.64,1) .15s both' : 'none' }}>
                        <Box sx={{ position: 'absolute', inset: '-12px', borderRadius: '28px', background: `linear-gradient(135deg,${colors.secondary.main}30,${colors.secondary.dark}10,${colors.secondary.main}20)`, filter: 'blur(18px)', pointerEvents: 'none' }} />

                        <Box sx={{
                            position: 'relative',
                            borderRadius: '22px',
                            p: '5px',
                            background: `linear-gradient(135deg, ${colors.secondary.dark}, ${colors.secondary.main}, #fff8e1, ${colors.secondary.main}, ${colors.secondary.dark})`,
                            boxShadow: `0 30px 80px rgba(10,16,40,0.18), 0 0 0 1px ${colors.secondary.main}40`,
                        }}>
                            <Box sx={{
                                bgcolor: '#fffdf5',
                                borderRadius: '18px',
                                p: { xs: 2.5, md: 4 },
                                border: `2px solid ${colors.secondary.main}22`,
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                {[
                                    { top: 10, left: 10, borderTop: `3px solid ${colors.secondary.main}`, borderLeft: `3px solid ${colors.secondary.main}` },
                                    { top: 10, right: 10, borderTop: `3px solid ${colors.secondary.main}`, borderRight: `3px solid ${colors.secondary.main}` },
                                    { bottom: 10, left: 10, borderBottom: `3px solid ${colors.secondary.main}`, borderLeft: `3px solid ${colors.secondary.main}` },
                                    { bottom: 10, right: 10, borderBottom: `3px solid ${colors.secondary.main}`, borderRight: `3px solid ${colors.secondary.main}` },
                                ].map((style, i) => (
                                    <Box key={i} sx={{ position: 'absolute', width: 28, height: 28, borderRadius: '3px', ...style, pointerEvents: 'none' }} />
                                ))}

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 2.5 }}>
                                    <Box sx={{ flex: 1, height: '1px', background: `linear-gradient(90deg,transparent,${colors.secondary.main}60)` }} />
                                    <EmojiEventsIcon sx={{ color: colors.secondary.main, fontSize: 22 }} />
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, color: colors.secondary.dark, letterSpacing: 2, textTransform: 'uppercase' }}>
                                        Certified & Registered
                                    </Typography>
                                    <EmojiEventsIcon sx={{ color: colors.secondary.main, fontSize: 22 }} />
                                    <Box sx={{ flex: 1, height: '1px', background: `linear-gradient(90deg,${colors.secondary.main}60,transparent)` }} />
                                </Box>

                                <Box
                                    component="img"
                                    src="/outreach.jpeg"
                                    alt="Jesus Partners Outreach Certificate of Incorporation"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        borderRadius: '10px',
                                        boxShadow: '0 8px 32px rgba(10,16,40,0.12)',
                                    }}
                                />

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mt: 2.5 }}>
                                    <Box sx={{ flex: 1, height: '1px', background: `linear-gradient(90deg,transparent,${colors.secondary.main}60)` }} />
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.text.secondary, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                                        Incorporated in Nigeria · 2023
                                    </Typography>
                                    <Box sx={{ flex: 1, height: '1px', background: `linear-gradient(90deg,${colors.secondary.main}60,transparent)` }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                </Container>
            </Box>

            {/* ══ SCRIPTURE QUOTE ══ */}
            <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
                <Container maxWidth="md">
                    <Box sx={{ bgcolor: colors.primary.dark, borderRadius: '24px', p: { xs: 4, md: 6 }, textAlign: 'center', position: 'relative', overflow: 'hidden', border: `1px solid rgba(212,160,23,0.18)` }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none' }} />
                        <FormatQuoteIcon sx={{ fontSize: 48, color: `${colors.secondary.main}40`, mb: 1, position: 'relative', zIndex: 1 }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.1rem', md: '1.4rem' }, fontWeight: 700, color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, fontStyle: 'italic', mb: 2, position: 'relative', zIndex: 1 }}>
                            "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world."
                        </Typography>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ width: 24, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, color: colors.secondary.main }}>James 1:27</Typography>
                            <Box sx={{ width: 24, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box ref={ctaRef} sx={{ background: `linear-gradient(120deg,${colors.primary.dark} 0%,#0F3460 55%,${colors.primary.light} 100%)`, py: { xs: 8, md: 11 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'ab_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Ready to Partner with Jesus?
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.55)', mb: 4, maxWidth: 480, mx: 'auto', lineHeight: 1.85 }}>
                            Join us in reaching orphans, widows, persecuted believers, and the lost. Every partnership makes an eternal difference.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component={Link} to="/give" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', px: 4, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)', boxShadow: `0 16px 40px ${colors.secondary.main}55` } }}>
                                <FavoriteIcon sx={{ fontSize: 16 }} /> Become a Partner
                            </Box>
                            <Box component={Link} to="/contact" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', px: 4, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' } }}>
                                Contact Us <ArrowForwardIcon sx={{ fontSize: 16 }} />
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}