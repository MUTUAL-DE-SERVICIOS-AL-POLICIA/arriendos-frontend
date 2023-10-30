import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { SettingsNav, SideNav, TopNav } from '.';

const SIDE_NAV_WIDTH = 65;

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
        paddingLeft: SIDE_NAV_WIDTH
    }
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
});
interface Props {
    children: any;
}
export const Layout = (props: Props) => {

    const {
        children,
    } = props

    const { pathname } = useLocation();
    const [openNav, setOpenNav] = useState(false);
    const [settingsOpenNav, setSettingsOpenNav] = useState(false)
    const [title, setTitle] = useState('');
    const handlePathnameChange = useCallback(
        () => {

            if (settingsOpenNav) setSettingsOpenNav(false)
            if (openNav) setOpenNav(false)
        },
        [openNav, settingsOpenNav]
    );

    useEffect(
        () => {
            handlePathnameChange();
        },
        [pathname]
    );
    console.log(children.props)
    return (
        <>
            <TopNav
                onNavOpen={() => setOpenNav(true)}
                onTapSettings={() => setSettingsOpenNav(true)}
                title={title}
            />
            <SideNav
                onClose={() => setOpenNav(false)}
                open={openNav}
                onPress={(title) => setTitle(title)}
            />
            <SettingsNav
                onClose={() => { setSettingsOpenNav(false) }}
                open={settingsOpenNav}
                onPress={(title) => setTitle(title)}
            />
            <LayoutRoot>
                <LayoutContainer>
                    {children}
                </LayoutContainer>
            </LayoutRoot>
        </>
    );
};
