import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes dv_rise': { from: { opacity: 0, transform: 'translateY(40px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes dv_right': { from: { opacity: 0, transform: 'translateX(44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes dv_glow': { '0%,100%': { opacity: .35, transform: 'scale(1)' }, '50%': { opacity: .7, transform: 'scale(1.08)' } },
    '@keyframes dv_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 12px ${colors.secondary.main}00` } },
    '@keyframes dv_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes dv_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes dv_spinR': { to: { transform: 'rotate(-360deg)' } },
    '@keyframes dv_float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
    '@keyframes dv_shimmer': { from: { left: '-80%' }, to: { left: '130%' } },
    '@keyframes dv_checkPop': { '0%': { transform: 'scale(0) rotate(-30deg)', opacity: 0 }, '65%': { transform: 'scale(1.2)' }, '100%': { transform: 'scale(1)', opacity: 1 } },
};

// ── Today's devotional — swap this out with admin data later ─────────
const DEVOTIONAL = {
    title: 'GLORY RESTORATION',
    subtitle: 'Believe and Be Saved',
    date: 'June 24, 2026',
    author: 'Rev Mne Adue',
    scripture: '"So they said, "Believe on the Lord Jesus Christ, and you will be saved, you and your household."" — Acts 16:31',
    scriptureRef: 'Acts 16:31',
    body: [
        'This was the answer of Paul to the jail keeper. Paul and Silas were kept in prison — "But at midnight Paul and Silas were praying and singing hymns to God, and the prisoners were listening to them." (Acts 16:25)',
        'Suddenly, the Lord visited with thunder and the prison doors opened, the chains fell off. Then the keeper of the prison woke up and in fear for himself wanted to commit suicide, but for the quick intervention of Paul.',
        'It was at this point he sought to know what to do. Paul\'s answer is God\'s only and always demand from man for salvation. Nothing more. Just believe and you will be saved. To believe is to hear. In the hearing of the truth is faith.',
        'The truth simply stated in the gospel — which is the proclamation of the testimony of Jesus — is the most powerful news on earth. This simple testimony of His suffering, death and resurrection is what holds the power of God to save from the guilt, power and judgement of sin.',
        'In it is the power to heal and deliver from whatever sickness and oppression of demons. The same Jesus is Lord over forces of darkness, powers and principalities.',
        'Believe on Jesus. Lift Jesus to the dying, sick, oppressed, and suppressed needy world today.',
    ],
    prayer: 'Oh Lord, help me to believe in Your work on the cross for me, but give me more grace, power and strength to witness You to those around me and wherever You will have me.',
};

const BENEFITS = [
    { icon: AutoStoriesIcon, color: colors.secondary.main, title: 'Daily Scripture', desc: 'A fresh word from the Bible every morning to start your day right.' },
    { icon: MenuBookIcon, color: colors.accent.teal, title: 'Deep Reflections', desc: 'Thoughtful devotional writing rooted in the Gospel of Jesus Christ.' },
    { icon: FavoriteIcon, color: colors.accent.red, title: 'Daily Prayer', desc: 'A closing prayer to guide your heart and keep you connected with God.' },
    { icon: NotificationsActiveIcon, color: colors.accent.green, title: 'Daily Delivery', desc: 'Delivered straight to your inbox every morning — never miss a word.' },
];

const useReveal = (threshold = 0.08) => {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, vis];
};

