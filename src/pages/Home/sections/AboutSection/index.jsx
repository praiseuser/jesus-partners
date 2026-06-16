import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { colors } from '../../../../theme';
import {
    keyframes, wrapSx, bgPatternSx, orbSx,
    sectionLabelSx, labelBarSx, labelTextSx,
    headingSx, headGoldSx, bodyTextSx,
} from './styles';

const useReveal = () => {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold: 0.08 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, vis];
};

export default function AboutSection() {
    const [ref, vis] = useReveal();

    return (
        <>
            <GlobalStyles styles={keyframes} />
            <Box sx={wrapSx}>
                <Box sx={bgPatternSx} />
                <Box sx={orbSx('-10%', '-5%', undefined, undefined, 400, `${colors.secondary.main}0C`, '0s')} />
                <Box sx={orbSx(undefined, undefined, '-8%', '-4%', 300, `${colors.accent.teal}08`, '3s')} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    <Box ref={ref} sx={{
                        display: 'flex', flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { md: 'center' }, justifyContent: 'space-between',
                        gap: 3, mb: 1,
                        opacity: vis ? 1 : 0,
                        animation: vis ? 'ab_rise .7s cubic-bezier(.34,1.2,.64,1) both' : 'none',
                    }}>
                        {/* Left — heading */}
                        <Box>
                            <Box sx={sectionLabelSx}>
                                <Box sx={labelBarSx} />
                                <Typography sx={labelTextSx}>Who We Are</Typography>
                                <Box sx={labelBarSx} />
                            </Box>
                            <Typography sx={headingSx}>
                                About{' '}
                                <Box component="span" sx={headGoldSx}>Jesus Partners</Box>
                                <br />Outreach
                            </Typography>
                        </Box>

                        {/* Right — text + Read More button */}
                        <Box sx={{ maxWidth: 420 }}>
                            <Typography sx={{ ...bodyTextSx, mb: 2.5 }}>
                                Incorporated in Nigeria in 2023, Jesus Partners Outreach has been
                                passionately serving widows, orphans, churches and ministers since 2007 —
                                committed to sharing the love of Christ through crusades, medical
                                outreaches, education assistance and ministerial training.
                            </Typography>
                            <Box component={Link} to="/about" sx={{
                                display: 'inline-flex', alignItems: 'center', gap: 1,
                                bgcolor: colors.secondary.main, color: 'white',
                                px: 3, py: 1.4, borderRadius: '10px',
                                textDecoration: 'none',
                                fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 700,
                                boxShadow: `0 8px 24px ${colors.secondary.main}44`,
                                transition: 'all .3s cubic-bezier(.34,1.2,.64,1)',
                                '&:hover': { transform: 'translateY(-3px) scale(1.04)', boxShadow: `0 14px 36px ${colors.secondary.main}55` }
                            }}>
                                Read More <ArrowForwardIcon sx={{ fontSize: 15 }} />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        height: 1, mt: 2,
                        background: `linear-gradient(90deg, ${colors.secondary.main}60, transparent)`,
                        opacity: vis ? 1 : 0,
                        animation: vis ? 'ab_rise .5s ease .2s both' : 'none',
                    }} />

                </Container>
            </Box>
        </>
    );
}