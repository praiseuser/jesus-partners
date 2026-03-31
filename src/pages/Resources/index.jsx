import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import LibraryBooksIcon     from '@mui/icons-material/LibraryBooks';
import HeadsetIcon          from '@mui/icons-material/Headset';
import VideocamIcon         from '@mui/icons-material/Videocam';
import MenuBookIcon         from '@mui/icons-material/MenuBook';
import DownloadIcon         from '@mui/icons-material/Download';
import ArrowForwardIcon     from '@mui/icons-material/ArrowForward';
import PlayArrowIcon        from '@mui/icons-material/PlayArrow';
import SearchIcon           from '@mui/icons-material/Search';
import { colors, typography } from '../../theme';

const keyframes = {
  '@keyframes rs_rise':     { from:{ opacity:0, transform:'translateY(36px) scale(0.96)' }, to:{ opacity:1, transform:'none' } },
  '@keyframes rs_shimmer':  { from:{ left:'-80%' }, to:{ left:'130%' } },
  '@keyframes rs_glow':     { '0%,100%':{ opacity:.35 }, '50%':{ opacity:.7 } },
  '@keyframes rs_gradShift':{ '0%,100%':{ backgroundPosition:'0% 50%' }, '50%':{ backgroundPosition:'100% 50%' } },
  '@keyframes rs_float':    { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-8px)' } },
};

const TYPES = [
  { key:'all',   label:'All',         icon:LibraryBooksIcon, color:colors.secondary.main  },
  { key:'audio', label:'Audio',       icon:HeadsetIcon,      color:colors.accent.teal     },
  { key:'video', label:'Video',       icon:VideocamIcon,     color:'#8B5CF6'              },
  { key:'study', label:'Bible Study', icon:MenuBookIcon,     color:colors.accent.green    },
  { key:'ebook', label:'eBooks',      icon:DownloadIcon,     color:colors.accent.red      },
];

const RESOURCES = [
  { id:1, type:'audio', title:'Faith That Moves Mountains', desc:'A powerful audio teaching on operating in mountain-moving faith in your daily life.', author:'Pastor JPO', duration:'42 min', color:colors.accent.teal,  icon:HeadsetIcon  },
  { id:2, type:'video', title:'Possessing Your Possession', desc:'Video message on how to take hold of every blessing God has already provided for you.', author:'Pastor JPO', duration:'58 min', color:'#8B5CF6',           icon:VideocamIcon },
  { id:3, type:'study', title:'Gospel of John — Series 1', desc:'An in-depth Bible study series walking through the profound revelations in the Gospel of John.', author:'Admin',      duration:'6 parts', color:colors.accent.green, icon:MenuBookIcon },
  { id:4, type:'audio', title:'The Power of Partnership with Jesus', desc:'Understanding what it truly means to be a partner with Jesus in the great commission.', author:'Pastor JPO', duration:'35 min', color:colors.accent.teal,  icon:HeadsetIcon  },
  { id:5, type:'ebook', title:'Partnering with Jesus — eBook', desc:'A comprehensive guide to walking in covenant relationship with Jesus as your senior partner.', author:'Admin',      duration:'PDF',     color:colors.accent.red,   icon:DownloadIcon },
  { id:6, type:'video', title:'Revival Fire — Conference 2024', desc:'Full conference recording from our 2024 Revival Fire gathering across the nations.', author:'Pastor JPO', duration:'1h 20min', color:'#8B5CF6',          icon:VideocamIcon },
];

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

