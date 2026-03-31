import { Box, Container, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { colors, typography } from '../../theme';

export default function ProgramsPage() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: colors.background.default, pt: { xs: 14, md: 16 }, pb: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '60vh', gap: 3 }}>
                    <Box sx={{ width: 80, height: 80, borderRadius: '24px', bgcolor: `${colors.accent.teal}18`, border: `2px solid ${colors.accent.teal}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CategoryIcon sx={{ fontSize: 40, color: colors.accent.teal }} />
                    </Box>
                    <Typography sx={{ fontFamily: typography.fontFamily.accent, fontSize: { xs: '2.8rem', md: '4rem' }, fontWeight: 900, color: colors.primary.main, lineHeight: 1.1 }}>
                        Programs
                    </Typography>
                    <Box sx={{ width: 60, height: 4, borderRadius: 2, background: `linear-gradient(90deg,${colors.accent.teal},${colors.secondary.light})` }} />
                    <Typography sx={{ fontFamily: typography.fontFamily.body, fontSize: typography.fontSize.base, color: colors.text.secondary, maxWidth: 440, lineHeight: 1.9 }}>
                        This page will be managed from the admin dashboard. Content coming soon.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}