import { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { colors, typography } from '../../../theme';

const keyframes = {
    '@keyframes lg_rise': { from: { opacity: 0, transform: 'translateY(40px) scale(.96)' }, to: { opacity: 1, transform: 'none' } },
};

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/admin');
    };

    return (
        <>
            <GlobalStyles styles={keyframes} />

            <Box sx={{
                minHeight: '100vh',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            }}>

                {/* LEFT SIDE — Your world map image (kept as is) */}
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    background: `linear-gradient(rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.92)), url('/left-bg.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                    <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', px: 7 }}>

                        {/* Logo */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                            <Box component="img" src="/jesus1.png" alt="JPO" sx={{ width: 110, height: 110, objectFit: 'contain' }} />
                        </Box>

                        {/* Title */}
                        <Typography sx={{
                            fontFamily: typography.fontFamily.accent,
                            fontSize: '3.6rem',
                            fontWeight: typography.fontWeight.black,
                            color: '#fff',
                            lineHeight: 1.05,
                            letterSpacing: '-1.5px',
                            mb: 0.8,
                            textShadow: '0 4px 30px rgba(0,0,0,0.8)'
                        }}>
                            Jesus Partners
                        </Typography>

                        {/* OUTREACH with lines */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 3 }}>
                            <Box sx={{ height: '1px', width: 45, background: `linear-gradient(90deg, transparent, ${colors.secondary.main})` }} />
                            <Typography sx={{
                                fontFamily: typography.fontFamily.body,
                                fontSize: typography.fontSize.sm,
                                color: colors.secondary.main,
                                fontWeight: typography.fontWeight.bold,
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                            }}>
                                Outreach
                            </Typography>
                            <Box sx={{ height: '1px', width: 45, background: `linear-gradient(90deg, ${colors.secondary.main}, transparent)` }} />
                        </Box>

                        {/* Tagline */}
                        <Typography sx={{
                            fontFamily: typography.fontFamily.body,
                            fontSize: typography.fontSize.base,
                            color: 'rgba(255,255,255,0.88)',
                            lineHeight: 1.9,
                            maxWidth: 390,
                            mx: 'auto',
                            textShadow: '0 3px 20px rgba(0,0,0,0.7)'
                        }}>
                            Sign in to manage content, partners, devotions and everything that powers the ministry.
                        </Typography>

                        {/* Bible Quote */}
                        <Box sx={{ 
                            mt: 6, 
                            px: 4, 
                            py: 3.5, 
                            borderRadius: '16px', 
                            background: 'rgba(255,255,255,0.07)', 
                            border: '1px solid rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <Typography sx={{ 
                                fontFamily: typography.fontFamily.accent, 
                                fontSize: typography.fontSize.base, 
                                color: 'rgba(255,255,255,0.95)', 
                                lineHeight: 1.85, 
                                fontStyle: 'italic',
                                textShadow: '0 2px 12px rgba(0,0,0,0.6)'
                            }}>
                                "Go ye into all the world and preach the gospel to every creature."
                            </Typography>
                            <Typography sx={{ 
                                fontFamily: typography.fontFamily.heading, 
                                fontSize: typography.fontSize.xs, 
                                color: colors.secondary.main, 
                                fontWeight: typography.fontWeight.bold, 
                                mt: 1.5 
                            }}>
                                — Mark 16:15
                            </Typography>
                        </Box>

                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 3, md: 6 },
                    position: 'relative',
                    overflow: 'hidden',
                    background: colors.primary.dark,
                }}>

                    <Box sx={{ width: '100%', maxWidth: 420, animation: 'lg_rise .7s ease both' }}>

                        {/* Mobile Logo */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 4 }}>
                            <Box component="img" src="/jesus1.png" alt="JPO" sx={{ width: 44, height: 44, objectFit: 'contain' }} />
                            <Box>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.black, color: 'white', lineHeight: 1 }}>Jesus Partners</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.6rem', color: colors.secondary.main, letterSpacing: 2, textTransform: 'uppercase' }}>Outreach</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: .8, bgcolor: `${colors.secondary.main}15`, border: `1px solid ${colors.secondary.main}35`, borderRadius: '100px', px: 2.5, py: .7, mb: 2.5 }}>
                                <FavoriteIcon sx={{ fontSize: 12, color: colors.secondary.main }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: typography.fontWeight.bold, color: colors.secondary.main, letterSpacing: 2, textTransform: 'uppercase' }}>
                                    ADMIN ACCESS
                                </Typography>
                            </Box>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.4rem' }, fontWeight: typography.fontWeight.black, color: 'white', lineHeight: 1.1, mb: 1 }}>
                                Welcome Back
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                                Sign in to your account to continue managing the ministry.
                            </Typography>
                        </Box>

                        <Stack gap={2.8}>
                            <Box>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.6)', mb: 1, letterSpacing: '.8px', textTransform: 'uppercase' }}>
                                    EMAIL ADDRESS
                                </Typography>
                                <Box
                                    component="input"
                                    type="email"
                                    placeholder="admin@jesuspartners.org"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                    sx={{
                                        width: '100%',
                                        pl: 4,
                                        pr: 4,
                                        py: 2.2,
                                        bgcolor: 'rgba(255,255,255,0.95)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '1.02rem',
                                        color: '#0f172a',
                                        outline: 'none',
                                        '&::placeholder': { color: '#64748b' }
                                    }}
                                />
                            </Box>

                            <Box>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semiBold, color: 'rgba(255,255,255,0.6)', letterSpacing: '.8px', textTransform: 'uppercase' }}>
                                        PASSWORD
                                    </Typography>
                                    <Typography component={Link} to="/forgot-password" sx={{ fontSize: '0.75rem', color: colors.secondary.main, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                        Forgot password?
                                    </Typography>
                                </Stack>
                                <Box sx={{ position: 'relative' }}>
                                    <Box
                                        component="input"
                                        type={showPw ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                        sx={{
                                            width: '100%',
                                            pl: 4,
                                            pr: 11,
                                            py: 2.2,
                                            bgcolor: 'rgba(255,255,255,0.95)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontSize: '1.02rem',
                                            color: '#0f172a',
                                            outline: 'none',
                                        }}
                                    />
                                    <Box 
                                        onClick={() => setShowPw(!showPw)}
                                        sx={{ 
                                            position: 'absolute', 
                                            right: 16, 
                                            top: '50%', 
                                            transform: 'translateY(-50%)', 
                                            cursor: 'pointer',
                                            color: '#64748b'
                                        }}
                                    >
                                        {showPw ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                component="button"
                                onClick={handleSubmit}
                                sx={{
                                    mt: 2,
                                    py: 2.3,
                                    border: 'none',
                                    borderRadius: '12px',
                                    background: colors.secondary.main,
                                    color: '#0f172a',
                                    fontWeight: 700,
                                    fontSize: '1.08rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    '&:hover': {
                                        background: '#fbbf24',
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >
                                <LoginIcon sx={{ mr: 1, fontSize: 19 }} /> Sign In
                            </Box>
                        </Stack>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Box component={Link} to="/" sx={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', '&:hover': { color: '#fff' } }}>
                                ← Back to website
                            </Box>
                        </Box>

                    </Box>
                </Box>

            </Box>
        </>
    );
}