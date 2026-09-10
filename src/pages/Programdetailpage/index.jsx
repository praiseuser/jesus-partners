import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CampaignIcon from '@mui/icons-material/Campaign';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes pd_rise': { from: { opacity: 0, transform: 'translateY(36px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pd_glow': { '0%,100%': { opacity: .35, transform: 'scale(1)' }, '50%': { opacity: .65, transform: 'scale(1.08)' } },
    '@keyframes pd_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 12px ${colors.secondary.main}00` } },
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

// All program data lives here so the detail page is self-contained
const ALL_PROGRAMS = [
    {
        id: 'crusades',
        icon: CampaignIcon,
        color: colors.secondary.main,
        title: 'Crusades',
        tagline: 'Gospel & revival outreaches — Word, Works, and Worth in every community.',
        intro: 'Our Gospel and revival outreaches are prayer-backed programs to preach salvation, pray for the sick, bring deliverance, and provide material support. We go with the WORD, WORKS, and WORTH — reaching spiritual, physical, and material needs through Christ\'s love.',
        pillars: [
            { label: 'WORD', desc: 'Preach and teach the Word of God' },
            { label: 'WORKS', desc: 'Heal the sick and bring deliverance' },
            { label: 'WORTH', desc: 'Provide materially for the needy' },
        ],
        listTitle: 'Four types of outreaches we run',
        list: [
            { title: 'City-wide Crusades', desc: 'Draws participants from across cities. Done with all willing churches to maximise impact and reach.' },
            { title: 'Local Outreaches', desc: 'Serve a village, town, or local church. Lower cost with our technical, media, and ministerial teams.' },
            { title: 'Street Outreaches', desc: 'Prayerfully chosen locations within towns or institutions — going to where people are.' },
            { title: 'Personal Evangelism & Discipleship Training', desc: 'Equipping believers to share the Gospel one-on-one and follow up new converts.' },
        ],
    },
    {
        id: 'widows',
        icon: VolunteerActivismIcon,
        color: colors.accent.red,
        title: 'Widows & Orphans Support',
        tagline: 'Practical, sustained care that restores dignity to the most vulnerable.',
        intro: 'We honour James 1:27 through practical, sustained care for widows and orphans across our communities. Every initiative is designed to restore dignity — not just meet a one-time need.',
        listTitle: 'Our support includes',
        list: [
            { title: 'Widows Outreach Feast', desc: 'An annual gathering with widows to share fellowship, meals, counselling, and gifts. Usually held in February — over 400 widows attended in 2026.' },
            { title: 'Orphans School Support', desc: 'Education, safety, Christian nurturing, meals, and medical care in boarding schools for displaced and vulnerable children.' },
            { title: 'Widows Business Empowerment', desc: 'Seed capital, fertilizer, sewing machines, water pumps, and grinding machines to support widows\' businesses and help them become self-sustaining.' },
        ],
    },
    {
        id: 'ministers',
        icon: PeopleAltIcon,
        color: '#8B5CF6',
        title: "Ministers & Ministers' Children Support",
        tagline: 'Standing with pastors and families who serve under difficult conditions.',
        intro: 'We come alongside pastors and their families who are serving under difficult conditions with limited resources. This is support born from truly understanding the real cost of a life devoted to ministry.',
        listTitle: 'Our support includes',
        list: [
            { title: 'Tuition, Books & Exam Fees', desc: 'Covering school costs and external exam fees for ministers\' children so their families can focus on ministry.' },
            { title: 'Ministerial Training Scholarships', desc: 'Helping called ministers access sound theological education regardless of financial background.' },
            { title: 'Infrastructure Development', desc: 'Investing in the physical resources — buildings, equipment, materials — that strengthen local ministry capacity.' },
        ],
    },
    {
        id: 'gcem',
        icon: MenuBookIcon,
        color: colors.accent.teal,
        title: 'Grace College of Evangelism & Missions',
        tagline: 'Raising the next generation of evangelists through rigorous biblical training.',
        intro: 'We undertake ministerial development through Grace College of Evangelism & Missions, where we run an MA program in partnership with Puritan Reformed Theological Seminary, USA. The college stands as one of our longest-term investments in the future of Gospel work across the region.',
        listTitle: 'What the college needs to grow',
        list: [
            { title: 'Scholarships', desc: 'Helping qualified students access the MA program regardless of financial background, so no called person is turned away.' },
            { title: 'Infrastructure', desc: 'Physical accommodation and learning facilities for resident students to study and grow in a dedicated environment.' },
            { title: 'Study Materials', desc: 'Curriculum resources and library materials for thorough theological training aligned with global standards.' },
        ],
    },
];

export default function ProgramDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const program = ALL_PROGRAMS.find((p) => p.id === id);

    const [heroRef, heroVis] = useReveal(0.05);
    const [bodyRef, bodyVis] = useReveal(0.05);
    const [ctaRef, ctaVis] = useReveal(0.05);

    // Scroll to top on mount
    useEffect(() => { window.scrollTo(0, 0); }, [id]);

    // 404 fallback
    if (!program) {
        return (
            <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '2rem', fontWeight: 900, color: colors.text.primary }}>Program not found</Typography>
                <Box component={Link} to="/whatwedo" sx={{ color: colors.secondary.main, fontFamily: typography.fontFamily.heading, fontWeight: 700, textDecoration: 'none' }}>← Back to What We Do</Box>
            </Box>
        );
    }

    const Icon = program.icon;
    const currentIndex = ALL_PROGRAMS.findIndex((p) => p.id === id);
    const prevProgram = ALL_PROGRAMS[currentIndex - 1] || null;
    const nextProgram = ALL_PROGRAMS[currentIndex + 1] || null;

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${program.color}14 0%,transparent 70%)`, animation: 'pd_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    {/* Back link */}
                    <Box
                        component={Link} to="/whatwedo"
                        sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 1,
                            color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                            fontFamily: typography.fontFamily.heading, fontSize: '0.82rem', fontWeight: 700,
                            mb: 5,
                            transition: 'color .2s',
                            '&:hover': { color: colors.secondary.main },
                        }}
                    >
                        <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to What We Do
                    </Box>

                    <Box ref={heroRef} sx={{ maxWidth: 720 }}>
                        {/* Label pill */}
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, bgcolor: `${program.color}18`, border: `1px solid ${program.color}35`, borderRadius: '100px', px: 2.2, py: .75, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .6s ease both' : 'none' }}>
                            <Icon sx={{ fontSize: 14, color: program.color }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: program.color, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                Program
                            </Typography>
                        </Box>

                        {/* Title */}
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem' }, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-1px', mb: 2.5, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .7s ease .1s both' : 'none' }}>
                            {program.title}
                        </Typography>

                        {/* Tagline */}
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, maxWidth: 560, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pd_rise .7s ease .2s both' : 'none' }}>
                            {program.tagline}
                        </Typography>
                    </Box>
                </Container>

                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={colors.background.default} />
                    </svg>
                </Box>
            </Box>

            {/* ══ BODY CONTENT ══ */}
            <Box ref={bodyRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="md">

                    {/* Intro paragraph */}
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1rem', md: '1.1rem' }, color: colors.text.secondary, lineHeight: 2, mb: 6, opacity: bodyVis ? 1 : 0, animation: bodyVis ? 'pd_rise .7s ease both' : 'none' }}>
                        {program.intro}
                    </Typography>

                    {/* WORD / WORKS / WORTH pillars (Crusades only) */}
                    {program.pillars && (
                        <Box sx={{ mb: 6, opacity: bodyVis ? 1 : 0, animation: bodyVis ? 'pd_rise .7s ease .1s both' : 'none' }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.72rem', fontWeight: 800, color: program.color, letterSpacing: 2.5, textTransform: 'uppercase', mb: 2.5 }}>
                                Our Three-Part Approach
                            </Typography>
                            <Stack gap={2}>
                                {program.pillars.map((p) => (
                                    <Box key={p.label} sx={{ display: 'flex', alignItems: 'center', gap: 3, p: { xs: 2.5, md: 3 }, borderRadius: '16px', bgcolor: 'white', border: `1px solid ${program.color}20`, boxShadow: `0 4px 20px ${program.color}0D` }}>
                                        <Box sx={{ minWidth: 80, height: 40, borderRadius: '10px', bgcolor: `${program.color}14`, border: `1.5px solid ${program.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.78rem', fontWeight: 900, color: program.color, letterSpacing: 1.5 }}>
                                                {p.label}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.95rem', color: colors.text.primary, lineHeight: 1.6 }}>
                                            {p.desc}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )}

                    {/* Detail list */}
                    {program.list && (
                        <Box sx={{ opacity: bodyVis ? 1 : 0, animation: bodyVis ? `pd_rise .7s ease ${program.pillars ? '.2s' : '.1s'} both` : 'none' }}>
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.72rem', fontWeight: 800, color: program.color, letterSpacing: 2.5, textTransform: 'uppercase', mb: 3 }}>
                                {program.listTitle}
                            </Typography>
                            <Stack gap={3}>
                                {program.list.map((item, idx) => (
                                    <Box key={item.title} sx={{ display: 'flex', gap: 2.5, p: { xs: 2.5, md: 3.5 }, bgcolor: 'white', borderRadius: '18px', border: `1px solid ${colors.divider}`, boxShadow: '0 2px 12px rgba(10,16,40,0.04)', transition: 'box-shadow .3s', '&:hover': { boxShadow: `0 8px 32px ${program.color}14` } }}>
                                        <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: `${program.color}14`, border: `1.5px solid ${program.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: '2px' }}>
                                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.82rem', fontWeight: 900, color: program.color }}>{idx + 1}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 800, color: colors.text.primary, mb: .5, lineHeight: 1.3 }}>
                                                {item.title}
                                            </Typography>
                                            {item.desc && (
                                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.88rem', color: colors.text.secondary, lineHeight: 1.75 }}>
                                                    {item.desc}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Container>
            </Box>

            {/* ══ PREV / NEXT NAVIGATION ══ */}
            {(prevProgram || nextProgram) && (
                <Box sx={{ bgcolor: 'white', py: { xs: 5, md: 7 }, borderTop: `1px solid ${colors.divider}` }}>
                    <Container maxWidth="md">
                        <Box sx={{ display: 'grid', gridTemplateColumns: prevProgram && nextProgram ? '1fr 1fr' : '1fr', gap: 3 }}>
                            {prevProgram && (() => {
                                const PrevIcon = prevProgram.icon; return (
                                    <Box component={Link} to={`/whatwedo/${prevProgram.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5, borderRadius: '16px', border: `1px solid ${colors.divider}`, textDecoration: 'none', transition: 'all .25s ease', '&:hover': { borderColor: prevProgram.color, boxShadow: `0 8px 24px ${prevProgram.color}18`, transform: 'translateX(-4px)' } }}>
                                        <ArrowBackIcon sx={{ fontSize: 18, color: prevProgram.color, flexShrink: 0 }} />
                                        <Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 600, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Previous</Typography>
                                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.9rem', fontWeight: 800, color: colors.text.primary, lineHeight: 1.3 }}>{prevProgram.title}</Typography>
                                        </Box>
                                    </Box>
                                );
                            })()}
                            {nextProgram && (() => {
                                const NextIcon = nextProgram.icon; return (
                                    <Box component={Link} to={`/whatwedo/${nextProgram.id}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, p: 2.5, borderRadius: '16px', border: `1px solid ${colors.divider}`, textDecoration: 'none', transition: 'all .25s ease', '&:hover': { borderColor: nextProgram.color, boxShadow: `0 8px 24px ${nextProgram.color}18`, transform: 'translateX(4px)' } }}>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 600, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Next</Typography>
                                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.9rem', fontWeight: 800, color: colors.text.primary, lineHeight: 1.3 }}>{nextProgram.title}</Typography>
                                        </Box>
                                        <ArrowForwardIcon sx={{ fontSize: 18, color: nextProgram.color, flexShrink: 0 }} />
                                    </Box>
                                );
                            })()}
                        </Box>
                    </Container>
                </Box>
            )}

            {/* ══ CTA ══ */}
            <Box ref={ctaRef} sx={{ background: `linear-gradient(120deg,${colors.primary.dark} 0%,#0F3460 55%,${colors.primary.light} 100%)`, py: { xs: 8, md: 11 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'pd_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.7rem', md: '2.4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Support {program.title}
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.55)', mb: 4, maxWidth: 460, mx: 'auto', lineHeight: 1.85 }}>
                            Your partnership — in prayer, in giving, in spreading the word — makes this work possible.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component={Link} to="/partners" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: program.color, color: 'white', px: 4, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${program.color}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteBorderIcon sx={{ fontSize: 16 }} /> Partner Now
                            </Box>
                            <Box component={Link} to="/whatwedo" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', px: 4, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' } }}>
                                <ArrowBackIcon sx={{ fontSize: 16 }} /> All Programs
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}