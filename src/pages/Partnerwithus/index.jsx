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
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes pt_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
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

// Cards only — no items listed here
export const CATALOG = [
    {
        id: 'crusades',
        icon: CampaignIcon,
        color: colors.secondary.main,
        title: 'Crusades & Revivals',
        subtitle: 'Fuel the Gospel Fire',
        tagline: 'Support city-wide crusades, local outreaches, street evangelism, and media ministry teams taking the Gospel everywhere.',
        itemCount: 8,
    },
    {
        id: 'widows',
        icon: VolunteerActivismIcon,
        color: colors.accent.red,
        title: 'Widows & Orphans',
        subtitle: 'Be the Hands of James 1:27',
        tagline: 'Provide food, clothing, school support, and business empowerment for widows and vulnerable children in our communities.',
        itemCount: 12,
    },
    {
        id: 'medical',
        icon: LocalHospitalIcon,
        color: colors.accent.teal,
        title: 'Medical Outreaches',
        subtitle: 'Healing Where It Is Needed Most',
        tagline: 'Fund medical consultations, medicines, IDP camp visits, and emergency care for those who cannot afford healthcare.',
        itemCount: 8,
    },
    {
        id: 'education',
        icon: SchoolIcon,
        color: colors.accent.green,
        title: 'Education Assistance',
        subtitle: 'A Future for Every Child',
        tagline: 'Cover school fees, uniforms, textbooks, meals, and full scholarships for children who would otherwise be left behind.',
        itemCount: 12,
    },
    {
        id: 'pastors',
        icon: PeopleAltIcon,
        color: '#8B5CF6',
        title: "Pastors & Children Support",
        subtitle: 'Care for Those Who Care for Others',
        tagline: "Stand with pastors and their families — covering their children's school fees, medical care, food, and ministry materials.",
        itemCount: 8,
    },
    {
        id: 'training',
        icon: MenuBookIcon,
        color: colors.secondary.main,
        title: 'Ministerial Training',
        subtitle: 'Invest in the Next Generation',
        tagline: 'Sponsor students, fund laptops, build libraries, and power Grace College of Evangelism & Missions for the future.',
        itemCount: 8,
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
                        <Box ref={heroRef}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .6s ease both' : 'none' }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'pt_pulse 2s ease infinite' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>Partner With Us</Typography>
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
                                <Box component="a" href="#areas" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                    <FavoriteIcon sx={{ fontSize: 16 }} /> Partner Now
                                </Box>
                                <Box component="a" href="#areas" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.18)', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)', transform: 'translateY(-2px)' } }}>
                                    See Areas <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                </Box>
                            </Stack>
                        </Box>

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
                        {SUMMARY_STATS.map((s, i) => (
                            <Box key={s.label} sx={{ textAlign: 'center', bgcolor: 'white', borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: `1px solid ${colors.divider}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `pt_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${s.color}30` } }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, fontWeight: 600, mt: .5, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ PARTNERSHIP AREA CARDS ══ */}
            <Box id="areas" ref={areasRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

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
                            Choose what resonates with your heart. Click any area to see exactly what your support covers.
                        </Typography>
                    </Box>

                    {/* 3-col card grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 3, md: 4 } }}>
                        {CATALOG.map((area, i) => {
                            const Icon = area.icon;
                            return (
                                <Box
                                    key={area.id}
                                    sx={{
                                        bgcolor: colors.background.default,
                                        borderRadius: '22px',
                                        border: `1px solid ${colors.divider}`,
                                        display: 'flex', flexDirection: 'column',
                                        overflow: 'hidden',
                                        opacity: areasVis ? 1 : 0,
                                        animation: areasVis ? `pt_rise .7s ease ${i * .08}s both` : 'none',
                                        transition: 'transform .3s ease, box-shadow .3s',
                                        '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 24px 60px ${area.color}1A` },
                                    }}
                                >
                                    {/* Colour top bar */}
                                    <Box sx={{ height: 4, background: `linear-gradient(90deg, ${area.color}, ${area.color}66)` }} />

                                    <Box sx={{ p: { xs: 3, md: 3.5 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        {/* Icon + title */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                                            <Box sx={{ width: 50, height: 50, borderRadius: '15px', bgcolor: `${area.color}14`, border: `1.5px solid ${area.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <Icon sx={{ fontSize: 24, color: area.color }} />
                                            </Box>
                                            <Box>
                                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.2 }}>
                                                    {area.title}
                                                </Typography>
                                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: area.color, textTransform: 'uppercase', letterSpacing: 1.5, mt: .3 }}>
                                                    {area.subtitle}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Tagline */}
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.75, mb: 2.5, flex: 1 }}>
                                            {area.tagline}
                                        </Typography>

                                        {/* Item count badge + View Details link */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: .8, bgcolor: `${area.color}12`, border: `1px solid ${area.color}25`, borderRadius: '100px', px: 1.5, py: .5 }}>
                                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.65rem', fontWeight: 700, color: area.color }}>
                                                    {area.itemCount} items
                                                </Typography>
                                            </Box>
                                            <Box
                                                component={Link}
                                                to={`/partners/${area.id}`}
                                                sx={{
                                                    display: 'inline-flex', alignItems: 'center', gap: .8,
                                                    bgcolor: area.color, color: 'white',
                                                    px: 2.5, py: 1, borderRadius: '10px',
                                                    textDecoration: 'none',
                                                    fontFamily: typography.fontFamily.heading,
                                                    fontSize: '0.8rem', fontWeight: 800,
                                                    transition: 'all .25s ease',
                                                    '&:hover': { opacity: .88, gap: '10px' },
                                                }}
                                            >
                                                View Details <ArrowForwardIcon sx={{ fontSize: 14 }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
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
                            Whether through prayer, giving or hands-on involvement — your partnership makes it possible for us to do more and better.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component="a" href="#areas" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', px: 4, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteIcon sx={{ fontSize: 16 }} /> Partner Now
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