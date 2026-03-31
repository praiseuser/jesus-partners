import { Box, Typography } from '@mui/material';
import { GlobalStyles } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import NAV_SECTIONS from '../data';
import { keyframes, sidebarSx, userAreaSx, avatarSx, userNameSx, userRoleSx, sectionTitleSx, navItemSx, navIconSx, navTextSx, navBadgeSx, overlayDrawerSx } from './styles';



export default function Sidebar({ open, onClose }) {
    const { pathname } = useLocation();

    return (
        <>
            <GlobalStyles styles={keyframes} />

            {open && <Box sx={overlayDrawerSx} onClick={onClose} />}

            <Box sx={sidebarSx(open)}>

                <Box sx={userAreaSx}>
                    <Box sx={avatarSx}>
                        <PersonIcon sx={{ fontSize: 18, color: 'white' }} />
                    </Box>
                    <Box>
                        <Typography sx={userNameSx}>Jesus Boi</Typography>
                    </Box>
                </Box>

                {NAV_SECTIONS.map(section => (
                    <Box key={section.title}>
                        <Typography sx={sectionTitleSx}>{section.title}</Typography>
                        {section.items.map((item, i) => {
                            const Icon = item.icon;
                            const active = pathname === item.path;
                            return (
                                <Box key={item.label} component={Link} to={item.path}
                                    onClick={onClose}
                                    sx={{ ...navItemSx(active), animationDelay: `${i * 0.03}s` }}>
                                    <Box sx={navIconSx(active, item.color)}>
                                        <Icon sx={{ fontSize: 15, color: active ? item.color : 'rgba(255,255,255,0.45)' }} />
                                    </Box>
                                    <Typography sx={navTextSx(active)}>{item.label}</Typography>
                                    {item.badge !== null && (
                                        <Box sx={navBadgeSx(active ? item.color : 'rgba(255,255,255,0.15)')}>
                                            {item.badge}
                                        </Box>
                                    )}
                                </Box>
                            );
                        })}
                    </Box>
                ))}

                <Box sx={{ height: 24 }} />
            </Box>
        </>
    );
}