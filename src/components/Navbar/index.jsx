import { useState, useEffect, useRef } from 'react';
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
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PublicIcon from '@mui/icons-material/Public';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useLocation } from 'react-router-dom';
import { colors, typography } from '../../theme';
import {
    keyframes, navbarSx, logoWrapSx, logoTextSx, logoSubSx,
    navLinkSx, giveBtnSx, mobileMenuBtnSx, drawerSx, drawerHeaderSx,
    drawerLinkSx, drawerLinkTextSx, drawerLinkIconSx,
} from './styles';

const MORE_ITEMS = [
    { label: 'Login', path: '/login', icon: LoginIcon, color: colors.secondary.main, desc: 'Access your account' },
    { label: 'Our Nations', path: '/nations', icon: PublicIcon, color: colors.accent.purple, desc: 'Countries we\'ve reached' },
];

const NAV_LINKS = [
    { label: 'Home', path: '/', icon: HomeIcon, color: colors.secondary.main },
    { label: 'Blog', path: '/blog', icon: ArticleIcon, color: colors.accent.teal },
    { label: 'Resources', path: '/resources', icon: LibraryBooksIcon, color: colors.accent.purple },
    { label: 'Contact', path: '/contact', icon: ContactMailIcon, color: colors.accent.green },
    { label: 'About', path: '/about', icon: InfoIcon, color: colors.accent.red },
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

/* ── More dropdown ── */
const MoreDropdown = ({ isActive }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', fn);
        return () => document.removeEventListener('mousedown', fn);
    }, []);

    return (
        <Box ref={ref} sx={{ position: 'relative' }}>
            <Box onClick={() => setOpen(o => !o)}
                sx={{ ...navLinkSx(isActive || open), display: 'flex', alignItems: 'center', gap: .5, cursor: 'pointer', userSelect: 'none' }}>
                More
                <KeyboardArrowDownIcon sx={{ fontSize: 16, transition: 'transform .25s ease', transform: open ? 'rotate(180deg)' : 'none' }} />
            </Box>

            {/* Dropdown panel */}
            {open && (
                <Box sx={{
                    position: 'absolute', top: 'calc(100% + 16px)', right: 0,
                    width: 240, borderRadius: '16px', overflow: 'hidden',
                    bgcolor: '#0D1117', border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                    animation: 'nav_dropIn .25s cubic-bezier(.34,1.2,.64,1) both',
                    zIndex: 100,
                }}>
                    {/* arrow */}
                    <Box sx={{ position: 'absolute', top: -7, right: 24, width: 14, height: 14, bgcolor: '#0D1117', border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none', borderRight: 'none', transform: 'rotate(45deg)' }} />

                    <Box sx={{ p: 1.5 }}>
                        {MORE_ITEMS.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Box key={item.label} component={Link} to={item.path} onClick={() => setOpen(false)}
                                    sx={{
                                        display: 'flex', alignItems: 'center', gap: 1.5, px: 1.8, py: 1.4, borderRadius: '10px', textDecoration: 'none', transition: 'all .2s ease',
                                        '&:hover': { bgcolor: `${item.color}15`, '& .dd-icon': { bgcolor: item.color }, '& .dd-label': { color: 'white' } }
                                    }}>
                                    <Box className="dd-icon" sx={{ width: 34, height: 34, borderRadius: '9px', bgcolor: `${item.color}18`, border: `1px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s ease' }}>
                                        <Icon sx={{ fontSize: 17, color: item.color }} />
                                    </Box>
                                    <Box>
                                        <Typography className="dd-label" sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.2, transition: 'color .2s' }}>
                                            {item.label}
                                        </Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', mt: .2 }}>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>

                    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.07)', px: 2.5, py: 1.5 }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
                            Jesus Partners Outreach © {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

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
            <GlobalStyles styles={{ ...keyframes, '@keyframes nav_dropIn': { from: { opacity: 0, transform: 'translateY(-10px) scale(.97)' }, to: { opacity: 1, transform: 'none' } } }} />

            <Box component="header" sx={navbarSx(scrolled)}>
                <Container maxWidth="xl">
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1.4 }}>
                        <Logo />

                        {/* Desktop nav */}
                        <Stack direction="row" alignItems="center" gap={3.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {NAV_LINKS.map(l => (
                                <Box key={l.label} component={Link} to={l.path} sx={navLinkSx(isActive(l.path))}>
                                    {l.label}
                                </Box>
                            ))}
                            <MoreDropdown isActive={isActive('/login') || isActive('/admin') || isActive('/nations')} />
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

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawer(false)} PaperProps={{ sx: drawerSx }}>
                <Box sx={drawerHeaderSx}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Logo />
                        <IconButton onClick={() => setDrawer(false)} sx={{ color: 'rgba(255,255,255,0.6)', p: .7 }}>
                            <CloseIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Stack>
                </Box>

                <Box sx={{ px: 2, pt: 2, flex: 1 }}>
                    {NAV_LINKS.map(l => {
                        const Icon = l.icon;
                        const active = isActive(l.path);
                        return (
                            <Box key={l.label} component={Link} to={l.path} onClick={() => setDrawer(false)} sx={drawerLinkSx(active)}>
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

                    {/* More items in drawer */}
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: 2, textTransform: 'uppercase', px: 2, mt: 2.5, mb: 1 }}>
                        More
                    </Typography>
                    {MORE_ITEMS.map(l => {
                        const Icon = l.icon;
                        const active = isActive(l.path);
                        return (
                            <Box key={l.label} component={Link} to={l.path} onClick={() => setDrawer(false)} sx={drawerLinkSx(active)}>
                                <Box sx={drawerLinkIconSx(active, l.color)}>
                                    <Icon sx={{ fontSize: 17, color: active ? l.color : 'rgba(255,255,255,0.5)' }} />
                                </Box>
                                <Typography sx={{ ...drawerLinkTextSx, color: active ? 'white' : 'rgba(255,255,255,0.75)', fontWeight: active ? 700 : 500 }}>
                                    {l.label}
                                </Typography>
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