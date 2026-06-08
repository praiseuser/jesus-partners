import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleIcon from '@mui/icons-material/Article';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { colors, typography } from '../../../../theme';
import {
    keyframes, wrapSx, bgPatternSx, labelRowSx, sectionLabelSx,
    labelAccentSx, labelTextSx, viewAllBtnSx, gridSx,
    cardSx, imgWrapSx, imgSx, imgOverlaySx, imgFallbackSx,
    categoryTagSx, dateSx, cardBodySx, cardTitleSx, cardDescSx,
    readMoreSx, scriptureBannerSx, scriptureTextSx, scriptureRefSx,
} from './styles';

/* News will come from admin dashboard */
const NEWS = [];

const useReveal = () => {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold: 0.07 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, vis];
};

const EmptyNews = () => (
    <Box sx={{
        gridColumn: '1 / -1', textAlign: 'center', py: 8,
        color: 'rgba(255,255,255,0.25)',
        fontFamily: typography.fontFamily.body,
        fontSize: '0.85rem',
    }}>
        No news at this time — check back soon.
    </Box>
);

const NewsCard = ({ item, delay, featured = false }) => (
    <Box sx={{ ...(featured ? { gridColumn: { xs: '1', sm: '1 / -1', lg: '1 / 3' } } : {}), ...cardSx(delay) }} className="news-card">
        {/* Image / fallback */}
        <Box sx={imgWrapSx(featured)}>
            {item.img
                ? <Box component="img" src={item.img} alt={item.title} sx={imgSx} />
                : <Box sx={imgFallbackSx(item.categoryColor)}>
                    <ArticleIcon sx={{ fontSize: featured ? 80 : 56, color: `${item.categoryColor}40` }} />
                </Box>
            }
            <Box sx={imgOverlaySx} />
            <Box sx={categoryTagSx(item.categoryColor)}>
                <NewReleasesIcon sx={{ fontSize: 9 }} />
                {item.category}
            </Box>
            <Typography sx={dateSx}>{item.date}</Typography>
        </Box>

        {/* Body */}
        <Box sx={cardBodySx}>
            <Typography sx={cardTitleSx(featured)}>{item.title}</Typography>
            {item.ref && (
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.72rem', fontWeight: 700, color: colors.secondary.main, mb: 1, letterSpacing: 0.5 }}>
                    — {item.ref}
                </Typography>
            )}
            <Typography sx={cardDescSx}>{item.desc}</Typography>
            <Box component={Link} to="/blog" sx={readMoreSx(item.categoryColor)}>
                Read More <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </Box>
        </Box>
    </Box>
);

export default function NewsSection() {
    const [ref, vis] = useReveal();

    return (
        <>
            <GlobalStyles styles={keyframes} />
            <Box sx={wrapSx}>
                <Box sx={bgPatternSx} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    {/* ── Header ── */}
                    <Box ref={ref} sx={{ ...labelRowSx, opacity: vis ? 1 : 0, animation: vis ? 'ns_rise .6s ease both' : 'none' }}>
                        <Box sx={sectionLabelSx}>
                            <Box sx={labelAccentSx} />
                            <Typography sx={labelTextSx}>Latest News</Typography>
                        </Box>
                        <Box component={Link} to="/blog" sx={viewAllBtnSx}>
                            View All News <ArrowForwardIcon sx={{ fontSize: 15 }} />
                        </Box>
                    </Box>

                    {/* ── Grid ── */}
                    <Box sx={gridSx}>
                        {NEWS.length === 0
                            ? <EmptyNews />
                            : NEWS.map((item, i) => (
                                <NewsCard key={item.id} item={item} delay={0.1 + i * 0.1} featured={item.featured} />
                            ))
                        }
                    </Box>

                    {/* ── Scripture banner ── */}
                    <Box sx={{ ...scriptureBannerSx, opacity: vis ? 1 : 0, animation: vis ? 'ns_rise .7s ease .4s both' : 'none' }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.06) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none' }} />
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography sx={scriptureTextSx}>
                                "Pure religion and undefiled before God and the Father is this, To visit the fatherless and widows in their affliction, and to keep himself unspotted from the world."
                            </Typography>
                            <Typography sx={scriptureRefSx}>— James 1:27</Typography>
                        </Box>
                    </Box>

                </Container>
            </Box>
        </>
    );
}