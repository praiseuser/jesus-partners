import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CampaignIcon from '@mui/icons-material/Campaign';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes mn_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes mn_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes mn_glow': { '0%,100%': { opacity: .3, transform: 'scale(1)' }, '50%': { opacity: .65, transform: 'scale(1.1)' } },
    '@keyframes mn_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 14px ${colors.secondary.main}00` } },
    '@keyframes mn_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes mn_spinR': { to: { transform: 'rotate(-360deg)' } },
};

const useReveal = (threshold = 0.05) => {
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

export const MANDATE = [
    {
        id: '01', number: '01', icon: CampaignIcon, color: colors.secondary.main,
        title: 'Preach & Teach the Word',
        summary: 'Gospel and revival outreaches in partnership with churches — bringing salvation, healing, and deliverance to every community.',
        body: 'Preach and teach the word of Christ through gospel and revival outreaches in partnership with churches and communities — bringing salvation, healing, and deliverance wherever we go. This is the heartbeat of everything we do at Jesus Partners Outreach.',
        details: [
            { heading: 'City-wide Crusades', text: 'Large-scale outreaches drawing participants from across cities, done in collaboration with all willing churches to maximise reach and impact.' },
            { heading: 'Local Church Outreaches', text: 'Serving villages, towns, and local churches with our full technical, media, and ministerial teams at a lower cost.' },
            { heading: 'Street Outreaches', text: 'Prayerfully chosen locations within towns, markets, and institutions — going to where the people are.' },
            { heading: 'Personal Evangelism & Discipleship', text: 'Equipping believers to share the Gospel one-on-one and follow up new converts for lasting transformation.' },
        ],
        scripture: 'Mark 16:15', scriptureText: '"Go into all the world and preach the gospel to every creature."',
    },
    {
        id: '02', number: '02', icon: HandshakeIcon, color: colors.accent.teal,
        title: 'Support Churches & Ministers',
        summary: 'Raising and administering support for needy churches and ministers in challenged areas so the Gospel is never hindered by lack.',
        body: 'We stand with those who are called but under-resourced. For over 17 years our own ministry was sustained through faithful partnership, and now we pass that same support to those who labour in hard places.',
        details: [
            { heading: 'Monthly Support Packages', text: 'Regular food, essentials, and financial support for pastors and families serving in underserved areas.' },
            { heading: "School Fees for Ministers' Children", text: 'Covering tuition, books, uniforms, and exam fees so pastoral families can focus fully on ministry.' },
            { heading: 'Church Infrastructure', text: 'Investing in buildings, equipment, and materials that strengthen local churches.' },
            { heading: 'Bible & Ministry Materials', text: 'Providing Bibles, commentaries, and teaching resources to ministers who cannot afford them.' },
        ],
        scripture: '3 John 1:8', scriptureText: '"We ought therefore to show hospitality to such people so that we may work together for the truth."',
    },
    {
        id: '03', number: '03', icon: VolunteerActivismIcon, color: colors.accent.red,
        title: 'Care for Widows & Orphans',
        summary: 'Practical, sustained care for widows and orphans — restoring dignity, providing for needs, and empowering futures.',
        body: 'James 1:27 is not just a verse for us — it is a mandate we take personally. Over 400 widows were served at our 2026 feast alone, and hundreds of children have been educated through our boarding school support.',
        details: [
            { heading: 'Annual Widows Outreach Feast', text: 'A joyful gathering of fellowship, meals, counselling, gifts, and prayer — usually held in February each year.' },
            { heading: 'Orphans Boarding School Support', text: 'Full education, meals, clothing, medical care, and Christian nurturing for displaced and vulnerable children.' },
            { heading: 'Business Empowerment', text: 'Seed capital, sewing machines, water pumps, and grinding machines to help widows build sustainable livelihoods.' },
            { heading: 'Food & Provision Bundles', text: 'Regular provision of rice, beans, palm oil, yam, and other essentials for widow households.' },
        ],
        scripture: 'James 1:27', scriptureText: '"Religion that God our Father accepts as pure and faultless is this: to look after orphans and widows in their distress."',
    },
    {
        id: '04', number: '04', icon: MenuBookIcon, color: '#8B5CF6',
        title: 'Train Christian Ministers',
        summary: 'Equipping the next generation of evangelists and missionaries through Grace College of Evangelism & Missions.',
        body: 'We run an MA program in partnership with Puritan Reformed Theological Seminary, USA. The future of the Gospel in Africa depends on well-trained, Spirit-filled ministers who are grounded in the Word.',
        details: [
            { heading: 'MA Program in Evangelism & Missions', text: 'A rigorous graduate program run in partnership with Puritan Reformed Theological Seminary, USA.' },
            { heading: 'Student Scholarships', text: 'Helping qualified, called students access theological education regardless of financial background.' },
            { heading: 'Infrastructure Development', text: 'Building accommodation, classrooms, and library facilities for resident students at Grace College.' },
            { heading: 'Study Materials & Technology', text: 'Providing laptops, books, internet access, and curriculum resources to support high-quality training.' },
        ],
        scripture: '2 Timothy 2:2', scriptureText: '"And the things you have heard me say… entrust to reliable people who will also be qualified to teach others."',
    },
    {
        id: '05', number: '05', icon: LocalHospitalIcon, color: colors.accent.green,
        title: 'Facilitate Medical Care',
        summary: 'Bringing healthcare to IDP camps, underserved communities, and families who cannot afford treatment.',
        body: 'We believe healing the body is part of the Gospel commission. Jesus healed the sick as a sign of the Kingdom, and we follow that example through medical outreaches that treat the whole person.',
        details: [
            { heading: 'IDP Camp Medical Visits', text: 'Full-day medical missions to internally displaced persons camps — consultations, medicines, and emergency care.' },
            { heading: 'Community Medical Outreaches', text: 'Free medical consultations, malaria treatment, maternal care, and eye care for underserved communities.' },
            { heading: 'Medicine & Equipment Supply', text: 'Stocking essential medicines, first aid kits, and medical equipment for outreach teams.' },
            { heading: 'Healthcare Partnerships', text: 'Collaborating with accredited hospitals and NGOs to deliver quality care at scale.' },
        ],
        scripture: 'Luke 9:2', scriptureText: '"He sent them out to proclaim the kingdom of God and to heal the sick."',
    },
];

export default function MandatePage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [bodyRef, bodyVis] = useReveal(0.03);
    const [quoteRef, quoteVis] = useReveal(0.1);
    const [ctaRef, ctaVis] = useReveal(0.1);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 12, md: 18 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.06) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'mn_glow 8s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-8%', width: 420, height: 420, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0C 0%,transparent 70%)`, pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '10%', right: '8%', width: 180, height: 180, borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.14)`, animation: 'mn_spin 28s linear infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '12%', right: '10%', width: 120, height: 120, borderRadius: '50%', border: `1px dashed rgba(14,165,233,0.12)`, animation: 'mn_spinR 18s linear infinite', pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box component={Link} to="/whatwedo" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '0.9rem', fontWeight: 700, mb: 6, transition: 'color .2s', '&:hover': { color: colors.secondary.main } }}>
                        <ArrowBackIcon sx={{ fontSize: 18 }} /> Back to What We Do
                    </Box>

                    <Box ref={heroRef} sx={{ maxWidth: 780 }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3.5, opacity: heroVis ? 1 : 0, animation: heroVis ? 'mn_rise .6s ease both' : 'none' }}>
                            <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'mn_pulse 2s ease infinite' }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.8, textTransform: 'uppercase' }}>Our Foundation</Typography>
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '3rem', sm: '4rem', md: '5.2rem' }, fontWeight: 900, color: 'white', lineHeight: 1.02, letterSpacing: '-2px', mb: 1.5, opacity: heroVis ? 1 : 0, animation: heroVis ? 'mn_rise .7s ease .1s both' : 'none' }}>
                            Our
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '3rem', sm: '4rem', md: '5.2rem' }, fontWeight: 900, lineHeight: 1.02, letterSpacing: '-2px', mb: 4, background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light},${colors.secondary.main})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: heroVis ? 'mn_gradShift 4s ease infinite, mn_rise .7s ease .18s both' : 'none', opacity: heroVis ? 1 : 0 }}>
                            Mandate.
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.15rem', md: '1.35rem' }, color: 'rgba(255,255,255,0.55)', lineHeight: 2, maxWidth: 600, opacity: heroVis ? 1 : 0, animation: heroVis ? 'mn_rise .7s ease .28s both' : 'none' }}>
                            Five clear commitments — rooted in Scripture, born from calling — that shape every decision, every outreach, and every partnership at Jesus Partners Outreach.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5, mt: 4, flexWrap: 'wrap', opacity: heroVis ? 1 : 0, animation: heroVis ? 'mn_rise .7s ease .36s both' : 'none' }}>
                            {MANDATE.map((m, i) => (
                                <Box key={m.number} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: `${m.color}16`, border: `1px solid ${m.color}30`, borderRadius: '100px', px: 1.8, py: .7 }}>
                                    <Box sx={{ width: 22, height: 22, borderRadius: '50%', bgcolor: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.65rem', fontWeight: 900, color: 'white' }}>{i + 1}</Typography>
                                    </Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.75rem', fontWeight: 700, color: m.color, whiteSpace: 'nowrap' }}>{m.title}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Container>

                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={colors.background.default} />
                    </svg>
                </Box>
            </Box>

            {/* ══ MANDATE CARDS — true 2-col grid ══ */}
            <Box ref={bodyRef} sx={{ bgcolor: colors.background.default, py: { xs: 8, md: 14 } }}>
                <Container maxWidth="lg">
                    {/* Row 1 — cards 01 & 02 */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 }, mb: { xs: 3, md: 4 } }}>
                        {MANDATE.slice(0, 2).map((m, i) => <MandateCard key={m.id} m={m} i={i} bodyVis={bodyVis} />)}
                    </Box>
                    {/* Row 2 — cards 03 & 04 */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 }, mb: { xs: 3, md: 4 } }}>
                        {MANDATE.slice(2, 4).map((m, i) => <MandateCard key={m.id} m={m} i={i + 2} bodyVis={bodyVis} />)}
                    </Box>
                    {/* Row 3 — card 05 centred */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
                        <MandateCard m={MANDATE[4]} i={4} bodyVis={bodyVis} />
                        {/* Empty cell so card 05 sits left but could also center */}
                        <Box sx={{ display: { xs: 'none', md: 'block' } }} />
                    </Box>
                </Container>
            </Box>

            {/* ══ SCRIPTURE QUOTE ══ */}
            <Box ref={quoteRef} sx={{ bgcolor: 'white', py: { xs: 6, md: 10 } }}>
                <Container maxWidth="md">
                    <Box sx={{ bgcolor: colors.primary.dark, borderRadius: '28px', p: { xs: 4, md: 7 }, textAlign: 'center', position: 'relative', overflow: 'hidden', border: `1px solid rgba(212,160,23,0.18)`, opacity: quoteVis ? 1 : 0, animation: quoteVis ? 'mn_rise .7s ease both' : 'none' }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                        <FormatQuoteIcon sx={{ fontSize: 56, color: `${colors.secondary.main}35`, mb: 2, position: 'relative', zIndex: 1 }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.25rem', md: '1.6rem' }, fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontStyle: 'italic', mb: 3, position: 'relative', zIndex: 1, maxWidth: 640, mx: 'auto' }}>
                            "Then the Lord God spoke to us that we should share with others as He does to us."
                        </Typography>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ width: 28, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.9rem', fontWeight: 700, color: colors.secondary.main }}>The Heart Behind Jesus Partners Outreach</Typography>
                            <Box sx={{ width: 28, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ══ CTA ══ */}
            <Box ref={ctaRef} sx={{ background: `linear-gradient(120deg,${colors.primary.dark} 0%,#0F3460 55%,${colors.primary.light} 100%)`, py: { xs: 8, md: 12 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'mn_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Ready to Join the Mandate?
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.05rem', md: '1.15rem' }, color: 'rgba(255,255,255,0.5)', mb: 5, maxWidth: 480, mx: 'auto', lineHeight: 1.9 }}>
                            Every one of these five commitments needs partners — people who pray, give, and believe alongside us.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component={Link} to="/partners" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', px: 4, py: 1.8, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteIcon sx={{ fontSize: 18 }} /> Partner Now
                            </Box>
                            <Box component={Link} to="/whatwedo" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'white', border: '1.5px solid rgba(255,255,255,0.22)', px: 4, py: 1.8, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', transform: 'translateY(-4px)' } }}>
                                <ArrowBackIcon sx={{ fontSize: 18 }} /> What We Do
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

// ── Card — dark header panel + white body ─────────────────────────────────────
function MandateCard({ m, i, bodyVis }) {
    const Icon = m.icon;
    return (
        <Box
            sx={{
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 24px rgba(10,16,40,0.08)',
                opacity: bodyVis ? 1 : 0,
                animation: bodyVis ? `mn_rise .75s ease ${i * .12}s both` : 'none',
                transition: 'transform .35s ease, box-shadow .35s ease',
                '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 32px 72px ${m.color}30`,
                },
            }}
        >
            {/* ── Dark header panel ── */}
            <Box sx={{
                position: 'relative',
                background: `linear-gradient(140deg, ${colors.primary.dark} 0%, #0A1A2E 100%)`,
                p: { xs: 3, md: 4 },
                overflow: 'hidden',
                minHeight: { xs: 'auto', md: 200 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                {/* Dot grid bg */}
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '18px 18px', pointerEvents: 'none' }} />
                {/* Colour glow bottom-right */}
                <Box sx={{ position: 'absolute', bottom: '-40%', right: '-15%', width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${m.color}35 0%, transparent 70%)`, pointerEvents: 'none' }} />
                {/* Ghost number */}
                <Typography sx={{
                    position: 'absolute', bottom: -12, right: 16,
                    fontFamily: typography.fontFamily.accent,
                    fontSize: '9rem', fontWeight: 900, lineHeight: 1,
                    letterSpacing: '-6px', color: 'rgba(255,255,255,0.04)',
                    userSelect: 'none', pointerEvents: 'none',
                }}>
                    {m.number}
                </Typography>

                {/* Top row: number pill + icon */}
                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: `${m.color}22`, border: `1px solid ${m.color}45`, borderRadius: '100px', px: 1.8, py: .6 }}>
                        <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: m.color }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.7rem', fontWeight: 800, color: m.color, letterSpacing: 1.5 }}>
                            {m.number} of 05
                        </Typography>
                    </Box>
                    <Box sx={{ width: 52, height: 52, borderRadius: '15px', bgcolor: `${m.color}20`, border: `1.5px solid ${m.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon sx={{ fontSize: 26, color: m.color }} />
                    </Box>
                </Box>

                {/* Title */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ width: 36, height: 3, bgcolor: m.color, borderRadius: 2, mb: 1.5 }} />
                    <Typography sx={{
                        fontFamily: typography.fontFamily.accent,
                        fontSize: { xs: '1.5rem', md: '1.8rem' },
                        fontWeight: 900,
                        color: 'white',
                        lineHeight: 1.15,
                    }}>
                        {m.title}
                    </Typography>
                </Box>
            </Box>

            {/* ── White body panel ── */}
            <Box sx={{
                bgcolor: 'white',
                p: { xs: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                borderTop: `3px solid ${m.color}`,
            }}>
                {/* Summary */}
                <Typography sx={{
                    fontFamily: typography.fontFamily.body,
                    fontSize: { xs: '1.05rem', md: '1.12rem' },
                    color: colors.text.secondary,
                    lineHeight: 1.9,
                    mb: 3,
                    flex: 1,
                }}>
                    {m.summary}
                </Typography>

                {/* Scripture */}
                <Box sx={{ p: { xs: 2, md: 2.5 }, mb: 3, bgcolor: `${m.color}08`, borderRadius: '12px', borderLeft: `4px solid ${m.color}` }}>
                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '0.9rem', md: '0.95rem' }, fontStyle: 'italic', color: colors.text.primary, lineHeight: 1.75, mb: .7 }}>
                        {m.scriptureText}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 16, height: 2, bgcolor: m.color, borderRadius: 1 }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.75rem', fontWeight: 800, color: m.color, letterSpacing: 1 }}>
                            {m.scripture}
                        </Typography>
                    </Box>
                </Box>

                {/* Read More */}
                <Box
                    component={Link}
                    to={`/whatwedo/mandate/${m.id}`}
                    sx={{
                        display: 'inline-flex', alignItems: 'center', gap: 1.2,
                        alignSelf: 'flex-start',
                        bgcolor: m.color, color: 'white',
                        px: 3, py: 1.4, borderRadius: '10px',
                        textDecoration: 'none',
                        fontFamily: typography.fontFamily.heading,
                        fontSize: '0.95rem', fontWeight: 800,
                        boxShadow: `0 6px 20px ${m.color}35`,
                        transition: 'all .25s ease',
                        '&:hover': { opacity: .88, gap: '14px' },
                    }}
                >
                    Read More <ArrowForwardIcon sx={{ fontSize: 16 }} />
                </Box>
            </Box>
        </Box>
    );
}