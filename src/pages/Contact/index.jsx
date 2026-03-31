import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes ct_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes ct_left': { from: { opacity: 0, transform: 'translateX(-44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes ct_right': { from: { opacity: 0, transform: 'translateX(44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes ct_glow': { '0%,100%': { opacity: .35, transform: 'scale(1)' }, '50%': { opacity: .7, transform: 'scale(1.1)' } },
    '@keyframes ct_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 10px ${colors.secondary.main}00` } },
    '@keyframes ct_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes ct_shimmer': { from: { left: '-80%' }, to: { left: '130%' } },
    '@keyframes ct_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes ct_checkPop': { '0%': { transform: 'scale(0) rotate(-30deg)', opacity: 0 }, '65%': { transform: 'scale(1.2) rotate(4deg)' }, '100%': { transform: 'scale(1) rotate(0)', opacity: 1 } },
};

const useReveal = (threshold = 0.07) => {
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

const INFO = [
    { icon: EmailIcon, color: colors.secondary.main, title: 'Email Us', lines: ['info@jesuspartners.org', 'support@jesuspartners.org'] },
    { icon: PhoneIcon, color: colors.accent.teal, title: 'Call Us', lines: ['+234 (0) 801 234 5678', 'Mon–Fri, 9am–6pm WAT'] },
    { icon: LocationOnIcon, color: colors.accent.green, title: 'Find Us', lines: ['Lagos, Nigeria', 'Serving 50+ Nations Worldwide'] },
    { icon: AccessTimeIcon, color: colors.accent.red, title: 'Hours', lines: ['Mon–Fri: 9am – 6pm', 'Sat: 10am – 2pm'] },
];

const SOCIAL = [
    { icon: FacebookIcon, color: '#1877F2', label: 'Facebook', href: '#' },
    { icon: InstagramIcon, color: '#E4405F', label: 'Instagram', href: '#' },
    { icon: TwitterIcon, color: '#1DA1F2', label: 'Twitter', href: '#' },
    { icon: YouTubeIcon, color: '#FF0000', label: 'YouTube', href: '#' },
];

const SUBJECTS = ['General Enquiry', 'Partnership', 'Prayer Request', 'Media / Press', 'Events', 'Other'];
const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactPage() {
    const [bodyRef, bodyVis] = useReveal();
    const [form, setForm] = useState(EMPTY);
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
    const valid = form.name && form.email && form.message;

    const handleSubmit = () => {
        if (!valid) return;
        setSending(true);
        setTimeout(() => { setSending(false); setSent(true); }, 1800);
    };

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 9, md: 13 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'ct_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                {/* deco ring */}
                <Box sx={{ position: 'absolute', top: '10%', right: '6%', width: { xs: 0, md: 160 }, height: { xs: 0, md: 160 }, display: { xs: 'none', md: 'block' }, pointerEvents: 'none' }}>
                    <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px dashed rgba(212,160,23,0.2)', animation: 'ct_spin 20s linear infinite' }}>
                        <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 10, height: 10, borderRadius: '50%', bgcolor: colors.secondary.main, boxShadow: `0 0 12px ${colors.secondary.main}` }} />
                    </Box>
                </Box>

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ animation: 'ct_rise .6s ease both' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'ct_pulse 2s ease infinite' }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>Get In Touch</Typography>
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-1px', mb: 1.5 }}>
                            We'd Love to{' '}
                            <Box component="span" sx={{ background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'ct_gradShift 4s ease infinite' }}>
                                Hear From You.
                            </Box>
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, maxWidth: 480, mx: 'auto' }}>
                            Whether you have a question, prayer request, or want to become a partner — our team is ready.
                        </Typography>
                    </Box>
                </Container>

                {/* wave */}
                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={colors.background.default} />
                    </svg>
                </Box>
            </Box>

            {/* ══ INFO CARDS ══ */}
            <Box sx={{ bgcolor: colors.background.default, pt: { xs: 6, md: 8 }, pb: { xs: 2, md: 3 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: 2.5 }}>
                        {INFO.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Box key={item.title} sx={{ bgcolor: 'white', borderRadius: '18px', p: 2.5, border: `1px solid ${colors.divider}`, textAlign: 'center', opacity: 0, animation: `ct_rise .6s ease ${i * .09}s both`, transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${item.color}25` } }}>
                                    <Box sx={{ width: 46, height: 46, borderRadius: '14px', bgcolor: `${item.color}14`, border: `1.5px solid ${item.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.8, animation: 'ct_pulse 3s ease infinite' }}>
                                        <Icon sx={{ fontSize: 22, color: item.color }} />
                                    </Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, color: colors.text.primary, mb: 1 }}>{item.title}</Typography>
                                    {item.lines.map(l => (
                                        <Typography key={l} sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.78rem', color: colors.text.secondary, lineHeight: 1.7 }}>{l}</Typography>
                                    ))}
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ══ FORM + SOCIAL ══ */}
            <Box ref={bodyRef} sx={{ bgcolor: colors.background.default, py: { xs: 6, md: 9 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.6fr' }, gap: { xs: 4, md: 6 }, alignItems: 'start' }}>

                        {/* Left — social + reply info */}
                        <Box sx={{ opacity: bodyVis ? 1 : 0, animation: bodyVis ? 'ct_left .7s cubic-bezier(.34,1.2,.64,1) both' : 'none' }}>
                            {/* reply badge */}
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: `${colors.accent.green}14`, border: `1px solid ${colors.accent.green}30`, borderRadius: '10px', px: 2, py: 1, mb: 3 }}>
                                <AccessTimeIcon sx={{ fontSize: 15, color: colors.accent.green }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 600, color: colors.accent.green }}>
                                    Replies within 2 business hours
                                </Typography>
                            </Box>

                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.15, mb: 1 }}>
                                Let's Start a Conversation
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.85, mb: 3.5 }}>
                                Fill the form and we'll get back to you. You can also reach us directly on any of our social channels.
                            </Typography>

                            {/* Social buttons */}
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: colors.text.disabled, letterSpacing: 2.5, textTransform: 'uppercase', mb: 1.5 }}>Follow Us</Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                                {SOCIAL.map(s => {
                                    const Icon = s.icon;
                                    return (
                                        <Box key={s.label} component="a" href={s.href} sx={{ display: 'flex', alignItems: 'center', gap: 1.2, bgcolor: 'white', border: `1px solid ${colors.divider}`, borderRadius: '10px', px: 1.8, py: 1.1, textDecoration: 'none', transition: 'all .25s ease', '&:hover': { bgcolor: `${s.color}10`, borderColor: `${s.color}40`, transform: 'translateY(-3px)', boxShadow: `0 8px 20px ${s.color}22` } }}>
                                            <Icon sx={{ fontSize: 18, color: s.color }} />
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.78rem', fontWeight: 600, color: colors.text.primary }}>{s.label}</Typography>
                                        </Box>
                                    );
                                })}
                            </Box>

                            {/* scripture */}
                            <Box sx={{ mt: 3.5, bgcolor: colors.primary.dark, borderRadius: '14px', p: 2.5, border: '1px solid rgba(212,160,23,0.18)' }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, fontStyle: 'italic', mb: 1 }}>
                                    "Call to me and I will answer you and tell you great and unsearchable things you do not know."
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.7rem', fontWeight: 700, color: colors.secondary.main, letterSpacing: 1 }}>— Jeremiah 33:3</Typography>
                            </Box>
                        </Box>

                        {/* Right — form */}
                        <Box sx={{ bgcolor: 'white', borderRadius: '24px', border: `1px solid ${colors.divider}`, overflow: 'hidden', boxShadow: '0 20px 60px rgba(10,16,40,0.08)', opacity: bodyVis ? 1 : 0, animation: bodyVis ? 'ct_right .7s cubic-bezier(.34,1.2,.64,1) .12s both' : 'none' }}>
                            {/* rainbow top bar */}
                            <Box sx={{ height: 4, background: `linear-gradient(90deg,${colors.primary.dark},${colors.secondary.main},${colors.secondary.light},${colors.accent.teal})` }} />
                            <Box sx={{ p: { xs: 3, md: 4.5 } }}>
                                {sent ? (
                                    <Box sx={{ textAlign: 'center', py: 7 }}>
                                        <Box sx={{ animation: 'ct_checkPop .5s cubic-bezier(.34,1.2,.64,1) both' }}>
                                            <CheckCircleIcon sx={{ fontSize: 72, color: colors.accent.green }} />
                                        </Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 900, color: colors.text.primary, mt: 2.5, mb: 1.5 }}>Message Sent! 🎉</Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.85, mb: 4, maxWidth: 320, mx: 'auto' }}>
                                            Thank you for reaching out. A member of our team will get back to you within 2 business hours.
                                        </Typography>
                                        <Box onClick={() => { setSent(false); setForm(EMPTY); }} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.primary.main, color: 'white', px: 3.5, py: 1.4, borderRadius: '10px', cursor: 'pointer', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, transition: 'all .25s ease', '&:hover': { bgcolor: colors.primary.light, transform: 'translateY(-2px)' } }}>
                                            Send Another Message
                                        </Box>
                                    </Box>
                                ) : (
                                    <>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '1.4rem', md: '1.7rem' }, fontWeight: 900, color: colors.text.primary, mb: .5 }}>Send Us a Message</Typography>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.8, mb: 3.5 }}>Fill in the form and we will get back to you shortly.</Typography>

                                        <Stack spacing={2.5}>
                                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                                                {[['Full Name *', 'text', 'John Doe', 'name'], ['Email Address *', 'email', 'john@example.com', 'email']].map(([lbl, type, ph, key]) => (
                                                    <Box key={key}>
                                                        <Typography sx={{ display: 'block', fontFamily: typography.fontFamily.body, fontSize: '0.78rem', fontWeight: 700, color: colors.text.primary, mb: '7px' }}>{lbl}</Typography>
                                                        <Box component="input" type={type} placeholder={ph} value={form[key]} onChange={set(key)}
                                                            sx={{ width: '100%', boxSizing: 'border-box', px: 2.2, py: 1.6, bgcolor: colors.background.default, border: `1.5px solid ${colors.divider}`, borderRadius: '12px', fontFamily: typography.fontFamily.body, fontSize: '0.9rem', color: colors.text.primary, outline: 'none', transition: 'border-color .25s, box-shadow .25s', '&:focus': { borderColor: colors.secondary.main, boxShadow: `0 0 0 4px ${colors.secondary.main}14` }, '&::placeholder': { color: colors.text.disabled } }} />
                                                    </Box>
                                                ))}
                                            </Box>

                                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                                                <Box>
                                                    <Typography sx={{ display: 'block', fontFamily: typography.fontFamily.body, fontSize: '0.78rem', fontWeight: 700, color: colors.text.primary, mb: '7px' }}>Phone (optional)</Typography>
                                                    <Box component="input" placeholder="+234 801 234 5678" value={form.phone} onChange={set('phone')}
                                                        sx={{ width: '100%', boxSizing: 'border-box', px: 2.2, py: 1.6, bgcolor: colors.background.default, border: `1.5px solid ${colors.divider}`, borderRadius: '12px', fontFamily: typography.fontFamily.body, fontSize: '0.9rem', color: colors.text.primary, outline: 'none', transition: 'border-color .25s, box-shadow .25s', '&:focus': { borderColor: colors.secondary.main, boxShadow: `0 0 0 4px ${colors.secondary.main}14` }, '&::placeholder': { color: colors.text.disabled } }} />
                                                </Box>
                                                <Box>
                                                    <Typography sx={{ display: 'block', fontFamily: typography.fontFamily.body, fontSize: '0.78rem', fontWeight: 700, color: colors.text.primary, mb: '7px' }}>Subject</Typography>
                                                    <Box component="select" value={form.subject} onChange={set('subject')}
                                                        sx={{ width: '100%', boxSizing: 'border-box', px: 2.2, py: 1.6, bgcolor: colors.background.default, border: `1.5px solid ${colors.divider}`, borderRadius: '12px', fontFamily: typography.fontFamily.body, fontSize: '0.9rem', color: form.subject ? colors.text.primary : colors.text.disabled, outline: 'none', cursor: 'pointer', appearance: 'auto', transition: 'border-color .25s', '&:focus': { borderColor: colors.secondary.main } }}>
                                                        <option value="">Select a subject…</option>
                                                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box>
                                                <Typography sx={{ display: 'block', fontFamily: typography.fontFamily.body, fontSize: '0.78rem', fontWeight: 700, color: colors.text.primary, mb: '7px' }}>Message *</Typography>
                                                <Box component="textarea" placeholder="Tell us how we can help…" value={form.message} onChange={set('message')}
                                                    sx={{ width: '100%', boxSizing: 'border-box', px: 2.2, py: 1.6, minHeight: 130, bgcolor: colors.background.default, border: `1.5px solid ${colors.divider}`, borderRadius: '12px', fontFamily: typography.fontFamily.body, fontSize: '0.9rem', color: colors.text.primary, outline: 'none', resize: 'none', transition: 'border-color .25s, box-shadow .25s', '&:focus': { borderColor: colors.secondary.main, boxShadow: `0 0 0 4px ${colors.secondary.main}14` }, '&::placeholder': { color: colors.text.disabled } }} />
                                            </Box>

                                            <Box component="button" onClick={handleSubmit} disabled={sending || !valid}
                                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, width: '100%', py: 1.8, border: 'none', cursor: valid ? 'pointer' : 'not-allowed', borderRadius: '12px', background: `linear-gradient(135deg,${colors.primary.dark},${colors.primary.light},${colors.secondary.main})`, backgroundSize: '200% 200%', color: 'white', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.base, fontWeight: 800, animation: 'ct_gradShift 4s ease infinite', opacity: !valid ? .6 : 1, position: 'relative', overflow: 'hidden', transition: 'transform .3s cubic-bezier(.34,1.2,.64,1), box-shadow .3s', '&:hover': valid ? { transform: 'translateY(-3px)', boxShadow: `0 14px 36px ${colors.secondary.main}44` } : {}, '&::before': { content: '""', position: 'absolute', top: 0, bottom: 0, width: '50%', left: '-80%', pointerEvents: 'none', background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.2) 50%,transparent 70%)' }, '&:hover::before': { animation: 'ct_shimmer .55s ease forwards' } }}>
                                                {sending ? 'Sending…' : <><SendIcon sx={{ fontSize: 17 }} /> Send Message</>}
                                            </Box>

                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.7rem', color: colors.text.disabled, textAlign: 'center', lineHeight: 1.7 }}>
                                                We respect your privacy. Your information is never shared.
                                            </Typography>
                                        </Stack>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}