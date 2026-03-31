import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PaymentIcon from '@mui/icons-material/Payment';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SchoolIcon from '@mui/icons-material/School';
import CampaignIcon from '@mui/icons-material/Campaign';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { colors, typography } from '../../../theme';
import {
    dashboardWrapper,
    headerSection,
    greetingText,
    subGreeting,
    liveBadge,
    overviewLabel,
    cardGrid,
    card,
    cardIconWrap,
    cardLabel,
    cardValue,
    cardSubText,
} from './styles';

const STATS = [
    { label: 'Total Blogs', value: 0, sub: 'Published articles', icon: ArticleIcon, color: '#3B82F6', glow: 'rgba(59,130,246,0.22)' },
    { label: 'Activities', value: 0, sub: 'Active programmes', icon: LocalActivityIcon, color: '#10B981', glow: 'rgba(16,185,129,0.22)' },
    { label: 'Partners', value: 0, sub: 'Registered partners', icon: GroupsIcon, color: colors.secondary.main, glow: 'rgba(212,160,23,0.22)' },
    { label: 'Events', value: 0, sub: 'Upcoming events', icon: EventIcon, color: '#E74C3C', glow: 'rgba(231,76,60,0.22)' },
    { label: 'Bible Studies', value: 0, sub: 'Study materials', icon: MenuBookIcon, color: '#8B5CF6', glow: 'rgba(139,92,246,0.22)' },
    { label: 'Payments', value: 0, sub: 'Total collected', icon: PaymentIcon, color: '#10B981', glow: 'rgba(16,185,129,0.22)' },
    { label: 'Daily Devotions', value: 0, sub: 'Days published', icon: AutoStoriesIcon, color: '#27AE60', glow: 'rgba(39,174,96,0.22)' },
    { label: 'Discipleship', value: 0, sub: 'Members enrolled', icon: SchoolIcon, color: '#1ABC9C', glow: 'rgba(26,188,156,0.22)' },
    { label: 'Announcements', value: 0, sub: 'Published notices', icon: CampaignIcon, color: '#F59E0B', glow: 'rgba(245,158,11,0.22)' },
];

function useCountUp(target, duration = 1300) {
    const [count, setCount] = useState(0);
    const raf = useRef(null);
    useEffect(() => {
        if (target === null) return;
        let start = null;
        const step = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) raf.current = requestAnimationFrame(step);
        };
        raf.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf.current);
    }, [target, duration]);
    return count;
}

function StatCard({ stat, index }) {
    const [hovered, setHovered] = useState(false);
    const Icon = stat.icon;

    return (
        <Box
            sx={{
                ...card,
                animationDelay: `${index * 75}ms`,
                background: hovered ? `${stat.color}12` : 'rgba(255,255,255,0.04)',
                borderColor: hovered ? `${stat.color}30` : 'rgba(255,255,255,0.07)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                    ...cardIconWrap,
                    background: `${stat.color}15`,
                    boxShadow: hovered ? `0 0 20px ${stat.glow}` : 'none',
                    transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                    transform: hovered ? 'scale(1.08)' : 'scale(1)',
                }}>
                    <Icon sx={{ color: stat.color, fontSize: 20 }} />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={cardLabel}>{stat.label}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.2, mt: 0.3 }}>
                        <Typography sx={{ ...cardValue, color: hovered ? stat.color : '#fff', transition: 'color 0.3s ease' }}>
                            {stat.value}
                        </Typography>
                    </Box>
                    <Typography sx={cardSubText}>{stat.sub}</Typography>
                </Box>

            </Box>
        </Box>
    );
}

export default function AdminDashboard() {
    return (
        <Box sx={dashboardWrapper}>
            <Box sx={headerSection}>
                <Box>
                    <Typography sx={greetingText}>Admin Dashboard</Typography>
                    <Typography sx={subGreeting}>Welcome back 👋 &nbsp; Here's what's happening today.</Typography>
                </Box>
                <Chip
                    label="Live"
                    size="small"
                    icon={<FiberManualRecordIcon sx={{ fontSize: '9px !important', color: '#10B981 !important' }} />}
                    sx={liveBadge}
                />
            </Box>


            <Box sx={cardGrid}>
                {STATS.map((stat, i) => (
                    <StatCard key={stat.label} stat={stat} index={i} />
                ))}
            </Box>
        </Box>
    );
}