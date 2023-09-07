
import {
    Avatar,
    Box,
    IconButton,
    Stack,
    useMediaQuery
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { MenuOutlined } from '@mui/icons-material';
// import { useSelector } from 'react-redux';
import { usePopover } from '@/hooks';
import { AccountPopover } from '.';
import noimage from '@/assets/images/profile.png';

const SIDE_NAV_WIDTH = 200;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (({ onNavOpen,onTapSettings }: { onNavOpen: any,onTapSettings:any }) => {

    // const { data } = useSelector((state: any) => state.auth);
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('md'));

    const accountPopover = usePopover();

    return (
        <>
            <Box
                component="header"
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    position: 'sticky',
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    top: 0,
                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                    },
                    zIndex: (theme) => theme.zIndex.appBar
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2
                    }}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                    >
                        {!lgUp && (
                            <IconButton onClick={onNavOpen}>
                                <MenuOutlined color="primary" />
                            </IconButton>
                        )}
                    </Stack>
                    <Stack
                        alignItems="center"
                        direction="row"
                    >
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            sx={{cursor: 'pointer',width: 45, height: 45 }}
                            src={noimage}
                        />
                    </Stack>
                </Stack>
            </Box>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
                onTapSettings={()=>{
                    accountPopover.handleClose();
                    onTapSettings();
                }}
            />
        </>
    );
});