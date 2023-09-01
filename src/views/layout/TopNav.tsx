
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
import { AccountPopover } from '@/components';


const SIDE_NAV_WIDTH = 200;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (({ onNavOpen }: { onNavOpen: any }) => {

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
                        spacing={2}
                    >
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            sx={{
                                cursor: 'pointer',
                                height: 40,
                                width: 40
                            }}
                            src="/static/images/avatar/1.jpg"
                        // src={data.image}
                        />
                    </Stack>
                </Stack>
            </Box>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
            />
        </>
    );
});