import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { colors, typography } from '../../theme';

/* ── keyframes ── */
const keyframes = {
    '@keyframes bl_rise': { from: { opacity: 0, transform: 'translateY(40px) scale(0.96)' }, to: { opacity: 1, transform: 'none' } },
    '@keyframes bl_shimmer': { from: { left: '-80%' }, to: { left: '130%' } },
    '@keyframes bl_pulse': { '0%,100%': { boxShadow: `0 0 0 0 ${colors.secondary.main}44` }, '50%': { boxShadow: `0 0 0 10px ${colors.secondary.main}00` } },
    '@keyframes bl_gradShift': { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
    '@keyframes bl_glow': { '0%,100%': { opacity: .4 }, '50%': { opacity: .75 } },
};

/* ── dummy data — replace with API call from admin ── */
const BLOGS = [
    {
        id: 1, featured: true,
        category: 'Word of God', categoryColor: colors.secondary.main,
        title: 'The man departed, and told the Jews that it was Jesus, which had made him whole.',
        excerpt: 'A powerful testimony of healing and the transforming power of encountering Jesus personally. When we encounter the living Word, nothing remains the same — bodies heal, minds are renewed, and destinies are realigned.',
        author: 'Pastor JPO', date: 'January 15, 2025', readTime: '5 min read',
        img: null, ref: 'John 5:15',
    },
    {
        id: 2, featured: false,
        category: 'Evangelism', categoryColor: colors.primary.light,
        title: 'Reaching Nations: How the Gospel is Spreading Across Africa',
        excerpt: 'A recap of our global outreach activities and the thousands of lives touched across 50+ nations through the power of the Gospel.',
        author: 'Admin', date: 'February 3, 2025', readTime: '4 min read',
        img: null, ref: null,
    },
    {
        id: 3, featured: false,
        category: 'Discipleship', categoryColor: colors.accent.teal,
        title: 'Walking in Your Identity as a Child of God',
        excerpt: 'Many believers live below their privileges. This article explores what it means to truly walk in the fullness of who God has called you to be.',
        author: 'Pastor JPO', date: 'February 18, 2025', readTime: '6 min read',
        img: null, ref: 'Romans 8:14',
    },
    {
        id: 4, featured: false,
        category: 'Faith', categoryColor: colors.accent.red,
        title: 'Possessing Your Possession — Faith That Acts',
        excerpt: 'Faith without works is dead. Discover how to move from intellectual belief to active, possessing faith that brings heaven to earth.',
        author: 'Admin', date: 'March 1, 2025', readTime: '7 min read',
        img: null, ref: 'James 2:17',
    },
    {
        id: 5, featured: false,
        category: 'Prayer', categoryColor: colors.accent.green,
        title: 'The Power of Partnering with Jesus in Prayer',
        excerpt: 'Prayer is not a monologue — it is a conversation. Learn how to partner with Jesus in intercession and see breakthrough in every area of life.',
        author: 'Pastor JPO', date: 'March 10, 2025', readTime: '5 min read',
        img: null, ref: 'John 15:7',
    },
];

const CATEGORIES = ['All', 'Word of God', 'Evangelism', 'Discipleship', 'Faith', 'Prayer'];

const useReveal = () => {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold: 0.05 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, vis];
};

