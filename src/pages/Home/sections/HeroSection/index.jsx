import { Box, Container, Stack, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChurchIcon from '@mui/icons-material/Church';
import { typography } from '../../../../theme';
import {
    keyframes, heroWrapSx, bgImgSx, overlayLayersSx, decoCircleSx,
    particleSx, contentWrapSx, eyebrowSx, eyebrowDotSx, eyebrowTextSx,
    titleSx, titleGoldSx, subtitleSx, wordGoldSx, dividerLineSx,
    taglineSx, btnPrimarySx, btnSecSx, scrollIndicatorSx, statsRowSx, statItemSx,
} from './styles';

const PARTICLES = [
    { left: '10%', delay: 0, dur: 6 },
    { left: '25%', delay: 1.5, dur: 8 },
    { left: '42%', delay: 0.8, dur: 7 },
    { left: '60%', delay: 2.2, dur: 9 },
    { left: '75%', delay: 0.3, dur: 6.5 },
    { left: '88%', delay: 1.8, dur: 7.5 },
];
export default function HeroSection() {
    return (
        <>
            <GlobalStyles styles={keyframes} />
            <Box sx={heroWrapSx}>

                <Box sx={bgImgSx} />

                {overlayLayersSx.map((sx, i) => <Box key={i} sx={sx} />)}

                <Box sx={decoCircleSx(300, '-8%', undefined, '-6%', undefined, 0)} />
                <Box sx={decoCircleSx(200, undefined, undefined, '-4%', '5%', 1.5)} />
                <Box sx={decoCircleSx(150, '20%', undefined, undefined, '-5%', 0.8)} />

                {PARTICLES.map((p, i) => <Box key={i} sx={particleSx(p.left, p.delay, p.dur)} />)}

                <Container maxWidth="lg">
                    <Box sx={contentWrapSx}>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 0 }}>
                            <Box sx={eyebrowSx}>
                                <Box sx={eyebrowDotSx} />
                                <Typography sx={eyebrowTextSx}>Incorporated in Nigeria · Serving Since 2007</Typography>
                            </Box>
                        </Box>

                        <Typography sx={titleSx}>
                            Jesus Partners{' '}
                            <Box component="span" sx={titleGoldSx}>Outreach</Box>
                        </Typography>

                        <Typography sx={subtitleSx}>
                            Sharing the Love of Christ in{' '}
                            <Box component="span" sx={wordGoldSx}>Practical Ways!</Box>
                        </Typography>

                        <Box sx={dividerLineSx} />

                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={8} justifyContent="center" marginTop={7} alignItems="center">
                            <Box component={Link} to="/partners" sx={btnPrimarySx}>
                                <FavoriteIcon sx={{ fontSize: 17 }} />
                                Partner With Us
                            </Box>
                            <Box component={Link} to="/whatwedo" sx={btnSecSx}>
                                <PlayCircleIcon sx={{ fontSize: 17 }} />
                                What We Do
                            </Box>
                        </Stack>
                    </Box>
                </Container>

                <Box sx={scrollIndicatorSx} onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', letterSpacing: 2.5, textTransform: 'uppercase' }}>
                        Scroll
                    </Typography>
                    <KeyboardArrowDownIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.45)' }} />
                </Box>

            </Box>
        </>
    );
}