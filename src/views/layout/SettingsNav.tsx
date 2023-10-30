import { SideNavItem } from "@/components";
import { menuSettings } from "@/utils/menuSettings";
import { Box, Drawer, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

interface navProps {
  open: boolean;
  onClose: (state: boolean) => void;
  onPress: (title: string) => void;
}

export const SettingsNav = (props: navProps) => {
  const {
    open,
    onClose,
    onPress
  } = props;
  const { pathname } = useLocation();


  const content = (
    <Box sx={{ py: 3 }} >
      {
        menuSettings().map((item: any) => (
          <Box key={item.title} >
            {
              item.path ?
                <SideNavItem
                  active
                  leave={open}
                  icon={item.icon}
                  path={item.path}
                  title={item.title}
                  onPress={(title) => onPress(title)}
                /> :
                <>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                    sx={{
                      opacity: open ? 1 : 0,
                      fontWeight: 600,
                      pl: 1
                    }}
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
                          leave={true}
                          icon={element.icon}
                          path={element.path}
                          title={element.title}
                          onPress={(title) => onPress(title)}
                        />
                      );
                    })
                  }
                </>
            }
          </Box>
        ))}
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
