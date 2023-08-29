import { Box, ButtonBase, SvgIcon } from '@mui/material';
import { Link } from 'react-router-dom';

export const SideNavItem = (
    {
        active = false,
        icon = null,
        path = null,
        title = null,
        isTitle = false,
    }:
        {
            active: any,
            icon: any,
            path: any,
            title?: any,
            isTitle?: any,
        },
) => {

    const linkProps = path ? { component: Link, to: path } : {};

    return (
        <li>
            <ButtonBase
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: !isTitle && '16px',
                    pr: !isTitle && '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.4)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                }}
                {...linkProps}
            >
                {icon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: 'neutral.100',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 2,
                            ...(active && {
                                color: 'orange'
                            })
                        }}
                    >
                        <SvgIcon fontSize="small" >
                            {icon}
                        </SvgIcon>
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        color: !isTitle && 'neutral.100',
                        flexGrow: 1,
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'normal', // Cambiamos 'nowrap' a 'normal'
                        wordWrap: 'break-word', // Agregamos esta propiedad
                        maxWidth: '150px', // Ajusta este valor según tus necesidades
                        ...(active && {
                            color: 'common.white'
                        }),
                        // ...(disabled && {
                        //     color: 'neutral.500'
                        // })
                    }}
                >
                    {title}
                </Box>


            </ButtonBase>
        </li>
    );
};