import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import CollectionsIcon from '@mui/icons-material/Collections';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes gl_rise': { from: { opacity: 0, transform: 'translateY(36px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes gl_glow': { '0%,100%': { opacity: .35 }, '50%': { opacity: .7 } },
    '@keyframes gl_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes gl_imgIn': { from: { opacity: 0, transform: 'scale(0.94)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes gl_fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
};

const TOTAL_IMAGES = 90;

const IMAGES = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
    id: i + 1,
    src: `/img/gallery/img${i + 1}.jpeg`,
    caption: `Jesus Partners Outreach — Moment ${i + 1}`,
}));

const useReveal = () => {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold: 0.05 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, vis];
};
function Lightbox({ images, index, onClose, onPrev, onNext }) {
    const img = images[index];
    if (!img) return null;

    useEffect(() => {
        const fn = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, [onClose, onPrev, onNext]);

    return (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box onClick={onClose} sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(14px)', animation: 'gl_fadeIn .2s ease both' }} />

            {/* Close */}
            <Box onClick={onClose} sx={{ position: 'absolute', top: 18, right: 18, width: 42, height: 42, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, transition: 'all .2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.16)' } }}>
                <CloseIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>

            {/* Counter */}
            <Box sx={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', px: 2.2, py: .6, zIndex: 2 }}>
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                    {index + 1} / {images.length}
                </Typography>
            </Box>

            {/* Prev */}
            <Box onClick={onPrev} sx={{ position: 'absolute', left: { xs: 8, md: 24 }, width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 }, borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, transition: 'all .2s', '&:hover': { bgcolor: `${colors.secondary.main}25`, borderColor: colors.secondary.main } }}>
                <ArrowBackIosNewIcon sx={{ fontSize: 18, color: 'white' }} />
            </Box>

            {/* Next */}
            <Box onClick={onNext} sx={{ position: 'absolute', right: { xs: 8, md: 24 }, width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 }, borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, transition: 'all .2s', '&:hover': { bgcolor: `${colors.secondary.main}25`, borderColor: colors.secondary.main } }}>
                <ArrowForwardIosIcon sx={{ fontSize: 18, color: 'white' }} />
            </Box>

            {/* Image */}
            <Box sx={{ position: 'relative', zIndex: 1, animation: 'gl_imgIn .28s ease both' }}>
                <Box component="img" src={img.src} alt={img.caption}
                    sx={{ maxWidth: '88vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 40px 100px rgba(0,0,0,0.7)', display: 'block' }}
                    onError={(e) => { e.target.style.opacity = 0.3; }}
                />
                {/* Caption bar */}
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: `${colors.secondary.main}18`, border: `1px solid ${colors.secondary.main}30`, borderRadius: '100px', px: 2, py: .5 }}>
                        <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: colors.secondary.main }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>
                            Jesus Partners Outreach
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────
export default function GalleryPage() {
    const [heroRef, heroVis] = useReveal();
    const [gridRef, gridVis] = useReveal();
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const openLightbox = (index) => { setLightboxIndex(index); document.body.style.overflow = 'hidden'; };
    const closeLightbox = useCallback(() => { setLightboxIndex(null); document.body.style.overflow = ''; }, []);
    const prevImage = useCallback(() => setLightboxIndex(i => (i - 1 + IMAGES.length) % IMAGES.length), []);
    const nextImage = useCallback(() => setLightboxIndex(i => (i + 1) % IMAGES.length), []);

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {lightboxIndex !== null && (
                <Lightbox images={IMAGES} index={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />
            )}

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 16 }, pb: { xs: 6, md: 8 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '26px 26px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-20%', right: '-5%', width: 450, height: 450, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'gl_glow 6s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-15%', left: '-4%', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box ref={heroRef} sx={{ opacity: heroVis ? 1 : 0, animation: heroVis ? 'gl_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)', borderRadius: '100px', px: 2.5, py: .8, mb: 2.5 }}>
                            <CollectionsIcon sx={{ fontSize: 14, color: colors.secondary.light }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.68rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                Photo Gallery
                            </Typography>
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.4rem', md: '3.4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.1, mb: 1.5 }}>
                            Moments of{' '}
                            <Box component="span" sx={{ background: `linear-gradient(120deg,${colors.secondary.main},${colors.secondary.light})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'gl_gradShift 4s ease infinite' }}>
                                Grace.
                            </Box>
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.5)', maxWidth: 500, lineHeight: 1.85 }}>
                            A glimpse into what God is doing through Jesus Partners Outreach — crusades, widows care, medical missions, education and more.
                        </Typography>

                        {/* Image count badge */}
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mt: 3, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', px: 2, py: 1 }}>
                            <CollectionsIcon sx={{ fontSize: 15, color: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>
                                {TOTAL_IMAGES} photos
                            </Typography>
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

            {/* ══ GRID ══ */}
            <Box sx={{ bgcolor: colors.background.default, py: { xs: 5, md: 8 } }}>
                <Container maxWidth="lg">
                    <Box ref={gridRef} sx={{
                        columns: { xs: 2, sm: 3, md: 4 },
                        columnGap: '10px',
                        opacity: gridVis ? 1 : 0,
                        animation: gridVis ? 'gl_rise .6s ease both' : 'none',
                    }}>
                        {IMAGES.map((img, i) => (
                            <Box key={img.id} onClick={() => openLightbox(i)} sx={{
                                breakInside: 'avoid',
                                mb: '10px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                position: 'relative',
                                border: `1px solid ${colors.divider}`,
                                transition: 'transform .3s cubic-bezier(.34,1.2,.64,1), box-shadow .3s',
                                '&:hover': {
                                    transform: 'translateY(-5px) scale(1.02)',
                                    boxShadow: `0 16px 40px rgba(0,0,0,0.18), 0 0 0 2px ${colors.secondary.main}50`,
                                    '& .gl-overlay': { opacity: 1 },
                                    '& .gl-zoom': { opacity: 1, transform: 'scale(1)' },
                                },
                            }}>
                                {/* Image */}
                                <Box component="img" src={img.src} alt={img.caption}
                                    loading="lazy"
                                    sx={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                {/* Fallback placeholder */}
                                <Box sx={{ display: 'none', height: 150, bgcolor: `${colors.secondary.main}08`, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                                    <CollectionsIcon sx={{ fontSize: 28, color: `${colors.secondary.main}35` }} />
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.6rem', color: 'rgba(0,0,0,0.25)', textAlign: 'center', px: 1 }}>
                                        img{img.id}.jpg
                                    </Typography>
                                </Box>

                                {/* Hover overlay */}
                                <Box className="gl-overlay" sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)', opacity: 0, transition: 'opacity .3s' }}>
                                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 1.2 }}>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6 }}>
                                            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: colors.secondary.main }} />
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.62rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                                                Jesus Partners Outreach
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Zoom icon */}
                                <Box className="gl-zoom" sx={{ position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: '9px', bgcolor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transform: 'scale(0.6)', transition: 'all .25s cubic-bezier(.34,1.2,.64,1)' }}>
                                    <ZoomInIcon sx={{ fontSize: 16, color: colors.secondary.main }} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
        </>
    );
}