const ResourceCard = ({ item, delay }) => {
  const Icon = item.icon;
  const isPlay = item.type === 'audio' || item.type === 'video';
  return (
    <Box sx={{
      bgcolor:'#1E2535', borderRadius:'20px',
      border:`1px solid rgba(255,255,255,0.07)`,
      overflow:'hidden', display:'flex', flexDirection:'column',
      opacity:0, animation:`rs_rise .6s cubic-bezier(.34,1.2,.64,1) ${delay}s forwards`,
      transition:'transform .35s cubic-bezier(.34,1.2,.64,1), box-shadow .3s, border-color .3s',
      '&:hover':{ transform:'translateY(-10px)', boxShadow:`0 28px 60px rgba(0,0,0,0.4), 0 0 0 1px ${item.color}33`, borderColor:`${item.color}33` },
      position:'relative',
      '&::before':{ content:'""', position:'absolute', top:0, bottom:0, width:'55%', left:'-80%', zIndex:10, pointerEvents:'none', background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.08) 50%,transparent 70%)' },
      '&:hover::before':{ animation:'rs_shimmer .6s ease forwards' },
    }}>
      {/* colored top bar */}
      <Box sx={{ height:3, background:`linear-gradient(90deg,${item.color},${item.color}55)` }} />

      {/* icon area */}
      <Box sx={{ height:120, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden', bgcolor:`${item.color}0D` }}>
        <Box sx={{ position:'absolute', inset:0, background:`radial-gradient(circle at 50% 50%, ${item.color}18 0%, transparent 70%)`, animation:'rs_glow 5s ease infinite' }} />
        <Box sx={{ width:60, height:60, borderRadius:'18px', bgcolor:`${item.color}20`, border:`1.5px solid ${item.color}35`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1, animation:'rs_float 4s ease-in-out infinite' }}>
          <Icon sx={{ fontSize:28, color:item.color }} />
        </Box>
        {/* duration badge */}
        <Box sx={{ position:'absolute', bottom:10, right:12, bgcolor:'rgba(0,0,0,0.55)', backdropFilter:'blur(8px)', border:`1px solid rgba(255,255,255,0.1)`, borderRadius:'6px', px:1.2, py:.3 }}>
          <Typography sx={{ fontFamily:typography.fontFamily.body, fontSize:'0.62rem', fontWeight:700, color:'rgba(255,255,255,0.8)' }}>{item.duration}</Typography>
        </Box>
      </Box>

      {/* body */}
      <Box sx={{ p:2.5, display:'flex', flexDirection:'column', flex:1 }}>
        <Box sx={{ display:'inline-flex', alignItems:'center', gap:.6, bgcolor:`${item.color}15`, border:`1px solid ${item.color}25`, borderRadius:'100px', px:1.4, py:.35, mb:1.5, width:'fit-content' }}>
          <Icon sx={{ fontSize:9, color:item.color }} />
          <Typography sx={{ fontFamily:typography.fontFamily.body, fontSize:'0.58rem', fontWeight:700, color:item.color, letterSpacing:1.5, textTransform:'uppercase' }}>
            {TYPES.find(t => t.key === item.type)?.label}
          </Typography>
        </Box>

        <Typography sx={{ fontFamily:typography.fontFamily.heading, fontSize:typography.fontSize.sm, fontWeight:800, color:'white', lineHeight:1.4, mb:1, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {item.title}
        </Typography>
        <Typography sx={{ fontFamily:typography.fontFamily.body, fontSize:'0.78rem', color:'rgba(255,255,255,0.45)', lineHeight:1.75, flex:1, mb:2.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
          {item.desc}
        </Typography>

        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mt:'auto' }}>
          <Typography sx={{ fontFamily:typography.fontFamily.body, fontSize:'0.68rem', color:'rgba(255,255,255,0.3)', fontWeight:600 }}>
            {item.author}
          </Typography>
          <Box sx={{ display:'inline-flex', alignItems:'center', gap:.6, bgcolor:item.color, color:'white', px:1.8, py:.7, borderRadius:'8px', cursor:'pointer', fontFamily:typography.fontFamily.heading, fontSize:'0.68rem', fontWeight:700, transition:'all .25s ease', '&:hover':{ filter:'brightness(1.15)', transform:'translateY(-2px)' } }}>
            {isPlay ? <PlayArrowIcon sx={{ fontSize:13 }} /> : <DownloadIcon sx={{ fontSize:13 }} />}
            {isPlay ? 'Play' : 'Download'}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default function ResourcesPage() {
  const [ref, vis] = useReveal();
  const [activeType, setActiveType] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = RESOURCES.filter(r =>
    (activeType === 'all' || r.type === activeType) &&
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <GlobalStyles styles={keyframes} />

      {/* ── Hero ── */}
      <Box sx={{ bgcolor:'#0D1117', pt:{ xs:14, md:16 }, pb:{ xs:6, md:8 }, position:'relative', overflow:'hidden' }}>
        <Box sx={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(rgba(212,160,23,0.05) 1px, transparent 1px)`, backgroundSize:'24px 24px', pointerEvents:'none' }} />
        <Box sx={{ position:'absolute', top:'-20%', right:'-5%', width:450, height:450, borderRadius:'50%', background:`radial-gradient(circle,${colors.accent.teal}10 0%,transparent 70%)`, pointerEvents:'none', animation:'rs_glow 7s ease infinite' }} />
        <Box sx={{ position:'absolute', bottom:'-15%', left:'-4%', width:350, height:350, borderRadius:'50%', background:`radial-gradient(circle,${colors.secondary.main}0D 0%,transparent 70%)`, pointerEvents:'none' }} />

        <Container maxWidth="lg" sx={{ position:'relative', zIndex:1 }}>
          <Box sx={{ animation:'rs_rise .6s ease both' }}>
            <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:'rgba(212,160,23,0.1)', border:'1px solid rgba(212,160,23,0.25)', borderRadius:'100px', px:2.2, py:.7, mb:2.5 }}>
              <LibraryBooksIcon sx={{ fontSize:13, color:colors.secondary.light }} />
              <Typography sx={{ fontFamily:typography.fontFamily.body, fontSize:'0.65rem', fontWeight:700, color:colors.secondary.light, letterSpacing:2.5, textTransform:'uppercase' }}>
                Resource Library
              </Typography>
            </Box>
            <Typography sx={{ fontFamily:typography.fontFamily.accent, fontSize:{ xs:'2.2rem', md:'3.2rem' }, fontWeight:900, color:'white', lineHeight:1.1, mb:1.5 }}>
              Equip Your{' '}
              <Box component="span" sx={{ background:`linear-gradient(120deg,${colors.secondary.main},${colors.secondary.light})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'rs_gradShift 4s ease infinite', backgroundSize:'200%' }}>
                Faith.
              </Box>
            </Typography>
            <Typography sx={{ fontFamily:typography.fontFamily.body, fontSize:typography.fontSize.base, color:'rgba(255,255,255,0.45)', maxWidth:460, lineHeight:1.85 }}>
              Audio messages, video teachings, Bible study series and more — all free to access.
            </Typography>
          </Box>
        </Container>

        {/* wave */}
        <Box sx={{ position:'absolute', bottom:-1, left:0, right:0, lineHeight:0, zIndex:2 }}>
          <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', display:'block' }}>
            <path d="M0,25 C360,50 720,0 1080,30 C1260,44 1380,14 1440,25 L1440,50 L0,50 Z" fill={colors.background.default} />
          </svg>
        </Box>
      </Box>

      {/* ── Content ── */}
      <Box sx={{ bgcolor:colors.background.default, py:{ xs:5, md:7 } }}>
        <Container maxWidth="lg">

          {/* Search + type filter */}
          <Box ref={ref} sx={{ display:'flex', flexDirection:{ xs:'column', sm:'row' }, gap:2, mb:{ xs:4, md:6 }, alignItems:{ sm:'center' }, flexWrap:'wrap', opacity:vis ? 1 : 0, animation:vis ? 'rs_rise .6s ease both' : 'none' }}>
            <Box sx={{ position:'relative', maxWidth:320 }}>
              <SearchIcon sx={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', fontSize:17, color:colors.text.disabled, pointerEvents:'none' }} />
              <Box component="input" placeholder="Search resources..."
                value={search} onChange={e => setSearch(e.target.value)}
                sx={{ width:'100%', boxSizing:'border-box', pl:4.5, pr:2, py:1.3, bgcolor:'white', border:`1.5px solid ${colors.divider}`, borderRadius:'10px', fontFamily:typography.fontFamily.body, fontSize:'0.875rem', color:colors.text.primary, outline:'none', transition:'border-color .25s', '&:focus':{ borderColor:colors.secondary.main }, '&::placeholder':{ color:colors.text.disabled } }}
              />
            </Box>
            <Stack direction="row" gap={1} flexWrap="wrap">
              {TYPES.map(t => {
                const Icon = t.icon;
                const active = activeType === t.key;
                return (
                  <Box key={t.key} onClick={() => setActiveType(t.key)} sx={{ display:'inline-flex', alignItems:'center', gap:.7, px:1.8, py:.8, borderRadius:'100px', cursor:'pointer', fontFamily:typography.fontFamily.body, fontSize:'0.75rem', fontWeight:600, border:'1.5px solid', bgcolor: active ? t.color : 'white', color: active ? 'white' : colors.text.secondary, borderColor: active ? t.color : colors.divider, transition:'all .22s cubic-bezier(.34,1.2,.64,1)', '&:hover':{ transform:'translateY(-2px)' } }}>
                    <Icon sx={{ fontSize:13 }} />
                    {t.label}
                  </Box>
                );
              })}
            </Stack>
          </Box>

          {/* Grid */}
          {filtered.length > 0 ? (
            <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'1fr', sm:'1fr 1fr', lg:'repeat(3,1fr)' }, gap:3 }}>
              {filtered.map((item, i) => <ResourceCard key={item.id} item={item} delay={0.08 + i * 0.07} />)}
            </Box>
          ) : (
            <Box sx={{ textAlign:'center', py:{ xs:8, md:12 } }}>
              <LibraryBooksIcon sx={{ fontSize:64, color:colors.divider, mb:2 }} />
              <Typography sx={{ fontFamily:typography.fontFamily.heading, fontSize:typography.fontSize.xl, fontWeight:800, color:colors.text.primary, mb:1 }}>Nothing found</Typography>
              <Typography sx={{ fontFamily:typography.fontFamily.body, color:colors.text.secondary, mb:3 }}>Try a different filter or search term.</Typography>
              <Box onClick={() => { setSearch(''); setActiveType('all'); }} sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:colors.primary.main, color:'white', px:3, py:1.3, borderRadius:'10px', cursor:'pointer', fontFamily:typography.fontFamily.heading, fontWeight:600, fontSize:typography.fontSize.sm }}>
                Clear filters
              </Box>
            </Box>
          )}

        </Container>
      </Box>
    </>
  );
}