export default function DevotionalPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [devRef, devVis] = useReveal();
    const [benefitRef, benVis] = useReveal();
    const [subRef, subVis] = useReveal();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subscribed, setSub] = useState(false);
    const [loading, setLoad] = useState(false);

    const valid = name.trim() && email.includes('@');

    const handleSubscribe = () => {
        if (!valid) return;
        setLoad(true);
        setTimeout(() => { setLoad(false); setSub(true); }, 1600);
    };

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'dv_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 6 }, alignItems: 'center' }}>

                        {/* Left — text */}
                        <Box ref={heroRef}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'dv_rise .6s ease both' : 'none' }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'dv_pulse 2s ease infinite' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                    Daily Devotional
                                </Typography>
                            </Box>

                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-1px', mb: 1, opacity: heroVis ? 1 : 0, animation: heroVis ? 'dv_rise .7s ease .1s both' : 'none' }}>
                                Start Every Day
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1px', mb: 3, background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light},${colors.secondary.main})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: heroVis ? 'dv_gradShift 4s ease infinite, dv_rise .7s ease .18s both' : 'none', opacity: heroVis ? 1 : 0 }}>
                                In the Word.
                            </Typography>

                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 460, mb: 4, opacity: heroVis ? 1 : 0, animation: heroVis ? 'dv_rise .7s ease .26s both' : 'none' }}>
                                Subscribe to receive a fresh daily devotional from Jesus Partners Outreach — rooted in Scripture, filled with faith and delivered straight to your inbox every morning.
                            </Typography>

                            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ opacity: heroVis ? 1 : 0, animation: heroVis ? 'dv_rise .7s ease .34s both' : 'none' }}>
                                <Box component="a" href="#subscribe" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)', boxShadow: `0 16px 40px ${colors.secondary.main}55` } }}>
                                    <NotificationsActiveIcon sx={{ fontSize: 16 }} /> Subscribe Free
                                </Box>
                                <Box component="a" href="#today" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.18)', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)', transform: 'translateY(-2px)' } }}>
                                    <MenuBookIcon sx={{ fontSize: 16 }} /> Today's Devotion
                                </Box>
                            </Stack>
                        </Box>

                        {/* Right — icon grid */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: heroVis ? 1 : 0, animation: heroVis ? 'dv_right .9s cubic-bezier(.34,1.2,.64,1) .3s both' : 'none' }}>
                            <Box sx={{ position: 'relative', width: { xs: 260, md: 340 }, height: { xs: 260, md: 340 } }}>
                                <Box sx={{ position: 'absolute', inset: '-18%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.18)`, animation: 'dv_spin 22s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 10, height: 10, borderRadius: '50%', bgcolor: colors.secondary.main, boxShadow: `0 0 14px ${colors.secondary.main}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: '-6%', borderRadius: '50%', border: `1px dashed rgba(14,165,233,0.14)`, animation: 'dv_spinR 15s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', bottom: '-4px', left: '46%', width: 8, height: 8, borderRadius: '50%', bgcolor: colors.accent.teal, boxShadow: `0 0 10px ${colors.accent.teal}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}18 0%,transparent 70%)`, animation: 'dv_glow 4s ease-in-out infinite', pointerEvents: 'none' }} />
                                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, animation: 'dv_float 5s ease-in-out infinite' }}>
                                        {[
                                            { Icon: AutoStoriesIcon, color: colors.secondary.main },
                                            { Icon: MenuBookIcon, color: colors.accent.teal },
                                            { Icon: FavoriteIcon, color: colors.accent.red },
                                            { Icon: NotificationsActiveIcon, color: colors.accent.green },
                                        ].map(({ Icon, color }, i) => (
                                            <Box key={i} sx={{ width: { xs: 52, md: 68 }, height: { xs: 52, md: 68 }, borderRadius: '18px', bgcolor: `${color}18`, border: `1.5px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                                                <Icon sx={{ fontSize: { xs: 24, md: 30 }, color }} />
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                </Container>

                {/* wave */}
                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={colors.background.default} />
                    </svg>
                </Box>
            </Box>

            {/* ══ TODAY'S DEVOTIONAL ══ */}
            <Box id="today" ref={devRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="md">

                    <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 }, opacity: devVis ? 1 : 0, animation: devVis ? 'dv_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <CalendarTodayIcon sx={{ fontSize: 15, color: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2, textTransform: 'uppercase' }}>
                                {DEVOTIONAL.date}
                            </Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.15 }}>
                            Today's Devotional
                        </Typography>
                    </Box>

                    {/* Devotional card */}
                    <Box sx={{ bgcolor: 'white', borderRadius: '24px', border: `1px solid ${colors.divider}`, overflow: 'hidden', boxShadow: '0 20px 60px rgba(10,16,40,0.08)', opacity: devVis ? 1 : 0, animation: devVis ? 'dv_rise .7s ease .1s both' : 'none' }}>
                        <Box sx={{ height: 5, background: `linear-gradient(90deg,${colors.primary.dark},${colors.secondary.main},${colors.secondary.light},${colors.accent.teal})` }} />

                        <Box sx={{ p: { xs: 3, md: 5 } }}>
                            {/* Title */}
                            <Box sx={{ textAlign: 'center', mb: 3.5 }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.7rem', fontWeight: 700, color: colors.secondary.main, letterSpacing: 3, textTransform: 'uppercase', mb: 1 }}>
                                    {DEVOTIONAL.title}
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.2 }}>
                                    {DEVOTIONAL.subtitle}
                                </Typography>
                            </Box>

                            {/* Scripture highlight */}
                            <Box sx={{ bgcolor: colors.primary.dark, borderRadius: '16px', p: { xs: 2.5, md: 3.5 }, mb: 3.5, position: 'relative', overflow: 'hidden', border: `1px solid rgba(212,160,23,0.2)` }}>
                                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '18px 18px', pointerEvents: 'none' }} />
                                <FormatQuoteIcon sx={{ fontSize: 32, color: `${colors.secondary.main}50`, mb: 1, position: 'relative', zIndex: 1 }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 700, color: 'rgba(255,255,255,0.88)', lineHeight: 1.8, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                                    {DEVOTIONAL.scripture}
                                </Typography>
                            </Box>

                            {/* Body paragraphs */}
                            <Stack spacing={2.2} sx={{ mb: 3.5 }}>
                                {DEVOTIONAL.body.map((para, i) => (
                                    <Typography key={i} sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1rem' }, color: colors.text.secondary, lineHeight: 1.95 }}>
                                        {para}
                                    </Typography>
                                ))}
                            </Stack>

                            {/* Prayer */}
                            <Box sx={{ bgcolor: `${colors.secondary.main}0A`, borderRadius: '14px', p: { xs: 2.5, md: 3 }, border: `1px solid ${colors.secondary.main}25`, borderLeft: `4px solid ${colors.secondary.main}` }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.72rem', fontWeight: 800, color: colors.secondary.main, letterSpacing: 2, textTransform: 'uppercase', mb: 1.2 }}>
                                    Prayer
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.9rem', md: '0.97rem' }, color: colors.text.secondary, lineHeight: 1.9, fontStyle: 'italic' }}>
                                    {DEVOTIONAL.prayer}
                                </Typography>
                            </Box>

                            {/* Author */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 3, pt: 3, borderTop: `1px solid ${colors.divider}` }}>
                                <Box sx={{ width: 40, height: 40, borderRadius: '12px', bgcolor: `${colors.secondary.main}15`, border: `1.5px solid ${colors.secondary.main}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <PersonIcon sx={{ fontSize: 20, color: colors.secondary.main }} />
                                </Box>
                                <Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, color: colors.text.primary }}>
                                        {DEVOTIONAL.author}
                                    </Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.72rem', color: colors.text.disabled }}>
                                        Jesus Partners Outreach
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ══ BENEFITS ══ */}
            <Box ref={benefitRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, opacity: benVis ? 1 : 0, animation: benVis ? 'dv_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>Why Subscribe</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.4rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.15 }}>
                            What You Get Every Day
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 3 }}>
                        {BENEFITS.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <Box key={b.title} sx={{ bgcolor: colors.background.default, borderRadius: '20px', p: { xs: 2.5, md: 3 }, border: `1px solid ${colors.divider}`, textAlign: 'center', position: 'relative', overflow: 'hidden', opacity: benVis ? 1 : 0, animation: benVis ? `dv_rise .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s, box-shadow .3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${b.color}30` } }}>
                                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${b.color},${b.color}55)` }} />
                                    <Box sx={{ width: 52, height: 52, borderRadius: '16px', bgcolor: `${b.color}14`, border: `1.5px solid ${b.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, animation: 'dv_pulse 3s ease infinite' }}>
                                        <Icon sx={{ fontSize: 24, color: b.color }} />
                                    </Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, color: colors.text.primary, mb: 1 }}>{b.title}</Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.78rem', color: colors.text.secondary, lineHeight: 1.75 }}>{b.desc}</Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ══ SUBSCRIBE FORM ══ */}
            <Box id="subscribe" ref={subRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 12 } }}>
                <Container maxWidth="sm">
                    <Box sx={{ bgcolor: colors.primary.dark, borderRadius: '28px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.3)', border: '1px solid rgba(212,160,23,0.18)', opacity: subVis ? 1 : 0, animation: subVis ? 'dv_rise .7s ease both' : 'none' }}>
                        <Box sx={{ height: 5, background: `linear-gradient(90deg,${colors.primary.dark},${colors.secondary.main},${colors.secondary.light},${colors.accent.teal})` }} />
                        <Box sx={{ p: { xs: 3.5, md: 5 }, position: 'relative', overflow: 'hidden' }}>
                            <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.04) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none' }} />

                            {subscribed ? (
                                <Box sx={{ textAlign: 'center', py: 4, position: 'relative', zIndex: 1 }}>
                                    <Box sx={{ animation: 'dv_checkPop .5s cubic-bezier(.34,1.2,.64,1) both' }}>
                                        <CheckCircleIcon sx={{ fontSize: 72, color: '#27AE60' }} />
                                    </Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1.5rem', fontWeight: 900, color: 'white', mt: 2.5, mb: 1 }}>
                                        You're Subscribed! 🎉
                                    </Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, mb: 3, maxWidth: 320, mx: 'auto' }}>
                                        Welcome to the family {name}! Your first devotional will arrive in your inbox tomorrow morning. God bless you!
                                    </Typography>
                                    <Box onClick={() => { setSub(false); setEmail(''); setName(''); }} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.4, borderRadius: '10px', cursor: 'pointer', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, transition: 'all .25s', '&:hover': { transform: 'translateY(-2px)' } }}>
                                        Subscribe Another
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ position: 'relative', zIndex: 1 }}>
                                    <Box sx={{ textAlign: 'center', mb: 3.5 }}>
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)', borderRadius: '100px', px: 2.5, py: .8, mb: 2 }}>
                                            <NotificationsActiveIcon sx={{ fontSize: 15, color: colors.secondary.light }} />
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.7rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2, textTransform: 'uppercase' }}>
                                                Free Daily Subscription
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.6rem', md: '1.9rem' }, fontWeight: 900, color: 'white', lineHeight: 1.2, mb: 1 }}>
                                            Subscribe to Daily Devotionals
                                        </Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
                                            Get a fresh word from God delivered to your inbox every morning. Free, always.
                                        </Typography>
                                    </Box>

                                    <Stack spacing={2}>
                                        {/* Name */}
                                        <Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', mb: '6px' }}>Full Name *</Typography>
                                            <Box component="input" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)}
                                                sx={{ width: '100%', boxSizing: 'border-box', px: 2.2, py: 1.6, bgcolor: 'rgba(255,255,255,0.05)', border: `1.5px solid rgba(255,255,255,0.1)`, borderRadius: '12px', fontFamily: typography.fontFamily.body, fontSize: '0.9rem', color: 'white', outline: 'none', transition: 'border-color .25s, box-shadow .25s', '&:focus': { borderColor: colors.secondary.main, boxShadow: `0 0 0 4px ${colors.secondary.main}14` }, '&::placeholder': { color: 'rgba(255,255,255,0.2)' } }}
                                            />
                                        </Box>

                                        {/* Email */}
                                        <Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', mb: '6px' }}>Email Address *</Typography>
                                            <Box component="input" type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                                                sx={{ width: '100%', boxSizing: 'border-box', px: 2.2, py: 1.6, bgcolor: 'rgba(255,255,255,0.05)', border: `1.5px solid rgba(255,255,255,0.1)`, borderRadius: '12px', fontFamily: typography.fontFamily.body, fontSize: '0.9rem', color: 'white', outline: 'none', transition: 'border-color .25s, box-shadow .25s', '&:focus': { borderColor: colors.secondary.main, boxShadow: `0 0 0 4px ${colors.secondary.main}14` }, '&::placeholder': { color: 'rgba(255,255,255,0.2)' } }}
                                            />
                                        </Box>

                                        {/* Submit */}
                                        <Box component="button" onClick={handleSubscribe} disabled={loading || !valid}
                                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, width: '100%', py: 1.8, border: 'none', cursor: valid ? 'pointer' : 'not-allowed', borderRadius: '12px', background: `linear-gradient(135deg,${colors.primary.dark},${colors.primary.light},${colors.secondary.main})`, backgroundSize: '200% 200%', color: 'white', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.base, fontWeight: 800, animation: 'dv_gradShift 4s ease infinite', opacity: !valid ? .5 : 1, transition: 'transform .3s cubic-bezier(.34,1.2,.64,1), box-shadow .3s', '&:hover': valid ? { transform: 'translateY(-3px)', boxShadow: `0 14px 36px ${colors.secondary.main}44` } : {} }}>
                                            {loading ? 'Subscribing…' : <><SendIcon sx={{ fontSize: 17 }} /> Subscribe Now — It's Free</>}
                                        </Box>
                                    </Stack>

                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', textAlign: 'center', mt: 2, lineHeight: 1.7 }}>
                                        No spam. Unsubscribe anytime. We respect your privacy.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}