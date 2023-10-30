import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';


interface itemsProps {
    active: boolean;
    leave: boolean;
    icon: any;
    path: any;
    title: string;
    onPress: (title: string) => void;
}

export const SideNavItem = (props: itemsProps) => {
    const {
        active = false,
        leave,
        icon = null,
        path = null,
        title,
        onPress,
    } = props;
    const linkProps = path ? { component: Link, to: path } : {};
    return (
        <ListItem
            onClick={() => onPress!(title)}
            sx={{
                display: 'block',
                px: 0.5,
                py: 0.3,
            }}>
            <ListItemButton
                sx={{
                    display: 'flex',
                    borderRadius: 1,
                    justifyContent: leave ? 'initial' : 'center',
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.4)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    py: 0.3
                }}
                {...linkProps}
            >
                <ListItemIcon
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'inline-flex',
                        ...(active ? {
                            color: 'orange'
                        } : {
                            color: 'white'
                        })
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={title}
                    sx={{
                        flexGrow: 1,
                        opacity: leave ? 1 : 0,
                        fontWeight: 600,
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
};