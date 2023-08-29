import { useLocation } from 'react-router-dom';
import {
    Box,
    Drawer,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { SideNavItem } from '@/components';
import { menu } from '@/utils/menu';

export const SideNav = ({ open, onClose }: { open: boolean, onClose: any }) => {


    const { pathname } = useLocation();
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('md'));

    const content = (
        <Box component="nav" >
            <Stack
                sx={{
                    listStyle: 'none',
                    p: 0,
                    m: 0,
                    px: 2,
                    py: 3
                }}
            >
                {menu().map((item) => (
                    <Box
                        key={item.title}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%'
                        }}
                    >
                        {
                            item.path ?
                                <SideNavItem
                                    active={item.path ? (pathname === item.path) : false}
                                    icon={item.icon}
                                    path={item.path}
                                    title={item.title}
                                /> :
                                <>
                                    <Typography
                                        color="inherit"
                                        variant="subtitle1"
                                    >
                                        {item.title}
                                    </Typography>
                                    {
                                        item.group!.map((element: any) => {
                                            const active = element.path ? (pathname === element.path) : false;
                                            return (
                                                <SideNavItem
                                                    key={element.title}
                                                    active={active}
                                                    // disabled={element.disabled}
                                                    icon={element.icon}
                                                    path={element.path}
                                                    title={element.title}
                                                />
                                            );
                                        })
                                    }
                                </>
                        }
                    </Box>
                ))}
            </Stack>
        </Box>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: '#125C53',
                        color: 'white',
                        width: 220
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: '#125C53',
                    color: 'white',
                    width: 220
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};
