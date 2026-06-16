import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CampaignIcon from '@mui/icons-material/Campaign';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { colors, typography } from '../../../../theme';
import {
    keyframes, wrapSx, bgPatternSx, orbSx,
    labelRowSx, labelAccentSx, labelTextSx,
} from './styles';

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

// Left column — Partnership areas
const LEFT = [
    { icon: CampaignIcon, color: colors.secondary.main, title: 'Crusades & Revivals', desc: 'Fund city-wide and local crusades reaching thousands with the Gospel.' },
    { icon: VolunteerActivismIcon, color: colors.accent.red, title: 'Widows & Orphans', desc: 'Support meals, clothing and care for 400 widows and orphans of persecution.' },
    { icon: LocalHospitalIcon, color: colors.accent.teal, title: 'Medical Outreaches', desc: 'Bring healthcare to displaced communities and IDP camps across Nigeria.' },
];

// Right column — Training & Support
const RIGHT = [
    { icon: SchoolIcon, color: colors.accent.green, title: 'Education Assistance', desc: 'Place orphans in boarding schools with tuition, meals and trauma counselling.' },
    { icon: PeopleAltIcon, color: '#8B5CF6', title: 'Pastors & Children', desc: 'Books, tuition and exams support for ministers\' children serving under hardship.' },
    { icon: MenuBookIcon, color: colors.secondary.main, title: 'Ministerial Training', desc: 'Scholarships and resources at Grace College of Evangelism & Missions, Abuja.' },
];

const ProgItem = ({ prog, i, vis, isRight }) => {
    const Icon = prog.icon;
    return (
        <Box sx={{
            display: 'flex', alignItems: 'flex-start', gap: 2,
            py: 1.8, px: 2,
            borderBottom: i < 2 ? `1px solid rgba(255,255,255,0.06)` : 'none',
            borderRadius: '10px',
            opacity: vis ? 1 : 0,
            animation: vis ? `ms_rise .6s ease ${i * 0.12}s both` : 'none',
            transition: 'background .25s',
            '&:hover': {
                bgcolor: `${prog.color}08`,
                '& .prog-bar': { width: '100%' },
            },
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Animated bottom accent bar on hover */}
            <Box className="prog-bar" sx={{ position: 'absolute', bottom: 0, left: 0, height: '2px', width: 0, bgcolor: prog.color, transition: 'width .35s ease', borderRadius: 2 }} />

            {/* Icon */}
            <Box sx={{ width: 34, height: 34, borderRadius: '10px', bgcolor: `${prog.color}15`, border: `1.5px solid ${prog.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: '2px' }}>
                <Icon sx={{ fontSize: 16, color: prog.color }} />
            </Box>

            {/* Text */}
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.3 }}>
                    <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: prog.color, flexShrink: 0 }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.82rem', fontWeight: 800, color: colors.secondary.main }}>
                        {prog.title}
                    </Typography>
                </Box>
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.76rem', color: colors.text.secondary, lineHeight: 1.7, pl: '13px' }}>
                    {prog.desc}
                </Typography>
            </Box>
        </Box>
    );
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

                    {/* Header */}
                    <Box ref={ref} sx={{ ...labelRowSx, opacity: vis ? 1 : 0, animation: vis ? 'ms_rise .6s ease both' : 'none' }}>
                        <Box sx={labelAccentSx} />
                        <Box>
                            <Typography sx={labelTextSx}>Get Involved</Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, mt: 0.5, lineHeight: 1.7 }}>
                                Partner with us and be part of what God is doing through Jesus Partners Outreach.
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 0, md: 4 }, mb: 4 }}>
                        <Box>
                            {LEFT.map((prog, i) => <ProgItem key={prog.title} prog={prog} i={i} vis={vis} />)}
                        </Box>
                        <Box>
                            {RIGHT.map((prog, i) => <ProgItem key={prog.title} prog={prog} i={i} vis={vis} isRight />)}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', opacity: vis ? 1 : 0, animation: vis ? 'ms_rise .7s ease .3s both' : 'none' }}>
                        <Box component={Link} to="/partners" sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 1,
                            bgcolor: colors.secondary.main, color: 'white',
                            px: 3.5, py: 1.5, borderRadius: '10px',
                            textDecoration: 'none',
                            fontFamily: typography.fontFamily.heading,
                            fontSize: typography.fontSize.sm, fontWeight: 800,
                            boxShadow: `0 8px 28px ${colors.secondary.main}44`,
                            transition: 'all .3s cubic-bezier(.34,1.2,.64,1)',
                            '&:hover': { transform: 'translateY(-3px) scale(1.04)', boxShadow: `0 16px 40px ${colors.secondary.main}55` }
                        }}>
                            <HandshakeIcon sx={{ fontSize: 16 }} /> Partner With Us
                        </Box>
                        <Box component={Link} to="/give" sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 1,
                            bgcolor: 'transparent', color: colors.secondary.main,
                            border: `1.5px solid ${colors.secondary.main}`,
                            px: 3.5, py: 1.5, borderRadius: '10px',
                            textDecoration: 'none',
                            fontFamily: typography.fontFamily.heading,
                            fontSize: typography.fontSize.sm, fontWeight: 800,
                            transition: 'all .3s cubic-bezier(.34,1.2,.64,1)',
                            '&:hover': { bgcolor: `${colors.secondary.main}14`, transform: 'translateY(-3px)' }
                        }}>
                            <FavoriteIcon sx={{ fontSize: 16 }} /> Give Now
                        </Box>
                    </Box>

                </Container>
            </Box>
        </>
    );
}