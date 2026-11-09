import { Box, Container, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { typography } from '../../../../theme';
import {
    keyframes, heroWrapSx, overlayLayersSx, contentWrapSx,
    eyebrowSx, eyebrowLineSx, eyebrowTextSx,
    titleSx, titleGoldSx, subtitleSx, wordGoldSx, dividerLineSx,
    buttonsRowSx, btnPrimarySx, btnSecSx,
    scrollIndicatorSx, scrollTrackSx, scrollDotSx,
} from './styles';

const GALLERY_IMAGES = [79, 72, 51];

const DISPLAY_SECS = 20;
const FADE_SECS = 1.5;
const TOTAL = GALLERY_IMAGES.length;
const CYCLE = TOTAL * DISPLAY_SECS;

const bgSlideKeyframe = (index) => {
    const fadeInStart = (index * DISPLAY_SECS) / CYCLE * 100;
    const fadeInEnd = ((index * DISPLAY_SECS) + FADE_SECS) / CYCLE * 100;
    const fadeOutStart = ((index + 1) * DISPLAY_SECS - FADE_SECS) / CYCLE * 100;
    const fadeOutEnd = ((index + 1) * DISPLAY_SECS) / CYCLE * 100;

    const clamp = (v) => Math.min(v, 100);

    return {
        '0%': { opacity: index === 0 ? 1 : 0 },
        [`${clamp(fadeInStart).toFixed(2)}%`]: { opacity: index === 0 ? 1 : 0 },
        [`${clamp(fadeInEnd).toFixed(2)}%`]: { opacity: 1 },
        [`${clamp(fadeOutStart).toFixed(2)}%`]: { opacity: 1 },
        [`${clamp(fadeOutEnd).toFixed(2)}%`]: { opacity: 0 },
        '100%': { opacity: 0 },
    };
};

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
            // crossfade + a slow gentle zoom so the photos feel alive
            animation: `${kfName} ${CYCLE}s linear infinite, hero_zoom 26s ease-in-out infinite alternate`,
            willChange: 'opacity, transform',
            zIndex: 0,
        },
    };
};

const LAYERS = GALLERY_IMAGES.map((num, i) => buildLayerSx(num, i));
const allKeyframes = LAYERS.reduce((acc, l) => ({ ...acc, ...l.kf }), {});

export default function HeroSection() {
    return (
        <>
            <GlobalStyles styles={{ ...keyframes, ...allKeyframes }} />
            <Box sx={heroWrapSx}>

                {LAYERS.map((layer, i) => (
                    <Box key={GALLERY_IMAGES[i]} sx={layer.sx} />
                ))}

                {overlayLayersSx.map((sx, i) => <Box key={i} sx={sx} />)}

                <Container maxWidth="lg">
                    <Box sx={contentWrapSx}>

                        <Box sx={eyebrowSx}>
                            <Box sx={eyebrowLineSx} />
                            <Typography sx={eyebrowTextSx}>Incorporated in Nigeria · Serving Since 2007</Typography>
                            <Box sx={eyebrowLineSx} />
                        </Box>

                        <Typography component="h1" sx={titleSx}>
                            Jesus Partners
                            <Box component="span" sx={titleGoldSx}>Outreach</Box>
                        </Typography>

                        <Typography sx={subtitleSx}>
                            Sharing the Love of Christ in{' '}
                            <Box component="span" sx={wordGoldSx}>Practical Ways!</Box>
                        </Typography>

                        <Box sx={dividerLineSx} />

                        <Box sx={buttonsRowSx}>
                            <Box component={Link} to="/about" sx={btnPrimarySx}>
                                <FavoriteIcon sx={{ fontSize: 20 }} />
                                Who We Are
                            </Box>
                            <Box component={Link} to="/whatwedo" sx={btnSecSx}>
                                <PlayCircleIcon sx={{ fontSize: 20 }} />
                                What We Do
                            </Box>
                        </Box>
                    </Box>
                </Container>

                <Box sx={scrollIndicatorSx} onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 2.5, textTransform: 'uppercase' }}>
                        Scroll
                    </Typography>
                    <Box sx={scrollTrackSx}>
                        <Box sx={scrollDotSx} />
                    </Box>
                </Box>

            </Box>
        </>
    );
}