/* ── Featured Card ── */
const FeaturedCard = ({ post }) => (
    <Box sx={{
        bgcolor: 'white', borderRadius: '24px',
        border: `1px solid ${colors.divider}`,
        overflow: 'hidden', mb: 4,
        display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        animation: 'bl_rise .7s cubic-bezier(.34,1.2,.64,1) .1s both',
        transition: 'transform .35s cubic-bezier(.34,1.2,.64,1), box-shadow .3s',
        '&:hover': { transform: 'translateY(-8px)', boxShadow: `0 32px 70px rgba(10,16,40,0.13)` },
    }}>
        {/* Image side */}
        <Box sx={{ bgcolor: colors.primary.dark, minHeight: { xs: 220, md: 320 }, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${colors.secondary.main}20 0%, transparent 70%)` }} />
            <Box sx={{ position: 'absolute', width: '110%', height: '110%', borderRadius: '50%', border: `1px dashed rgba(212,160,23,0.15)`, animation: 'bl_gradShift 20s linear infinite', pointerEvents: 'none' }} />
            <ArticleIcon sx={{ fontSize: 90, color: `${colors.secondary.main}30`, position: 'relative', zIndex: 1 }} />
            {/* Featured badge */}
            <Box sx={{ position: 'absolute', top: 16, left: 16, display: 'inline-flex', alignItems: 'center', gap: .8, bgcolor: 'rgba(212,160,23,0.9)', borderRadius: '8px', px: 1.8, py: .6 }}>
                <NewReleasesIcon sx={{ fontSize: 13, color: 'white' }} />
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.62rem', fontWeight: 800, color: 'white', letterSpacing: 1.5, textTransform: 'uppercase' }}>Featured</Typography>
            </Box>
        </Box>
        {/* Content side */}
        <Box sx={{ p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: .7, bgcolor: `${post.categoryColor}15`, border: `1px solid ${post.categoryColor}30`, borderRadius: '100px', px: 1.8, py: .5, mb: 2, width: 'fit-content' }}>
                <LocalOfferIcon sx={{ fontSize: 11, color: post.categoryColor }} />
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.65rem', fontWeight: 700, color: post.categoryColor, letterSpacing: 1.5, textTransform: 'uppercase' }}>{post.category}</Typography>
            </Box>
            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 900, color: colors.text.primary, lineHeight: 1.3, mb: 1.5 }}>
                {post.title}
            </Typography>
            {post.ref && <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.75rem', fontWeight: 700, color: colors.secondary.main, mb: 1.5, letterSpacing: .5 }}>— {post.ref}</Typography>}
            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.secondary, lineHeight: 1.85, mb: 3 }}>{post.excerpt}</Typography>
            <Stack direction="row" alignItems="center" gap={2} sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" gap={.6}>
                    <PersonIcon sx={{ fontSize: 13, color: colors.text.disabled }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.72rem', color: colors.text.secondary, fontWeight: 600 }}>{post.author}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={.6}>
                    <AccessTimeIcon sx={{ fontSize: 13, color: colors.text.disabled }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.72rem', color: colors.text.secondary }}>{post.readTime}</Typography>
                </Stack>
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.72rem', color: colors.text.disabled }}>{post.date}</Typography>
            </Stack>
            <Box component={Link} to={`/blog/${post.id}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.primary.main, color: 'white', px: 3, py: 1.4, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, width: 'fit-content', transition: 'all .3s cubic-bezier(.34,1.2,.64,1)', '&:hover': { bgcolor: colors.primary.light, transform: 'translateY(-2px)', boxShadow: `0 8px 24px ${colors.primary.main}44` } }}>
                Read Full Article <ArrowForwardIcon sx={{ fontSize: 15 }} />
            </Box>
        </Box>
    </Box>
);

