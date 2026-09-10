import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MANDATE } from '../Mandatepage';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes md_rise': { from: { opacity: 0, transform: 'translateY(40px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes md_glow': { '0%,100%': { opacity: .3, transform: 'scale(1)' }, '50%': { opacity: .6, transform: 'scale(1.1)' } },
    '@keyframes md_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 16px ${colors.secondary.main}00` } },
    '@keyframes md_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
};

const useReveal = (threshold = 0.06) => {
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

export default function MandateDetailPage() {
    const { id } = useParams();
    const mandate = MANDATE.find(m => m.id === id);

    const [heroRef, heroVis] = useReveal(0.05);
    const [bodyRef, bodyVis] = useReveal(0.05);
    const [ctaRef, ctaVis] = useReveal(0.05);

    useEffect(() => { window.scrollTo(0, 0); }, [id]);

    if (!mandate) {
        return (
            <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '2rem', fontWeight: 900, color: colors.text.primary }}>Not found</Typography>
                <Box component={Link} to="/whatwedo/mandate" sx={{ color: colors.secondary.main, fontFamily: typography.fontFamily.heading, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>← Back to Our Mandate</Box>
            </Box>
        );
    }

    const Icon = mandate.icon;
    const currentIndex = MANDATE.findIndex(m => m.id === id);
    const prevMandate = MANDATE[currentIndex - 1] || null;
    const nextMandate = MANDATE[currentIndex + 1] || null;

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 12, md: 16 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${mandate.color}16 0%,transparent 70%)`, animation: 'md_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0C 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    {/* Back link */}
                    <Box component={Link} to="/whatwedo/mandate" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '0.95rem', fontWeight: 700, mb: 6, transition: 'color .2s', '&:hover': { color: mandate.color } }}>
                        <ArrowBackIcon sx={{ fontSize: 18 }} /> Back to Our Mandate
                    </Box>

                    <Box ref={heroRef} sx={{ maxWidth: 820 }}>
                        {/* Label pill */}
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, bgcolor: `${mandate.color}18`, border: `1px solid ${mandate.color}35`, borderRadius: '100px', px: 2.5, py: .9, mb: 3.5, opacity: heroVis ? 1 : 0, animation: heroVis ? 'md_rise .6s ease both' : 'none' }}>
                            <Icon sx={{ fontSize: 16, color: mandate.color }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 700, color: mandate.color, letterSpacing: 2.2, textTransform: 'uppercase' }}>
                                Commitment {mandate.number}
                            </Typography>
                        </Box>

                        {/* Title */}
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4.2rem' }, fontWeight: 900, color: 'white', lineHeight: 1.06, letterSpacing: '-1.5px', mb: 3.5, opacity: heroVis ? 1 : 0, animation: heroVis ? 'md_rise .7s ease .1s both' : 'none' }}>
                            {mandate.title}
                        </Typography>

                        {/* Tagline */}
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.15rem', md: '1.35rem' }, color: 'rgba(255,255,255,0.55)', lineHeight: 2, maxWidth: 640, opacity: heroVis ? 1 : 0, animation: heroVis ? 'md_rise .7s ease .2s both' : 'none' }}>
                            {mandate.summary}
                        </Typography>
                    </Box>
                </Container>

                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={colors.background.default} />
                    </svg>
                </Box>
            </Box>

            {/* ══ BODY ══ */}
            <Box ref={bodyRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="md">

                    {/* Main body text */}
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.15rem', md: '1.3rem' }, color: colors.text.secondary, lineHeight: 2.1, mb: 6, opacity: bodyVis ? 1 : 0, animation: bodyVis ? 'md_rise .7s ease both' : 'none' }}>
                        {mandate.body}
                    </Typography>

                    {/* Detail cards */}
                    <Box sx={{ opacity: bodyVis ? 1 : 0, animation: bodyVis ? 'md_rise .7s ease .1s both' : 'none', mb: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                            <Box sx={{ width: 32, height: 3, borderRadius: 2, bgcolor: mandate.color }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.82rem', fontWeight: 800, color: mandate.color, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                How We Do This
                            </Typography>
                        </Box>
                        <Stack gap={3}>
                            {mandate.details.map((detail, i) => (
                                <Box
                                    key={detail.heading}
                                    sx={{
                                        display: 'flex',
                                        gap: 3,
                                        p: { xs: 3, md: 4 },
                                        bgcolor: 'white',
                                        borderRadius: '20px',
                                        border: `1px solid ${colors.divider}`,
                                        transition: 'box-shadow .3s, transform .3s',
                                        '&:hover': { boxShadow: `0 12px 40px ${mandate.color}14`, transform: 'translateX(6px)' },
                                        opacity: bodyVis ? 1 : 0,
                                        animation: bodyVis ? `md_rise .65s ease ${0.1 + i * 0.08}s both` : 'none',
                                    }}
                                >
                                    {/* Number badge */}
                                    <Box sx={{ width: 44, height: 44, borderRadius: '13px', bgcolor: `${mandate.color}14`, border: `2px solid ${mandate.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: '2px' }}>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.9rem', fontWeight: 900, color: mandate.color }}>
                                            {String(i + 1).padStart(2, '0')}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 900, color: colors.text.primary, mb: 1, lineHeight: 1.3 }}>
                                            {detail.heading}
                                        </Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1rem', md: '1.1rem' }, color: colors.text.secondary, lineHeight: 1.9 }}>
                                            {detail.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Box>

                    {/* Scripture block */}
                    <Box sx={{ p: { xs: 3.5, md: 5 }, bgcolor: 'white', borderRadius: '20px', border: `1px solid ${mandate.color}20`, borderLeft: `5px solid ${mandate.color}`, opacity: bodyVis ? 1 : 0, animation: bodyVis ? 'md_rise .7s ease .5s both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.15rem', md: '1.35rem' }, fontStyle: 'italic', color: colors.text.primary, lineHeight: 1.8, mb: 2 }}>
                            {mandate.scriptureText}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 24, height: 2.5, bgcolor: mandate.color, borderRadius: 1 }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.85rem', fontWeight: 800, color: mandate.color, letterSpacing: 1.2 }}>
                                {mandate.scripture}
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ══ PREV / NEXT ══ */}
            {(prevMandate || nextMandate) && (
                <Box sx={{ bgcolor: 'white', py: { xs: 5, md: 7 }, borderTop: `1px solid ${colors.divider}` }}>
                    <Container maxWidth="md">
                        <Box sx={{ display: 'grid', gridTemplateColumns: prevMandate && nextMandate ? '1fr 1fr' : '1fr', gap: 3 }}>
                            {prevMandate && (
                                <Box component={Link} to={`/whatwedo/mandate/${prevMandate.id}`} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3, borderRadius: '16px', border: `1px solid ${colors.divider}`, textDecoration: 'none', transition: 'all .25s', '&:hover': { borderColor: prevMandate.color, boxShadow: `0 8px 24px ${prevMandate.color}18`, transform: 'translateX(-4px)' } }}>
                                    <ArrowBackIcon sx={{ fontSize: 20, color: prevMandate.color, flexShrink: 0 }} />
                                    <Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 600, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Previous</Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 800, color: colors.text.primary, lineHeight: 1.3 }}>{prevMandate.title}</Typography>
                                    </Box>
                                </Box>
                            )}
                            {nextMandate && (
                                <Box component={Link} to={`/whatwedo/mandate/${nextMandate.id}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, p: 3, borderRadius: '16px', border: `1px solid ${colors.divider}`, textDecoration: 'none', transition: 'all .25s', '&:hover': { borderColor: nextMandate.color, boxShadow: `0 8px 24px ${nextMandate.color}18`, transform: 'translateX(4px)' } }}>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 600, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: .3 }}>Next</Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 800, color: colors.text.primary, lineHeight: 1.3 }}>{nextMandate.title}</Typography>
                                    </Box>
                                    <ArrowForwardIcon sx={{ fontSize: 20, color: nextMandate.color, flexShrink: 0 }} />
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
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'md_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Partner With Us on This
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.05rem', md: '1.2rem' }, color: 'rgba(255,255,255,0.5)', mb: 5, maxWidth: 500, mx: 'auto', lineHeight: 1.9 }}>
                            This commitment needs partners — people who pray, give, and believe alongside us for lasting change.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component={Link} to="/partners" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: mandate.color, color: 'white', px: 4.5, py: 1.9, borderRadius: '12px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.05rem', fontWeight: 800, boxShadow: `0 8px 28px ${mandate.color}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteIcon sx={{ fontSize: 18 }} /> Partner Now
                            </Box>
                            <Box component={Link} to="/whatwedo/mandate" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'white', border: '1.5px solid rgba(255,255,255,0.22)', px: 4.5, py: 1.9, borderRadius: '12px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.05rem', fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', transform: 'translateY(-4px)' } }}>
                                <ArrowBackIcon sx={{ fontSize: 18 }} /> All Mandates
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}