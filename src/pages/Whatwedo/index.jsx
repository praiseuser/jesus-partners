import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CampaignIcon from '@mui/icons-material/Campaign';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes wd_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes wd_left': { from: { opacity: 0, transform: 'translateX(-44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes wd_right': { from: { opacity: 0, transform: 'translateX(44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes wd_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes wd_glow': { '0%,100%': { opacity: .35, transform: 'scale(1)' }, '50%': { opacity: .7, transform: 'scale(1.08)' } },
    '@keyframes wd_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 12px ${colors.secondary.main}00` } },
    '@keyframes wd_shimmer': { from: { left: '-80%' }, to: { left: '130%' } },
    '@keyframes wd_float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
    '@keyframes wd_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes wd_spinR': { to: { transform: 'rotate(-360deg)' } },
    '@keyframes wd_countUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes wd_fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
    '@keyframes wd_slideUp': { from: { opacity: 0, transform: 'translateY(40px) scale(0.97)' }, to: { opacity: 1, transform: 'none' } },
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

// ─── Core mandate (the 5 "what we do" points) ─────────────────────────────────
const MANDATE = [
    { icon: CampaignIcon, color: colors.secondary.main, text: 'Preach and teach the word of Christ through gospel and revival outreaches in partnership with churches and communities' },
    { icon: HandshakeIcon, color: colors.accent.teal, text: 'Raise and administer support for needy churches and ministers in challenged areas' },
    { icon: VolunteerActivismIcon, color: colors.accent.red, text: 'Support and empower widows, orphans, and the vulnerable' },
    { icon: MenuBookIcon, color: '#8B5CF6', text: 'Train Christian ministers through sound biblical and theological education' },
    { icon: LocalHospitalIcon, color: colors.accent.green, text: 'Facilitate medical care through partnerships with accredited healthcare organizations' },
];

// ─── Programs & Activities — teaser (3 sentences) + full content for modal ────
const PROGRAMS = [
    {
        id: 'crusades',
        icon: CampaignIcon,
        color: colors.secondary.main,
        title: 'Crusades',
        teaser: 'Our Gospel and revival outreaches are prayer-backed programs to preach salvation, pray for the sick, bring deliverance, and provide material support. We go with the WORD, WORKS, and WORTH — reaching spiritual, physical, and material needs through Christ\u2019s love. From city-wide crusades to personal discipleship, every outreach is shaped to meet people exactly where they are.',
        full: {
            intro: 'Our Gospel and revival outreaches are prayer-backed programs to preach salvation, pray for the sick, bring deliverance, and provide material support. We go with the WORD, WORKS, and WORTH — reaching spiritual, physical, and material needs through Christ\u2019s love.',
            pillars: [
                { label: 'WORD', desc: 'Preach and teach the Word' },
                { label: 'WORKS', desc: 'Heal the sick and cast out demons' },
                { label: 'WORTH', desc: 'Provide for the needy' },
            ],
            listTitle: 'Four types of outreaches',
            list: [
                { title: 'City-wide', desc: 'Draws participants from across cities. Done with all willing churches.' },
                { title: 'Local Outreaches', desc: 'Serve a village, town, or local church. Lower cost with our technical, media, and ministerial teams.' },
                { title: 'Street Outreaches', desc: 'Prayerfully chosen locations within towns or institutions.' },
                { title: 'Personal Evangelism & Discipleship Training', desc: '' },
            ],
        },
    },
    {
        id: 'widows',
        icon: VolunteerActivismIcon,
        color: colors.accent.red,
        title: 'Widows & Orphans Support',
        teaser: 'We honour James 1:27 through practical, sustained care for widows and orphans across our communities. This includes an annual feast of fellowship and gifts, full boarding-school support for vulnerable children, and seed funding that helps widows build their own businesses. Every initiative is designed to restore dignity, not just meet a one-time need.',
        full: {
            intro: 'We honour James 1:27 through practical, sustained care for widows and orphans across our communities — restoring dignity, not just meeting a one-time need.',
            listTitle: 'Our support includes',
            list: [
                { title: 'Widows Outreach Feast', desc: 'An annual gathering with widows to share fellowship, meals, counselling, and gifts. Usually held in February — over 400 widows attended in 2026.' },
                { title: 'Orphans School Support', desc: 'Education, safety, Christian nurturing, meals, and medical care in boarding schools for displaced and vulnerable children.' },
                { title: 'Widows Business Empowerment', desc: 'Seed capital, fertilizer, sewing machines, water pumps, and grinding machines to support widows\u2019 businesses.' },
            ],
        },
    },
    {
        id: 'ministers',
        icon: PeopleAltIcon,
        color: '#8B5CF6',
        title: "Ministers & Ministers' Children Support",
        teaser: 'We come alongside pastors and their families who are serving under difficult conditions with limited resources. This means covering tuition, books, and exam fees for ministers\u2019 children, offering scholarships for ministerial training, and investing in infrastructure that strengthens local ministry. It is support born from understanding the real cost of a life devoted to ministry.',
        full: {
            intro: 'We come alongside pastors and their families serving under difficult conditions with limited resources — support born from understanding the real cost of a life devoted to ministry.',
            listTitle: 'Our support includes',
            list: [
                { title: 'Tuition, Books & Exam Fees', desc: 'Covering school costs and external exam fees for ministers\u2019 children.' },
                { title: 'Ministerial Training Scholarships', desc: 'Helping called ministers access sound theological education.' },
                { title: 'Infrastructure Development', desc: 'Investing in the physical resources that strengthen local ministry.' },
            ],
        },
    },
    {
        id: 'gcem',
        icon: MenuBookIcon,
        color: colors.accent.teal,
        title: 'Grace College of Evangelism & Missions',
        teaser: 'We undertake ministerial development through Grace College of Evangelism & Missions, where we run an MA program in partnership with Puritan Reformed Theological Seminary, USA. The college is raising the next generation of evangelists and missionaries through rigorous biblical training. It stands as one of our longest-term investments in the future of Gospel work across the region.',
        full: {
            intro: 'We undertake ministerial development through Grace College of Evangelism & Missions, where we run an MA program in partnership with Puritan Reformed Theological Seminary, USA — one of our longest-term investments in the future of Gospel work across the region.',
            listTitle: 'What the college needs to grow',
            list: [
                { title: 'Scholarships', desc: 'Helping qualified students access the MA program regardless of financial background.' },
                { title: 'Infrastructure', desc: 'Physical accommodation and learning facilities for resident students.' },
                { title: 'Study Materials', desc: 'Curriculum resources and library materials for theological training.' },
            ],
        },
    },
];

const SUMMARY_STATS = [
    { value: '4', label: 'Core Programs', color: colors.secondary.main },
    { value: '400+', label: 'Widows Reached (2026)', color: colors.accent.red },
    { value: '1', label: 'Training College', color: colors.accent.teal },
    { value: '2007', label: 'Serving Since', color: '#8B5CF6' },
];

// ─── Read More Modal ───────────────────────────────────────────────────────
function ProgramModal({ program, onClose }) {
    useEffect(() => {
        if (program) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [program]);

    if (!program) return null;
    const Icon = program.icon;

    return (
        <Box
            onClick={onClose}
            sx={{
                position: 'fixed', inset: 0, zIndex: 9999,
                display: 'flex', alignItems: { xs: 'flex-end', sm: 'center' }, justifyContent: 'center',
                bgcolor: 'rgba(5,10,30,0.72)', backdropFilter: 'blur(6px)',
                animation: 'wd_fadeIn .2s ease both', p: { xs: 0, sm: 3 },
            }}
        >
            <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                    width: '100%', maxWidth: 640, maxHeight: { xs: '90vh', sm: '85vh' },
                    bgcolor: 'white',
                    borderRadius: { xs: '24px 24px 0 0', sm: '20px' },
                    display: 'flex', flexDirection: 'column',
                    animation: 'wd_slideUp .35s cubic-bezier(.34,1.2,.64,1) both',
                    overflow: 'hidden',
                }}
            >
                {/* Header */}
                <Box sx={{
                    px: { xs: 3, sm: 4 }, py: 3, flexShrink: 0,
                    background: `linear-gradient(135deg, ${program.color}10, transparent)`,
                    borderBottom: `1px solid ${program.color}20`,
                    position: 'relative',
                }}>
                    <Box component="button" onClick={onClose}
                        sx={{ position: 'absolute', top: 16, right: 16, width: 34, height: 34, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.05)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' } }}>
                        <CloseIcon sx={{ fontSize: 18, color: colors.text.secondary }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pr: 5 }}>
                        <Box sx={{ width: 52, height: 52, borderRadius: '14px', bgcolor: `${program.color}18`, border: `1.5px solid ${program.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon sx={{ fontSize: 26, color: program.color }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.3rem', sm: '1.5rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.2 }}>
                            {program.title}
                        </Typography>
                    </Box>
                </Box>

                {/* Body */}
                <Box sx={{ flex: 1, overflowY: 'auto', px: { xs: 3, sm: 4 }, py: 3.5 }}>
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.95rem', color: colors.text.secondary, lineHeight: 1.9, mb: program.full.pillars || program.full.list ? 3 : 0 }}>
                        {program.full.intro}
                    </Typography>

                    {/* WORD / WORKS / WORTH pillars (crusades only) */}
                    {program.full.pillars && (
                        <Stack gap={1.5} mb={3.5}>
                            {program.full.pillars.map((p) => (
                                <Box key={p.label} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '12px', bgcolor: `${program.color}08`, border: `1px solid ${program.color}20` }}>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.78rem', fontWeight: 900, color: program.color, letterSpacing: 1.5, minWidth: 64 }}>
                                        {p.label}
                                    </Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.88rem', color: colors.text.primary }}>
                                        {p.desc}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    )}

                    {/* Detail list */}
                    {program.full.list && (
                        <>
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.72rem', fontWeight: 800, color: program.color, letterSpacing: 2, textTransform: 'uppercase', mb: 2 }}>
                                {program.full.listTitle}
                            </Typography>
                            <Stack gap={2}>
                                {program.full.list.map((item, idx) => (
                                    <Box key={item.title} sx={{ display: 'flex', gap: 1.5 }}>
                                        <Box sx={{ width: 24, height: 24, borderRadius: '7px', bgcolor: `${program.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: '1px' }}>
                                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.68rem', fontWeight: 900, color: program.color }}>{idx + 1}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.88rem', fontWeight: 800, color: colors.text.primary, lineHeight: 1.4 }}>
                                                {item.title}
                                            </Typography>
                                            {item.desc && (
                                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.85rem', color: colors.text.secondary, lineHeight: 1.7, mt: .4 }}>
                                                    {item.desc}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </>
                    )}
                </Box>

                {/* Footer CTA */}
                <Box sx={{ px: { xs: 3, sm: 4 }, py: 2.5, borderTop: '1px solid rgba(0,0,0,0.06)', flexShrink: 0, display: 'flex', gap: 1.5 }}>
                    <Box component={Link} to="/partners" onClick={onClose}
                        sx={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1, bgcolor: program.color, color: 'white', px: 3, py: 1.4, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '0.85rem', fontWeight: 800, boxShadow: `0 8px 22px ${program.color}40`, transition: 'all .25s ease', '&:hover': { transform: 'translateY(-2px)' } }}>
                        <FavoriteBorderIcon sx={{ fontSize: 15 }} /> Support This
                    </Box>
                    <Box component="button" onClick={onClose}
                        sx={{ px: 3, py: 1.4, borderRadius: '10px', border: '1.5px solid rgba(0,0,0,0.12)', bgcolor: 'transparent', color: colors.text.secondary, fontFamily: typography.fontFamily.heading, fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                        Close
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default function WhatWeDoPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [mandateRef, mandateVis] = useReveal();
    const [statsRef, statsVis] = useReveal();
    const [progsRef, progsVis] = useReveal();
    const [quoteRef, quoteVis] = useReveal();
    const [ctaRef, ctaVis] = useReveal();

    const [activeProgram, setActiveProgram] = useState(null);

    return (
        <>
            <GlobalStyles styles={keyframes} />
            <ProgramModal program={activeProgram} onClose={() => setActiveProgram(null)} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'wd_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 6 }, alignItems: 'center' }}>

                        <Box ref={heroRef}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'wd_rise .6s ease both' : 'none' }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'wd_pulse 2s ease infinite' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                    Our Work
                                </Typography>
                            </Box>

                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-1px', mb: 1, opacity: heroVis ? 1 : 0, animation: heroVis ? 'wd_rise .7s ease .1s both' : 'none' }}>
                                The Gospel in
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1px', mb: 3, background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light},${colors.secondary.main})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: heroVis ? 'wd_gradShift 4s ease infinite, wd_rise .7s ease .18s both' : 'none', opacity: heroVis ? 1 : 0 }}>
                                Word & Deed.
                            </Typography>

                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 460, mb: 4, opacity: heroVis ? 1 : 0, animation: heroVis ? 'wd_rise .7s ease .26s both' : 'none' }}>
                                From city-wide Gospel Crusades to feeding widows and training missionaries — Jesus Partners Outreach serves the whole person, in every community, with the love of Christ made tangible.
                            </Typography>

                            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ opacity: heroVis ? 1 : 0, animation: heroVis ? 'wd_rise .7s ease .34s both' : 'none' }}>
                                <Box component={Link} to="/give" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)', boxShadow: `0 16px 40px ${colors.secondary.main}55` } }}>
                                    <FavoriteIcon sx={{ fontSize: 16 }} /> Support a Programme
                                </Box>
                                <Box component="a" href="#programmes" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.18)', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)', transform: 'translateY(-2px)' } }}>
                                    See Programs <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                </Box>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: heroVis ? 1 : 0, animation: heroVis ? 'wd_right .9s cubic-bezier(.34,1.2,.64,1) .3s both' : 'none' }}>
                            <Box sx={{ position: 'relative', width: { xs: 260, md: 340 }, height: { xs: 260, md: 340 } }}>
                                <Box sx={{ position: 'absolute', inset: '-18%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.18)`, animation: 'wd_spin 22s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 10, height: 10, borderRadius: '50%', bgcolor: colors.secondary.main, boxShadow: `0 0 14px ${colors.secondary.main}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: '-6%', borderRadius: '50%', border: `1px dashed rgba(14,165,233,0.14)`, animation: 'wd_spinR 15s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', bottom: '-4px', left: '46%', width: 8, height: 8, borderRadius: '50%', bgcolor: colors.accent.teal, boxShadow: `0 0 10px ${colors.accent.teal}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}18 0%,transparent 70%)`, animation: 'wd_glow 4s ease-in-out infinite', pointerEvents: 'none' }} />
                                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, animation: 'wd_float 5s ease-in-out infinite' }}>
                                        {[
                                            { Icon: CampaignIcon, color: colors.secondary.main },
                                            { Icon: VolunteerActivismIcon, color: colors.accent.red },
                                            { Icon: SchoolIcon, color: colors.accent.green },
                                            { Icon: MenuBookIcon, color: colors.accent.teal },
                                        ].map(({ Icon, color }, i) => (
                                            <Box key={i} sx={{ width: { xs: 52, md: 68 }, height: { xs: 52, md: 68 }, borderRadius: '18px', bgcolor: `${color}18`, border: `1.5px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                                                <Icon sx={{ fontSize: { xs: 24, md: 30 }, color }} />
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
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

            {/* ══ WHAT WE DO — Core Mandate ══ */}
            <Box ref={mandateRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 }, opacity: mandateVis ? 1 : 0, animation: mandateVis ? 'wd_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>What We Do</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.15, maxWidth: 640, mx: 'auto' }}>
                            Our Mandate, In Five Parts
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' }, gap: 2.5 }}>
                        {MANDATE.map((m, i) => {
                            const Icon = m.icon;
                            return (
                                <Box key={i} sx={{
                                    bgcolor: 'white', borderRadius: '18px', p: 3,
                                    border: `1px solid ${colors.divider}`,
                                    opacity: mandateVis ? 1 : 0,
                                    animation: mandateVis ? `wd_rise .6s ease ${i * .08}s both` : 'none',
                                    transition: 'transform .3s ease, box-shadow .3s',
                                    '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 16px 40px ${m.color}22` },
                                }}>
                                    <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: `${m.color}15`, border: `1.5px solid ${m.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                        <Icon sx={{ fontSize: 22, color: m.color }} />
                                    </Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.85rem', color: colors.text.secondary, lineHeight: 1.7 }}>
                                        {m.text}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ══ SUMMARY STATS ══ */}
            <Box ref={statsRef} sx={{ bgcolor: 'white', py: { xs: 7, md: 10 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 3, md: 2 } }}>
                        {SUMMARY_STATS.map((s, i) => (
                            <Box key={s.label} sx={{ textAlign: 'center', bgcolor: colors.background.default, borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: `1px solid ${colors.divider}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `wd_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${s.color}30` } }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, fontWeight: 600, mt: .5, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ PROGRAMS & ACTIVITIES ══ */}
            <Box id="programmes" ref={progsRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 10 }, opacity: progsVis ? 1 : 0, animation: progsVis ? 'wd_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>Programs & Activities</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12, mb: 1.5 }}>
                            How We Carry Out the Mandate
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, maxWidth: 540, mx: 'auto', lineHeight: 1.85 }}>
                            Each program below is a direct, practical expression of our mandate. Tap any card to read the full detail.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
                        {PROGRAMS.map((prog, i) => {
                            const Icon = prog.icon;
                            return (
                                <Box key={prog.id} sx={{
                                    bgcolor: 'white', borderRadius: '22px', p: { xs: 3, md: 3.5 },
                                    border: `1px solid ${colors.divider}`,
                                    display: 'flex', flexDirection: 'column',
                                    opacity: progsVis ? 1 : 0,
                                    animation: progsVis ? `wd_rise .7s ease ${i * .08}s both` : 'none',
                                    transition: 'transform .3s ease, box-shadow .3s',
                                    '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 20px 50px ${prog.color}1A` },
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                                        <Box sx={{ width: 48, height: 48, borderRadius: '14px', bgcolor: `${prog.color}15`, border: `1.5px solid ${prog.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Icon sx={{ fontSize: 24, color: prog.color }} />
                                        </Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.15rem', md: '1.3rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.2 }}>
                                            {prog.title}
                                        </Typography>
                                    </Box>

                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.85, mb: 3, flex: 1 }}>
                                        {prog.teaser}
                                    </Typography>

                                    <Box component="button" onClick={() => setActiveProgram(prog)}
                                        sx={{
                                            display: 'inline-flex', alignItems: 'center', gap: 1, alignSelf: 'flex-start',
                                            bgcolor: `${prog.color}10`, color: prog.color,
                                            border: `1.5px solid ${prog.color}35`, px: 2.5, py: 1.1, borderRadius: '10px',
                                            cursor: 'pointer',
                                            fontFamily: typography.fontFamily.heading, fontSize: '0.82rem', fontWeight: 800,
                                            transition: 'all .25s ease',
                                            '&:hover': { bgcolor: prog.color, color: 'white', transform: 'translateX(2px)' },
                                        }}>
                                        Read More <ArrowForwardIcon sx={{ fontSize: 15 }} />
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ══ SCRIPTURE QUOTE ══ */}
            <Box ref={quoteRef} sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
                <Container maxWidth="md">
                    <Box sx={{ bgcolor: colors.primary.dark, borderRadius: '24px', p: { xs: 4, md: 6 }, textAlign: 'center', position: 'relative', overflow: 'hidden', border: `1px solid rgba(212,160,23,0.18)`, opacity: quoteVis ? 1 : 0, animation: quoteVis ? 'wd_rise .7s ease both' : 'none' }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none' }} />
                        <FormatQuoteIcon sx={{ fontSize: 48, color: `${colors.secondary.main}40`, mb: 1, position: 'relative', zIndex: 1 }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.1rem', md: '1.4rem' }, fontWeight: 700, color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, fontStyle: 'italic', mb: 2, position: 'relative', zIndex: 1 }}>
                            "Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress and to keep oneself from being polluted by the world."
                        </Typography>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ width: 24, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, color: colors.secondary.main }}>James 1:27 — Our Mandate</Typography>
                            <Box sx={{ width: 24, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                        </Box>
                    </Box>
                </Container>
            </Box>


            <Box ref={ctaRef} sx={{ background: `linear-gradient(120deg,${colors.primary.dark} 0%,#0F3460 55%,${colors.primary.light} 100%)`, py: { xs: 8, md: 11 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'wd_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Join Us in the Field
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.55)', mb: 4, maxWidth: 480, mx: 'auto', lineHeight: 1.85 }}>
                            Every program listed here needs your support — in prayer, in giving, and in partnership. Together we can do more and better.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component={Link} to="/give" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', px: 4, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)', boxShadow: `0 16px 40px ${colors.secondary.main}55` } }}>
                                <FavoriteIcon sx={{ fontSize: 16 }} /> Give Now
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