import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import GroupsIcon from '@mui/icons-material/Groups';
import { colors } from '../../../../theme';
import {
    keyframes, wrapSx, bgPatternSx, orbSx,
    sectionLabelSx, labelBarSx, labelTextSx,
    headingSx, headGoldSx, bodyTextSx,

    cardGridSx, cardSx, cardImgWrapSx, cardImgSx, cardOverlaySx,
    cardTopBarSx, cardBodySx, cardIconWrapSx, cardTitleSx, cardDescSx, cardLinkSx,
} from './styles';

const CARDS = [
    {
        title: 'Who We Are',
        desc: 'Jesus Partners Outreach is an outreach ministry dedicated to reaching every generation across the nations with the transforming power of the Gospel.',
        img: '/jesus1.png', 
        icon: GroupsIcon,
        color: colors.secondary.main,
        link: '/about',
        delay: 0.1,
        isLogo: true,
    },
    {
        title: 'Vision',
        desc: 'To raise men and women who shall accompany Jesus and become true partners in fulfilling the Great Commission across every nation and generation.',
        img: '/image2.jpg',
        icon: VisibilityIcon,
        color: colors.accent.teal,
        link: '/about',
        delay: 0.22,
        isLogo: false,
    },
    {
        title: 'Mission',
        desc: 'To raise revival and gospel altars across the nations of the world — partnering with Jesus to reveal Him so that men may possess their possession.',
        img: '/image1.jpg',
        icon: FlagIcon,
        color: colors.accent.red,
        link: '/about',
        delay: 0.34,
        isLogo: false,
    },
];

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

const LogoCard = ({ card }) => (
    <Box sx={cardSx(card.delay)} className="card-root">
        <Box sx={cardTopBarSx(card.color)} />
        <Box sx={{ ...cardImgWrapSx, height: 210, bgcolor: colors.primary.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${colors.secondary.main}18 0%, transparent 70%)` }} />
            <Box sx={{ position: 'absolute', width: '110%', height: '110%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.15)`, animation: 'ab_spin 20s linear infinite', pointerEvents: 'none' }} />
            <Box sx={{ position: 'absolute', width: '80%', height: '80%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.1)`, animation: 'ab_spin 14s linear infinite reverse', pointerEvents: 'none' }} />
            <Box component="img" src="/jesus1.png" alt="JPO Logo"
                sx={{ width: 180, height: 180, objectFit: 'contain', position: 'relative', zIndex: 2, animation: 'ab_imgFloat 5s ease-in-out infinite', filter: `drop-shadow(0 10px 30px ${colors.secondary.main}55)` }}
            />
            <Box sx={cardOverlaySx} />
        </Box>
        <Box sx={cardBodySx}>
            <Box sx={cardIconWrapSx(card.color)}>
                <card.icon sx={{ fontSize: 22, color: card.color }} />
            </Box>
            <Typography sx={cardTitleSx}>{card.title}</Typography>
            <Typography sx={cardDescSx}>{card.desc}</Typography>
            <Box component={Link} to={card.link} sx={cardLinkSx(card.color)}>
                Learn More <ArrowForwardIcon sx={{ fontSize: 15 }} />
            </Box>
        </Box>
    </Box>
);

const ImgCard = ({ card }) => (
    <Box sx={cardSx(card.delay)} className="card-root">
        <Box sx={cardTopBarSx(card.color)} />
        <Box sx={cardImgWrapSx}>
            <Box component="img" src={card.img} alt={card.title} sx={cardImgSx}
                onError={(e) => { e.target.style.display = 'none'; }} />
            <Box sx={cardOverlaySx} />
        </Box>
        <Box sx={cardBodySx}>
            <Box sx={cardIconWrapSx(card.color)}>
                <card.icon sx={{ fontSize: 22, color: card.color }} />
            </Box>
            <Typography sx={cardTitleSx}>{card.title}</Typography>
            <Typography sx={cardDescSx}>{card.desc}</Typography>
            <Box component={Link} to={card.link} sx={cardLinkSx(card.color)}>
                Learn More <ArrowForwardIcon sx={{ fontSize: 15 }} />
            </Box>
        </Box>
    </Box>
);

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
                        <Typography sx={{ ...bodyTextSx, maxWidth: 420, mb: 0 }}>
                            A global outreach ministry on a divine mandate — partnering with Jesus to
                            reach every generation, in every nation, with the living Word.
                        </Typography>
                    </Box>
                    <Box sx={{
                        height: 1, mt: 2,
                        background: `linear-gradient(90deg, ${colors.secondary.main}60, transparent)`,
                        opacity: vis ? 1 : 0,
                        animation: vis ? 'ab_rise .5s ease .2s both' : 'none',
                    }} />

                    <Box sx={cardGridSx}>
                        {CARDS.map((card) =>
                            card.isLogo
                                ? <LogoCard key={card.title} card={card} />
                                : <ImgCard key={card.title} card={card} />
                        )}
                    </Box>

                </Container>
            </Box>
        </>
    );
}