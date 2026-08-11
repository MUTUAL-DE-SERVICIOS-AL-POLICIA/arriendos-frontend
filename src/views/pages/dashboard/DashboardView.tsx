import { useAuthStore } from '@/hooks';
import { Box, Typography } from '@mui/material';
import { Warning } from '@mui/icons-material';

export const DashboardView = () => {
    const { role, permissions, is_superuser } = useAuthStore();

    if (!is_superuser && (!role || permissions.length === 0)) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <Warning sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                    No tiene permisos asignados
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Contacte al administrador para que le asigne un rol.
                </Typography>
            </Box>
        );
    }

    return <div>DashboardView</div>;
};
