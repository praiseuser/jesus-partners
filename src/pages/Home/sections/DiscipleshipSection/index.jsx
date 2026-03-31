import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon  from '@mui/icons-material/ArrowForward';
import MenuBookIcon      from '@mui/icons-material/MenuBook';
import HeadsetIcon       from '@mui/icons-material/Headset';
import VideocamIcon      from '@mui/icons-material/Videocam';
import MailOutlineIcon   from '@mui/icons-material/MailOutline';
import SendIcon          from '@mui/icons-material/Send';
import AutoStoriesIcon   from '@mui/icons-material/AutoStories';
import { colors, typography } from '../../../../theme';
import {
  keyframes, wrapSx, bgSx, orbSx,
  sectionLabelSx, labelAccentSx, labelTextSx,
  gridSx, toolCardSx, toolIconWrapSx, toolTitleSx, toolDescSx, toolBtnSx,
  emptyStateSx, subscribeSx, subDotGridSx, subInputWrapSx, subInputSx, subBtnSx,
} from './styles';

const TOOLS = [
  {
    icon: MenuBookIcon, color: colors.secondary.main,
    title: 'Daily Devotionals',
    desc: 'Start every day grounded in the Word. Our devotionals are designed to feed your spirit and strengthen your walk with God.',
    link: '/resources', delay: 0.1,
  },
  {
    icon: HeadsetIcon, color: colors.accent.teal,
    title: 'Audio Sermons',
    desc: 'Listen to powerful messages from our ministers on the go — faith-building sermons for every season of life.',
    link: '/resources', delay: 0.2,
  },
  {
    icon: VideocamIcon, color: colors.accent.red,
    title: 'Video Messages',
    desc: 'Watch life-transforming video teachings that will deepen your understanding of the scriptures.',
    link: '/resources', delay: 0.3,
  },
];

const useReveal = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.07 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
};

export default function DiscipleshipSection() {
  const [ref, vis] = useReveal();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
    setEmail('');
  };

  return (
    <>
      <GlobalStyles styles={keyframes} />

      <Box sx={wrapSx}>
        <Box sx={bgSx} />
        <Box sx={orbSx('-15%', '-6%', undefined, undefined, 350, `${colors.accent.teal}0C`)} />
        <Box sx={orbSx(undefined, undefined, '-10%', '-5%', 280, `${colors.secondary.main}0A`)} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>

          <Box ref={ref} sx={{ opacity: vis ? 1 : 0, animation: vis ? 'ds_rise .6s ease both' : 'none' }}>
            <Box sx={sectionLabelSx}>
              <Box sx={labelAccentSx} />
              <Box>
                <Typography sx={labelTextSx}>Evangelism &</Typography>
                <Typography sx={labelTextSx}>Discipleship Tools</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, mt: 1.5, maxWidth: 500, lineHeight: 1.8 }}>
              Resources to equip believers, fuel evangelism and deepen discipleship across every nation.
            </Typography>
          </Box>

          <Box sx={gridSx}>
            {TOOLS.length > 0
              ? TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Box key={tool.title} sx={toolCardSx(tool.delay)}>
                      <Box sx={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${tool.color},${tool.color}55)` }} />
                      <Box sx={toolIconWrapSx(tool.color)}>
                        <Icon sx={{ fontSize: 28, color: tool.color }} />
                      </Box>
                      <Typography sx={toolTitleSx}>{tool.title}</Typography>
                      <Typography sx={toolDescSx}>{tool.desc}</Typography>
                      <Box component={Link} to={tool.link} sx={toolBtnSx(tool.color)}>
                        Explore <ArrowForwardIcon sx={{ fontSize: 14 }} />
                      </Box>
                    </Box>
                  );
                })
              : (
                <Box sx={emptyStateSx}>
                  <AutoStoriesIcon sx={{ fontSize: 56, color: colors.divider, mb: 2 }} />
                  <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.md, fontWeight: 800, color: colors.text.disabled, mb: 0.5 }}>
                    No devotional found
                  </Typography>
                  <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.sm, color: colors.text.disabled }}>
                    Check back soon — new resources are being added.
                  </Typography>
                </Box>
              )
            }
          </Box>

        </Container>
      </Box>

      <Box sx={subscribeSx}>
        <Box sx={subDotGridSx} />
        <Box sx={{ position:'absolute', top:'-40%', left:'-5%', width:300, height:300, borderRadius:'50%', background:'rgba(255,255,255,0.04)', filter:'blur(40px)', pointerEvents:'none' }} />
        <Box sx={{ position:'absolute', bottom:'-30%', right:'-4%', width:250, height:250, borderRadius:'50%', background:`rgba(212,160,23,0.08)`, filter:'blur(35px)', pointerEvents:'none' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box sx={{ display:'inline-flex', alignItems:'center', gap:1, bgcolor:'rgba(212,160,23,0.15)', border:'1px solid rgba(212,160,23,0.3)', borderRadius:'100px', px:2.5, py:.8, mb:3 }}>
            <MailOutlineIcon sx={{ fontSize: 15, color: colors.secondary.light }} />
            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize:'0.7rem', fontWeight:700, color: colors.secondary.light, letterSpacing:2, textTransform:'uppercase' }}>
              Stay Connected
            </Typography>
          </Box>

          <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize:{ xs:'1.7rem', md:'2.2rem' }, fontWeight:900, color:'white', lineHeight:1.15, mb:1.5 }}>
            Subscribe to the Riches of Christ
          </Typography>
          <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color:'rgba(255,255,255,0.6)', mb:3.5, maxWidth:440, mx:'auto', lineHeight:1.8, fontStyle:'italic' }}>
            "To enrich your life, faith and destiny."
          </Typography>

          {subscribed ? (
            <Box sx={{ display:'inline-flex', alignItems:'center', gap:1.5, bgcolor:'rgba(39,174,96,0.2)', border:'1px solid rgba(39,174,96,0.4)', borderRadius:'12px', px:3, py:1.5 }}>
              <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight:700, color:'#27AE60' }}>
                ✓ You're subscribed! Welcome to the family 🙌
              </Typography>
            </Box>
          ) : (
            <Box sx={subInputWrapSx}>
              <Box component="input" placeholder="Enter your email address..."
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                sx={subInputSx}
              />
              <Box component="button" onClick={handleSubscribe} sx={subBtnSx}>
                <SendIcon sx={{ fontSize: 16 }} />
                Subscribe
              </Box>
            </Box>
          )}

          <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize:'0.68rem', color:'rgba(255,255,255,0.3)', mt:2 }}>
            No spam. Unsubscribe anytime. We respect your privacy.
          </Typography>
        </Container>
      </Box>
    </>
  );
}