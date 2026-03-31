import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Sidebar from '../components/Sidebar';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#111827' }}>
            <AdminNavbar onMenuToggle={() => setSidebarOpen(o => !o)} />
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <Box sx={{ ml: { xs: 0, md: '240px' }, pt: '56px', minHeight: '100vh', bgcolor: '#111827' }}>
                <Outlet />
            </Box>
        </Box>
    );
}