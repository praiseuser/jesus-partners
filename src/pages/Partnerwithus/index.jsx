import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CampaignIcon from '@mui/icons-material/Campaign';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BudgetCard from '../../components/BudgetCard';
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes pt_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pt_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes pt_glow': { '0%,100%': { opacity: .35, transform: 'scale(1)' }, '50%': { opacity: .7, transform: 'scale(1.08)' } },
    '@keyframes pt_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 12px ${colors.secondary.main}00` } },
    '@keyframes pt_float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
    '@keyframes pt_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes pt_spinR': { to: { transform: 'rotate(-360deg)' } },
    '@keyframes pt_countUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes budgetShimmer': { from: { left: '-100%' }, to: { left: '110%' } },
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

export const BUDGETS = [
    {
        id: 'crusades',
        icon: CampaignIcon,
        color: colors.secondary.main,
        title: 'Crusades & Revivals',
        subtitle: 'Fuel the Gospel Fire',
        description: 'Fund a 3-day open-air Gospel Crusade reaching an entire city — venue, sound and light, publicity, accommodation, transport, media, and welfare.',
        totalNgn: 8202000,
        totalUsd: 5767,
        tiers: {
            gold: { ngn: 8202000, usd: 5767, label: 'Full Crusade', desc: 'Carry the whole crusade. One partner, one city, three days of the Gospel. Your gift covers every line of this budget, from the platform and sound to accommodation, publicity and media.' },
            silver: { ngn: 2050500, usd: 1442, label: '¼ of a Crusade', desc: 'Stand behind a quarter of the crusade. Your partnership joins others to light the platform, fill the grounds and take the Gospel to an entire city.' },
            diamond: { ngn: 500000, usd: 352, label: 'Crusade Seed Gift', desc: 'A precious seed in the crusade fund. Every naira becomes sound, light and outreach for a community waiting to hear the Gospel.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        // Worship and Follow-up removed; their ₦1,000,000 shared equally across the 7 remaining items.
        lineItems: [
            { label: 'Venue & Logistics', ngn: 1967858, usd: 1384 },
            { label: 'Technical — Sound & Light', ngn: 621857, usd: 437 },
            { label: 'Publicity & Printing', ngn: 1507857, usd: 1060 },
            { label: 'Accommodation', ngn: 2032857, usd: 1429 },
            { label: 'Transportation', ngn: 652857, usd: 459 },
            { label: 'Media, Photography & Videography', ngn: 592857, usd: 417 },
            { label: 'Welfare & Feeding', ngn: 825857, usd: 581 },
        ],
    },
    {
        id: 'medical',
        icon: LocalHospitalIcon,
        color: colors.accent.teal,
        title: 'Medical Outreaches',
        subtitle: 'Healing Where It Is Needed Most',
        description: 'Fund a medical outreach serving 300+ patients — drugs & equipment, eye care for 150 patients, critical referral cases, and logistics. Runs alongside every crusade.',
        totalNgn: 2688050,
        totalUsd: 1890,
        tiers: {
            gold: { ngn: 5000000, usd: 3516, label: 'Gold — Multi Outreach', desc: 'Covers multiple medical outreach events including full drug supply, eye care for 150 patients, personnel, referral support, and logistics.' },
            silver: { ngn: 1000000, usd: 703, label: 'Silver — One Outreach', desc: 'Covers one complete medical outreach event — drugs for 300 patients, eye treatment, personnel, and full logistics.' },
            diamond: { ngn: 500000, usd: 352, label: 'Diamond — Seed Gift', desc: 'Covers medicines and basic equipment for a significant portion of patients in one outreach event.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        lineItems: [
            { label: 'Drugs & Equipment — 300 Patients', ngn: 388050, usd: 273 },
            { label: 'Eye Treatment — 150 Patients', ngn: 350000, usd: 246 },
            { label: 'Personnel', ngn: 300000, usd: 211 },
            { label: 'Critical Referral Cases — 15 Patients (max ₦100k each)', ngn: 1500000, usd: 1054 },
            { label: 'Logistics', ngn: 150000, usd: 106 },
        ],
        medicineItems: [
            { name: 'Glucophage', qty: '3 packets', cost: 9200 },
            { name: 'HBs Strip', qty: '1 packet', cost: 8000 },
            { name: 'ACT4 / ACT3 / ACT2 / ACT1 (Malaria)', qty: '20 cards each', cost: 46000 },
            { name: 'Acu-Check Strip & Machine', qty: '1 each', cost: 50000 },
            { name: 'Cipro Tab', qty: '2 boxes', cost: 15000 },
            { name: 'Omeprazole', qty: '3 boxes', cost: 14000 },
            { name: 'Amlodipine 5mg & 10mg', qty: '1 packet each', cost: 13000 },
            { name: 'Paracetamol Tab & Syrup', qty: '1 tin + 20 bottles', cost: 16800 },
            { name: 'Cough Syrup', qty: '20 bottles', cost: 13000 },
            { name: 'Eye Check & Glasses', qty: '100 pieces', cost: 350000 },
        ],
    },
    {
        id: 'widows',
        icon: VolunteerActivismIcon,
        color: colors.accent.red,
        title: 'Widows & Orphans Support',
        subtitle: 'Be the Hands of James 1:27',
        description: 'Host a fellowship meal for 300 displaced persons, distribute food bundles, provide clothing, and fund business empowerment for widows across Naka, Jato Aka, Daudu, and Peva.',
        totalNgn: 7143700,
        totalUsd: 4323,
        tiers: {
            gold: { ngn: 5000000, usd: 3516, label: 'Gold — Full Outreach', desc: 'Covers the full fellowship meal for 300 persons, administration, food distribution, and business empowerment across multiple communities.' },
            silver: { ngn: 1000000, usd: 703, label: 'Silver — Community Care', desc: 'Covers food distribution for multiple families plus fellowship logistics for widows and displaced families in one community.' },
            diamond: { ngn: 500000, usd: 352, label: 'Diamond — Seed Gift', desc: 'Feed a displaced family for a whole month. Your seed puts food bundles in the hands of 2–3 families of 6–10 persons each, turning an empty table into daily hope.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        lineItems: [
            { label: 'Fellowship Meal for 300 Persons (breakfast, lunch & dinner)', ngn: 2407800, usd: 1694 },
            { label: 'Transportation', ngn: 1278000, usd: 899 },
            { label: 'Security', ngn: 600000, usd: 422 },
            { label: 'Cooking Logistics', ngn: 600000, usd: 422 },
            { label: 'Personnel', ngn: 800000, usd: 563 },
            { label: 'Food Bundle — 10kg (feeds 5 for 1 week)', ngn: 50000, usd: 35 },
            { label: 'Food Bundle — 50kg (feeds 5–10 for 1–2 weeks)', ngn: 105000, usd: 74 },
            { label: 'Food Bundle — 100kg (feeds 6–10 for 1 month)', ngn: 212000, usd: 149 },
            { label: 'Clothing & Shoes (per widow)', ngn: 20000, usd: 14 },
            { label: 'Business Empowerment Fund (per widow)', ngn: 50000, usd: 35 },
        ],
        locations: ['Naka', 'Jato Aka', 'Daudu/Gbaijimba (Benue State)', 'Peva (Taraba State)'],
    },
    {
        id: 'education',
        icon: SchoolIcon,
        color: colors.accent.green,
        title: "Children's Education",
        subtitle: 'A Future for Every Child',
        description: 'Rescue a displaced or orphaned child from an IDP camp with a full year of Christian boarding school — safety, feeding, education, medical care, and nurturing. $717 rescues a child for a full year.',
        totalNgn: 1020500,
        totalUsd: 717,
        tiers: {
            gold: { ngn: 1020500, usd: 717, label: 'Full Year — Heavens Glory', desc: 'Full annual sponsorship at Heavens Glory International Academy — covering admission, uniforms, books, feeding (₦650/plate × 13 weeks), boarding, tuition, ICT, medicals, lessons, and exams.' },
            silver: { ngn: 272500, usd: 192, label: 'One Term', desc: 'Covers one full term for one child at Heavens Glory Academy — feeding, boarding, and tuition for a complete term.' },
            diamond: { ngn: 250000, usd: 176, label: 'Partial Support', desc: 'A partial sponsorship that combines with other gifts — covering key costs like feeding, boarding, or books for a term.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        schools: [
            {
                name: 'Heavens Glory International Academy',
                annualNgn: 1020500, annualUsd: 717,
                items: [
                    { label: 'Admission Form & Interview', ngn: 8000 },
                    { label: 'Acceptance Fee', ngn: 20000 },
                    { label: 'Development Levy', ngn: 30000 },
                    { label: 'Six Pairs of Uniforms', ngn: 80000 },
                    { label: 'Books (excl. notebooks)', ngn: 65000 },
                    { label: 'Feeding (₦650/plate × 13 weeks)', ngn: 177500 },
                    { label: 'Boarding', ngn: 30000 },
                    { label: 'Tuition', ngn: 40000 },
                    { label: 'ICT', ngn: 5000 },
                    { label: 'Medicals', ngn: 10000 },
                    { label: 'Lessons', ngn: 5000 },
                    { label: 'Exams', ngn: 5000 },
                ],
            },
            {
                name: 'New Rhema Hillside Academy',
                annualNgn: 945500, annualUsd: 667,
                items: [
                    { label: 'Admission Form & Interview', ngn: 10000 },
                    { label: 'Acceptance Fee', ngn: 5000 },
                    { label: 'Six Pairs of Uniforms', ngn: 75000 },
                    { label: 'Books', ngn: 45500 },
                    { label: 'Feeding', ngn: 140000 },
                    { label: 'Boarding', ngn: 40000 },
                    { label: 'Tuition', ngn: 25000 },
                    { label: 'ICT', ngn: 10000 },
                    { label: 'Medicals', ngn: 30000 },
                    { label: 'Lessons', ngn: 10000 },
                    { label: 'Exams', ngn: 15000 },
                ],
            },
            {
                name: 'Skills Acquisition & Technical College',
                annualNgn: 852000, annualUsd: 599,
                items: [
                    { label: 'Admission Form & Interview', ngn: 3000 },
                    { label: 'Acceptance Fee', ngn: 10000 },
                    { label: 'Development Levy', ngn: 15000 },
                    { label: 'Four Pairs of Uniform', ngn: 50000 },
                    { label: 'Books', ngn: 60000 },
                    { label: 'Feeding', ngn: 140000 },
                    { label: 'Boarding', ngn: 30000 },
                    { label: 'Tuition', ngn: 30000 },
                    { label: 'ICT', ngn: 5000 },
                    { label: 'Medical', ngn: 30000 },
                    { label: 'Exams', ngn: 3000 },
                ],
            },
        ],
        lineItems: [
            { label: 'Heavens Glory International Academy (Annual)', ngn: 1020500, usd: 717 },
            { label: 'New Rhema Hillside Academy (Annual)', ngn: 945500, usd: 667 },
            { label: 'Skills Acquisition & Technical College (Annual)', ngn: 852000, usd: 599 },
            { label: 'Transport per child to school', ngn: 35000, usd: 25 },
        ],
    },
    {
        id: 'grace-college',
        icon: MenuBookIcon,
        color: '#8B5CF6',
        title: 'Grace College of Evangelism',
        subtitle: 'Invest in the Next Generation',
        description: 'Equip Grace College of Evangelism & Missions with computing, e-library, solar power, Starlink internet, and TV screens for the 2026 session resuming in August.',
        totalNgn: 21560000,
        totalUsd: 15156,
        tiers: {
            gold: { ngn: 21560000, usd: 15156, label: 'Full College Needs', desc: 'Own the vision. Your full partnership equips Grace College for the 2026 session with laptops, an e-library, solar power, Starlink internet and e-lecture screens, so the next generation of evangelists trains without limits.' },
            silver: { ngn: 5390000, usd: 3789, label: '¼ of College Needs', desc: 'A major share — enough to fund the solar power installation or the full computing infrastructure for the college.' },
            diamond: { ngn: 500000, usd: 352, label: 'Diamond — Seed Gift', desc: 'Seeds into the Grace College fund — contributing to classroom facilities, headphones, theological subscriptions, or student resources.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        lineItems: [
            { label: 'Computing — 10 Student Laptops (i5, 8GB, SSD)', ngn: 2200000, usd: 1547 },
            { label: 'Computing — 3 Desktop Workstations', ngn: 1650000, usd: 1160 },
            { label: 'Multifunction Printer/Scanner/Copier', ngn: 380000, usd: 267 },
            { label: 'Classroom Facilities — Lectern & Fans', ngn: 300000, usd: 211 },
            { label: 'E-Library — 2 Desktop Workstations', ngn: 1100000, usd: 773 },
            { label: 'E-Library — Library Management Software', ngn: 300000, usd: 211 },
            { label: 'E-Library — 10 Headphone AV Stations', ngn: 180000, usd: 127 },
            { label: 'E-Library — Sheet-fed Scanner', ngn: 150000, usd: 105 },
            { label: 'Solar Hybrid Power System (institution-grade)', ngn: 10000000, usd: 7030 },
            { label: 'Smart TV 65" — Main Classroom (4K)', ngn: 1100000, usd: 773 },
            { label: 'Smart TV 55" × 2 — Library & Seminar Room', ngn: 1700000, usd: 1195 },
            { label: 'Wall Mounts & HDMI Cabling', ngn: 180000, usd: 127 },
            { label: 'Conferencing Kit — Camera, Mic & Speaker', ngn: 260000, usd: 183 },
            { label: 'Starlink Standard Kit — Dish, Router, Mount', ngn: 590000, usd: 415 },
            { label: 'Network — Mesh Wi-Fi, Switch, Cabling', ngn: 280000, usd: 197 },
            { label: 'Theological E-Resources / Database (Annual)', ngn: 500000, usd: 352 },
            { label: 'PRTS Partnership (Annual)', ngn: 690000, usd: 485 },
        ],
    },
];

const STATS = [
    { value: '5', label: 'Budget Areas', color: colors.secondary.main },
    { value: '₦41M+', label: 'Total 2026 Need', color: colors.accent.red },
    { value: '2007', label: 'Serving Since', color: colors.accent.teal },
    { value: '∞', label: 'Lives to Reach', color: '#8B5CF6' },
];

export default function PartnerPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [statsRef, statsVis] = useReveal();
    const [budgetsRef, budgetsVis] = useReveal(0.03);
    const [quoteRef, quoteVis] = useReveal();
    const [ctaRef, ctaVis] = useReveal();

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, animation: 'pt_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${colors.accent.teal}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 6 }, alignItems: 'center' }}>
                        <Box ref={heroRef}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .85, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .6s ease both' : 'none' }}>
                                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'pt_pulse 2s ease infinite' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.8rem', fontWeight: 800, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>Partner With Us</Typography>
                            </Box>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-1px', mb: 1, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .1s both' : 'none' }}>
                                Do More &
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1px', mb: 3, background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light},${colors.secondary.main})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: heroVis ? 'pt_gradShift 4s ease infinite, pt_rise .7s ease .18s both' : 'none', opacity: heroVis ? 1 : 0 }}>
                                Better Together.
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.05rem', md: '1.15rem' }, fontWeight: 500, color: 'rgba(255,255,255,0.78)', lineHeight: 1.85, maxWidth: 500, mb: 4, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .26s both' : 'none' }}>
                                Browse our 2026 budget areas. Every category has four ways to give — 💛 Gold, 🥈 Silver, 💎 Diamond, and 🤲 Generous — so you can give exactly what God lays on your heart.
                            </Typography>
                            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .34s both' : 'none' }}>
                                <Box component="a" href="#budgets" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.05rem', fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                    <FavoriteIcon sx={{ fontSize: 18 }} /> See Budgets
                                </Box>
                                <Box component="a" href="#budgets" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.9)', border: '1.5px solid rgba(255,255,255,0.22)', px: 3.5, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.05rem', fontWeight: 700, transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)' } }}>
                                    Partner Now <ArrowForwardIcon sx={{ fontSize: 18 }} />
                                </Box>
                            </Stack>
                        </Box>

                        {/* Right — animated icon grid */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .9s cubic-bezier(.34,1.2,.64,1) .3s both' : 'none' }}>
                            <Box sx={{ position: 'relative', width: { xs: 260, md: 340 }, height: { xs: 260, md: 340 } }}>
                                <Box sx={{ position: 'absolute', inset: '-18%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.18)`, animation: 'pt_spin 22s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 10, height: 10, borderRadius: '50%', bgcolor: colors.secondary.main, boxShadow: `0 0 14px ${colors.secondary.main}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: '-6%', borderRadius: '50%', border: `1px dashed rgba(14,165,233,0.14)`, animation: 'pt_spinR 15s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', bottom: '-4px', left: '46%', width: 8, height: 8, borderRadius: '50%', bgcolor: colors.accent.teal, boxShadow: `0 0 10px ${colors.accent.teal}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}18 0%,transparent 70%)`, animation: 'pt_glow 4s ease-in-out infinite', pointerEvents: 'none' }} />
                                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, animation: 'pt_float 5s ease-in-out infinite' }}>
                                        {[
                                            { Icon: HandshakeIcon, color: colors.secondary.main },
                                            { Icon: VolunteerActivismIcon, color: colors.accent.red },
                                            { Icon: SchoolIcon, color: colors.accent.green },
                                            { Icon: MenuBookIcon, color: colors.accent.teal },
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

                <Box sx={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
                    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={colors.background.default} />
                    </svg>
                </Box>
            </Box>

            {/* ══ STATS ══ */}
            <Box ref={statsRef} sx={{ bgcolor: colors.background.default, py: { xs: 7, md: 10 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 3, md: 2 } }}>
                        {STATS.map((s, i) => (
                            <Box key={s.label} sx={{ textAlign: 'center', bgcolor: 'white', borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: `1px solid ${colors.divider}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `pt_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${s.color}30` } }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.4rem' }, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.9rem', color: colors.text.secondary, fontWeight: 700, mt: .6, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ BUDGET CARDS ══ */}
            <Box id="budgets" ref={budgetsRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .45, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    {/* Section header */}
                    <Box sx={{ mb: { xs: 7, md: 10 }, opacity: budgetsVis ? 1 : 0, animation: budgetsVis ? 'pt_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ width: 3, height: 40, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                            <Box>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.85rem', fontWeight: 800, color: colors.secondary.main, letterSpacing: 2, textTransform: 'uppercase', mb: .4 }}>
                                    2026 Partnership Budgets
                                </Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.7rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.1 }}>
                                    Choose Where to Give
                                </Typography>
                            </Box>
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.08rem', md: '1.15rem' }, fontWeight: 600, color: colors.text.secondary, maxWidth: 640, lineHeight: 1.8, pl: '20px' }}>
                            Each area below shows its full 2026 budget. Click any card to see the complete breakdown, then pick a partnership tier — 💛 Gold, 🥈 Silver, 💎 Diamond, or 🤲 Generous. You can also fund any single item in the breakdown directly.
                        </Typography>
                    </Box>

                    {/* Budget cards — single column, full-width horizontal cards */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 3, md: 4 } }}>
                        {BUDGETS.map((budget, i) => (
                            <BudgetCard key={budget.id} budget={budget} index={i} isVis={budgetsVis} />
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ SCRIPTURE QUOTE ══ */}
            <Box ref={quoteRef} sx={{ bgcolor: colors.background.default, py: { xs: 6, md: 8 } }}>
                <Container maxWidth="md">
                    <Box sx={{ bgcolor: colors.primary.dark, borderRadius: '24px', p: { xs: 4, md: 6 }, textAlign: 'center', position: 'relative', overflow: 'hidden', border: `1px solid rgba(212,160,23,0.18)`, opacity: quoteVis ? 1 : 0, animation: quoteVis ? 'pt_rise .7s ease both' : 'none' }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none' }} />
                        <FormatQuoteIcon sx={{ fontSize: 48, color: `${colors.secondary.main}40`, mb: 1, position: 'relative', zIndex: 1 }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.2rem', md: '1.5rem' }, fontWeight: 700, color: 'rgba(255,255,255,0.88)', lineHeight: 1.8, fontStyle: 'italic', mb: 2, position: 'relative', zIndex: 1 }}>
                            "Then the Lord God spoke to us that we should share with others as He does to us."
                        </Typography>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ width: 24, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1rem', fontWeight: 700, color: colors.secondary.main }}>The Heart Behind Jesus Partners Outreach</Typography>
                            <Box sx={{ width: 24, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ══ CTA ══ */}
            <Box ref={ctaRef} sx={{ background: `linear-gradient(120deg,${colors.primary.dark} 0%,#0F3460 55%,${colors.primary.light} 100%)`, py: { xs: 8, md: 11 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <Box sx={{ opacity: ctaVis ? 1 : 0, animation: ctaVis ? 'pt_rise .7s ease both' : 'none' }}>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.7rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>Ready to Partner With Us?</Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '1.08rem', md: '1.2rem' }, fontWeight: 500, color: 'rgba(255,255,255,0.78)', mb: 4, maxWidth: 540, mx: 'auto', lineHeight: 1.8 }}>
                            Whether through prayer, giving, or hands-on involvement — your partnership makes it possible for us to do more and better for God's Kingdom.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component="a" href="#budgets" sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', px: 4, py: 1.8, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.1rem', fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteIcon sx={{ fontSize: 18 }} /> See Budgets
                            </Box>
                            <Box component={Link} to="/contact" sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', px: 4, py: 1.8, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '1.1rem', fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' } }}>
                                Contact Us <ArrowForwardIcon sx={{ fontSize: 18 }} />
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}