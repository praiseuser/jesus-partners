import { Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { colors, typography } from '../../theme';

export default function AdminDashboardPage() {
  return (
    <Box sx={{ p:{ xs:3, md:4 } }}>
      <Typography sx={{ fontFamily:typography.fontFamily.accent, fontSize:{ xs:'1.8rem', md:'2.4rem' }, fontWeight:900, color:'white', mb:0.5 }}>
        Admin Dashboard
      </Typography>
      <Typography sx={{ fontFamily:typography.fontFamily.body, fontSize:typography.fontSize.sm, color:'rgba(255,255,255,0.4)', mb:4 }}>
        Welcome back, Jesus Boi 👋
      </Typography>
    </Box>
  );
}