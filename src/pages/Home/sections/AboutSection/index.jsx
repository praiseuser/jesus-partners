import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VerifiedIcon from '@mui/icons-material/Verified';
import { colors } from '../../../../theme';
import {
    keyframes, wrapSx, bgPatternSx,
    sectionHeaderSx, sectionLabelSx, labelBarSx, labelTextSx, sectionTitleSx,
    gridSx,
    preambleCardSx, foundationCardSx, cardDotsSx, cardGlowSx,
    cardTagSx, cardHeadingSx, bodyCopySx,
    scriptureBlockSx, scriptureTextSx, scriptureRefSx, closingLineSx,
    rcBadgeSx, rcBadgeLabelSx, rcBadgeValueSx,
    readMoreWrapSx, readMoreBtnSx, dividerSx,
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

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    {/* ── Section header ── */}
                    <Box sx={{ ...sectionHeaderSx, opacity: vis ? 1 : 0, animation: vis ? 'ab_rise .7s ease both' : 'none' }}>
                        <Box sx={sectionLabelSx}>
                            <Box sx={labelBarSx} />
                            <Typography sx={labelTextSx}>About Us</Typography>
                            <Box sx={labelBarSx} />
                        </Box>
                        <Typography component="h2" sx={sectionTitleSx}>Who We Are</Typography>
                    </Box>

                    <Box ref={ref} sx={gridSx}>

                        {/* ── Left: Preamble (dark card) ── */}
                        <Box sx={{ ...preambleCardSx, opacity: vis ? 1 : 0, animation: vis ? 'ab_left .8s cubic-bezier(.34,1.2,.64,1) .1s both' : 'none' }}>
                            <Box sx={cardDotsSx} />
                            <Box sx={cardGlowSx} />

                            <Box sx={cardTagSx(true)}>
                                <FormatQuoteIcon sx={{ fontSize: 26, color: colors.secondary.light }} />
                                <span className="tag-text">Preamble</span>
                            </Box>
                            <Typography component="h3" sx={cardHeadingSx(true)}>Our Inspiration</Typography>

                            <Typography sx={bodyCopySx(true)}>
                                Our inspiration is drawn from Mark 16:15–20:
                            </Typography>

                            <Box sx={scriptureBlockSx}>
                                <Typography sx={scriptureTextSx}>
                                    "Go into all the world and preach the gospel to every creature… And they went out and preached everywhere, the Lord working with them confirming the word through accompanying signs."
                                </Typography>
                                <Typography sx={scriptureRefSx}>Mark 16:15–20</Typography>
                            </Box>

                            <Typography sx={bodyCopySx(true)}>
                                Our conviction is to obey and follow Jesus as partners, reaching out to the world with His gospel and ministering His love. In Matthew 28:19–20, Jesus commanded, "Go… and I will be with you always, to the end of the age." We are committed to this partnership with Jesus to minister to the nations.
                            </Typography>

                            <Typography sx={closingLineSx(true)}>
                                All partners are coworkers with one another and with Christ. What a privilege and blessed opportunity.
                            </Typography>
                        </Box>

                        {/* ── Right: Our Foundation (light card) ── */}
                        <Box sx={{ ...foundationCardSx, opacity: vis ? 1 : 0, animation: vis ? 'ab_right .8s cubic-bezier(.34,1.2,.64,1) .2s both' : 'none' }}>

                            <Box sx={cardTagSx(false)}>
                                <VerifiedIcon sx={{ fontSize: 24, color: colors.secondary.main }} />
                                <span className="tag-text">Who We Are</span>
                            </Box>
                            <Typography component="h3" sx={cardHeadingSx(false)}>Our Foundation</Typography>

                            {/* Registration badge */}
                            <Box sx={rcBadgeSx}>
                                <VerifiedIcon sx={{ fontSize: 34, color: colors.secondary.main, flexShrink: 0 }} />
                                <Box>
                                    <Typography sx={rcBadgeLabelSx}>Registered with the Corporate Affairs Commission</Typography>
                                    <Typography sx={rcBadgeValueSx}>RC: 6922346</Typography>
                                </Box>
                            </Box>

                            <Typography sx={bodyCopySx(false)}>
                                Jesus Partners Outreach is a Non-Governmental, Non-profit organization registered with the Corporate Affairs Commission in Nigeria, RC: 6922346.
                            </Typography>

                            {/* Image block: grows to fill whatever space the taller left card leaves */}
                            <Box sx={{
                                position: 'relative', zIndex: 1,
                                flex: 1, minHeight: { xs: 220, md: 240 },
                                mb: 3, borderRadius: '22px', overflow: 'hidden',
                                bgcolor: colors.primary.dark,
                                backgroundImage: 'url(/img/gallery/img72.png)',
                                backgroundSize: 'cover', backgroundPosition: 'center',
                                boxShadow: '0 16px 40px rgba(10,16,40,0.18)',
                            }}>
                                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,16,40,0.85) 0%, rgba(10,16,40,0.15) 60%, transparent 100%)' }} />
                                <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: { xs: 2, md: 2.5 }, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {['Serving Since 2007', 'Incorporated in Nigeria'].map((t) => (
                                        <Box key={t} sx={{ bgcolor: 'rgba(10,16,40,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(212,160,23,0.5)', borderRadius: '999px', px: 2, py: 0.7 }}>
                                            <Typography sx={{ fontFamily: 'inherit', fontSize: '0.95rem', fontWeight: 800, color: colors.secondary.light, lineHeight: 1.3 }}>{t}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>

                            <Typography sx={{ ...closingLineSx(false), mt: 0 }}>
                                We are an outreach ministry dedicated to preaching the gospel of grace in Christ Jesus to a needy world. Ours is partnership with Jesus — the Anointed Savior, Healer, Deliverer; the hope of the hopeless and the answer to all life's questions.
                            </Typography>
                        </Box>

                    </Box>

                    {/* Divider */}
                    <Box sx={dividerSx} />

                    {/* Read More button — centered */}
                    <Box sx={readMoreWrapSx}>
                        <Box component={Link} to="/about" sx={readMoreBtnSx}>
                            Read More <ArrowForwardIcon sx={{ fontSize: 20 }} />
                        </Box>
                    </Box>

                </Container>
            </Box>
        </>
    );
}