import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { colors, typography } from '../../../../theme';
import {
    keyframes, wrapSx, bgPatternSx, orbSx,
    labelRowSx, labelAccentSx, labelTextSx, gridSx,
    cardSx, cardTopSx, cardInnerSx, iconRowSx, iconBoxSx,
    cardTitleSx, cardSubSx, dividerLineSx, bodyTextSx,
    ctaBtnSx, featureTagSx,
} from './styles';

const MATERIALS = [
    {
        icon: FavoriteIcon,
        color: colors.secondary.main,
        title: 'Partner With Us',
        subtitle: 'Do More and Better Together',
        body: `Here is what we are given to doing and we request that you partner with us to do more and better.\n\nOver the years we have been sharing with widows, orphans, churches, ministers and their children. We have committed our lives to the word of Christ through Gospel Crusades and Revivals with great testimonies of salvation, praying for the sick and assisting some to get medical attention where needed.\n\nYour partnership makes all of this possible — together we can reach more lives with the love of Christ.`,
        features: ['Crusades & Revivals', 'Widows & Orphans', 'Medical Outreaches', 'Education Assistance'],
        link: '/partner',
        delay: 0.1,
    },
    {
        icon: GroupsIcon,
        color: colors.primary.light,
        title: 'Ministerial Training',
        subtitle: 'Grace College of Evangelism & Missions',
        body: `Through Grace College of Evangelism and Missions in Abuja, we are raising and equipping ministers for the Gospel across Nigeria and beyond.\n\nWe provide scholarships, study materials, infrastructural development and a residence for students. Ministers and their children also receive tuition support, books and external exams support.\n\nJoin us in raising a generation of committed Gospel workers who will carry the fire of revival to the nations.`,
        features: ['Scholarship Support', 'Study Materials', 'Infrastructural Development', 'Ministerial Support'],
        link: '/what-we-do',
        delay: 0.22,
    },
];

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

export default function MaterialsSection() {
    const [ref, vis] = useReveal();

    return (
        <>
            <GlobalStyles styles={keyframes} />
            <Box sx={wrapSx}>
                <Box sx={bgPatternSx} />
                <Box sx={orbSx('-12%', '-6%', undefined, undefined, 380, `${colors.secondary.main}0B`, '0s')} />
                <Box sx={orbSx(undefined, undefined, '-10%', '-5%', 300, `${colors.primary.light}0A`, '3s')} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    {/* ── Header ── */}
                    <Box ref={ref} sx={{
                        ...labelRowSx,
                        opacity: vis ? 1 : 0,
                        animation: vis ? 'ms_rise .6s ease both' : 'none',
                    }}>
                        <Box sx={labelAccentSx} />
                        <Box>
                            <Typography sx={labelTextSx}>Get Involved</Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, mt: 0.5, lineHeight: 1.7 }}>
                                Partner with us and be part of what God is doing through Jesus Partners Outreach.
                            </Typography>
                        </Box>
                    </Box>

                    {/* ── Cards ── */}
                    <Box sx={gridSx}>
                        {MATERIALS.map((mat) => {
                            const Icon = mat.icon;
                            return (
                                <Box key={mat.title} sx={cardSx(mat.delay, mat.color)}>
                                    <Box sx={cardTopSx(mat.color)} />

                                    <Box sx={cardInnerSx}>
                                        {/* Icon + title row */}
                                        <Box sx={iconRowSx}>
                                            <Box sx={iconBoxSx(mat.color)}>
                                                <Icon sx={{ fontSize: 28, color: mat.color, animation: 'ms_iconFloat 4s ease-in-out infinite', position: 'relative', zIndex: 1 }} />
                                            </Box>
                                            <Box>
                                                <Typography sx={cardTitleSx}>{mat.title}</Typography>
                                                <Typography sx={cardSubSx(mat.color)}>
                                                    <AutoStoriesIcon sx={{ fontSize: 13 }} />
                                                    {mat.subtitle}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Animated divider */}
                                        <Box sx={dividerLineSx(mat.color)} />

                                        {/* Feature tags */}
                                        <Box sx={{ mb: 2.5 }}>
                                            {mat.features.map(f => (
                                                <Box key={f} component="span" sx={featureTagSx(mat.color)}>
                                                    <CheckCircleIcon sx={{ fontSize: 10 }} />
                                                    {f}
                                                </Box>
                                            ))}
                                        </Box>

                                        {/* Body text */}
                                        <Typography sx={bodyTextSx}>
                                            {mat.body.split('\n\n').map((para, i) => (
                                                <Box key={i} component="span" sx={{ display: 'block', mb: i < mat.body.split('\n\n').length - 1 ? 1.5 : 0 }}>
                                                    {para}
                                                </Box>
                                            ))}
                                        </Typography>

                                        {/* CTA button */}
                                        <Box component={Link} to={mat.link} sx={ctaBtnSx(mat.color)}>
                                            Learn More
                                            <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>

                </Container>
            </Box>
        </>
    );
}