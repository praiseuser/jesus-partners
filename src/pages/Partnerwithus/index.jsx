import { useEffect, useRef, useState, useCallback } from 'react';
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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { colors, typography } from '../../theme';

// ─── Keyframes ────────────────────────────────────────────────────────────────
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
    '@keyframes pt_fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
    '@keyframes pt_slideUp': { from: { opacity: 0, transform: 'translateY(60px) scale(0.97)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes pt_heartBeat': {
        '0%': { transform: 'scale(1)' },
        '14%': { transform: 'scale(1.3)' },
        '28%': { transform: 'scale(1)' },
        '42%': { transform: 'scale(1.3)' },
        '70%': { transform: 'scale(1)' },
    },
    '@keyframes pt_thankRise': { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'none' } },
};

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
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

// ─── Catalog Data ─────────────────────────────────────────────────────────────
const CATALOG = [
    {
        id: 'crusades', icon: CampaignIcon, color: colors.secondary.main,
        title: 'Crusades & Revivals', subtitle: 'Fuel the Gospel Fire',
        items: [
            { id: 'c1', name: 'City-wide Crusade — Transportation', price: 3000000 },
            { id: 'c2', name: 'City-wide Crusade — Accommodation', price: 4000000 },
            { id: 'c3', name: 'City-wide Crusade — Security', price: 2000000 },
            { id: 'c4', name: 'Local Church Outreach', price: 150000 },
            { id: 'c5', name: 'Street Outreach (Northern Nigeria)', price: 80000 },
            { id: 'c6', name: 'Fellowship Meal for Community', price: 50000 },
            { id: 'c7', name: 'Clothing & Shoes Package', price: 30000 },
            { id: 'c8', name: 'Media & Ministerial Team Support', price: 200000 },
        ],
    },
    {
        id: 'widows', icon: VolunteerActivismIcon, color: colors.accent.red,
        title: 'Widows & Orphans', subtitle: 'Be the Hands of James 1:27',
        items: [
            { id: 'w1', name: 'Bag of Rice (50kg)', price: 85000 },
            { id: 'w2', name: 'Bag of Beans (50kg)', price: 72000 },
            { id: 'w3', name: 'Bag of Corn (50kg)', price: 45000 },
            { id: 'w4', name: 'Bag of Cassava Flour (50kg)', price: 40000 },
            { id: 'w5', name: 'Jerry Can of Palm Oil (25L)', price: 28000 },
            { id: 'w6', name: 'Bag of Yam (100 tubers)', price: 60000 },
            { id: 'w7', name: 'Salt & Seasoning Bundle', price: 8000 },
            { id: 'w8', name: 'Widows Outreach Feast (per person)', price: 5000 },
            { id: 'w9', name: 'Clothing & Shoes (per widow)', price: 20000 },
            { id: 'w10', name: 'Business Empowerment Fund (per widow)', price: 50000 },
            { id: 'w11', name: 'Orphan Care Package', price: 35000 },
            { id: 'w12', name: 'Food Bundle for Family of 5', price: 120000 },
        ],
    },
    {
        id: 'medical', icon: LocalHospitalIcon, color: colors.accent.teal,
        title: 'Medical Outreaches', subtitle: 'Healing Where It Is Needed Most',
        items: [
            { id: 'm1', name: 'Medical Consultation (per patient)', price: 3000 },
            { id: 'm2', name: 'Essential Medicines Bundle', price: 50000 },
            { id: 'm3', name: 'IDP Camp Medical Visit (full day)', price: 250000 },
            { id: 'm4', name: 'Medical Team Logistics & Travel', price: 120000 },
            { id: 'm5', name: 'First Aid & Emergency Kit', price: 35000 },
            { id: 'm6', name: 'Malaria Treatment Pack', price: 8000 },
            { id: 'm7', name: 'Maternal Care Package', price: 45000 },
            { id: 'm8', name: 'Eye Care & Glasses (per patient)', price: 12000 },
        ],
    },
    {
        id: 'education', icon: SchoolIcon, color: colors.accent.green,
        title: 'Education Assistance', subtitle: 'A Future for Every Child',
        items: [
            { id: 'e1', name: 'Annual School Fees (per child)', price: 180000 },
            { id: 'e2', name: 'School Uniform Set', price: 15000 },
            { id: 'e3', name: 'School Bag & Stationery Pack', price: 12000 },
            { id: 'e4', name: 'School Shoes (per pair)', price: 8000 },
            { id: 'e5', name: 'Textbooks Bundle (per child)', price: 25000 },
            { id: 'e6', name: 'Annual Provisions (food & toiletries)', price: 60000 },
            { id: 'e7', name: 'Trauma Counselling (per term)', price: 30000 },
            { id: 'e8', name: 'Skills Acquisition Training', price: 100000 },
            { id: 'e9', name: 'Solar Power & Internet Installation', price: 500000 },
            { id: 'e10', name: 'School Mattress & Bedding', price: 22000 },
            { id: 'e11', name: 'Lunch Feeding (per child, per term)', price: 18000 },
            { id: 'e12', name: 'Scholarship (full year)', price: 250000 },
        ],
    },
    {
        id: 'pastors', icon: PeopleAltIcon, color: '#8B5CF6',
        title: 'Pastors & Children Support', subtitle: 'Care for Those Who Care for Others',
        items: [
            { id: 'p1', name: "Child Annual School Fees (pastor's child)", price: 150000 },
            { id: 'p2', name: 'Textbooks & Study Materials', price: 20000 },
            { id: 'p3', name: 'WAEC / NECO Exam Fees', price: 35000 },
            { id: 'p4', name: 'Monthly Pastor Support Package', price: 30000 },
            { id: 'p5', name: 'Food & Essentials Care Package', price: 25000 },
            { id: 'p6', name: 'Uniform & Clothing (per child)', price: 18000 },
            { id: 'p7', name: 'Medical Care for Pastor Family', price: 40000 },
            { id: 'p8', name: 'Bible & Ministry Materials', price: 10000 },
        ],
    },
    {
        id: 'training', icon: MenuBookIcon, color: colors.secondary.main,
        title: 'Ministerial Training', subtitle: 'Invest in the Next Generation',
        items: [
            { id: 't1', name: 'Student Scholarship (per student)', price: 100000 },
            { id: 't2', name: 'Laptop for Student Training', price: 350000 },
            { id: 't3', name: 'Computer for E-Library', price: 280000 },
            { id: 't4', name: 'Study Materials & Curriculum Resources', price: 50000 },
            { id: 't5', name: 'Accommodation Complex (per unit)', price: 2000000 },
            { id: 't6', name: 'Projector & AV Equipment', price: 180000 },
            { id: 't7', name: 'Library Books Bundle', price: 75000 },
            { id: 't8', name: 'Internet & Solar Power Setup', price: 420000 },
        ],
    },
];

