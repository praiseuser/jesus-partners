import { useState, useEffect, useRef } from 'react';
import {
    Box, Container, Typography, Stack, Divider, Chip,
    Dialog, DialogContent, DialogTitle, IconButton, Grid,
    Accordion, AccordionSummary, AccordionDetails,
    Table, TableBody, TableRow, TableCell,
} from '@mui/material';
import { GlobalStyles } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import ChurchIcon from '@mui/icons-material/Church';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

// ─── Theme tokens matching the site's palette ───────────────────────────────
const GOLD = '#C9972B';
const GOLD_LIGHT = '#F0C84A';
const GOLD_DARK = '#9C7420';
const DARK_BG = '#0A0D14';
const CARD_BG = '#111520';
const CARD_BORDER = 'rgba(201,151,43,0.22)';
const TEXT_MUTED = 'rgba(255,255,255,0.55)';
const TEXT_BODY = 'rgba(255,255,255,0.82)';
const TEAL = '#3A8DDE';
const PURPLE = '#7C4DBC';
const GREEN = '#2E9E6B';

const keyframes = {
    '@keyframes pg_rise': { from: { opacity: 0, transform: 'translateY(44px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pg_right': { from: { opacity: 0, transform: 'translateX(44px)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pg_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes pg_glow': { '0%,100%': { opacity: .35, transform: 'scale(1)' }, '50%': { opacity: .7, transform: 'scale(1.08)' } },
    '@keyframes pg_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${GOLD}44` }, '50%': { boxShadow: `0 0 0 12px ${GOLD}00` } },
    '@keyframes pg_float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
    '@keyframes pg_spin': { to: { transform: 'rotate(360deg)' } },
    '@keyframes pg_spinR': { to: { transform: 'rotate(-360deg)' } },
    '@keyframes pg_countUp': { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'none' } },
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

const HERO_STATS = [
    { value: '4', label: 'Active Programs', color: GOLD },
    { value: '3', label: 'Partner Schools', color: TEAL },
    { value: '400+', label: 'Widows Reached', color: GREEN },
    { value: '2007', label: 'Serving Since', color: PURPLE },
];

const SCHOOLS = [
    {
        id: 'heavens-glory',
        name: 'Heavens Glory International Academy',
        type: 'Primary & Secondary Boarding',
        annualFee: '₦1,020,500',
        firstTermTotal: '₦475,500',
        location: 'Nigeria',
        note: 'Second & third terms: ₦272,500 each',
        items: [
            { label: 'Admission Form & Interview', amount: '₦8,000' },
            { label: 'Acceptance Fee', amount: '₦20,000' },
            { label: 'Development Levy', amount: '₦30,000' },
            { label: 'Six Pairs of Uniforms (excl. ceremonial)', amount: '₦80,000' },
            { label: 'Books (excl. notebooks)', amount: '₦65,000' },
            { label: 'Feeding (₦650/plate × 13 weeks)', amount: '₦177,500' },
            { label: 'Boarding', amount: '₦30,000' },
            { label: 'Tuition', amount: '₦40,000' },
            { label: 'ICT', amount: '₦5,000' },
            { label: 'Medicals', amount: '₦10,000' },
            { label: 'Lesson', amount: '₦5,000' },
            { label: 'Exams', amount: '₦5,000' },
        ],
    },
    {
        id: 'new-rhema',
        name: 'New Rhema Hillside Academy',
        type: 'Primary Boarding',
        annualFee: '₦870,500',
        firstTermTotal: '₦420,500',
        location: 'Gboko, Benue State',
        note: 'Second & third terms: ₦225,000 each',
        items: [
            { label: 'Admission Form & Interview', amount: '₦10,000' },
            { label: 'Six Pairs of Uniforms', amount: '₦75,000' },
            { label: 'Acceptance Fee', amount: '₦50,000' },
            { label: 'Books', amount: '₦45,500' },
            { label: 'Feeding', amount: '₦120,000' },
            { label: 'Boarding', amount: '₦40,000' },
            { label: 'Tuition', amount: '₦25,000' },
            { label: 'ICT', amount: '₦10,000' },
            { label: 'Medicals', amount: '₦20,000' },
            { label: 'Lesson', amount: '₦10,000' },
            { label: 'Exams', amount: '₦15,000' },
        ],
    },
    {
        id: 'skills-acquisition',
        name: 'Skills Acquisition & Technical College',
        type: 'Vocational Training',
        annualFee: '₦330,000',
        firstTermTotal: '₦165,000',
        location: 'Gboko North',
        note: 'First & second terms: ₦165,000 each',
        items: [
            { label: 'Admission Form & Interview', amount: '₦3,000' },
            { label: 'Acceptance Fee', amount: '₦10,000' },
            { label: 'Development Levy', amount: '₦15,000' },
            { label: 'Four Pairs of Uniform', amount: '₦50,000' },
            { label: 'Books', amount: '₦60,000' },
            { label: 'Feeding', amount: '₦110,000' },
            { label: 'Boarding', amount: '₦25,000' },
            { label: 'Tuition', amount: '₦30,000' },
            { label: 'ICT', amount: '₦4,000' },
            { label: 'Medical', amount: '₦10,000' },
            { label: 'Exams', amount: '₦3,000' },
        ],
    },
];

// ─── Program data ─────────────────────────────────────────────────────────────
const PROGRAMS = [
    {
        id: 'gospel-crusades',
        icon: <ChurchIcon />,
        label: 'Gospel & Revival Crusades',
        tag: 'Northern Nigeria',
        tagColor: GOLD,
        body: `With rising insecurity and displacement in Northern Nigeria, we're taking an aggressive approach to reach communities where access and relative safety remain. We also reach out to troubled places where Christian brethren have been displaced and churches closed, denying regular fellowship.`,
        targets: ['Jato Aka', 'Naka', 'Torsen', 'Guma'],
        targetLabel: '2026 Targets',
        pillars: [
            { emoji: '✝', text: 'ENCOURAGE distressed believers' },
            { emoji: '🔍', text: 'SEEK the lost' },
            { emoji: '🙏', text: 'HEAL the sick' },
            { emoji: '❤', text: 'Share Christ\'s love through fellowship meals, clothing, food & education' },
        ],
        sponsorLabel: 'Support a Crusade',
        sponsorTo: '/partners',
    },
    {
        id: 'education',
        icon: <SchoolIcon />,
        label: 'Education Assistance',
        tag: '3 Partner Schools',
        tagColor: TEAL,
        body: `We've adopted 3 Christian boarding schools to provide orphans and displaced children with education, safety, trauma counselling, meals, and medical care — removing them from IDP camp dangers. We aim to sponsor children for 3–6 years until families can return safely.`,
        whoWeServe: [
            'Orphans who lost both parents to attacks',
            'Widows\' children left as sole providers',
            'Pastors\' and ministers\' children in displaced locations',
        ],
        hasSchools: true,
        sponsorLabel: 'Sponsor a Child',
        sponsorTo: '/partners',
    },
    {
        id: 'ministerial',
        icon: <MenuBookIcon />,
        label: 'Ministerial Training',
        tag: 'Grace College',
        tagColor: PURPLE,
        body: `Grace College of Evangelism & Mission runs an MA in partnership with Puritan Reformed Theological Seminary, USA. We provide scholarships for ministers serving sacrificially without pay in challenging areas — grounding them in sound knowledge of God's Word.`,
        needs: [
            'Scholarships — ₦100,000/student',
            'Laptops & desktops',
            'Classroom facilities',
            'E-library & internet service',
            'Solar/generator power',
            'TV screens for e-lectures',
            'Books (particularly Reformed)',
        ],
        sponsorLabel: 'Fund a Scholar',
        sponsorTo: '/partners',
    },
    {
        id: 'widows-orphans',
        icon: <VolunteerActivismIcon />,
        label: 'Widows & Orphans Support',
        tag: 'Operation Feed the Poor',
        tagColor: GREEN,
        body: `June–July is the hardest season for food. We distribute corn & cassava flour, rice, beans, oil, and salt to widows and vulnerable homes in crisis areas, as the Lord provides.`,
        feedBasket: [
            'Rice — 25 kg',
            'Beans — 25 kg',
            'Corn — 25 kg',
            'Cassava — 30 kg',
            'Vegetable oil',
            'Palm oil',
            'Salt',
        ],
        feast: `In February 2026, over 400 widows attended the annual Widows Outreach Feast before 8 am. We provide meals, fellowship, counselling, gifts, and identify needs. For 2027 we aim to add business support: fertilizer, sewing machines, water pumps, grinding machines, and start-up capital.`,
        sponsorLabel: 'Feed a Family',
        sponsorTo: '/partners',
    },
];

// ─── Reusable gold pill ───────────────────────────────────────────────────────
function GoldPill({ children, color }) {
    return (
        <Chip
            label={children}
            size="small"
            sx={{
                bgcolor: `${color || GOLD}22`,
                color: color || GOLD,
                border: `1px solid ${color || GOLD}44`,
                fontWeight: 700,
                fontSize: '0.68rem',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
                height: 24,
                borderRadius: '6px',
            }}
        />
    );
}

// ─── School fee modal ─────────────────────────────────────────────────────────
function SchoolModal({ school, open, onClose }) {
    if (!school) return null;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: '#0E1320',
                    border: `1px solid ${CARD_BORDER}`,
                    borderRadius: '16px',
                    color: '#fff',
                    backgroundImage: 'none',
                },
            }}
        >
            <Box sx={{ height: 4, background: `linear-gradient(90deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT})` }} />
            <DialogTitle sx={{ pb: 0, pr: 6, pt: 2.5 }}>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: GOLD, lineHeight: 1.3 }}>
                    {school.name}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: TEXT_MUTED, mt: 0.5 }}>
                    {school.type} · {school.location}
                </Typography>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 14, right: 12, color: TEXT_MUTED }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                <Divider sx={{ borderColor: CARD_BORDER, mb: 2 }} />

                <Typography sx={{ fontSize: '0.72rem', color: TEXT_MUTED, textTransform: 'uppercase', letterSpacing: 1.5, mb: 1, fontWeight: 700 }}>
                    Fee Breakdown
                </Typography>

                <Table size="small">
                    <TableBody>
                        {school.items.map((item, i) => (
                            <TableRow key={i} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                                <TableCell sx={{ color: TEXT_BODY, fontSize: '0.85rem', borderColor: 'rgba(255,255,255,0.07)', py: 0.8 }}>
                                    {item.label}
                                </TableCell>
                                <TableCell align="right" sx={{ color: GOLD, fontWeight: 600, fontSize: '0.85rem', borderColor: 'rgba(255,255,255,0.07)', py: 0.8, whiteSpace: 'nowrap' }}>
                                    {item.amount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Box sx={{ mt: 2, p: 2, bgcolor: `${GOLD}12`, borderRadius: '10px', border: `1px solid ${GOLD}30` }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>First Term Total</Typography>
                        <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{school.firstTermTotal}</Typography>
                    </Stack>
                    <Divider sx={{ borderColor: `${GOLD}30`, my: 1 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography sx={{ fontSize: '0.85rem', color: TEXT_MUTED }}>Full Annual Fee</Typography>
                        <Typography sx={{ fontWeight: 800, color: GOLD, fontSize: '1.1rem' }}>{school.annualFee}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: '0.72rem', color: TEXT_MUTED, mt: 0.8 }}>({school.note})</Typography>
                </Box>

                <Box
                    component={Link}
                    to={`/donate?school=${school.id}`}
                    sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
                        mt: 3, py: 1.4, borderRadius: '10px',
                        bgcolor: GOLD, color: '#0A0D14',
                        fontWeight: 700, fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'all 0.25s',
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 10px 28px ${GOLD}44` },
                    }}
                >
                    <FavoriteIcon sx={{ fontSize: 17 }} />
                    Sponsor a Child at This School
                </Box>
            </DialogContent>
        </Dialog>
    );
}

// ─── Program card ─────────────────────────────────────────────────────────────
function ProgramCard({ program, delay, vis }) {
    const [schoolModal, setSchoolModal] = useState(null);

    return (
        <Box sx={{
            bgcolor: CARD_BG,
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: '20px',
            p: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            opacity: vis ? 1 : 0,
            animation: vis ? `pg_rise .6s cubic-bezier(.34,1.2,.64,1) ${delay}s both` : 'none',
            transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
            '&:hover': { borderColor: `${GOLD}55`, transform: 'translateY(-6px)', boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${GOLD}25` },
        }}>
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${program.tagColor},${program.tagColor}66)` }} />

            {/* Card header */}
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
                <Box sx={{
                    width: 48, height: 48, borderRadius: '13px',
                    bgcolor: `${program.tagColor}18`, border: `1.5px solid ${program.tagColor}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: program.tagColor, flexShrink: 0,
                    animation: 'pg_pulse 3s ease infinite',
                    '& svg': { fontSize: 23 },
                }}>
                    {program.icon}
                </Box>
                <GoldPill color={program.tagColor}>{program.tag}</GoldPill>
            </Stack>

            <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
                {program.label}
            </Typography>

            <Typography sx={{ fontSize: '0.88rem', color: TEXT_BODY, lineHeight: 1.8 }}>
                {program.body}
            </Typography>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

            {/* Gospel crusade specifics */}
            {program.targets && (
                <Box>
                    <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5, color: program.tagColor, fontWeight: 700, mb: 1.5 }}>
                        {program.targetLabel}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                        {program.targets.map(t => (
                            <Box key={t} sx={{
                                px: 1.5, py: 0.5, borderRadius: '8px',
                                bgcolor: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '0.78rem', color: TEXT_BODY,
                            }}>
                                {t}
                            </Box>
                        ))}
                    </Stack>
                    <Stack gap={1}>
                        {program.pillars.map((p, i) => (
                            <Stack key={i} direction="row" gap={1.5} alignItems="flex-start">
                                <Box sx={{ color: program.tagColor, mt: 0.1, fontSize: '0.85rem', flexShrink: 0 }}>{p.emoji}</Box>
                                <Typography sx={{ fontSize: '0.82rem', color: TEXT_BODY, lineHeight: 1.65 }}>{p.text}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            )}

            {/* Education specifics */}
            {program.whoWeServe && (
                <Box>
                    <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5, color: program.tagColor, fontWeight: 700, mb: 1.5 }}>
                        Who We Serve
                    </Typography>
                    <Stack gap={1} mb={2.5}>
                        {program.whoWeServe.map((w, i) => (
                            <Stack key={i} direction="row" gap={1.5} alignItems="flex-start">
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: program.tagColor, mt: 0.6, flexShrink: 0 }} />
                                <Typography sx={{ fontSize: '0.82rem', color: TEXT_BODY, lineHeight: 1.65 }}>{w}</Typography>
                            </Stack>
                        ))}
                    </Stack>

                    <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5, color: program.tagColor, fontWeight: 700, mb: 1.5 }}>
                        Partner Schools
                    </Typography>
                    <Stack gap={1.5}>
                        {SCHOOLS.map(school => (
                            <Box
                                key={school.id}
                                onClick={() => setSchoolModal(school)}
                                sx={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    p: 1.5, borderRadius: '10px',
                                    bgcolor: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    '&:hover': { bgcolor: `${TEAL}12`, borderColor: `${TEAL}44` },
                                }}
                            >
                                <Box>
                                    <Typography sx={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600, lineHeight: 1.3 }}>
                                        {school.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.72rem', color: TEXT_MUTED }}>
                                        {school.type}
                                    </Typography>
                                </Box>
                                <Stack alignItems="flex-end" gap={0.5}>
                                    <Typography sx={{ fontSize: '0.78rem', color: TEAL, fontWeight: 700 }}>
                                        {school.annualFee}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '0.65rem', color: TEAL,
                                        bgcolor: `${TEAL}18`, px: 1, py: 0.2, borderRadius: '5px',
                                    }}>
                                        View fees →
                                    </Typography>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}

            {/* Ministerial needs */}
            {program.needs && (
                <Box>
                    <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5, color: program.tagColor, fontWeight: 700, mb: 1.5 }}>
                        Current Needs
                    </Typography>
                    <Stack gap={0.8}>
                        {program.needs.map((n, i) => (
                            <Stack key={i} direction="row" gap={1.5} alignItems="flex-start">
                                <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: program.tagColor, mt: 0.65, flexShrink: 0 }} />
                                <Typography sx={{ fontSize: '0.82rem', color: TEXT_BODY, lineHeight: 1.65 }}>{n}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            )}

            {/* Widows/orphans specifics */}
            {program.feedBasket && (
                <Box>
                    <Accordion
                        disableGutters
                        sx={{
                            bgcolor: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '10px !important',
                            boxShadow: 'none',
                            '&:before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: program.tagColor, fontSize: 18 }} />}
                            sx={{ minHeight: 44, px: 2 }}
                        >
                            <Typography sx={{ fontSize: '0.78rem', color: program.tagColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2 }}>
                                Support a Home — Family Basket
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ pt: 0, pb: 2, px: 2 }}>
                            <Stack gap={0.7}>
                                {program.feedBasket.map((item, i) => (
                                    <Stack key={i} direction="row" gap={1.5} alignItems="center">
                                        <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: program.tagColor, flexShrink: 0 }} />
                                        <Typography sx={{ fontSize: '0.82rem', color: TEXT_BODY }}>{item}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Box sx={{
                        mt: 2, p: 2, borderRadius: '10px',
                        bgcolor: `${program.tagColor}0D`,
                        border: `1px solid ${program.tagColor}30`,
                    }}>
                        <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1.5, color: program.tagColor, fontWeight: 700, mb: 1 }}>
                            Widows Outreach Feast · 2026
                        </Typography>
                        <Typography sx={{ fontSize: '0.82rem', color: TEXT_BODY, lineHeight: 1.7 }}>
                            {program.feast}
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* Spacer to push button to bottom */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Sponsor button */}
            <Box
                component={Link}
                to={program.sponsorTo}
                sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
                    py: 1.5, borderRadius: '10px',
                    bgcolor: `${program.tagColor}18`,
                    border: `1.5px solid ${program.tagColor}55`,
                    color: program.tagColor,
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    transition: 'all 0.25s cubic-bezier(.34,1.2,.64,1)',
                    '&:hover': { bgcolor: program.tagColor, color: '#0A0D14', transform: 'translateY(-2px)', boxShadow: `0 10px 28px ${program.tagColor}44` },
                }}
            >
                <FavoriteIcon sx={{ fontSize: 16 }} />
                {program.sponsorLabel}
            </Box>

            {program.hasSchools && (
                <SchoolModal
                    school={schoolModal}
                    open={!!schoolModal}
                    onClose={() => setSchoolModal(null)}
                />
            )}
        </Box>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProgramsPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [statsRef, statsVis] = useReveal();
    const [gridRef, gridVis] = useReveal(0.03);
    const [ctaRef, ctaVis] = useReveal();

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ══ HERO ══ */}
            <Box sx={{ bgcolor: DARK_BG, pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(201,151,43,0.05) 1px, transparent 1px)`, backgroundSize: '28px 28px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-15%', right: '-6%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle,${GOLD}12 0%,transparent 70%)`, animation: 'pg_glow 7s ease infinite', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle,${TEAL}0D 0%,transparent 70%)`, pointerEvents: 'none' }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 6 }, alignItems: 'center' }}>

                        {/* Left — text */}
                        <Box ref={heroRef}>
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(201,151,43,0.1)', border: '1px solid rgba(201,151,43,0.28)', borderRadius: '100px', px: 2.2, py: .75, mb: 3, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pg_rise .6s ease both' : 'none' }}>
                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: GOLD, animation: 'pg_pulse 2s ease infinite' }} />
                                <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: GOLD_LIGHT, letterSpacing: 2.5, textTransform: 'uppercase' }}>
                                    Our Work
                                </Typography>
                            </Box>

                            <Typography sx={{ fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.08, letterSpacing: '-1px', mb: 1, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pg_rise .7s ease .1s both' : 'none' }}>
                                Programs &
                            </Typography>
                            <Typography sx={{ fontSize: { xs: '2.6rem', sm: '3.4rem', md: '4rem' }, fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1px', mb: 3, background: `linear-gradient(120deg,${GOLD_DARK},${GOLD},${GOLD_LIGHT},${GOLD})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: heroVis ? 'pg_gradShift 4s ease infinite, pg_rise .7s ease .18s both' : 'none', opacity: heroVis ? 1 : 0 }}>
                                Projects.
                            </Typography>

                            <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, color: 'rgba(255,255,255,0.55)', lineHeight: 1.9, maxWidth: 460, mb: 4, opacity: heroVis ? 1 : 0, animation: heroVis ? 'pg_rise .7s ease .26s both' : 'none' }}>
                                Bringing the Gospel and practical compassion to Northern Nigeria's most vulnerable communities since 2007 — crusades, education, ministerial training and widow support.
                            </Typography>

                            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ opacity: heroVis ? 1 : 0, animation: heroVis ? 'pg_rise .7s ease .34s both' : 'none' }}>
                                <Box component={Link} to="/partner" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: GOLD, color: '#0A0D14', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 800, boxShadow: `0 8px 28px ${GOLD}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)', boxShadow: `0 16px 40px ${GOLD}55` } }}>
                                    <FavoriteIcon sx={{ fontSize: 16 }} /> Become a Partner
                                </Box>
                                <Box component="a" href="#programs" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.18)', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)', transform: 'translateY(-2px)' } }}>
                                    See Programs <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                </Box>
                            </Stack>
                        </Box>

                        {/* Right — icon grid */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: heroVis ? 1 : 0, animation: heroVis ? 'pg_right .9s cubic-bezier(.34,1.2,.64,1) .3s both' : 'none' }}>
                            <Box sx={{ position: 'relative', width: { xs: 260, md: 340 }, height: { xs: 260, md: 340 } }}>
                                <Box sx={{ position: 'absolute', inset: '-18%', borderRadius: '50%', border: `1px dashed rgba(201,151,43,0.18)`, animation: 'pg_spin 22s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', top: '-5px', left: '46%', width: 10, height: 10, borderRadius: '50%', bgcolor: GOLD, boxShadow: `0 0 14px ${GOLD}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: '-6%', borderRadius: '50%', border: `1px dashed rgba(58,141,222,0.14)`, animation: 'pg_spinR 15s linear infinite', pointerEvents: 'none' }}>
                                    <Box sx={{ position: 'absolute', bottom: '-4px', left: '46%', width: 8, height: 8, borderRadius: '50%', bgcolor: TEAL, boxShadow: `0 0 10px ${TEAL}` }} />
                                </Box>
                                <Box sx={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle,${GOLD}18 0%,transparent 70%)`, animation: 'pg_glow 4s ease-in-out infinite', pointerEvents: 'none' }} />
                                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, animation: 'pg_float 5s ease-in-out infinite' }}>
                                        {[
                                            { Icon: ChurchIcon, color: GOLD },
                                            { Icon: VolunteerActivismIcon, color: GREEN },
                                            { Icon: SchoolIcon, color: TEAL },
                                            { Icon: MenuBookIcon, color: PURPLE },
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
                        <path d="M0,30 C360,60 720,0 1080,36 C1260,52 1380,18 1440,30 L1440,60 L0,60 Z" fill={DARK_BG} />
                    </svg>
                </Box>
            </Box>

            {/* ══ STATS ══ */}
            <Box ref={statsRef} sx={{ bgcolor: DARK_BG, py: { xs: 6, md: 9 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 2.5, md: 2 } }}>
                        {HERO_STATS.map((s, i) => (
                            <Box key={s.label} sx={{ textAlign: 'center', bgcolor: CARD_BG, borderRadius: '18px', p: { xs: 2.5, md: 3.2 }, border: `1px solid ${CARD_BORDER}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `pg_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px ${s.color}30` } }}>
                                <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.3rem' }, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                                <Typography sx={{ fontSize: '0.68rem', color: TEXT_MUTED, fontWeight: 600, mt: .5, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ PROGRAM CARDS ══ */}
            <Box id="programs" ref={gridRef} sx={{ bgcolor: DARK_BG, py: { xs: 4, md: 8 }, position: 'relative' }}>
                <Box sx={{
                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: 600, height: 300,
                    background: `radial-gradient(ellipse at 50% 0%, ${GOLD}10 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }} />

                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={3}>
                        {PROGRAMS.map((program, i) => (
                            <Grid item xs={12} md={6} key={program.id} sx={{ display: 'flex' }}>
                                <ProgramCard program={program} delay={i * 0.1} vis={gridVis} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Bottom CTA strip */}
                    <Box ref={ctaRef} sx={{
                        mt: { xs: 8, md: 12 }, p: { xs: 4, md: 6 },
                        borderRadius: '24px',
                        background: `linear-gradient(135deg, ${CARD_BG} 0%, #161B2A 100%)`,
                        border: `1px solid ${CARD_BORDER}`,
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        opacity: ctaVis ? 1 : 0,
                        animation: ctaVis ? 'pg_rise .7s ease both' : 'none',
                    }}>
                        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(201,151,43,0.06) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 2, color: GOLD, fontWeight: 700, mb: 2 }}>
                                Every Gift Makes a Difference
                            </Typography>
                            <Typography sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 900, color: '#fff', mb: 2, lineHeight: 1.2 }}>
                                Partner With Jesus Partners Outreach
                            </Typography>
                            <Typography sx={{ fontSize: '0.95rem', color: TEXT_MUTED, maxWidth: 520, mx: 'auto', lineHeight: 1.8, mb: 4 }}>
                                Your support reaches displaced families, educates vulnerable children, and trains ministers in Northern Nigeria's most challenging areas.
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                                <Box
                                    component={Link}
                                    to="/partners"
                                    sx={{
                                        display: 'inline-flex', alignItems: 'center', gap: 1,
                                        px: 4, py: 1.7, borderRadius: '10px',
                                        bgcolor: GOLD, color: '#0A0D14',
                                        fontWeight: 800, fontSize: '0.9rem',
                                        textDecoration: 'none',
                                        boxShadow: `0 8px 28px ${GOLD}44`,
                                        transition: 'all 0.3s cubic-bezier(.34,1.2,.64,1)',
                                        '&:hover': { transform: 'translateY(-4px) scale(1.04)', boxShadow: `0 16px 40px ${GOLD}55` },
                                    }}
                                >
                                    <FavoriteIcon sx={{ fontSize: 17 }} />
                                    Become a Partner
                                </Box>
                                <Box
                                    component={Link}
                                    to="/contact"
                                    sx={{
                                        display: 'inline-flex', alignItems: 'center', gap: 1,
                                        px: 4, py: 1.7, borderRadius: '10px',
                                        bgcolor: 'rgba(255,255,255,0.06)',
                                        border: `1.5px solid rgba(255,255,255,0.18)`,
                                        color: '#fff',
                                        fontWeight: 700, fontSize: '0.9rem',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', transform: 'translateY(-4px)' },
                                    }}
                                >
                                    Contact Us <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}