import { useState, useEffect, useRef } from 'react';
import { Box, Stack, Typography, IconButton, Drawer, Divider } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CollectionsIcon from '@mui/icons-material/Collections';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useLocation } from 'react-router-dom';
import { colors, typography } from '../../theme';
import {
    keyframes, navShellSx, navCapsuleSx, logoWrapSx, logoImgSx, logoTextSx, logoSubSx,
    navLinkSx, giveBtnSx, mobileMenuBtnSx, dropdownPanelSx,
    drawerSx, drawerHeaderSx, drawerLinkSx, drawerLinkTextSx, drawerLinkIconSx, drawerGroupLabelSx,
} from './styles';

/* Main links: shown in the bar on large screens */
const MAIN_LINKS = [
    { label: 'Home', path: '/', icon: HomeIcon, color: colors.secondary.main },
    { label: 'What We Do', path: '/whatwedo', icon: VolunteerActivismIcon, color: colors.accent.teal },
    { label: 'About', path: '/about', icon: InfoIcon, color: colors.accent.red },
    { label: 'Gallery', path: '/gallery', icon: CollectionsIcon, color: colors.accent.purple },
    { label: 'Partner With Us', path: '/partners', icon: HandshakeIcon, color: colors.accent.teal },
    { label: 'Contact', path: '/contact', icon: ContactMailIcon, color: colors.accent.green },
];

/* More links: tucked into the "More" dropdown on desktop, own group in the mobile menu */
const MORE_ITEMS = [
    { label: 'Devotional', path: '/devotional', icon: MenuBookIcon, color: colors.accent.green, desc: 'Daily word to feed your spirit' },
    { label: 'Current Programs', path: '/program', icon: EventIcon, color: colors.secondary.main, desc: 'What is happening right now' },
    { label: 'Blog', path: '/blog', icon: ArticleIcon, color: colors.accent.purple, desc: 'Stories, testimonies & updates' },
    { label: 'Resources', path: '/resources', icon: LibraryBooksIcon, color: colors.accent.green, desc: 'Sermons, teachings & study materials' },
];

const Logo = ({ onClick }) => (
    <Box component={Link} to="/" onClick={onClick} sx={logoWrapSx} aria-label="Jesus Partners Outreach home">
        <Box component="img" src="/jesus1.png" alt="JPO Logo" sx={logoImgSx} />
        <Box>
            <Typography sx={logoTextSx}>Jesus Partners</Typography>
            <Typography sx={logoSubSx}>Outreach</Typography>
        </Box>
    </Box>
);

