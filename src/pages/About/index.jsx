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

const PILLARS = [
    {
        icon: VisibilityIcon,
        color: colors.secondary.main,
        title: 'Our Vision',
        desc: 'To raise men and women who shall accompany Jesus and become true partners in fulfilling the Great Commission — reaching the lost, healing the broken, and transforming communities across every nation and generation.',
    },
    {
        icon: FlagIcon,
        color: colors.accent.teal,
        title: 'Our Mission',
        desc: 'To raise revival and gospel altars across the nations — partnering with Jesus through Crusades, Revivals, and practical outreaches to reveal Him so that men may possess their possession, and the vulnerable may find hope.',
    },
    {
        icon: GroupsIcon,
        color: colors.accent.green,
        title: 'Who We Are',
        desc: 'Jesus Partners Outreach is a Nigerian-incorporated ministry on a divine mandate. We serve orphans, widows, persecuted believers, and ministers in need — sharing the love of Christ in word and in deed.',
    },
];

export default function AboutPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [statsRef, statsVis] = useReveal();
    const [pillarsRef, pillarsVis] = useReveal();
    const [storyRef, storyVis] = useReveal();
    const [ctaRef, ctaVis] = useReveal();

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'ab_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 6 }, alignItems: 'center' }}>

                        {/* Left — text */}
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

                        {/* Right — animated logo */}
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

                {/* wave */}
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

            {/* ══ VISION / MISSION / WHO WE ARE ══ */}
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

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, gap: 3 }}>
                        {PILLARS.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <Box key={p.title} sx={{ bgcolor: colors.background.default, borderRadius: '22px', p: { xs: 3, md: 4 }, border: `1px solid ${colors.divider}`, position: 'relative', overflow: 'hidden', opacity: pillarsVis ? 1 : 0, animation: pillarsVis ? `ab_rise .65s cubic-bezier(.34,1.2,.64,1) ${i * .12}s both` : 'none', transition: 'transform .35s cubic-bezier(.34,1.2,.64,1), box-shadow .3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: `0 30px 65px rgba(10,16,40,0.1), 0 0 0 1px ${p.color}30` }, '&::before': { content: '""', position: 'absolute', top: 0, bottom: 0, width: '55%', left: '-80%', zIndex: 5, pointerEvents: 'none', background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.7) 50%,transparent 70%)' }, '&:hover::before': { animation: 'ab_shimmer .6s ease forwards' } }}>
                                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.color},${p.color}55)` }} />
                                    <Box sx={{ width: 54, height: 54, borderRadius: '16px', bgcolor: `${p.color}14`, border: `2px solid ${p.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5, animation: 'ab_pulse 3s ease infinite' }}>
                                        <Icon sx={{ fontSize: 26, color: p.color }} />
                                    </Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.lg, fontWeight: 900, color: colors.text.primary, mb: 1.5 }}>{p.title}</Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.85 }}>{p.desc}</Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ══ OUR STORY ══ */}
            <Box ref={storyRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: '-10%', right: '-4%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}08 0%,transparent 70%)`, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, opacity: storyVis ? 1 : 0, animation: storyVis ? 'ab_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>How It Began</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12 }}>
                            A Story of Faithful Obedience
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 5, md: 8 }, alignItems: 'start' }}>
                        <Box sx={{ opacity: storyVis ? 1 : 0, animation: storyVis ? 'ab_left .7s ease .1s both' : 'none' }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, lineHeight: 1.9, mb: 2.5 }}>
                                The founders and presidents of Jesus Partners Outreach found themselves ministering under deeply challenging conditions — where feeding, clothing, and training of children was a serious burden. Yet they pressed on, driven by a love for the Gospel and for the vulnerable.
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, lineHeight: 1.9, mb: 2.5 }}>
                                In 2007, a missionary brother from the USA came for a medical mission in Nkier-Gboko and was moved to partner with the family and ministry. His commitment has been unwavering ever since — a living testimony of God's provision.
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, lineHeight: 1.9 }}>
                                Inspired by James 1:27 and the generosity shown to them, God spoke to the founders to share with others as He had done for them. Over the years they have served widows, orphans, churches, and ministers — going out for Gospel Crusades, Revivals, praying for the sick, and assisting those in need.
                            </Typography>
                        </Box>

                        <Box sx={{ opacity: storyVis ? 1 : 0, animation: storyVis ? 'ab_right .7s ease .2s both' : 'none' }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, lineHeight: 1.9, mb: 2.5 }}>
                                In 2023, what had been years of passionate, Spirit-led ministry was formally organised and incorporated in Nigeria — and Jesus Partners Outreach was born as an institution.
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, lineHeight: 1.9, mb: 3 }}>
                                Today, the ministry reaches widows, orphans, persecuted believers, and displaced communities — especially those affected by security crises and attacks in Northern Nigeria. With practical care, Gospel proclamation, education support, and ministerial training, Jesus Partners Outreach continues to be the hands and feet of Christ.
                            </Typography>

                            {/* Key partnerships list */}
                            <Box sx={{ bgcolor: 'white', borderRadius: '16px', p: 3, border: `1px solid ${colors.divider}` }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, color: colors.text.primary, mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                                    Our Areas of Partnership
                                </Typography>
                                {[
                                    'Crusades & Revivals',
                                    'Widows & Orphans Care',
                                    'Medical Outreaches',
                                    'Pastors & Children Support',
                                    'Ministerial Training',
                                ].map((item, i) => (
                                    <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, borderBottom: i < 4 ? `1px solid ${colors.divider}` : 'none' }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: colors.secondary.main, flexShrink: 0 }} />
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, fontWeight: 500 }}>{item}</Typography>
                                    </Box>
                                ))}
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

            {/* ══ CTA ══ */}
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