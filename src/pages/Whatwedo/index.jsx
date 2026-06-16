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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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

const PROGRAMMES = [
    {
        id: 1,
        icon: CampaignIcon,
        color: colors.secondary.main,
        title: 'Crusades & Revivals',
        subtitle: 'Taking the Gospel to Every Corner',
        desc: 'We organise city-wide and local Gospel Crusades in partnership with willing Christian churches — from planning to execution and follow-up of new believers. City-wide crusades draw participants from across a city and neighbouring communities. Local outreaches serve individual churches, villages, towns, or localities.',
        points: [
            'City-wide crusades in partnership with local churches',
            'Local church and village outreaches',
            'Street outreaches in security-challenged Northern Nigeria',
            'Follow-up and discipleship of new believers',
            'Fellowship meals, clothing & shoes shared during outreaches',
        ],
        note: 'Especially active in areas where persecution and displacement have closed churches for months or years.',
    },
    {
        id: 2,
        icon: VolunteerActivismIcon,
        color: colors.accent.red,
        title: 'Widows & Orphans Care',
        subtitle: 'Honouring James 1:27 in Action',
        desc: 'Our target is to reach 400 widows — women left as sole providers after attacks and persecution. We host a Widows Outreach Feast where widows receive fellowship, a good meal, counselling, prayers, gifts, financial support, and practical help. We also care for orphans whose parents were lost to attacks and persecution.',
        points: [
            'Widows Outreach Feast with meals, fellowship & counselling',
            'Gifts of clothing, food stuff, and financial support',
            'Business empowerment support for widows',
            'Care for orphans (both parents lost in attacks)',
            'Food sharing: rice, beans, corn, cassava flour, oil, salt',
        ],
        note: 'Special outreach hosted in July — the most difficult month when food is scarce and expensive.',
    },
    {
        id: 3,
        icon: LocalHospitalIcon,
        color: colors.accent.teal,
        title: 'Medical Outreaches',
        subtitle: 'Healing the Body, Touching the Soul',
        desc: 'Following the example of the missionary brother who first came to Nkier-Gboko for a medical mission in 2007, we continue to bring medical attention to communities in need. Where resources are available as God provides, we offer healthcare to the vulnerable — especially in underserved and displaced communities.',
        points: [
            'Medical care for displaced and vulnerable communities',
            'Healthcare alongside Gospel proclamation',
            'Partnering with medical professionals and missionaries',
        ],
        note: 'Inspired by the 2007 medical mission that sparked the broader ministry partnership.',
    },
    {
        id: 4,
        icon: SchoolIcon,
        color: colors.accent.green,
        title: 'Education Assistance',
        subtitle: 'Safety, Learning & A Future for Every Child',
        desc: 'We are placing children in boarding schools owned by our members — Heavens Colony Academy and a Skills Acquisition school — where they receive not only education but safekeeping, Christian nurturing, trauma counselling, meals, and medical care. This removes children from the dangers of IDP camps and provides stability.',
        points: [
            // 'Placement at Heavens Colony Academy',
            // 'Skills Acquisition training for older students',
            // 'Full boarding: tuition, uniforms, books, provisions',
            // 'Trauma counselling and Christian nurturing',
            // 'Solar, internet, and learning resources provided',
        ],
        note: 'Targeting orphans and widows\' children — those most vulnerable to trafficking, child labour, and exploitation.',
    },
    {
        id: 5,
        icon: PeopleAltIcon,
        color: '#8B5CF6',
        title: 'Pastors & Children Support',
        subtitle: 'Strengthening Those Who Serve',
        desc: 'We support ministers and their children who are serving under difficult conditions with limited resources. Knowing the burden of ministry first-hand, we come alongside pastors to ensure their children have access to quality education and that ministers can continue their calling without being overwhelmed by financial need.',
        points: [
            'Tuition and books support for ministers\' children',
            'External exams support (WAEC, NECO, etc.)',
            'Practical care packages for pastors in need',
        ],
        note: 'A ministry born out of the founders\' own experience of ministry under hardship.',
    },
    {
        id: 6,
        icon: MenuBookIcon,
        color: colors.secondary.main,
        title: 'Ministerial Training',
        subtitle: 'Grace College of Evangelism & Missions',
        desc: 'Through Grace College of Evangelism and Missions in Abuja, we train the next generation of evangelists and missionaries. The college needs scholarships, infrastructure, study materials, and residential facilities to fulfil its mandate of raising Gospel workers equipped for the harvest.',
        points: [
            'Physical accommodation complex development',
            'Study materials and curriculum resources',
        ],
        note: 'Based in Abuja — equipping ministers to reach the nations.',
    },
];

