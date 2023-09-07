import { SideNavItem } from "@/components";
import { menuSettings } from "@/utils/menuSettings";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const SettingsNav = ({ open, onClose }: { open: boolean, onClose: any }) => {
    const { pathname } = useLocation();


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
                {menuSettings().map((item:any) => (
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
                                        item.group.map((element: any) => {
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
    return (
        <Drawer
            anchor="right"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: '#1E635A',
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
}
