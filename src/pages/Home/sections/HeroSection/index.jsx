import { Box, Container, Stack, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { typography } from '../../../../theme';
import {
    keyframes, heroWrapSx, overlayLayersSx, decoCircleSx,
    particleSx, contentWrapSx, eyebrowSx, eyebrowDotSx, eyebrowTextSx,
    titleSx, titleGoldSx, subtitleSx, wordGoldSx, dividerLineSx,
    btnPrimarySx, btnSecSx, scrollIndicatorSx,
} from './styles';

const PARTICLES = [
    { left: '10%', delay: 0,   dur: 6   },
    { left: '25%', delay: 1.5, dur: 8   },
    { left: '42%', delay: 0.8, dur: 7   },
    { left: '60%', delay: 2.2, dur: 9   },
    { left: '75%', delay: 0.3, dur: 6.5 },
    { left: '88%', delay: 1.8, dur: 7.5 },
];

const GALLERY_IMAGES = [79, 72, 51];

const DISPLAY_SECS  = 20;                            // how long each image is visible
const FADE_SECS     = 1.5;                           // crossfade duration
const TOTAL         = GALLERY_IMAGES.length;
const CYCLE         = TOTAL * DISPLAY_SECS;          // 5 × 20 = 100s full cycle

/*
  Animation per layer — keyframes as percentages of the full cycle:
    0%           → invisible (opacity 0)
    fade-in end  → fully visible (opacity 1)
    hold end     → still visible (opacity 1)
    fade-out end → invisible again (opacity 0)
    100%         → invisible (opacity 0)
*/
const bgSlideKeyframe = (index) => {
    const fadeInStart  = (index * DISPLAY_SECS) / CYCLE * 100;
    const fadeInEnd    = ((index * DISPLAY_SECS) + FADE_SECS) / CYCLE * 100;
    const fadeOutStart = ((index + 1) * DISPLAY_SECS - FADE_SECS) / CYCLE * 100;
    const fadeOutEnd   = ((index + 1) * DISPLAY_SECS) / CYCLE * 100;

    // clamp to 100
    const clamp = (v) => Math.min(v, 100);

    return {
        '0%':                              { opacity: index === 0 ? 1 : 0 },
        [`${clamp(fadeInStart).toFixed(2)}%`]:  { opacity: index === 0 ? 1 : 0 },
        [`${clamp(fadeInEnd).toFixed(2)}%`]:    { opacity: 1 },
        [`${clamp(fadeOutStart).toFixed(2)}%`]: { opacity: 1 },
        [`${clamp(fadeOutEnd).toFixed(2)}%`]:   { opacity: 0 },
        '100%':                            { opacity: 0 },
    };
};

// Build a unique keyframe name + sx for each image layer
const buildLayerSx = (imgNum, index) => {
    const kfName = `hero_bg_${index}`;
    return {
        kfName,
        kf: { [`@keyframes ${kfName}`]: bgSlideKeyframe(index) },
        sx: {
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(/img/gallery/img${imgNum}.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: index === 0 ? 1 : 0,
            animation: `${kfName} ${CYCLE}s linear infinite`,
            animationDelay: '0s',
            willChange: 'opacity',
            zIndex: 0,
        },
    };
};

const LAYERS = GALLERY_IMAGES.map((num, i) => buildLayerSx(num, i));

// Merge all keyframes into one object
const allKeyframes = LAYERS.reduce((acc, l) => ({ ...acc, ...l.kf }), {});

export default function HeroSection() {
    return (
        <>
            <GlobalStyles styles={{ ...keyframes, ...allKeyframes }} />
            <Box sx={heroWrapSx}>

                {/* Background image layers */}
                {LAYERS.map((layer, i) => (
                    <Box key={GALLERY_IMAGES[i]} sx={layer.sx} />
                ))}

                {/* Overlays */}
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