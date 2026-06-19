import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    keyframes, wrapSx, bgPatternSx, orbSx,
    gridSx, colSx,
    sectionLabelSx, labelBarSx, labelTextSx,
    columnHeadingSx, columnBodySx,
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
                <Box sx={orbSx('-10%', '-5%', undefined, undefined, 400, '0s')} />
                <Box sx={orbSx(undefined, undefined, '-8%', '-4%', 300, '3s')} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    <Box ref={ref} sx={{ ...gridSx, opacity: vis ? 1 : 0, animation: vis ? 'ab_rise .7s cubic-bezier(.34,1.2,.64,1) both' : 'none' }}>

                        {/* ── Left Column (6) — Preamble ── */}
                        <Box sx={colSx}>
                            <Box sx={sectionLabelSx}>
                                <Box sx={labelBarSx} />
                                <Typography sx={labelTextSx}>Preamble</Typography>
                            </Box>
                            <Typography sx={columnHeadingSx}>Preamble</Typography>
                            <Typography sx={columnBodySx}>
                                Our inspiration is drawn from Mark 16:15–20: "Go into all the world and preach the gospel to every creature… And they went out and preached everywhere, the Lord working with them confirming the word through accompanying signs."
                            </Typography>
                            <Typography sx={columnBodySx}>
                                Our conviction is to obey and follow Jesus as partners, reaching out to the world with His gospel and ministering His love. In Matthew 28:19–20, Jesus commanded, "Go… and I will be with you always, to the end of the age." We are committed to this partnership with Jesus to minister to the nations.
                            </Typography>
                            <Typography sx={{ ...columnBodySx, mb: 0 }}>
                                All partners are coworkers with one another and with Christ. What a privilege and blessed opportunity.
                            </Typography>
                        </Box>

                        {/* ── Right Column (6) — Our Foundation ── */}
                        <Box sx={colSx}>
                            <Box sx={sectionLabelSx}>
                                <Box sx={labelBarSx} />
                                <Typography sx={labelTextSx}>Who We Are</Typography>
                            </Box>
                            <Typography sx={columnHeadingSx}>Our Foundation</Typography>
                            <Typography sx={columnBodySx}>
                                Jesus Partners Outreach is a Non-Governmental, Non-profit organization registered with the Corporate Affairs Commission in Nigeria, RC: 6922346.
                            </Typography>
                            <Typography sx={{ ...columnBodySx, mb: 0 }}>
                                We are an outreach ministry dedicated to preaching the gospel of grace in Christ Jesus to a needy world. Ours is partnership with Jesus — the Anointed Savior, Healer, Deliverer; the hope of the hopeless and the answer to all life's questions.
                            </Typography>
                        </Box>

                    </Box>

                    {/* Divider */}
                    <Box sx={dividerSx} />

                    {/* Read More button — centered */}
                    <Box sx={readMoreWrapSx}>
                        <Box component={Link} to="/about" sx={readMoreBtnSx}>
                            Read More <ArrowForwardIcon sx={{ fontSize: 16 }} />
                        </Box>
                    </Box>

                </Container>
            </Box>
        </>
    );
}