import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import ScrollToTop from '../components/ScrollToTop';

export default function MainLayout() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* <ScrollToTop /> */}
            <Navbar />
            <Box component="main" sx={{ flex: 1 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}