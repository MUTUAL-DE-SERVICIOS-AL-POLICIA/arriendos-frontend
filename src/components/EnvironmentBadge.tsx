import React from 'react';
import { Box } from '@mui/material';

type Environment = 'dev' | 'test' | 'prod';

interface EnvironmentBadgeProps {
    environment?: Environment;
}

const badgeConfig: Record<
    Environment,
    { label: string; color: string; bg: string } | null
> = {
    dev: {
        label: '⚠ VERSIÓN DE DESARROLLO',
        color: '#fff',
        bg: '#ca8a04',
    },
    test: {
        label: '⚠ VERSIÓN DE PRUEBAS',
        color: '#fff',
        bg: '#dc2626',
    },
    prod: null,
};

export const EnvironmentBadge: React.FC<EnvironmentBadgeProps> = ({
    environment = 'dev',
}) => {
    const config = badgeConfig[environment];
    if (!config) return null;

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: config.bg,
                color: config.color,
                textAlign: 'center',
                py: '6px',
                fontSize: '14px',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                userSelect: 'none',
                position: 'sticky',
                top: 0,
                zIndex: (theme) => theme.zIndex.modal + 1,
            }}
        >
            {config.label}
        </Box>
    );
};
