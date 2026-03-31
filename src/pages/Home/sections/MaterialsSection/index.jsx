import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
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
        icon: MenuBookIcon,
        color: colors.secondary.main,
        title: 'Bible Studies',
        subtitle: 'A Journey of Spiritual Growth',
        body: `Embark on a Journey of Spiritual Growth! Unveil the profound teachings of the Bible in our vibrant and enriching Bible Study Class! Join us as we delve into the timeless wisdom, share meaningful insights, and build a community bound by faith and love.\n\nExplore the Scriptures together, discover the beauty of God's word, and find inspiration for your daily life. Our Bible Study Class is a welcoming space where seekers, believers, and curious minds come together to grow spiritually and strengthen their connection with God.`,
        features: ['Weekly Sessions', 'All Levels Welcome', 'Community Focused', 'Deep Scripture Study'],
        link: '/resources',
        delay: 0.1,
    },
    {
        icon: GroupsIcon,
        color: colors.primary.light,
        title: 'Discipleship Training',
        subtitle: 'Ignite a Transformational Journey',
        body: `Are you ready to deepen your understanding of faith and ignite a transformational journey?\n\nJoin our Discipleship Class and explore the profound teachings that nourish the soul. Every moment is an opportunity for growth, and every step forward is a step toward a more meaningful life.\n\nDon't miss out on this chance to embark on a journey that will leave you inspired, enlightened, and connected to a supportive community. Together, let's forge bonds that last a lifetime.`,
        features: ['Faith Formation', 'Mentorship', 'Fellowship', 'Life Transformation'],
        link: '/programs',
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
                            <Typography sx={labelTextSx}>Discipleship Materials</Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, mt: 0.5, lineHeight: 1.7 }}>
                                Tools and resources to ground you in faith, community and purpose.
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
                                            Click Here to Join
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