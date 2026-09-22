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
import { colors, typography } from '../../theme';

const keyframes = {
    '@keyframes pt_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pt_right': { from: { opacity: 0, transform: 'translateX(44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pt_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes pt_glow': { '0%,100%': { opacity: .35, transform: 'scale(1)' }, '50%': { opacity: .7, transform: 'scale(1.08)' } },
    '@keyframes pt_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 12px ${colors.secondary.main}00` } },
    '@keyframes pt_float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
    '@keyframes pt_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes pt_spinR': { to: { transform: 'rotate(-360deg)' } },
    '@keyframes pt_countUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
};

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

const fmt = (n) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);

// ─── All budget data from JPO documents ───────────────────────────────────────
export const BUDGETS = [
    {
        id: 'crusades',
        icon: CampaignIcon,
        color: colors.secondary.main,
        title: 'Crusades & Revivals',
        subtitle: 'Fuel the Gospel Fire',
        description: 'Fund a 3-day open-air Gospel Crusade reaching an entire city — venue, sound, publicity, worship, accommodation, transport, media, and follow-up. One every month for 12 months.',
        totalNgn: 8202000,
        totalUsd: 5767,
        tiers: {
            gold: { ngn: 8202000, usd: 5767, label: 'Full Crusade', desc: 'Covers the complete 3-day city-wide crusade — all line items including venue & logistics, sound & light, publicity printing, worship, accommodation, transportation, media, and welfare & feeding.' },
            silver: { ngn: 2050500, usd: 1442, label: '¼ of a Crusade', desc: 'Covers one quarter of the total crusade cost — a powerful partnership share that combines with others to make the full crusade happen for one community.' },
            diamond: { ngn: 500000, usd: 352, label: 'Crusade Seed Gift', desc: 'A seed gift directly into the crusade fund — every contribution, however large or small, helps take the Gospel to a new community.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        lineItems: [
            { label: 'Venue & Logistics', ngn: 1825000, usd: 1283 },
            { label: 'Technical — Sound & Light', ngn: 479000, usd: 337 },
            { label: 'Publicity & Printing', ngn: 1365000, usd: 960 },
            { label: 'Worship', ngn: 810000, usd: 569 },
            { label: 'Accommodation', ngn: 1890000, usd: 1329 },
            { label: 'Transportation', ngn: 510000, usd: 359 },
            { label: 'Follow-up', ngn: 190000, usd: 134 },
            { label: 'Media, Photography & Videography', ngn: 450000, usd: 316 },
            { label: 'Welfare & Feeding', ngn: 683000, usd: 480 },
        ],
    },
    {
        id: 'medical',
        icon: LocalHospitalIcon,
        color: colors.accent.teal,
        title: 'Medical Outreaches',
        subtitle: 'Healing Where It Is Needed Most',
        description: 'Fund a medical outreach serving 300+ patients — drugs & equipment, eye care for 150 patients, personnel, critical referral cases, and logistics. Goes alongside our crusades.',
        totalNgn: 2688050,
        totalUsd: 1890,
        tiers: {
            gold: { ngn: 5000000, usd: 3516, label: 'Gold — Major Support', desc: 'A Gold partnership of ₦5,000,000 covers multiple medical outreaches including full drug supply, eye care, personnel, referral cases, and logistics for more than one community outreach event.' },
            silver: { ngn: 1000000, usd: 703, label: 'Silver — One Outreach', desc: 'Covers roughly one complete medical outreach event — drugs and equipment for 300 patients, eye treatment, personnel, and logistics to serve one community.' },
            diamond: { ngn: 500000, usd: 352, label: 'Diamond — Seed Gift', desc: 'Covers medicines, basic equipment, and essential care for a significant portion of patients in one medical outreach event.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        lineItems: [
            { label: 'Drugs & Equipment — 300 Patients', ngn: 388050, usd: 273, detail: '50 medicine line items including malaria treatment, antibiotics, BP medication, eye drops, syrups, and equipment' },
            { label: 'Eye Treatment — 150 Patients', ngn: 350000, usd: 246, detail: 'Eye check and glasses for 100 pieces/patients' },
            { label: 'Personnel', ngn: 300000, usd: 211 },
            { label: 'Critical Referral Cases — 15 Patients (max ₦100k each)', ngn: 1500000, usd: 1054, detail: 'Patients too critical are supported at partner hospitals. Max ₦100,000 per patient, 15 slots per outreach.' },
            { label: 'Logistics', ngn: 150000, usd: 106 },
        ],
        medicineItems: [
            { name: 'Glucophage', qty: '3 packets', cost: 9200 },
            { name: 'HBs Strip', qty: '1 packet', cost: 8000 },
            { name: 'Spirit', qty: '2 bottles', cost: 1800 },
            { name: 'Cotton Wool', qty: '1 packet', cost: 1000 },
            { name: 'Lancet', qty: '1 packet', cost: 2500 },
            { name: 'Hand Gloves', qty: '5 packets', cost: 2400 },
            { name: 'Predistone Tab', qty: '2 packets', cost: 2600 },
            { name: 'Dionil Tab', qty: '2 packets', cost: 5500 },
            { name: 'Acu-Check Strip', qty: '1 packet', cost: 20000 },
            { name: 'Acu-Check Machine', qty: '1', cost: 30000 },
            { name: 'ACT4', qty: '20 cards', cost: 15000 },
            { name: 'ACT3', qty: '20 cards', cost: 12000 },
            { name: 'ACT2', qty: '20 cards', cost: 10000 },
            { name: 'ACT1', qty: '20 cards', cost: 9000 },
            { name: 'Septrine Tab', qty: '2 packets', cost: 9000 },
            { name: 'Piriton', qty: '16ml', cost: 3000 },
            { name: 'Face Mask', qty: '6 pieces', cost: 3000 },
            { name: 'Cough Syrup', qty: '20 bottles', cost: 13000 },
            { name: 'Ampiclose Syrup', qty: '10 bottles', cost: 8000 },
            { name: 'Amoxil Syrup', qty: '10 bottles', cost: 8000 },
            { name: 'Tanzol Worm Syrup', qty: '10 bottles', cost: 5500 },
            { name: 'Abendazole Tab', qty: '10 packets', cost: 3800 },
            { name: 'Ampiclose Capsules', qty: '2 packets', cost: 11600 },
            { name: 'Amoxil Capsules', qty: '2 packets', cost: 11600 },
            { name: 'Cipro Tab', qty: '2 boxes', cost: 15000 },
            { name: 'Eproconazol Capsules', qty: '2 boxes', cost: 17000 },
            { name: 'Doxycycline Capsules', qty: '2 packets', cost: 5400 },
            { name: 'Ketoconazol', qty: '2 packets', cost: 12000 },
            { name: 'Omeprazole', qty: '3 boxes', cost: 14000 },
            { name: 'Ketonazole Cream', qty: '1 box', cost: 6500 },
            { name: 'Vasoprin Tab', qty: '3 packets', cost: 4700 },
            { name: 'Modretic Tab', qty: '3 packets', cost: 10400 },
            { name: 'Amlodipine 5mg', qty: '1 packet', cost: 6000 },
            { name: 'Amlodipine 10mg', qty: '1 packet', cost: 7000 },
            { name: 'Curfenac 100mg', qty: '2 boxes', cost: 7400 },
            { name: 'Osteokric', qty: '2 boxes', cost: 7400 },
            { name: 'Mist Mag', qty: '1 carton', cost: 12500 },
            { name: 'Paracetamol Tab', qty: '1 tin', cost: 5800 },
            { name: 'Vitamin C', qty: '1 tin', cost: 3500 },
            { name: 'Ferrous Sulphate', qty: '1 tin', cost: 3500 },
            { name: 'Metro Tab', qty: '1 tin', cost: 7000 },
            { name: 'Loratidine Tab', qty: '2 packets', cost: 5000 },
            { name: 'Dexa Tab', qty: '2 packets', cost: 2200 },
            { name: 'Albandazole 400mg', qty: '1 box', cost: 4000 },
            { name: 'Paracetamol Syrup', qty: '20 bottles', cost: 11000 },
            { name: 'Metro Syrup', qty: '1 row', cost: 5500 },
            { name: 'Eye Check & Glasses', qty: '100 pieces', cost: 350000 },
        ],
    },
    {
        id: 'widows',
        icon: VolunteerActivismIcon,
        color: colors.accent.red,
        title: 'Widows & Orphans Support',
        subtitle: 'Be the Hands of James 1:27',
        description: 'Host a fellowship meal for 300 displaced persons, distribute food bundles, provide clothing, and fund business empowerment for widows in Naka, Jato Aka, Daudu, and Peva.',
        totalNgn: 7143700,
        totalUsd: 4323,
        tiers: {
            gold: { ngn: 5000000, usd: 3516, label: 'Gold — Major Outreach', desc: 'A Gold gift of ₦5,000,000 covers the full fellowship meal for 300 persons, administration & logistics, food distribution, and business empowerment for widows across multiple communities.' },
            silver: { ngn: 1000000, usd: 703, label: 'Silver — Community Support', desc: 'Covers food distribution for multiple families plus fellowship logistics — making a tangible difference for widows and displaced families in one community visit.' },
            diamond: { ngn: 500000, usd: 352, label: 'Diamond — Seed Gift', desc: 'A seed gift that covers food bundles for several displaced families — providing a month of food provision for up to 2–3 families of 6–10 persons each.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        lineItems: [
            { label: 'Fellowship Meal for 300 Persons (breakfast, lunch & dinner)', ngn: 2407800, usd: 1694 },
            { label: 'Transportation', ngn: 1278000, usd: 899 },
            { label: 'Security', ngn: 600000, usd: 422 },
            { label: 'Cooking Logistics', ngn: 600000, usd: 422 },
            { label: 'Personnel', ngn: 800000, usd: 563 },
            { label: 'Food Bundle — Feed 5 persons for 1 week (10kg)', ngn: 50000, usd: 35 },
            { label: 'Food Bundle — Feed 5–10 persons for 1–2 weeks (50kg)', ngn: 105000, usd: 74 },
            { label: 'Food Bundle — Feed 6–10 persons for 1 month (100kg)', ngn: 212000, usd: 149 },
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
        description: 'Rescue a displaced or orphaned child from an IDP camp with a full year of Christian boarding school — safety, feeding, education, medical care, and Christian nurturing. $740 rescues a child for one year.',
        totalNgn: 1020500,
        totalUsd: 717,
        tiers: {
            gold: { ngn: 1020500, usd: 717, label: 'Full Year — Heavens Glory', desc: 'Full annual sponsorship at Heavens Glory International Academy — covering admission, uniforms, books, feeding (₦650/plate × 13 weeks), boarding, tuition, ICT, medicals, lessons, and exams for one child.' },
            silver: { ngn: 272500, usd: 192, label: 'One Term Sponsorship', desc: 'Covers one full term (2nd or 3rd term) for one child at Heavens Glory Academy — keeping a displaced child in school for a complete term including feeding, boarding, and tuition.' },
            diamond: { ngn: 250000, usd: 176, label: 'Diamond — Partial Support', desc: 'A partial sponsorship that combines with other gifts to keep a child in school — covering key costs like feeding, boarding, or books for a term.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        schools: [
            {
                name: 'Heavens Glory International Academy',
                location: 'Behind Gboko Hills',
                type: 'Primary + Secondary Boarding',
                annualNgn: 1020500,
                annualUsd: 717,
                termNgn: 272500,
                termUsd: 192,
                firstTermNgn: 475500,
                firstTermUsd: 335,
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
                covers: 'Tuition, boarding, feeding, books, uniform, medical care',
            },
            {
                name: 'New Rhema Hillside Academy',
                location: 'Gboko, Benue State',
                type: 'Primary Boarding School',
                annualNgn: 945500,
                annualUsd: 667,
                termNgn: 270000,
                termUsd: 189,
                firstTermNgn: 405500,
                firstTermUsd: 285,
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
                covers: 'Tuition, boarding, feeding, books, uniform, medical care',
            },
            {
                name: 'Skills Acquisition & Technical College',
                location: 'Gboko North, opposite FOMA Clinic',
                type: 'Boarding Vocational Training',
                annualNgn: 852000,
                annualUsd: 599,
                termNgn: 238000,
                termUsd: 167,
                firstTermNgn: 376000,
                firstTermUsd: 264,
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
                covers: 'Tuition, tools, materials, certification. Courses: Tailoring, ICT, Welding, Catering, Hairdressing, Mason, Carpentry',
            },
        ],
        transportNote: 'Transport per child from IDP camps to schools: ₦20,000–₦50,000 depending on distance.',
        who: ['Orphans who lost both parents to attacks', "Widows' children left as sole providers", "Pastors' and ministers' children in displaced locations"],
    },
    {
        id: 'grace-college',
        icon: MenuBookIcon,
        color: '#8B5CF6',
        title: 'Grace College of Evangelism',
        subtitle: 'Invest in the Next Generation',
        description: 'Equip Grace College of Evangelism & Missions with computing, e-library, solar power, Starlink internet, TV screens, and annual resources for the 2026 session resuming in August.',
        totalNgn: 21560000,
        totalUsd: 15156,
        tiers: {
            gold: { ngn: 21560000, usd: 15156, label: 'Full College Needs', desc: 'Fully funds all 2026 college needs — 10 student laptops, 3 desktop workstations, e-library setup, solar hybrid power system (₦10M), TV screens for e-lectures, Starlink internet, and annual recurrent costs.' },
            silver: { ngn: 5390000, usd: 3789, label: '¼ of College Needs', desc: 'Covers one quarter of the total — a major partnership share that could fully fund the solar power installation or the computing infrastructure for the college.' },
            diamond: { ngn: 500000, usd: 352, label: 'Diamond — Seed Gift', desc: 'A seed gift into the Grace College fund — contributing directly to classroom facilities, headphones for the e-library, theological subscriptions, or student resources.' },
        },
        kingdomOptions: [100000, 50000, 10000, 5000, 1000],
        lineItems: [
            { label: 'Computing — 10 Student Laptops (i5, 8GB, SSD)', ngn: 2200000, usd: 1547 },
            { label: 'Computing — 3 Desktop Workstations (admin & library)', ngn: 1650000, usd: 1160 },
            { label: 'Multifunction Printer/Scanner/Copier', ngn: 380000, usd: 267 },
            { label: 'Classroom Facilities — Lectern & Fans', ngn: 300000, usd: 211 },
            { label: 'E-Library — 2 Desktop Workstations', ngn: 1100000, usd: 773 },
            { label: 'E-Library — Library Management Software', ngn: 300000, usd: 211 },
            { label: 'E-Library — 10 Headphone AV Stations', ngn: 180000, usd: 127 },
            { label: 'E-Library — Sheet-fed Scanner', ngn: 150000, usd: 105 },
            { label: 'Solar Hybrid Power System (institution-grade)', ngn: 10000000, usd: 7030 },
            { label: 'Smart TV 65" — Main Classroom (4K)', ngn: 1100000, usd: 773 },
            { label: 'Smart TV 55" × 2 — Library & Seminar', ngn: 1700000, usd: 1195 },
            { label: 'Wall Mounts, HDMI Cabling', ngn: 180000, usd: 127 },
            { label: 'Conferencing Kit — Camera, Mic & Speaker', ngn: 260000, usd: 183 },
            { label: 'Starlink Standard Kit — Dish, Router, Mount', ngn: 590000, usd: 415 },
            { label: 'Network Distribution — Mesh Wi-Fi, Switch, Cabling', ngn: 280000, usd: 197 },
            { label: 'Theological E-Resources / Database Subscription (Annual)', ngn: 500000, usd: 352 },
            { label: 'PRTS Partnership (Annual)', ngn: 690000, usd: 485 },
        ],
    },
];

const SUMMARY_STATS = [
    { value: '5', label: 'Budget Areas', color: colors.secondary.main },
    { value: '₦41M+', label: 'Total 2026 Need', color: colors.accent.red },
    { value: '2007', label: 'Serving Since', color: colors.accent.teal },
    { value: '∞', label: 'Lives to Reach', color: '#8B5CF6' },
];

export default function PartnerPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [statsRef, statsVis] = useReveal();
    const [budgetsRef, budgetsVis] = useReveal();
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
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .6s ease both' : 'none' }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: colors.secondary.main, animation: 'pt_pulse 2s ease infinite' }} />
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>Partner With Us</Typography>
                            </Box>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-1px', mb: 1, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .1s both' : 'none' }}>
                                Do More &
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1px', mb: 3, background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light},${colors.secondary.main})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: heroVis ? 'pt_gradShift 4s ease infinite, pt_rise .7s ease .18s both' : 'none', opacity: heroVis ? 1 : 0 }}>
                                Better Together.
                            </Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 460, mb: 4, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .26s both' : 'none' }}>
                                Browse our 2026 budget areas. Every category has three partnership tiers — 💛 Gold, 🥈 Silver, and 💎 Diamond — plus a custom giving option so you can give exactly what God lays on your heart.
                            </Typography>
                            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .34s both' : 'none' }}>
                                <Box component="a" href="#budgets" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                    <FavoriteIcon sx={{ fontSize: 16 }} /> See Budgets
                                </Box>
                                <Box component="a" href="#budgets" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.18)', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)' } }}>
                                    Partner Now <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                </Box>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_right .9s cubic-bezier(.34,1.2,.64,1) .3s both' : 'none' }}>
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
                        {SUMMARY_STATS.map((s, i) => (
                            <Box key={s.label} sx={{ textAlign: 'center', bgcolor: 'white', borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: `1px solid ${colors.divider}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `pt_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${s.color}30` } }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, fontWeight: 600, mt: .5, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ BUDGET CARDS ══ */}
            <Box id="budgets" ref={budgetsRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 10 }, opacity: budgetsVis ? 1 : 0, animation: budgetsVis ? 'pt_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>2026 Budgets</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12, mb: 1.5 }}>
                            Choose Where to Give
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, maxWidth: 560, mx: 'auto', lineHeight: 1.85 }}>
                            Each budget area has three tiers — 💛 Gold, 🥈 Silver, and 💎 Diamond — plus a custom option. Click any area to see the full breakdown and choose your partnership level.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 3, md: 4 } }}>
                        {BUDGETS.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <Box key={b.id} sx={{ borderRadius: '24px', overflow: 'hidden', border: `1px solid ${b.color}20`, display: 'flex', flexDirection: 'column', opacity: budgetsVis ? 1 : 0, animation: budgetsVis ? `pt_rise .7s ease ${i * .08}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 24px 60px ${b.color}22` } }}>
                                    {/* Dark header */}
                                    <Box sx={{ bgcolor: colors.primary.dark, p: { xs: 3, md: 3.5 }, position: 'relative', overflow: 'hidden' }}>
                                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '18px 18px', pointerEvents: 'none' }} />
                                        <Box sx={{ position: 'absolute', bottom: '-40%', right: '-10%', width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle,${b.color}28 0%,transparent 70%)`, pointerEvents: 'none' }} />
                                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                                                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: `${b.color}20`, border: `1px solid ${b.color}40`, borderRadius: '100px', px: 1.8, py: .6 }}>
                                                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: b.color }} />
                                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.65rem', fontWeight: 700, color: b.color, textTransform: 'uppercase', letterSpacing: 1.5 }}>{b.subtitle}</Typography>
                                                </Box>
                                                <Box sx={{ width: 46, height: 46, borderRadius: '14px', bgcolor: `${b.color}18`, border: `1.5px solid ${b.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon sx={{ fontSize: 22, color: b.color }} />
                                                </Box>
                                            </Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.3rem', md: '1.5rem' }, fontWeight: 900, color: 'white', lineHeight: 1.2, mb: 1.5 }}>{b.title}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.5rem', md: '1.9rem' }, fontWeight: 900, color: b.color, lineHeight: 1 }}>{fmt(b.totalNgn)}</Typography>
                                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)' }}>· ${b.totalUsd.toLocaleString()}</Typography>
                                            </Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', mt: .4, textTransform: 'uppercase', letterSpacing: 1.2 }}>Total Budget</Typography>
                                        </Box>
                                    </Box>
                                    {/* White body */}
                                    <Box sx={{ bgcolor: colors.background.default, p: { xs: 3, md: 3.5 }, display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.9rem', md: '0.95rem' }, color: colors.text.secondary, lineHeight: 1.8, mb: 3, flex: 1 }}>{b.description}</Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                                            {[{ e: '💛', l: 'Gold' }, { e: '🥈', l: 'Silver' }, { e: '💎', l: 'Diamond' }, { e: '✍️', l: 'Custom' }].map(t => (
                                                <Box key={t.l} sx={{ display: 'inline-flex', alignItems: 'center', gap: .6, bgcolor: 'white', border: `1px solid ${colors.divider}`, borderRadius: '100px', px: 1.4, py: .5 }}>
                                                    <Typography sx={{ fontSize: '0.75rem' }}>{t.e}</Typography>
                                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.65rem', fontWeight: 700, color: colors.text.secondary }}>{t.l}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                        <Box component={Link} to={`/partners/${b.id}`} sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 1, bgcolor: b.color, color: 'white', px: 3, py: 1.5, borderRadius: '12px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '0.95rem', fontWeight: 800, boxShadow: `0 6px 20px ${b.color}35`, transition: 'all .25s ease', '&:hover': { opacity: .88 } }}>
                                            <FavoriteIcon sx={{ fontSize: 16 }} /> Partner Now <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </Box>

            {/* ══ SCRIPTURE QUOTE ══ */}
            <Box ref={quoteRef} sx={{ bgcolor: colors.background.default, py: { xs: 6, md: 8 } }}>
                <Container maxWidth="md">
                    <Box sx={{ bgcolor: colors.primary.dark, borderRadius: '24px', p: { xs: 4, md: 6 }, textAlign: 'center', position: 'relative', overflow: 'hidden', border: `1px solid rgba(212,160,23,0.18)`, opacity: quoteVis ? 1 : 0, animation: quoteVis ? 'pt_rise .7s ease both' : 'none' }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize: '20px 20px', pointerEvents: 'none' }} />
                        <FormatQuoteIcon sx={{ fontSize: 48, color: `${colors.secondary.main}40`, mb: 1, position: 'relative', zIndex: 1 }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.1rem', md: '1.4rem' }, fontWeight: 700, color: 'rgba(255,255,255,0.82)', lineHeight: 1.8, fontStyle: 'italic', mb: 2, position: 'relative', zIndex: 1 }}>
                            "Then the Lord God spoke to us that we should share with others as He does to us."
                        </Typography>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
                            <Box sx={{ width: 24, height: 2, bgcolor: colors.secondary.main, borderRadius: 2 }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, color: colors.secondary.main }}>The Heart Behind Jesus Partners Outreach</Typography>
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
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>Ready to Partner With Us?</Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.55)', mb: 4, maxWidth: 480, mx: 'auto', lineHeight: 1.85 }}>
                            Whether through prayer, giving, or hands-on involvement — your partnership makes it possible for us to do more and better for God's Kingdom.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component="a" href="#budgets" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', px: 4, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteIcon sx={{ fontSize: 16 }} /> See Budgets
                            </Box>
                            <Box component={Link} to="/contact" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', px: 4, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' } }}>
                                Contact Us <ArrowForwardIcon sx={{ fontSize: 16 }} />
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}