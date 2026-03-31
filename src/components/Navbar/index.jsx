import { useState, useEffect } from 'react';
import { Box, Container, Stack, Typography, IconButton, Drawer, Divider } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Link, useLocation } from 'react-router-dom';
import { colors, typography } from '../../theme';
import {
    keyframes, navbarSx, logoWrapSx, logoCircleSx, logoTextSx, logoSubSx,
    navLinkSx, giveBtnSx, mobileMenuBtnSx, drawerSx, drawerHeaderSx,
    drawerLinkSx, drawerLinkTextSx, drawerLinkIconSx,
} from './styles';

const NAV_LINKS = [
    { label: 'Home', path: '/', icon: HomeIcon, color: colors.secondary.main },
    { label: 'Blog', path: '/blog', icon: ArticleIcon, color: colors.accent.teal },
    { label: 'Resources', path: '/resources', icon: LibraryBooksIcon, color: colors.accent.purple },
    { label: 'Contact', path: '/contact', icon: ContactMailIcon, color: colors.accent.green },
    { label: 'About', path: '/about', icon: InfoIcon, color: colors.accent.red },
    { label: 'More', path: '/more', icon: MoreHorizIcon, color: 'rgba(255,255,255,0.5)' },
];

const Logo = () => (
    <Box component={Link} to="/" sx={logoWrapSx}>
        <Box component="img" src="/jesus1.png" alt="JPO Logo" sx={{ width: 60, height: 60, objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(212,160,23,0.5))', animation: 'nav_logoPulse 3s ease-in-out infinite' }} />
        <Box>
            <Typography sx={logoTextSx}>Jesus Partners</Typography>
            <Typography sx={logoSubSx}>Outreach</Typography>
        </Box>
    </Box>
);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawer] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const isActive = (path) =>
        path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    return (
        <>
            <GlobalStyles styles={keyframes} />

            <Box component="header" sx={navbarSx(scrolled)}>
                <Container maxWidth="xl">
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1.4 }}>

                        <Logo />

                        <Stack direction="row" alignItems="center" gap={3.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {NAV_LINKS.map((l) => (
                                <Box key={l.label} component={Link} to={l.path} sx={navLinkSx(isActive(l.path))}>
                                    {l.label}
                                </Box>
                            ))}
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1.5}>
                            <Box component={Link} to="/give" sx={{ ...giveBtnSx, display: { xs: 'none', sm: 'inline-flex' } }}>
                                <FavoriteIcon sx={{ fontSize: 15 }} />
                                Give
                            </Box>

                            <IconButton onClick={() => setDrawer(true)} sx={mobileMenuBtnSx}>
                                <MenuIcon sx={{ fontSize: 22 }} />
                            </IconButton>
                        </Stack>

                    </Stack>
                </Container>
            </Box>

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawer(false)} PaperProps={{ sx: drawerSx }}>

                <Box sx={drawerHeaderSx}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Logo />
                        <IconButton onClick={() => setDrawer(false)} sx={{ color: 'rgba(255,255,255,0.6)', p: 0.7 }}>
                            <CloseIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Stack>
                </Box>

                <Box sx={{ px: 2, pt: 2, flex: 1 }}>
                    {NAV_LINKS.map((l) => {
                        const Icon = l.icon;
                        const active = isActive(l.path);
                        return (
                            <Box key={l.label} component={Link} to={l.path}
                                onClick={() => setDrawer(false)} sx={drawerLinkSx(active)}>
                                <Box sx={drawerLinkIconSx(active, l.color)}>
                                    <Icon sx={{ fontSize: 17, color: active ? l.color : 'rgba(255,255,255,0.5)' }} />
                                </Box>
                                <Typography sx={{ ...drawerLinkTextSx, color: active ? 'white' : 'rgba(255,255,255,0.75)', fontWeight: active ? 700 : 500 }}>
                                    {l.label}
                                </Typography>
                                {active && <Box sx={{ ml: 'auto', width: 6, height: 6, borderRadius: '50%', bgcolor: l.color }} />}
                            </Box>
                        );
                    })}
                </Box>

                <Box sx={{ px: 2.5, py: 3 }}>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', mb: 2.5 }} />
                    <Box component={Link} to="/give" onClick={() => setDrawer(false)}
                        sx={{ ...giveBtnSx, width: '100%', justifyContent: 'center', animation: 'none' }}>
                        <FavoriteIcon sx={{ fontSize: 16 }} />
                        Make a Donation
                    </Box>
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', mt: 1.5 }}>
                        Reaching the world with the Word
                    </Typography>
                </Box>

            </Drawer>
        </>
    );
}