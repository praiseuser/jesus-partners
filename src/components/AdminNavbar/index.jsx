import { Box, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import GridViewIcon from '@mui/icons-material/GridView';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { keyframes, navbarSx, logoAreaSx, logoImgSx, tickerWrapSx, tickerTextSx, middleAreaSx, navLinkSx, rightAreaSx, iconBtnSx, logoutBtnSx } from './styles';

export default function AdminNavbar({ onMenuToggle }) {
    return (
        <>
            <GlobalStyles styles={keyframes} />
            <Box sx={navbarSx}>

                <Box sx={logoAreaSx}>
                    <Box component="img" src="/jesus1.png" alt="JPO" sx={logoImgSx} />
                    <Box sx={tickerWrapSx}>
                        <Typography sx={tickerTextSx}>
                            Jesus Partners Outreach &nbsp;&nbsp;&nbsp; Jesus Partners Outreach &nbsp;&nbsp;&nbsp;
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ ...iconBtnSx, ml: 1, display: { xs: 'flex', md: 'none' } }} onClick={onMenuToggle}>
                    <MenuIcon sx={{ fontSize: 20 }} />
                </Box>

                <Box sx={middleAreaSx}>
                    <Box component={Link} to="/" sx={navLinkSx}>Home</Box>
                    <Box component={Link} to="/contact" sx={navLinkSx}>Contact</Box>
                </Box>

                <Box sx={rightAreaSx}>
                    <Box sx={iconBtnSx}><SearchIcon sx={{ fontSize: 18 }} /></Box>
                    <Box sx={iconBtnSx}><FullscreenIcon sx={{ fontSize: 18 }} /></Box>
                    <Box sx={iconBtnSx}><GridViewIcon sx={{ fontSize: 18 }} /></Box>
                    <Box component="button" sx={logoutBtnSx}>
                        <LogoutIcon sx={{ fontSize: 14 }} />
                        Logout
                    </Box>
                </Box>

            </Box>
        </>
    );
}