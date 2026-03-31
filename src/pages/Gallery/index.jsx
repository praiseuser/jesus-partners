import { Box, Container, Typography } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { colors, typography } from '../../theme';

export default function GalleryPage() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: colors.background.default, pt: { xs: 14, md: 16 }, pb: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '60vh', gap: 3 }}>
                    <Box sx={{ width: 80, height: 80, borderRadius: '24px', bgcolor: `${colors.accent.purple}18`, border: `2px solid ${colors.accent.purple}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <PhotoLibraryIcon sx={{ fontSize: 40, color: colors.accent.purple }} />
                    </Box>
                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.8rem', md: '4rem' }, fontWeight: 900, color: colors.primary.main, lineHeight: 1.1 }}>
                        Gallery
                    </Typography>
                    <Box sx={{ width: 60, height: 4, borderRadius: 2, background: `linear-gradient(90deg,${colors.accent.purple},${colors.secondary.light})` }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, maxWidth: 440, lineHeight: 1.9 }}>
                        This page will be managed from the admin dashboard. Content coming soon.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}