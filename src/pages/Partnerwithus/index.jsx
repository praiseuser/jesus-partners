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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes pt_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pt_left': { from: { opacity: 0, transform: 'translateX(-44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pt_right': { from: { opacity: 0, transform: 'translateX(44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pt_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes pt_glow': { '0%,100%': { opacity: .35, transform: 'scale(1)' }, '50%': { opacity: .7, transform: 'scale(1.08)' } },
    '@keyframes pt_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 12px ${colors.secondary.main}00` } },
    '@keyframes pt_float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
    '@keyframes pt_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes pt_spinR': { to: { transform: 'rotate(-360deg)' } },
    '@keyframes pt_countUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
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

const PARTNERSHIP_AREAS = [
    {
        id: 1,
        icon: CampaignIcon,
        color: colors.secondary.main,
        title: 'Crusades & Revivals',
        subtitle: 'Fuel the Gospel Fire',
        desc: 'A city-wide crusade costs between 10–15 million naira depending on the city, transportation, accommodation and security. Local outreaches and street outreaches cost far less. Your partnership directly funds the proclamation of the Gospel to thousands.',
        points: [
            'City-wide crusades: transportation, accommodation & security',
            'Local church and village outreach costs',
            'Street outreaches in Northern Nigeria',
            'Fellowship meals, clothing & shoes for outreach communities',
            'Media team and ministerial team support',
        ],
        note: 'Every naira given goes toward reaching communities where the Gospel is desperately needed.',
    },
    {
        id: 2,
        icon: VolunteerActivismIcon,
        color: colors.accent.red,
        title: 'Widows & Orphans',
        subtitle: 'Be the Hands of James 1:27',
        desc: 'Our target is 400 widows. We host a Widows Outreach Feast in July — the most difficult month when food is scarce and expensive. Your support helps us buy food from rural markets (rice, beans, corn, cassava flour, oil, salt) and share it with widows and orphans who have no one else.',
        points: [
            'Food items: rice, beans, corn, cassava flour, oil & salt for 400 widows',
            'Widows Outreach Feast — meals, fellowship & gifts',
            'Financial support and business empowerment for widows',
            'Care for orphans whose parents were lost in attacks',
            'Clothing, shoes and other essential needs',
        ],
        note: 'Locally sourced from rural markets — your giving goes further here than anywhere else.',
    },
    {
        id: 3,
        icon: LocalHospitalIcon,
        color: colors.accent.teal,
        title: 'Medical Outreaches',
        subtitle: 'Healing Where It is Needed Most',
        desc: 'We bring medical care to displaced and vulnerable communities — especially IDP camp residents and those in areas affected by persecution and insecurity. As God provides resources, we deploy medical teams alongside Gospel proclamation to serve the whole person.',
        points: [
            'Medical care for IDP camp residents',
            'Healthcare for displaced and vulnerable communities',
            'Medical teams deployed alongside Gospel outreaches',
            'Support for medical mission partnerships',
        ],
        note: 'Inspired by the 2007 medical mission that first brought our ministry together.',
    },
    {
        id: 4,
        icon: SchoolIcon,
        color: colors.accent.green,
        title: 'Education Assistance',
        subtitle: 'A Future for Every Child',
        desc: 'We are placing orphans and widows\' children in boarding schools — Heavens Colony Academy and a Skills Acquisition school. These children are vulnerable to trafficking, child labour and exploitation. Your support covers tuition, uniforms, books, provisions, meals and trauma counselling.',
        points: [
            'Boarding fees: tuition, uniforms, books & provisions',
            'Trauma counselling and Christian nurturing',
            'Solar power, internet service, screen-TV & books for schools',
            'Skills Acquisition training for older students',
            'Removing children from IDP camp dangers',
        ],
        note: 'Targeting children most at risk — orphans and widows\' children who have no other support.',
    },
    {
        id: 5,
        icon: PeopleAltIcon,
        color: '#8B5CF6',
        title: 'Pastors & Children Support',
        subtitle: 'Care for Those Who Care for Others',
        desc: 'Many pastors in our network are ministering under extremely challenging conditions — feeding their families and training their children is a serious problem. We partner with supporters to provide tuition, books, external exams support and practical care for ministers and their children.',
        points: [
            'Tuition and books for ministers\' children',
            'External exams support (WAEC, NECO, etc.)',
            'Practical care packages for pastors in hardship',
            'Fellowship and encouragement for isolated ministers',
        ],
        note: 'A ministry born directly out of the founders\' own experience of ministry under hardship.',
    },
    {
        id: 6,
        icon: MenuBookIcon,
        color: colors.secondary.main,
        title: 'Ministerial Training',
        subtitle: 'Invest in the Next Generation',
        desc: 'Grace College of Evangelism and Missions in Abuja is training the next generation of evangelists and missionaries. The college urgently needs laptops, scholarships, computers for e-library, physical accommodation, and study materials to fulfil its mandate.',
        points: [
            '4 Laptops for student training',
            'Scholarship support — ₦100,000 per student × 4',
            'Computers for E-library and digital study',
            'Physical accommodation complex development',
            'Study materials and curriculum resources',
        ],
        note: 'Based in Abuja — equipping ministers to reach the nations.',
    },
];

const SUMMARY_STATS = [
    { value: '6', label: 'Ways to Partner', color: colors.secondary.main },
    { value: '400', label: 'Widows Targeted', color: colors.accent.red },
    { value: '2007', label: 'Serving Since', color: colors.accent.teal },
    { value: '∞', label: 'Lives to Reach', color: '#8B5CF6' },
];

export default function PartnerPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [statsRef, statsVis] = useReveal();
    const [areasRef, areasVis] = useReveal();
    const [quoteRef, quoteVis] = useReveal();
    const [ctaRef, ctaVis] = useReveal();

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'pt_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 6 }, alignItems: 'center' }}>

                        {/* Left — text */}
                        <Box ref={heroRef}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .6s ease both' : 'none' }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'pt_pulse 2s ease infinite' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                    Partner With Us
                                </Typography>
                            </Box>

                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-1px', mb: 1, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .1s both' : 'none' }}>
                                Do More &
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1px', mb: 3, background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light},${colors.secondary.main})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: heroVis ? 'pt_gradShift 4s ease infinite, pt_rise .7s ease .18s both' : 'none', opacity: heroVis ? 1 : 0 }}>
                                Better Together.
                            </Typography>

                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 460, mb: 4, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .26s both' : 'none' }}>
                                Here is what we are given to doing — and we request that you partner with us to do more and better. Every area of our work needs your prayers, your giving, and your partnership.
                            </Typography>

                            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .34s both' : 'none' }}>
                                <Box component={Link} to="/give" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)', boxShadow: `0 16px 40px ${colors.secondary.main}55` } }}>
                                    <FavoriteIcon sx={{ fontSize: 16 }} /> Give Now
                                </Box>
                                <Box component="a" href="#areas" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.18)', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)', transform: 'translateY(-2px)' } }}>
                                    See Partnership Areas <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                </Box>
                            </Stack>
                        </Box>

                        {/* Right — icon grid */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_right .9s cubic-bezier(.34,1.2,.64,1) .3s both' : 'none' }}>
                            <Box sx={{ position: 'relative', width: { xs: 260, md: 340 }, height: { xs: 260, md: 340 } }}>
                                <Box sx={{ position: 'absolute', inset: '-18%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.18)`, animation: 'pt_spin 22s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 10, height: 10, borderRadius: '50%', bgcolor: colors.secondary.main, boxShadow: `0 0 14px ${colors.secondary.main}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: '-6%', borderRadius: '50%', border: `1px dashed rgba(14,165,233,0.14)`, animation: 'pt_spinR 15s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', bottom: '-4px', left: '46%', width: 8, height: 8, borderRadius: '50%', bgcolor: colors.accent.teal, boxShadow: `0 0 10px ${colors.accent.teal}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}18 0%,transparent 70%)`, animation: 'pt_glow 4s ease-in-out infinite', pointerEvents: 'none' }} />
                                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, animation: 'pt_float 5s ease-in-out infinite' }}>
                                        {[
                                            { Icon: HandshakeIcon, color: colors.secondary.main },
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
                            <Box key={s.label} sx={{ textAlign: 'center', bgcolor: 'white', borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: `1px solid ${colors.divider}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `pt_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${s.color}30` } }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, fontWeight: 600, mt: .5, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ PARTNERSHIP AREAS ══ */}
            <Box id="areas" ref={areasRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    {/* Section header */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 10 }, opacity: areasVis ? 1 : 0, animation: areasVis ? 'pt_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>Partnership Areas</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12, mb: 1.5 }}>
                            Six Ways to Partner
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, maxWidth: 520, mx: 'auto', lineHeight: 1.85 }}>
                            Choose the area that resonates with your heart — every contribution, whether in prayer, giving or practical support, makes a real difference on the ground.
                        </Typography>
                    </Box>

                    {/* Partnership area cards — alternating layout */}
                    <Stack gap={{ xs: 6, md: 10 }}>
                        {PARTNERSHIP_AREAS.map((area, i) => {
                            const Icon = area.icon;
                            const isEven = i % 2 === 0;
                            return (
                                <Box key={area.id} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 8 }, alignItems: 'center', opacity: areasVis ? 1 : 0, animation: areasVis ? `pt_rise .7s ease ${i * .08}s both` : 'none' }}>

                                    {/* Text side */}
                                    <Box sx={{ order: { xs: 2, md: isEven ? 1 : 2 } }}>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                            <Box sx={{ width: 32, height: 32, borderRadius: '10px', bgcolor: `${area.color}18`, border: `1.5px solid ${area.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.7rem', fontWeight: 900, color: area.color }}>0{area.id}</Typography>
                                            </Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: area.color, letterSpacing: 2, textTransform: 'uppercase' }}>{area.subtitle}</Typography>
                                        </Box>

                                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.15, mb: 1.5 }}>
                                            {area.title}
                                        </Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, lineHeight: 1.9, mb: 3 }}>
                                            {area.desc}
                                        </Typography>

                                        {/* Points */}
                                        <Stack gap={1} mb={2.5}>
                                            {area.points.map((pt) => (
                                                <Box key={pt} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                                                    <CheckCircleOutlineIcon sx={{ fontSize: 18, color: area.color, mt: '2px', flexShrink: 0 }} />
                                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.7 }}>{pt}</Typography>
                                                </Box>
                                            ))}
                                        </Stack>

                                        {/* Note */}
                                        <Box sx={{ bgcolor: `${area.color}0D`, border: `1px solid ${area.color}25`, borderLeft: `3px solid ${area.color}`, borderRadius: '0 10px 10px 0', px: 2.5, py: 1.5, mb: 3 }}>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, lineHeight: 1.7, fontStyle: 'italic' }}>
                                                {area.note}
                                            </Typography>
                                        </Box>

                                        {/* Give button per area */}
                                        <Box component={Link} to="/give" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: area.color, color: 'white', px: 3, py: 1.4, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 24px ${area.color}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)', boxShadow: `0 16px 36px ${area.color}55` } }}>
                                            <FavoriteIcon sx={{ fontSize: 15 }} /> Support This
                                        </Box>
                                    </Box>

                                    {/* Visual side */}
                                    <Box sx={{ order: { xs: 1, md: isEven ? 2 : 1 }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Box sx={{ position: 'relative', width: { xs: 200, md: 260 }, height: { xs: 200, md: 260 } }}>
                                            <Box sx={{ position: 'absolute', inset: '-10%', borderRadius: '50%', background: `radial-gradient(circle,${area.color}10 0%,transparent 70%)`, animation: 'pt_glow 5s ease-in-out infinite', pointerEvents: 'none' }} />
                                            <Box sx={{ position: 'absolute', inset: '-12%', borderRadius: '50%', border: `1px dashed ${area.color}22`, animation: 'pt_spin 20s linear infinite', pointerEvents: 'none' }}>
                                                <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 9, height: 9, borderRadius: '50%', bgcolor: area.color, opacity: 0.6, boxShadow: `0 0 10px ${area.color}` }} />
                                            </Box>
                                            <Box sx={{ position: 'absolute', inset: '0%', borderRadius: '50%', border: `1px solid ${area.color}12`, animation: 'pt_spinR 12s linear infinite', pointerEvents: 'none' }} />
                                            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                                <Box sx={{ width: { xs: 120, md: 150 }, height: { xs: 120, md: 150 }, borderRadius: '30px', bgcolor: `${area.color}12`, border: `2px solid ${area.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', animation: 'pt_float 5s ease-in-out infinite', boxShadow: `0 20px 60px ${area.color}20` }}>
                                                    <Icon sx={{ fontSize: { xs: 52, md: 68 }, color: area.color, opacity: 0.85 }} />
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
                    <Box sx={{ bgcolor: colors.primary.dark, borderRadius: '24px', p: { xs: 4, md: 6 }, textAlign: 'center', position: 'relative', overflow: 'hidden', border: `1px solid rgba(212,160,23,0.18)`, opacity: quoteVis ? 1 : 0, animation: quoteVis ? 'pt_rise .7s ease both' : 'none' }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none' }} />
                        <FormatQuoteIcon sx={{ fontSize: 48, color: `${colors.secondary.main}40`, mb: 1, position: 'relative', zIndex: 1 }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.1rem', md: '1.4rem' }, fontWeight: 700, color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, fontStyle: 'italic', mb: 2, position: 'relative', zIndex: 1 }}>
                            "Then the Lord God spoke to us that we should share with others as He does to us."
                        </Typography>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ width: 24, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, color: colors.secondary.main }}>The Heart Behind Jesus Partners Outreach</Typography>
                            <Box sx={{ width: 24, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ══ CTA ══ */}
            <Box ref={ctaRef} sx={{ background: `linear-gradient(120deg,${colors.primary.dark} 0%,#0F3460 55%,${colors.primary.light} 100%)`, py: { xs: 8, md: 11 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'pt_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Ready to Partner With Us?
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.55)', mb: 4, maxWidth: 480, mx: 'auto', lineHeight: 1.85 }}>
                            Whether through prayer, giving or hands-on involvement — your partnership makes it possible for us to do more and better. Contact us today and let's talk about how you can get involved.
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