/* ── Regular Card ── */
const BlogCard = ({ post, delay }) => (
    <Box sx={{
        bgcolor: 'white', borderRadius: '20px', border: `1px solid ${colors.divider}`,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        opacity: 0, animation: `bl_rise .6s cubic-bezier(.34,1.2,.64,1) ${delay}s forwards`,
        transition: 'transform .35s cubic-bezier(.34,1.2,.64,1), box-shadow .3s, border-color .3s',
        '&:hover': { transform: 'translateY(-10px)', boxShadow: `0 28px 60px rgba(10,16,40,0.13)`, borderColor: `${post.categoryColor}40` },
        position: 'relative',
        '&::before': { content: '""', position: 'absolute', top: 0, bottom: 0, width: '55%', left: '-80%', zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.55) 50%,transparent 70%)' },
        '&:hover::before': { animation: 'bl_shimmer .6s ease forwards' },
    }}>
        {/* top color bar */}
        <Box sx={{ height: 4, background: `linear-gradient(90deg,${post.categoryColor},${post.categoryColor}55)` }} />
        {/* image placeholder */}
        <Box sx={{ height: 160, bgcolor: `${colors.primary.dark}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${post.categoryColor}15 0%, transparent 70%)` }} />
            <ArticleIcon sx={{ fontSize: 60, color: `${post.categoryColor}35`, position: 'relative', zIndex: 1 }} />
        </Box>
        <Box sx={{ p: 2.8, display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: .6, bgcolor: `${post.categoryColor}12`, border: `1px solid ${post.categoryColor}25`, borderRadius: '100px', px: 1.5, py: .4, mb: 1.8, width: 'fit-content' }}>
                <LocalOfferIcon sx={{ fontSize: 10, color: post.categoryColor }} />
                <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.6rem', fontWeight: 700, color: post.categoryColor, letterSpacing: 1.5, textTransform: 'uppercase' }}>{post.category}</Typography>
            </Box>
            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 800, color: colors.text.primary, lineHeight: 1.4, mb: 1, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.title}
            </Typography>
            {post.ref && <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.68rem', fontWeight: 700, color: colors.secondary.main, mb: 1, letterSpacing: .5 }}>— {post.ref}</Typography>}
            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.78rem', color: colors.text.secondary, lineHeight: 1.75, mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {post.excerpt}
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 'auto' }}>
                <Stack direction="row" alignItems="center" gap={1.5}>
                    <Stack direction="row" alignItems="center" gap={.5}>
                        <PersonIcon sx={{ fontSize: 12, color: colors.text.disabled }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.68rem', color: colors.text.secondary, fontWeight: 600 }}>{post.author}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={.5}>
                        <AccessTimeIcon sx={{ fontSize: 12, color: colors.text.disabled }} />
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.68rem', color: colors.text.secondary }}>{post.readTime}</Typography>
                    </Stack>
                </Stack>
                <Box component={Link} to={`/blog/${post.id}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: .5, color: post.categoryColor, textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontSize: '0.72rem', fontWeight: 700, transition: 'gap .2s ease', '&:hover': { gap: 1 } }}>
                    Read <ArrowForwardIcon sx={{ fontSize: 13 }} />
                </Box>
            </Stack>
        </Box>
    </Box>
);

export default function BlogPage() {
    const [ref, vis] = useReveal();
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const featured = BLOGS.find(b => b.featured);
    const filtered = BLOGS.filter(b => !b.featured).filter(b =>
        (activeCategory === 'All' || b.category === activeCategory) &&
        (b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {/* ── Hero banner ── */}
            <Box sx={{ bgcolor: colors.primary.dark, pt: { xs: 14, md: 16 }, pb: { xs: 6, md: 8 }, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(rgba(212,160,23,0.06) 1px, transparent 1px)`, backgroundSize: '26px 26px', pointerEvents: 'none' }} />
                <Box sx={{ position: 'absolute', top: '-20%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${colors.secondary.main}12 0%,transparent 70%)`, pointerEvents: 'none', animation: 'bl_glow 6s ease infinite' }} />
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ animation: 'bl_rise .6s ease both' }}>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.3)', borderRadius: '100px', px: 2.5, py: .8, mb: 2.5 }}>
                            <ArticleIcon sx={{ fontSize: 14, color: colors.secondary.light }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.68rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2.5, textTransform: 'uppercase' }}>Our Blog</Typography>
                        </Box>
                        <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.4rem', md: '3.4rem' }, fontWeight: 900, color: 'white', lineHeight: 1.1, mb: 1.5 }}>
                            Word. Faith.{' '}
                            <Box component="span" sx={{ background: `linear-gradient(120deg,${colors.secondary.main},${colors.secondary.light})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                Life.
                            </Box>
                        </Typography>
                        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.55)', maxWidth: 500, lineHeight: 1.85 }}>
                            Insights, teachings and testimonies to strengthen your faith and deepen your walk with God.
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

            {/* ── Main content ── */}
            <Box sx={{ bgcolor: colors.background.default, py: { xs: 5, md: 8 } }}>
                <Container maxWidth="lg">

                    {/* Search + filter bar */}
                    <Box ref={ref} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: { xs: 4, md: 6 }, alignItems: { sm: 'center' }, opacity: vis ? 1 : 0, animation: vis ? 'bl_rise .6s ease both' : 'none' }}>
                        {/* Search */}
                        <Box sx={{ position: 'relative', flex: 1, maxWidth: 380 }}>
                            <SearchIcon sx={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: colors.text.disabled, pointerEvents: 'none' }} />
                            <Box component="input" placeholder="Search articles..."
                                value={search} onChange={e => setSearch(e.target.value)}
                                sx={{ width: '100%', boxSizing: 'border-box', pl: 5, pr: 2, py: 1.4, bgcolor: 'white', border: `1.5px solid ${colors.divider}`, borderRadius: '10px', fontFamily: typography.fontFamily.body, fontSize: '0.875rem', color: colors.text.primary, outline: 'none', transition: 'border-color .25s', '&:focus': { borderColor: colors.secondary.main }, '&::placeholder': { color: colors.text.disabled } }}
                            />
                        </Box>
                        {/* Category chips */}
                        <Stack direction="row" gap={1} flexWrap="wrap">
                            {CATEGORIES.map(cat => (
                                <Box key={cat} onClick={() => setActiveCategory(cat)} sx={{ px: 2, py: .8, borderRadius: '100px', cursor: 'pointer', fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 600, border: '1.5px solid', bgcolor: activeCategory === cat ? colors.primary.main : 'white', color: activeCategory === cat ? 'white' : colors.text.secondary, borderColor: activeCategory === cat ? colors.primary.main : colors.divider, transition: 'all .22s cubic-bezier(.34,1.2,.64,1)', '&:hover': { transform: 'translateY(-2px)' } }}>
                                    {cat}
                                </Box>
                            ))}
                        </Stack>
                    </Box>

                    {featured && activeCategory === 'All' && !search && <FeaturedCard post={featured} />}


                    {filtered.length > 0 ? (
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3,1fr)' }, gap: 3 }}>
                            {filtered.map((post, i) => <BlogCard key={post.id} post={post} delay={0.1 + i * 0.08} />)}
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}>
                            <ArticleIcon sx={{ fontSize: 64, color: colors.divider, mb: 2 }} />
                            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.xl, fontWeight: 800, color: colors.text.primary, mb: 1 }}>No articles found</Typography>
                            <Typography sx={{ fontFamily: typography.fontFamily.body, color: colors.text.secondary, mb: 3 }}>Try a different search or category.</Typography>
                            <Box onClick={() => { setSearch(''); setActiveCategory('All'); }} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: colors.primary.main, color: 'white', px: 3, py: 1.3, borderRadius: '10px', cursor: 'pointer', fontFamily: typography.fontFamily.heading, fontWeight: 600, fontSize: typography.fontSize.sm, '&:hover': { bgcolor: colors.primary.light } }}>
                                Clear filters
                            </Box>
                        </Box>
                    )}

                </Container>
            </Box>
        </>
    );
}