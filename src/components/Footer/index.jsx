import { Box, Container, Typography, Stack, Divider } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { colors, typography } from '../../theme';
import {
    keyframes, footerSx, gridBgSx, orbSx, topBorderSx, logoAreaSx,
    logoCircleSx, logoNameSx, logoTaglineSx, colHeadSx, colHeadLineSx,
    footerLinkSx, socialBtnSx, dividerSx, bottomBarSx, copyrightSx, backToTopSx,
} from './styles';

const JPO_LINKS = [
    { label: 'About Us', path: '/about' },
    { label: 'Become A Partner Today!', path: '/give' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Affiliate Disclaimer', path: '/affiliate' },
    { label: 'Privacy Policy', path: '/privacy' },
];

const RESOURCE_LINKS = [
    { label: 'Blog', path: '/blog' },
    { label: 'Resources', path: '/resources' },
    { label: 'Programs', path: '/programs' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Sermons', path: '/sermons' },
];

const SOCIAL = [
    { label: 'Facebook', icon: FacebookIcon, color: '#1877F2', href: '#' },
    { label: 'Instagram', icon: InstagramIcon, color: '#E4405F', href: '#' },
    { label: 'Twitter', icon: TwitterIcon, color: '#1DA1F2', href: '#' },
    { label: 'Youtube', icon: YouTubeIcon, color: '#FF0000', href: '#' },
    { label: 'Email', icon: EmailIcon, color: colors.secondary.main, href: '#' },
    { label: 'Contact Us', icon: ContactMailIcon, color: colors.accent.teal, href: '/contact' },
];

const ColHead = ({ children }) => (
    <Box sx={colHeadSx}>
        {children}
        <Box sx={colHeadLineSx} />
    </Box>
);

const FooterLink = ({ label, path }) => (
    <Box component={Link} to={path} sx={footerLinkSx}>
        <ChevronRightIcon sx={{ fontSize: 14, color: colors.secondary.main, flexShrink: 0 }} />
        {label}
    </Box>
);

export default function Footer() {
    return (
        <>
            <GlobalStyles styles={keyframes} />
            <Box component="footer" sx={footerSx}>
                <Box sx={topBorderSx} />
                <Box sx={gridBgSx} />
                <Box sx={orbSx('-10%', '-5%', undefined, undefined, 400, `${colors.secondary.main}0D`)} />
                <Box sx={orbSx(undefined, undefined, '-8%', '-3%', 300, `${colors.accent.teal}0A`)} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.4fr 1fr 1fr 1fr' },
                        gap: { xs: 5, md: 6 },
                        pt: { xs: 6, md: 8 }, pb: { xs: 5, md: 7 },
                    }}>

                        <Box sx={logoAreaSx}>
                            <Stack direction="row" alignItems="center" gap={1.5}>
                                <Box component="img" src="/jesus1.png" alt="JPO Logo" sx={{ width: 90, height: 90, objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(212,160,23,0.5))', animation: 'ft_pulse 3s ease infinite' }} />
                                <Box>
                                    <Typography sx={logoNameSx}>Jesus Partners</Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.6rem', fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                        Outreach
                                    </Typography>
                                </Box>
                            </Stack>

                            <Typography sx={logoTaglineSx}>
                                "Reaching the generations of the world with the word."
                            </Typography>

                            <Box sx={{ width: 48, height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${colors.secondary.main}, ${colors.secondary.light})` }} />
                            <Box sx={{ bgcolor: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.18)', borderRadius: '12px', p: 2 }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, fontStyle: 'italic' }}>
                                    "Go into all the world and preach the gospel to all creation."
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.65rem', fontWeight: 700, color: colors.secondary.main, mt: 0.8, letterSpacing: 1 }}>
                                    — Mark 16:15
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <ColHead>Jesus Partners Outreach</ColHead>
                            <Stack gap={0.2}>
                                {JPO_LINKS.map(l => <FooterLink key={l.label} {...l} />)}
                            </Stack>
                        </Box>

                        <Box>
                            <ColHead>Resources</ColHead>
                            <Stack gap={0.2}>
                                {RESOURCE_LINKS.map(l => <FooterLink key={l.label} {...l} />)}
                            </Stack>
                        </Box>
                        <Box>
                            <ColHead>Connect</ColHead>
                            <Stack gap={1}>
                                {SOCIAL.map(s => {
                                    const Icon = s.icon;
                                    return (
                                        <Box key={s.label} component="a" href={s.href} sx={socialBtnSx(s.color)}>
                                            <Icon sx={{ fontSize: 18, color: s.color, flexShrink: 0 }} />
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.85rem', fontWeight: 600, color: 'inherit' }}>
                                                {s.label}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </Box>

                    </Box>
                </Container>

                <Divider sx={dividerSx} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={bottomBarSx}>
                        <Typography sx={copyrightSx}>
                            © {new Date().getFullYear()} Jesus Partners Outreach. All rights reserved.
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={2}>
                            <Typography sx={{ ...copyrightSx, '&:hover': { color: 'rgba(255,255,255,0.6)', cursor: 'pointer' } }}
                                component={Link} to="/privacy" style={{ textDecoration: 'none' }}>
                                Privacy
                            </Typography>
                            <Typography sx={copyrightSx}>·</Typography>
                            <Typography sx={{ ...copyrightSx, '&:hover': { color: 'rgba(255,255,255,0.6)', cursor: 'pointer' } }}
                                component={Link} to="/terms" style={{ textDecoration: 'none' }}>
                                Terms
                            </Typography>
                        </Stack>
                        <Box sx={backToTopSx} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <ArrowUpwardIcon sx={{ fontSize: 18, color: 'white' }} />
                        </Box>
                    </Box>
                </Container>

            </Box>
        </>
    );
}