import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { menu } from '@/utils/menu';
import { SideNavItem } from '@/components';
import logo from '@/assets/images/muserpol-logo.png';
import logoWithOutText from '@/assets/images/muserpol-logo-without-text.png';
import React from 'react';

const drawerWidth = 190;

const leaveedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'leave' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',

    boxSizing: 'border-box',
    ...(open && {
      ...leaveedMixin(theme),
      '& .MuiDrawer-paper': leaveedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface navProps {
  open: boolean;
  onClose: (state: boolean) => void;
  onPress: (title: string) => void;
}


export const SideNav = (props: navProps) => {
  const {
    open,
    onClose,
    onPress
  } = props;

  const [leave, setLeave] = useState(false);
  const { pathname } = useLocation();
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up('md'));

  const content = (
    <Box sx={{ py: 3 }}>
      <img
        src={leave || open ? logo : logoWithOutText}
        alt="logo"
        style={{
          objectFit: 'cover',
          width: leave || open ? '180px' : '52.5px',
          padding: 5,
          filter: 'brightness(1.3)'
        }}
      />
      {
        menu().map((item, index) => (
          <React.Fragment key={index}>
            {
              item.path ?
                <SideNavItem
                  active={item.path ? (pathname === item.path) : false}
                  leave={leave || open}
                  icon={item.icon}
                  path={item.path}
                  title={item.title}
                  onPress={(title) => {
                    setLeave(false);
                    onPress(title);
                  }}
                /> :
                <>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                    sx={{
                      opacity: leave || open ? 1 : 0,
                      fontWeight: 600,
                      pl: 1
                    }}
                  >
                    {item.title}
                  </Typography>
                  {
                    item.group!.map((e) => {
                      const active = e.path ? (pathname === e.path) : false;
                      return (
                        <SideNavItem
                          key={e.title}
                          active={active}
                          leave={leave || open}
                          icon={e.icon}
                          path={e.path}
                          title={e.title}
                          onPress={(title) => {
                            setLeave(false);
                            onPress(title);
                          }}
                        />
                      )
                    })
                  }
                </>
            }
          </React.Fragment>
        ))
      }
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        onMouseEnter={() => setLeave(true)}
        onMouseLeave={() => setLeave(false)}
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: '#1E635A',
            color: 'white',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            width: 200
          }
        }}
        open={leave}>
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
          backgroundColor: '#1E635A',
          color: 'white',
          width: 190
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}