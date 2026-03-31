import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { colors, typography } from '../../theme';

export default function NotFoundPage() {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: colors.background.default, gap: 2, textAlign: 'center', px: 3 }}>
            <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: '6rem', fontWeight: 900, color: colors.primary.light, lineHeight: 1 }}>404</Typography>
            <Typography sx={{ fontFamily: typography.fontFamily.heading, fontSize: '1.5rem', fontWeight: 800, color: colors.text.primary }}>Page Not Found</Typography>
            <Typography sx={{ fontFamily: typography.fontFamily.body, color: colors.text.secondary }}>The page you are looking for does not exist.</Typography>
            <Box component={Link} to="/" sx={{ mt: 2, bgcolor: colors.secondary.main, color: 'white', px: 4, py: 1.5, borderRadius: '10px', textDecoration: 'none', fontFamily: typography.fontFamily.heading, fontWeight: 700 }}>
                Back to Home
            </Box>
        </Box>
    );
}