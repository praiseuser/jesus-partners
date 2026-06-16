import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendIcon from '@mui/icons-material/Send';
import CampaignIcon from '@mui/icons-material/Campaign';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { colors, typography } from '../../../../theme';
import {
  keyframes, wrapSx, bgSx, orbSx,
  sectionLabelSx, labelAccentSx, labelTextSx,
  subscribeSx, subDotGridSx, subInputWrapSx, subInputSx, subBtnSx,
} from './styles';

const PROGRAMMES = [
  { icon: CampaignIcon,          color: colors.secondary.main, title: 'Gospel Crusades & Revivals',  desc: 'City-wide and local crusades, street outreaches and follow-up of new believers across Nigeria and beyond.' },
  { icon: VolunteerActivismIcon, color: colors.accent.teal,    title: 'Widows & Orphans Outreach',   desc: 'Meals, fellowship, financial support, clothing and food sharing — targeting 400 widows and orphans of persecution.' },
  { icon: LocalHospitalIcon,     color: colors.accent.red,     title: 'Medical Outreaches',           desc: 'Bringing healthcare to displaced and vulnerable communities in IDP camps and underserved areas as God provides.' },
  { icon: SchoolIcon,            color: colors.accent.green,   title: 'Education Assistance',         desc: 'Boarding school placement at Heavens Colony Academy — tuition, trauma counselling, meals and Christian nurturing.' },
  { icon: PeopleAltIcon,         color: '#8B5CF6',             title: 'Pastors & Children Support',  desc: 'Tuition, books and external exams support for ministers\' children; practical care for pastors in hardship.' },
  { icon: MenuBookIcon,          color: colors.secondary.main, title: 'Ministerial Training',         desc: 'Scholarships, laptops, study materials and accommodation at Grace College of Evangelism & Missions, Abuja.' },
];

const LEFT  = PROGRAMMES.slice(0, 3);
const RIGHT = PROGRAMMES.slice(3);

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

const ProgItem = ({ prog, i, vis }) => {
  const Icon = prog.icon;
  return (
    <Box sx={{
      display: 'flex', alignItems: 'flex-start', gap: 1.8,
      py: 1.8, px: 1.5,
      borderBottom: i < 2 ? `1px solid rgba(255,255,255,0.06)` : 'none',
      borderRadius: '10px',
      transition: 'background .25s ease',
      opacity: vis ? 1 : 0,
      animation: vis ? `ds_rise .6s ease ${i * 0.1}s both` : 'none',
      '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' },
    }}>
      {/* Small icon box */}
      <Box sx={{ width: 32, height: 32, borderRadius: '9px', bgcolor: `${prog.color}18`, border: `1.5px solid ${prog.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: '2px' }}>
        <Icon sx={{ fontSize: 15, color: prog.color }} />
      </Box>
      {/* Text */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.3 }}>
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: prog.color, flexShrink: 0 }} />
          <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '0.82rem', fontWeight: 800, color: colors.secondary.main }}>
            {prog.title}
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.76rem', color: colors.text.secondary, lineHeight: 1.7, pl: '13px' }}>
          {prog.desc}
        </Typography>
      </Box>
    </Box>
  );
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

          {/* Header */}
          <Box ref={ref} sx={{ opacity: vis ? 1 : 0, animation: vis ? 'ds_rise .6s ease both' : 'none', mb: 4 }}>
            <Box sx={sectionLabelSx}>
              <Box sx={labelAccentSx} />
              <Box>
                <Typography sx={labelTextSx}>What We Do</Typography>
                <Typography sx={labelTextSx}>Our Key Programmes</Typography>
              </Box>
            </Box>
            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, mt: 1.5, maxWidth: 500, lineHeight: 1.8 }}>
              From crusades and revivals to widows, orphans, medical outreaches and ministerial training —
              partnering with Jesus to share His love in practical ways across Nigeria and beyond.
            </Typography>
          </Box>

          {/* 6-6 Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 0, md: 4 }, mb: 4 }}>
            {/* Left col — items 1-3 */}
            <Box>
              {LEFT.map((prog, i) => <ProgItem key={prog.title} prog={prog} i={i} vis={vis} />)}
            </Box>
            {/* Right col — items 4-6 */}
            <Box>
              {RIGHT.map((prog, i) => <ProgItem key={prog.title} prog={prog} i={i} vis={vis} />)}
            </Box>
          </Box>

          {/* Learn More button */}
          <Box sx={{ opacity: vis ? 1 : 0, animation: vis ? 'ds_rise .7s ease .3s both' : 'none' }}>
            <Box component={Link} to="/whatwedo" sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              bgcolor: colors.secondary.main, color: 'white',
              px: 3.5, py: 1.5, borderRadius: '10px',
              textDecoration: 'none',
              fontFamily: typography.fontFamily.heading,
              fontSize: typography.fontSize.sm, fontWeight: 800,
              boxShadow: `0 8px 28px ${colors.secondary.main}44`,
              transition: 'all .3s cubic-bezier(.34,1.2,.64,1)',
              '&:hover': { transform: 'translateY(-3px) scale(1.04)', boxShadow: `0 16px 40px ${colors.secondary.main}55` }
            }}>
              See All Programmes <ArrowForwardIcon sx={{ fontSize: 15 }} />
            </Box>
          </Box>

        </Container>
      </Box>

      {/* Subscribe strip */}
      <Box sx={subscribeSx}>
        <Box sx={subDotGridSx} />
        <Box sx={{ position: 'absolute', top: '-40%', left: '-5%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-30%', right: '-4%', width: 250, height: 250, borderRadius: '50%', background: `rgba(212,160,23,0.08)`, filter: 'blur(35px)', pointerEvents: 'none' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.3)', borderRadius: '100px', px: 2.5, py: .8, mb: 3 }}>
            <MailOutlineIcon sx={{ fontSize: 15, color: colors.secondary.light }} />
            <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.7rem', fontWeight: 700, color: colors.secondary.light, letterSpacing: 2, textTransform: 'uppercase' }}>
              Stay Connected
            </Typography>
          </Box>

          <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '1.7rem', md: '2.2rem' }, fontWeight: 900, color: 'white', lineHeight: 1.15, mb: 1.5 }}>
            Partner With Jesus Partners Outreach
          </Typography>
          <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: 'rgba(255,255,255,0.6)', mb: 3.5, maxWidth: 440, mx: 'auto', lineHeight: 1.8, fontStyle: 'italic' }}>
            "Subscribe to receive updates on our crusades, outreaches and how you can partner with us."
          </Typography>

          {subscribed ? (
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, bgcolor: 'rgba(39,174,96,0.2)', border: '1px solid rgba(39,174,96,0.4)', borderRadius: '12px', px: 3, py: 1.5 }}>
              <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: typography.fontSize.sm, fontWeight: 700, color: '#27AE60' }}>
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

          <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', mt: 2 }}>
            No spam. Unsubscribe anytime. We respect your privacy.
          </Typography>
        </Container>
      </Box>
    </>
  );
}