/* ── More dropdown (desktop) ── */
const MoreDropdown = ({ isActive, pathname }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => { setOpen(false); }, [pathname]);

    useEffect(() => {
        const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, []);

    return (
        <Box ref={ref} sx={{ position: 'relative' }} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <Box
                component="button"
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
                sx={{ ...navLinkSx(isActive || open), border: 'none', cursor: 'pointer', userSelect: 'none' }}
            >
                More
                <KeyboardArrowDownIcon sx={{ fontSize: 20, transition: 'transform .25s ease', transform: open ? 'rotate(180deg)' : 'none' }} />
            </Box>

            {open && (
                <Box sx={dropdownPanelSx}>
                    <Box sx={{ p: 1.5 }}>
                        {MORE_ITEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Box key={item.label} component={Link} to={item.path} onClick={() => setOpen(false)}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1.6, px: 1.6, py: 1.4, borderRadius: '14px', textDecoration: 'none', transition: 'all .2s ease', '&:hover': { bgcolor: `${item.color}18`, '& .dd-icon': { bgcolor: item.color, '& svg': { color: 'white' } } } }}>
                                    <Box className="dd-icon" sx={{ width: 42, height: 42, borderRadius: '12px', bgcolor: `${item.color}1F`, border: `1px solid ${item.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s ease' }}>
                                        <Icon sx={{ fontSize: 22, color: item.color, transition: 'color .2s' }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 800, color: 'white', lineHeight: 1.25 }}>
                                            {item.label}
                                        </Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', mt: .3, lineHeight: 1.35 }}>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

const DrawerLink = ({ item, active, index, onClose }) => {
    const Icon = item.icon;
    return (
        <Box component={Link} to={item.path} onClick={onClose} sx={drawerLinkSx(active, index)}>
            <Box sx={drawerLinkIconSx(active, item.color)}>
                <Icon sx={{ fontSize: 21, color: active ? item.color : 'rgba(255,255,255,0.75)' }} />
            </Box>
            <Typography sx={{ ...drawerLinkTextSx, color: active ? 'white' : 'rgba(255,255,255,0.9)', fontWeight: active ? 800 : 600 }}>
                {item.label}
            </Typography>
            {active && <Box sx={{ ml: 'auto', width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />}
        </Box>
    );
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawer] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        fn();
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    // close the drawer whenever the page changes
    useEffect(() => { setDrawer(false); }, [location.pathname]);

    const isActive = (path) =>
        path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    const moreActive = MORE_ITEMS.some(m => isActive(m.path));
    const closeDrawer = () => setDrawer(false);

    return (
        <>
            <GlobalStyles styles={keyframes} />

            <Box component="header" sx={navShellSx}>
                <Box component="nav" aria-label="Main navigation" sx={navCapsuleSx(scrolled)}>
                    <Logo />

                    {/* Desktop links (large screens only) */}
                    <Stack direction="row" alignItems="center" gap={0.3} sx={{ display: { xs: 'none', lg: 'flex' } }}>
                        {MAIN_LINKS.map(l => (
                            <Box key={l.label} component={Link} to={l.path} sx={navLinkSx(isActive(l.path))}>
                                {l.label}
                            </Box>
                        ))}
                        <MoreDropdown isActive={moreActive} pathname={location.pathname} />
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={{ xs: 1, md: 1.5 }} sx={{ flexShrink: 0 }}>
                        <Box component={Link} to="/give" sx={giveBtnSx} aria-label="Give">
                            <FavoriteIcon sx={{ fontSize: 18 }} />
                            <Box component="span" className="give-text">Give</Box>
                        </Box>
                        <IconButton onClick={() => setDrawer(true)} sx={mobileMenuBtnSx} aria-label="Open menu">
                            <MenuIcon sx={{ fontSize: 26 }} />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>

            {/* Mobile / tablet drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer} PaperProps={{ sx: drawerSx }}>
                <Box sx={drawerHeaderSx}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Logo onClick={closeDrawer} />
                        <IconButton onClick={closeDrawer} aria-label="Close menu" sx={{ color: 'white', width: 44, height: 44, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', bgcolor: 'rgba(255,255,255,0.06)' }}>
                            <CloseIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                    </Stack>
                </Box>

                <Box sx={{ px: 1.75, pt: 2, flex: 1, overflowY: 'auto', overscrollBehavior: 'contain' }}>
                    {MAIN_LINKS.map((l, i) => (
                        <DrawerLink key={l.label} item={l} active={isActive(l.path)} index={i} onClose={closeDrawer} />
                    ))}

                    <Typography sx={drawerGroupLabelSx}>More</Typography>
                    {MORE_ITEMS.map((l, i) => (
                        <DrawerLink key={l.label} item={l} active={isActive(l.path)} index={MAIN_LINKS.length + i} onClose={closeDrawer} />
                    ))}
                </Box>

                <Box sx={{ px: 2.5, pt: 2, pb: 'max(24px, env(safe-area-inset-bottom))', flexShrink: 0 }}>
                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2.5 }} />
                    <Box component={Link} to="/give" onClick={closeDrawer}
                        sx={{ ...giveBtnSx, width: '100%', height: 54, fontSize: '1.05rem', animation: 'none', '& .give-text': { display: 'inline' } }}>
                        <FavoriteIcon sx={{ fontSize: 20 }} />
                        <Box component="span" className="give-text">Make a Donation</Box>
                    </Box>
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', textAlign: 'center', mt: 1.5 }}>
                        Reaching the world with the Word
                    </Typography>
                </Box>
            </Drawer>
        </>
    );
}