const SUMMARY_STATS = [
    { value: '6', label: 'Ways to Partner', color: colors.secondary.main },
    { value: '400', label: 'Widows Targeted', color: colors.accent.red },
    { value: '2007', label: 'Serving Since', color: colors.accent.teal },
    { value: '∞', label: 'Lives to Reach', color: '#8B5CF6' },
];

// ─── Utility ──────────────────────────────────────────────────────────────────
const formatNaira = (n) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);

// ─── Qty Stepper ──────────────────────────────────────────────────────────────
function QtyStepper({ qty, onInc, onDec, color }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${color}40`, borderRadius: '8px', overflow: 'hidden' }}>
            <Box component="button" onClick={onDec}
                sx={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: qty > 1 ? `${color}12` : 'transparent', border: 'none', cursor: qty > 1 ? 'pointer' : 'default', color: qty > 1 ? color : `${color}40`, transition: 'all .15s' }}>
                <RemoveIcon sx={{ fontSize: 13 }} />
            </Box>
            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.78rem', fontWeight: 800, color, minWidth: 22, textAlign: 'center' }}>{qty}</Typography>
            <Box component="button" onClick={onInc}
                sx={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: `${color}12`, border: 'none', cursor: 'pointer', color, transition: 'all .15s', '&:hover': { bgcolor: `${color}22` } }}>
                <AddIcon sx={{ fontSize: 13 }} />
            </Box>
        </Box>
    );
}

// ─── Thank You Modal ──────────────────────────────────────────────────────────
function ThankYouModal({ open, total, onClose }) {
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;

    return (
        <Box sx={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            bgcolor: 'rgba(5,10,30,0.72)', backdropFilter: 'blur(8px)',
            animation: 'pt_fadeIn .25s ease both',
        }}>
            <Box sx={{
                width: '100%', maxWidth: 600,
                bgcolor: colors.primary.dark,
                borderRadius: '28px 28px 0 0',
                border: `1px solid rgba(212,160,23,0.2)`,
                p: { xs: 4, sm: 6 },
                pb: { xs: 6, sm: 8 },
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                animation: 'pt_slideUp .4s cubic-bezier(.34,1.2,.64,1) both',
            }}>
                {/* dot grid bg */}
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.06) 1px, transparent 1px)`, backgroundSize: '22px 22px', pointerEvents: 'none' }} />
                {/* glow */}
                <Box sx={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}18 0%,transparent 70%)`, pointerEvents: 'none' }} />

                {/* Close */}
                <Box component="button" onClick={onClose}
                    sx={{ position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' } }}>
                    <CloseIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.6)' }} />
                </Box>

                {/* Heart icon */}
                <Box sx={{ position: 'relative', zIndex: 1, mb: 3 }}>
                    <Box sx={{
                        width: 80, height: 80, borderRadius: '50%',
                        bgcolor: `${colors.secondary.main}18`,
                        border: `2px solid ${colors.secondary.main}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mx: 'auto',
                        animation: 'pt_heartBeat 1.2s ease .3s both',
                    }}>
                        <FavoriteIcon sx={{ fontSize: 38, color: colors.secondary.main }} />
                    </Box>
                </Box>

                {/* Text */}
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography sx={{
                        fontFamily: typography.fontFamily.body,
                        fontSize: '0.7rem', fontWeight: 700,
                        color: colors.secondary.light,
                        letterSpacing: 3, textTransform: 'uppercase',
                        mb: 1.5,
                        opacity: 0,
                        animation: 'pt_thankRise .5s ease .2s both',
                        animationFillMode: 'forwards',
                    }}>
                        Partnership Received
                    </Typography>

                    <Typography sx={{
                        fontFamily: typography.fontFamily.accent,
                        fontSize: { xs: '2.2rem', sm: '2.8rem' },
                        fontWeight: 900, color: 'white',
                        lineHeight: 1.1, mb: 1,
                        opacity: 0,
                        animation: 'pt_thankRise .5s ease .35s both',
                        animationFillMode: 'forwards',
                    }}>
                        Thank You for
                    </Typography>
                    <Typography sx={{
                        fontFamily: typography.fontFamily.accent,
                        fontSize: { xs: '2.2rem', sm: '2.8rem' },
                        fontWeight: 900,
                        lineHeight: 1.1, mb: 3,
                        background: `linear-gradient(120deg,${colors.secondary.dark},${colors.secondary.main},${colors.secondary.light})`,
                        backgroundSize: '200%',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'pt_gradShift 3s ease infinite, pt_thankRise .5s ease .4s both',
                        opacity: 0,
                        animationFillMode: 'forwards',
                    }}>
                        Partnering With Us.
                    </Typography>

                    <Typography sx={{
                        fontFamily: typography.fontFamily.accent,
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        fontWeight: 900,
                        color: 'white',
                        mb: 1,
                        opacity: 0,
                        animation: 'pt_thankRise .5s ease .5s both',
                        animationFillMode: 'forwards',
                    }}>
                        We Love You. ❤️
                    </Typography>

                    <Typography sx={{
                        fontFamily: typography.fontFamily.body,
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.5)',
                        lineHeight: 1.8, maxWidth: 380, mx: 'auto',
                        mb: 3,
                        opacity: 0,
                        animation: 'pt_thankRise .5s ease .6s both',
                        animationFillMode: 'forwards',
                    }}>
                        Your total partnership of{' '}
                        <Box component="span" sx={{ color: colors.secondary.main, fontWeight: 700 }}>{formatNaira(total)}</Box>
                        {' '}goes directly to where it is needed most. God bless you abundantly.
                    </Typography>

                    {/* Divider */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, opacity: 0, animation: 'pt_thankRise .5s ease .65s both', animationFillMode: 'forwards' }}>
                        <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(212,160,23,0.2)' }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase' }}>Jesus Partners Outreach</Typography>
                        <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(212,160,23,0.2)' }} />
                    </Box>

                    <Box component="button" onClick={onClose}
                        sx={{
                            display: 'inline-flex', alignItems: 'center', gap: 1,
                            bgcolor: colors.secondary.main, color: 'white',
                            border: 'none', px: 4, py: 1.5, borderRadius: '10px',
                            fontFamily: typography.fontFamily.heading, fontWeight: 800, fontSize: '0.9rem',
                            cursor: 'pointer',
                            boxShadow: `0 8px 28px ${colors.secondary.main}44`,
                            transition: 'all .3s ease',
                            opacity: 0,
                            animation: 'pt_thankRise .5s ease .75s both',
                            animationFillMode: 'forwards',
                            '&:hover': { opacity: 0.88, transform: 'translateY(-2px)' },
                        }}>
                        <FavoriteBorderIcon sx={{ fontSize: 16 }} /> Close
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

