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
  headerRowSx, labelRowSx, labelBarSx, labelTextSx, titleSx, introSx,
  progGridSx, progCardSx, progIconSx, progTitleSx, progDescSx, seeAllBtnSx,
  subscribeSx, subDotGridSx, subLayoutSx, subChipSx, subChipTextSx,
  subTitleSx, subQuoteSx, subFormCardSx, subInputSx, subBtnSx,
} from './styles';

const PROGRAMMES = [
  { icon: CampaignIcon, color: colors.secondary.main, title: 'Gospel Crusades & Revivals', desc: 'City-wide and local crusades, street outreaches and follow-up of new believers across Nigeria and beyond.' },
  { icon: VolunteerActivismIcon, color: colors.accent.teal, title: 'Widows & Orphans Outreach', desc: 'Meals, fellowship, financial support, clothing and food sharing — targeting 400 widows and orphans of persecution.' },
  { icon: LocalHospitalIcon, color: colors.accent.red, title: 'Medical Outreaches', desc: 'Bringing healthcare to displaced and vulnerable communities in IDP camps and underserved areas as God provides.' },
  { icon: SchoolIcon, color: colors.accent.green, title: 'Education Assistance', desc: 'Boarding school placement at Heavens Colony Academy — tuition, trauma counselling, meals and Christian nurturing.' },
  { icon: PeopleAltIcon, color: '#8B5CF6', title: 'Pastors & Children Support', desc: 'Tuition, books and external exams support for ministers\' children; practical care for pastors in hardship.' },
  { icon: MenuBookIcon, color: colors.secondary.main, title: 'Ministerial Training', desc: 'Scholarships, laptops, study materials and accommodation at Grace College of Evangelism & Missions, Abuja.' },
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

const ProgCard = ({ prog, i, vis }) => {
  const Icon = prog.icon;
  return (
    <Box sx={{ ...progCardSx(prog.color, i * 0.08), animationPlayState: vis ? 'running' : 'paused' }}>
      <Box className="prog-icon" sx={progIconSx(prog.color)}>
        <Icon />
      </Box>
      <Box>
        <Typography component="h3" sx={progTitleSx}>{prog.title}</Typography>
        <Typography sx={progDescSx}>{prog.desc}</Typography>
      </Box>
    </Box>
  );
};

export default function DiscipleshipSection() {
  const [headRef, headVis] = useReveal();
  const [gridRef, gridVis] = useReveal();
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

          {/* Header: title left, intro + button right */}
          <Box ref={headRef} sx={{ ...headerRowSx, opacity: headVis ? 1 : 0, animation: headVis ? 'ds_rise .6s ease both' : 'none' }}>
            <Box>
              <Box sx={labelRowSx}>
                <Box sx={labelBarSx} />
                <Typography sx={labelTextSx}>What We Do</Typography>
              </Box>
              <Typography component="h2" sx={titleSx}>Our Key Programmes</Typography>
            </Box>

            <Box>
              <Typography sx={{ ...introSx, mb: 3 }}>
                From crusades and revivals to widows, orphans, medical outreaches and ministerial training —
                partnering with Jesus to share His love in practical ways across Nigeria and beyond.
              </Typography>
              <Box component={Link} to="/whatwedo" sx={seeAllBtnSx}>
                See All Programmes <ArrowForwardIcon sx={{ fontSize: 20 }} />
              </Box>
            </Box>
          </Box>

          {/* Programme cards: 2-column grid */}
          <Box ref={gridRef} sx={progGridSx}>
            {PROGRAMMES.map((prog, i) => (
              <ProgCard key={prog.title} prog={prog} i={i} vis={gridVis} />
            ))}
          </Box>

        </Container>
      </Box>

      {/* Subscribe strip */}
      <Box sx={subscribeSx}>
        <Box sx={subDotGridSx} />
        <Box sx={{ position: 'absolute', top: '-40%', left: '-5%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: '-30%', right: '-4%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(212,160,23,0.08)', filter: 'blur(35px)', pointerEvents: 'none' }} />

        <Container maxWidth="lg">
          <Box sx={subLayoutSx}>

            {/* Left: message */}
            <Box>
              <Box sx={subChipSx}>
                <MailOutlineIcon sx={{ fontSize: 20, color: colors.secondary.light }} />
                <Typography sx={subChipTextSx}>Stay Connected</Typography>
              </Box>
              <Typography component="h2" sx={subTitleSx}>Partner With Jesus Partners Outreach</Typography>
              <Typography sx={subQuoteSx}>
                "Subscribe to receive updates on our crusades, outreaches and how you can partner with us."
              </Typography>
            </Box>

            {/* Right: form card */}
            <Box sx={subFormCardSx}>
              {subscribed ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 140, bgcolor: 'rgba(39,174,96,0.18)', border: '1px solid rgba(39,174,96,0.45)', borderRadius: '16px', px: 3, py: 3 }}>
                  <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1.2rem', fontWeight: 800, color: '#4ADE80', lineHeight: 1.5 }}>
                    ✓ You're subscribed! Welcome to the family 🙌
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box component="input" type="email" placeholder="Enter your email address..."
                    aria-label="Email address"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                    sx={subInputSx}
                  />
                  <Box component="button" type="button" onClick={handleSubscribe} sx={subBtnSx}>
                    <SendIcon sx={{ fontSize: 20 }} />
                    Subscribe
                  </Box>
                </>
              )}

              <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.95rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', mt: 2, textAlign: 'center' }}>
                No spam. Unsubscribe anytime. We respect your privacy.
              </Typography>
            </Box>

          </Box>
        </Container>
      </Box>
    </>
  );
}