const SUMMARY_STATS = [
    { value: '6', label: 'Active Programmes', color: colors.secondary.main },
    { value: '1000+', label: 'Widows Targeted', color: colors.accent.red },
    { value: '3', label: 'Schools Supported', color: colors.accent.green },
    { value: '1', label: 'Training College', color: colors.accent.teal },
];

export default function WhatWeDoPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [statsRef, statsVis] = useReveal();
    const [progsRef, progsVis] = useReveal();
    const [quoteRef, quoteVis] = useReveal();
    const [ctaRef, ctaVis] = useReveal();

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'wd_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 6 }, alignItems: 'center' }}>

                        {/* Left — text */}
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
                                    See All Programmes <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                </Box>
                            </Stack>
                        </Box>

                        {/* Right — icon grid */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: heroVis ? 1 : 0, animation: heroVis ? 'wd_right .9s cubic-bezier(.34,1.2,.64,1) .3s both' : 'none' }}>
                            <Box sx={{ position: 'relative', width: { xs: 260, md: 340 }, height: { xs: 260, md: 340 } }}>
                                {/* Orbit rings */}
                                <Box sx={{ position: 'absolute', inset: '-18%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.18)`, animation: 'wd_spin 22s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 10, height: 10, borderRadius: '50%', bgcolor: colors.secondary.main, boxShadow: `0 0 14px ${colors.secondary.main}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: '-6%', borderRadius: '50%', border: `1px dashed rgba(14,165,233,0.14)`, animation: 'wd_spinR 15s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', bottom: '-4px', left: '46%', width: 8, height: 8, borderRadius: '50%', bgcolor: colors.accent.teal, boxShadow: `0 0 10px ${colors.accent.teal}` }} />
                                </Box>
                                {/* Glow */}
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}18 0%,transparent 70%)`, animation: 'wd_glow 4s ease-in-out infinite', pointerEvents: 'none' }} />
                                {/* Centre icon cluster */}
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

                {/* wave */}
                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={colors.background.default} />
                    </svg>
                </Box>
            </Box>

            {/* ══ SUMMARY STATS ══ */}
            <Box ref={statsRef} sx={{ bgcolor: colors.background.default, py: { xs: 7, md: 10 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 3, md: 2 } }}>
                        {SUMMARY_STATS.map((s, i) => (
                            <Box key={s.label} sx={{ textAlign: 'center', bgcolor: 'white', borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: `1px solid ${colors.divider}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `wd_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${s.color}30` } }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, fontWeight: 600, mt: .5, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ PROGRAMMES ══ */}
            <Box id="programmes" ref={progsRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    {/* Section header */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 10 }, opacity: progsVis ? 1 : 0, animation: progsVis ? 'wd_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>Programmes & Projects</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12, mb: 1.5 }}>
                            Six Ways We Serve
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, maxWidth: 520, mx: 'auto', lineHeight: 1.85 }}>
                            Each programme is a direct response to a real need — shaped by years of on-the-ground ministry across Nigeria and beyond.
                        </Typography>
                    </Box>

                    {/* Programme cards — alternating layout */}
                    <Stack gap={{ xs: 6, md: 10 }}>
                        {PROGRAMMES.map((prog, i) => {
                            const Icon = prog.icon;
                            const isEven = i % 2 === 0;
                            return (
                                <Box key={prog.id} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'center', opacity: progsVis ? 1 : 0, animation: progsVis ? `wd_rise .7s ease ${i * .08}s both` : 'none' }}>

                                    {/* Text side */}
                                    <Box sx={{ order: { xs: 2, md: isEven ? 1 : 2 } }}>
                                        {/* Number badge */}
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <Box sx={{ width: 32, height: 32, borderRadius: '10px', bgcolor: `${prog.color}18`, border: `1.5px solid ${prog.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.7rem', fontWeight: 900, color: prog.color }}>0{prog.id}</Typography>
                                            </Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: prog.color, letterSpacing: 2, textTransform: 'uppercase' }}>{prog.subtitle}</Typography>
                                        </Box>

                                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.15, mb: 1.5 }}>
                                            {prog.title}
                                        </Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, lineHeight: 1.9, mb: 3 }}>
                                            {prog.desc}
                                        </Typography>

                                        {/* Points */}
                                        <Stack gap={1} mb={2.5}>
                                            {prog.points.map((pt) => (
                                                <Box key={pt} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                                                    <CheckCircleOutlineIcon sx={{ fontSize: 18, color: prog.color, mt: '2px', flexShrink: 0 }} />
                                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.7 }}>{pt}</Typography>
                                                </Box>
                                            ))}
                                        </Stack>

                                        {/* Note */}
                                        <Box sx={{ bgcolor: `${prog.color}0D`, border: `1px solid ${prog.color}25`, borderLeft: `3px solid ${prog.color}`, borderRadius: '0 10px 10px 0', px: 2.5, py: 1.5 }}>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, lineHeight: 1.7, fontStyle: 'italic' }}>
                                                {prog.note}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Visual side */}
                                    <Box sx={{ order: { xs: 1, md: isEven ? 2 : 1 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ position: 'relative', width: { xs: 200, md: 260 }, height: { xs: 200, md: 260 } }}>
                                            {/* Background glow */}
                                            <Box sx={{ position: 'absolute', inset: '-10%', borderRadius: '50%', background: `radial-gradient(circle,${prog.color}10 0%,transparent 70%)`, animation: 'wd_glow 5s ease-in-out infinite', pointerEvents: 'none' }} />
                                            {/* Outer dashed ring */}
                                            <Box sx={{ position: 'absolute', inset: '-12%', borderRadius: '50%', border: `1px dashed ${prog.color}22`, animation: 'wd_spin 20s linear infinite', pointerEvents: 'none' }}>
                                                <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 9, height: 9, borderRadius: '50%', bgcolor: prog.color, opacity: 0.6, boxShadow: `0 0 10px ${prog.color}` }} />
                                            </Box>
                                            {/* Inner ring */}
                                            <Box sx={{ position: 'absolute', inset: '0%', borderRadius: '50%', border: `1px solid ${prog.color}12`, animation: 'wd_spinR 12s linear infinite', pointerEvents: 'none' }} />
                                            {/* Centre card */}
                                            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                                <Box sx={{ width: { xs: 120, md: 150 }, height: { xs: 120, md: 150 }, borderRadius: '30px', bgcolor: `${prog.color}12`, border: `2px solid ${prog.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', animation: 'wd_float 5s ease-in-out infinite', boxShadow: `0 20px 60px ${prog.color}20` }}>
                                                    <Icon sx={{ fontSize: { xs: 52, md: 68 }, color: prog.color, opacity: 0.85 }} />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                </Box>
                            );
                        })}
                    </Stack>
                </Container>
            </Box>

            {/* ══ SCRIPTURE QUOTE ══ */}
            <Box ref={quoteRef} sx={{ bgcolor: colors.background.default, py: { xs: 6, md: 8 } }}>
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

            {/* ══ CTA ══ */}
            <Box ref={ctaRef} sx={{ background: `linear-gradient(120deg,${colors.primary.dark} 0%,#0F3460 55%,${colors.primary.light} 100%)`, py: { xs: 8, md: 11 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'wd_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Join Us in the Field
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.55)', mb: 4, maxWidth: 480, mx: 'auto', lineHeight: 1.85 }}>
                            Every programme listed here needs your support — in prayer, in giving, and in partnership. Together we can do more and better.
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