// ─── Select & Pay Modal ───────────────────────────────────────────────────────
function PartnerModal({ open, onClose, onPaid }) {
    const [cart, setCart] = useState({});
    const [activeTab, setActiveTab] = useState(CATALOG[0].id);
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [step, setStep] = useState('select'); // 'select' | 'form'
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) { setCart({}); setStep('select'); setErrors({}); setForm({ name: '', email: '', phone: '' }); }
    }, [open]);

    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const allItems = CATALOG.flatMap(c => c.items.map(i => ({ ...i, catColor: c.color })));

    const toggleItem = (id) => setCart(prev => {
        if (prev[id]) { const n = { ...prev }; delete n[id]; return n; }
        return { ...prev, [id]: 1 };
    });

    const setQty = (id, qty) => {
        if (qty < 1) setCart(prev => { const n = { ...prev }; delete n[id]; return n; });
        else setCart(prev => ({ ...prev, [id]: qty }));
    };

    const cartLines = Object.entries(cart).map(([id, qty]) => {
        const item = allItems.find(i => i.id === id);
        return { ...item, qty, subtotal: item.price * qty };
    });
    const grandTotal = cartLines.reduce((s, l) => s + l.subtotal, 0);
    const cartCount = Object.keys(cart).length;

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Full name is required';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
        if (!form.phone.trim()) e.phone = 'Phone number is required';
        setErrors(e);
        return !Object.keys(e).length;
    };

    const handlePay = () => {
        if (!validate()) return;
        onClose();
        onPaid(grandTotal);
    };

    if (!open) return null;

    const activeCat = CATALOG.find(c => c.id === activeTab);

    return (
        <Box sx={{ position: 'fixed', inset: 0, zIndex: 9000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', bgcolor: 'rgba(5,10,30,0.75)', backdropFilter: 'blur(6px)', animation: 'pt_fadeIn .2s ease both' }}>
            <Box sx={{ width: '100%', maxWidth: 740, maxHeight: '92vh', bgcolor: 'white', borderRadius: '24px 24px 0 0', display: 'flex', flexDirection: 'column', animation: 'pt_slideUp .35s cubic-bezier(.34,1.2,.64,1) both', overflow: 'hidden' }}>

                {step === 'select' && (
                    <>
                        {/* Header */}
                        <Box sx={{ px: 3, pt: 3, pb: 2, borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                                <Box>
                                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.3rem', fontWeight: 900, color: colors.text.primary }}>Choose What to Support</Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.78rem', color: colors.text.secondary, mt: .3 }}>Select one or more items — mix and match across any category</Typography>
                                </Box>
                                <Box component="button" onClick={onClose} sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, ml: 2 }}>
                                    <CloseIcon sx={{ fontSize: 18 }} />
                                </Box>
                            </Box>
                            {/* Category Tabs */}
                            <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: .5, '::-webkit-scrollbar': { display: 'none' } }}>
                                {CATALOG.map(cat => {
                                    const Icon = cat.icon;
                                    const active = activeTab === cat.id;
                                    const catCartCount = cat.items.filter(i => cart[i.id]).length;
                                    return (
                                        <Box key={cat.id} component="button" onClick={() => setActiveTab(cat.id)}
                                            sx={{ display: 'flex', alignItems: 'center', gap: .8, px: 1.5, py: .8, borderRadius: '100px', border: active ? `1.5px solid ${cat.color}` : '1.5px solid rgba(0,0,0,0.12)', bgcolor: active ? `${cat.color}12` : 'transparent', cursor: 'pointer', flexShrink: 0, transition: 'all .2s', position: 'relative' }}>
                                            <Icon sx={{ fontSize: 13, color: active ? cat.color : colors.text.secondary }} />
                                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.7rem', fontWeight: 700, color: active ? cat.color : colors.text.secondary, whiteSpace: 'nowrap' }}>
                                                {cat.title}
                                            </Typography>
                                            {catCartCount > 0 && (
                                                <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.6rem', fontWeight: 900, color: 'white' }}>{catCartCount}</Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>

                        {/* Items Grid */}
                        <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2.5 }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3,1fr)' }, gap: 1.5 }}>
                                {activeCat.items.map(item => {
                                    const selected = !!cart[item.id];
                                    const qty = cart[item.id] || 1;
                                    return (
                                        <Box key={item.id}
                                            sx={{
                                                p: 1.8,
                                                borderRadius: '14px',
                                                border: selected ? `1.5px solid ${activeCat.color}` : '1.5px solid rgba(0,0,0,0.08)',
                                                bgcolor: selected ? `${activeCat.color}08` : 'white',
                                                cursor: 'pointer',
                                                transition: 'all .2s',
                                                position: 'relative',
                                                '&:hover': { border: `1.5px solid ${activeCat.color}60`, bgcolor: `${activeCat.color}05` },
                                            }}
                                            onClick={() => toggleItem(item.id)}
                                        >
                                            {/* Checkmark */}
                                            <Box sx={{ position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderRadius: '5px', border: selected ? `2px solid ${activeCat.color}` : '2px solid rgba(0,0,0,0.15)', bgcolor: selected ? activeCat.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}>
                                                {selected && <CheckCircleOutlineIcon sx={{ fontSize: 11, color: 'white' }} />}
                                            </Box>

                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.78rem', color: colors.text.primary, lineHeight: 1.4, mb: 1, pr: 2.5, fontWeight: selected ? 600 : 400 }}>
                                                {item.name}
                                            </Typography>
                                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.82rem', fontWeight: 900, color: activeCat.color, mb: selected ? 1.2 : 0 }}>
                                                {formatNaira(item.price)}
                                            </Typography>

                                            {selected && (
                                                <Box onClick={e => e.stopPropagation()} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <QtyStepper qty={qty} color={activeCat.color}
                                                        onInc={() => setQty(item.id, qty + 1)}
                                                        onDec={() => setQty(item.id, qty - 1)}
                                                    />
                                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.75rem', fontWeight: 800, color: colors.text.primary }}>
                                                        {formatNaira(item.price * qty)}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>

                        {/* Bottom bar */}
                        <Box sx={{ px: 3, py: 2.5, borderTop: '1px solid rgba(0,0,0,0.07)', bgcolor: 'white', flexShrink: 0 }}>
                            {cartCount > 0 ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: .8 }}>
                                            <ShoppingCartIcon sx={{ fontSize: 14, color: colors.text.secondary }} />
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', color: colors.text.secondary }}>{cartCount} item{cartCount !== 1 ? 's' : ''} selected</Typography>
                                        </Box>
                                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.25rem', fontWeight: 900, color: colors.secondary.main }}>{formatNaira(grandTotal)}</Typography>
                                    </Box>
                                    <Box component="button" onClick={() => setStep('form')}
                                        sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', border: 'none', px: 3, py: 1.4, borderRadius: '10px', fontFamily: typography.fontFamily.heading, fontSize: '0.88rem', fontWeight: 800, cursor: 'pointer', boxShadow: `0 8px 24px ${colors.secondary.main}44`, '&:hover': { opacity: 0.9 } }}>
                                        Continue <ArrowForwardIcon sx={{ fontSize: 15 }} />
                                    </Box>
                                </Box>
                            ) : (
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.8rem', color: colors.text.secondary, textAlign: 'center' }}>
                                    Select at least one item above to continue
                                </Typography>
                            )}
                        </Box>
                    </>
                )}

                {step === 'form' && (
                    <>
                        <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                            <Box>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.2rem', fontWeight: 900, color: colors.text.primary }}>Your Details</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', color: colors.text.secondary }}>Almost there — just a few details</Typography>
                            </Box>
                            <Box component="button" onClick={onClose} sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CloseIcon sx={{ fontSize: 18 }} />
                            </Box>
                        </Box>

                        <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 3 }}>
                            {/* Summary */}
                            <Box sx={{ bgcolor: 'rgba(0,0,0,0.03)', borderRadius: '14px', p: 2.5, mb: 3 }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.7rem', fontWeight: 800, color: colors.text.secondary, textTransform: 'uppercase', letterSpacing: 1.5, mb: 2 }}>Order Summary</Typography>
                                <Stack gap={1.5}>
                                    {cartLines.map(line => (
                                        <Box key={line.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flex: 1 }}>
                                                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: line.catColor, flexShrink: 0, mt: .5 }} />
                                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.8rem', color: colors.text.primary, lineHeight: 1.4 }}>{line.name}</Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.72rem', color: colors.text.secondary }}>×{line.qty}</Typography>
                                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.82rem', fontWeight: 800, color: colors.text.primary }}>{formatNaira(line.subtotal)}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Stack>
                                <Box sx={{ borderTop: '1px dashed rgba(0,0,0,0.1)', mt: 2, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography sx={{ fontFamily: typography.fontFamily.heading, fontWeight: 800, color: colors.text.primary }}>Total</Typography>
                                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '1.3rem', fontWeight: 900, color: colors.secondary.main }}>{formatNaira(grandTotal)}</Typography>
                                </Box>
                            </Box>

                            {/* Fields */}
                            {[
                                { key: 'name', label: 'Full Name', placeholder: 'Your full name', type: 'text' },
                                { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
                                { key: 'phone', label: 'Phone Number', placeholder: '+234 800 000 0000', type: 'tel' },
                            ].map(({ key, label, placeholder, type }) => (
                                <Box key={key} sx={{ mb: 2 }}>
                                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.8rem', fontWeight: 600, color: colors.text.primary, mb: .75 }}>{label}</Typography>
                                    <Box component="input" type={type} value={form[key]} placeholder={placeholder}
                                        onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); if (errors[key]) setErrors(err => ({ ...err, [key]: '' })); }}
                                        sx={{ width: '100%', height: 46, borderRadius: '10px', border: errors[key] ? '1.5px solid #ef4444' : '1.5px solid rgba(0,0,0,0.15)', px: 2, fontFamily: typography.fontFamily.body, fontSize: '0.88rem', color: colors.text.primary, outline: 'none', transition: 'border .2s', boxSizing: 'border-box', '&:focus': { border: `1.5px solid ${colors.secondary.main}` }, '&::placeholder': { color: 'rgba(0,0,0,0.3)' } }}
                                    />
                                    {errors[key] && <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.7rem', color: '#ef4444', mt: .5 }}>{errors[key]}</Typography>}
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ px: 3, py: 2.5, borderTop: '1px solid rgba(0,0,0,0.07)', display: 'flex', gap: 2, flexShrink: 0 }}>
                            <Box component="button" onClick={() => setStep('select')}
                                sx={{ flex: 1, height: 48, borderRadius: '10px', border: '1.5px solid rgba(0,0,0,0.15)', bgcolor: 'transparent', fontFamily: typography.fontFamily.heading, fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', color: colors.text.secondary }}>
                                ← Back
                            </Box>
                            <Box component="button" onClick={handlePay}
                                sx={{ flex: 2, height: 48, borderRadius: '10px', bgcolor: colors.secondary.main, color: 'white', border: 'none', fontFamily: typography.fontFamily.heading, fontWeight: 800, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, boxShadow: `0 8px 24px ${colors.secondary.main}44`, '&:hover': { opacity: 0.9 } }}>
                                <FavoriteIcon sx={{ fontSize: 15 }} /> Partner — {formatNaira(grandTotal)}
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PartnerPage() {
    const [heroRef, heroVis] = useReveal(0.05);
    const [statsRef, statsVis] = useReveal();
    const [areasRef, areasVis] = useReveal();
    const [quoteRef, quoteVis] = useReveal();
    const [ctaRef, ctaVis] = useReveal();

    const [partnerOpen, setPartnerOpen] = useState(false);
    const [thankOpen, setThankOpen] = useState(false);
    const [paidTotal, setPaidTotal] = useState(0);

    const handlePaid = useCallback((total) => {
        setPaidTotal(total);
        setThankOpen(true);
    }, []);

    return (
        <>
            <GlobalStyles styles={keyframes} />

            <PartnerModal open={partnerOpen} onClose={() => setPartnerOpen(false)} onPaid={handlePaid} />
            <ThankYouModal open={thankOpen} total={paidTotal} onClose={() => setThankOpen(false)} />

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
                                Here is what we are given to doing — and we request that you partner with us to do more and better. Every area of our work needs your prayers, your giving, and your partnership.
                            </Typography>
                            <Stack direction="row" gap={2} flexWrap="wrap" sx={{ opacity: heroVis ? 1 : 0, animation: heroVis ? 'pt_rise .7s ease .34s both' : 'none' }}>
                                <Box component="button" onClick={() => setPartnerOpen(true)}
                                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, bgcolor: colors.secondary.main, color: 'white', px: 3.5, py: 1.6, borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                    <FavoriteIcon sx={{ fontSize: 16 }} /> Partner Now
                                </Box>
                                <Box component="a" href="#areas"
                                    sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.18)', px: 3.5, py: 1.6, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.14)', transform: 'translateY(-2px)' } }}>
                                    See Areas <ArrowForwardIcon sx={{ fontSize: 16 }} />
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

            {/* ══ SUMMARY STATS ══ */}
            <Box ref={statsRef} sx={{ bgcolor: colors.background.default, py: { xs: 7, md: 10 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 3, md: 2 } }}>
                        {SUMMARY_STATS.map((s, i) => (
                            <Box key={s.label} sx={{ textAlign: 'center', bgcolor: 'white', borderRadius: '20px', p: { xs: 2.5, md: 3.5 }, border: `1px solid ${colors.divider}`, opacity: statsVis ? 1 : 0, animation: statsVis ? `pt_countUp .6s ease ${i * .1}s both` : 'none', transition: 'transform .3s ease, box-shadow .3s', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 20px 50px rgba(10,16,40,0.1), 0 0 0 1px ${s.color}30` } }}>
                                <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, color: colors.text.secondary, fontWeight: 600, mt: .5, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ══ PARTNERSHIP AREAS — Grid layout, NO alternating ══ */}
            <Box id="areas" ref={areasRef} sx={{ bgcolor: 'white', py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${colors.divider} 1px, transparent 1px)`, backgroundSize: '24px 24px', opacity: .5, pointerEvents: 'none' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

                    {/* Section Header */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 7, md: 10 }, opacity: areasVis ? 1 : 0, animation: areasVis ? 'pt_rise .6s ease both' : 'none' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.xs, fontWeight: 700, color: colors.secondary.main, letterSpacing: 2.5, textTransform: 'uppercase' }}>Partnership Areas</Typography>
                            <Box sx={{ width: 28, height: 3, borderRadius: 2, bgcolor: colors.secondary.main }} />
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.12, mb: 1.5 }}>
                            Six Ways to Partner
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, maxWidth: 520, mx: 'auto', lineHeight: 1.85 }}>
                            Choose what resonates with your heart. Every item is listed with its cost — click <strong>Partner Now</strong> and select exactly what you want to give.
                        </Typography>
                    </Box>

                    {/* 6-area sections, each with a 4-4-4 item grid */}
                    <Stack gap={{ xs: 8, md: 12 }}>
                        {CATALOG.map((area, i) => {
                            const Icon = area.icon;
                            return (
                                <Box key={area.id} sx={{ opacity: areasVis ? 1 : 0, animation: areasVis ? `pt_rise .7s ease ${i * .07}s both` : 'none' }}>

                                    {/* Area label row — icon + title only, no long text */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                        <Box sx={{ width: 44, height: 44, borderRadius: '14px', bgcolor: `${area.color}14`, border: `1.5px solid ${area.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Icon sx={{ fontSize: 22, color: area.color }} />
                                        </Box>
                                        <Box>
                                            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.2rem', md: '1.45rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.1 }}>{area.title}</Typography>
                                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 700, color: area.color, textTransform: 'uppercase', letterSpacing: 1.8 }}>{area.subtitle}</Typography>
                                        </Box>
                                        {/* Accent line */}
                                        <Box sx={{ flex: 1, height: '1px', bgcolor: `${area.color}20`, ml: 1, display: { xs: 'none', sm: 'block' } }} />
                                    </Box>

                                    {/* Items — 3-col grid */}
                                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }, gap: { xs: 1.5, md: 2 }, mb: 3.5 }}>
                                        {area.items.map(item => (
                                            <Box key={item.id}
                                                sx={{
                                                    p: { xs: 1.8, md: 2.2 },
                                                    borderRadius: '14px',
                                                    border: `1px solid ${area.color}20`,
                                                    bgcolor: `${area.color}05`,
                                                    transition: 'all .2s',
                                                    '&:hover': { border: `1px solid ${area.color}50`, bgcolor: `${area.color}0C`, transform: 'translateY(-3px)', boxShadow: `0 8px 24px ${area.color}18` },
                                                }}>
                                                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: { xs: '0.78rem', md: '0.82rem' }, color: colors.text.primary, lineHeight: 1.45, mb: 1.5, minHeight: 42 }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: { xs: '0.88rem', md: '0.95rem' }, fontWeight: 900, color: area.color }}>
                                                    {formatNaira(item.price)}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>

                                    {/* Single Partner Now button per area */}
                                    <Box component="button" onClick={() => { setPartnerOpen(true); }}
                                        sx={{
                                            display: 'inline-flex', alignItems: 'center', gap: 1,
                                            bgcolor: area.color, color: 'white',
                                            px: 3, py: 1.35, borderRadius: '10px', border: 'none', cursor: 'pointer',
                                            fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800,
                                            boxShadow: `0 8px 22px ${area.color}38`,
                                            transition: 'all .3s cubic-bezier(.34,1.2,.64,1)',
                                            '&:hover': { transform: 'translateY(-3px) scale(1.04)', boxShadow: `0 14px 32px ${area.color}50` },
                                        }}>
                                        <FavoriteIcon sx={{ fontSize: 15 }} /> Partner Now
                                    </Box>
                                </Box>
                            );
                        })}
                    </Stack>
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
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.9rem', md: '2.6rem' }, fontWeight: 900, color: 'white', lineHeight: 1.12, mb: 1.5 }}>
                            Ready to Partner With Us?
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.55)', mb: 4, maxWidth: 480, mx: 'auto', lineHeight: 1.85 }}>
                            Whether through prayer, giving or hands-on involvement — your partnership makes it possible for us to do more and better.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="center">
                            <Box component="button" onClick={() => setPartnerOpen(true)}
                                sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.secondary.main, color: 'white', border: 'none', px: 4, py: 1.7, borderRadius: '10px', cursor: 'pointer', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, boxShadow: `0 8px 28px ${colors.secondary.main}44`, transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-4px) scale(1.04)' } }}>
                                <FavoriteIcon sx={{ fontSize: 16 }} /> Partner Now
                            </Box>
                            <Box component={Link} to="/contact"
                                sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', px: 4, py: 1.7, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, backdropFilter: 'blur(8px)', transition: 'all .3s ease', '&:hover': { bgcolor: 'rgba(255,255,255,0.18)', transform: 'translateY(-4px)' } }}>
                                Contact Us <ArrowForwardIcon sx={{ fontSize: 16 }} />
                            </Box>
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </>
    );
}