/**
 * Diálogo para asignar roles a usuarios.
 *
 * Permite:
 * - Seleccionar un rol de la lista de roles disponibles
 * - Asignar el rol al usuario seleccionado
 * - Quitar el rol actual del usuario
 *
 * Características:
 * - Muestra el nombre del usuario y su rol actual
 * - Dropdown con todos los roles disponibles
 * - Botón "Quitar Rol" si el usuario tiene rol asignado
 * - Valida que no se pueda asignar rol a uno mismo
 *
 * Props:
 * - open: Controla si el diálogo está abierto
 * - handleClose: Función para cerrar el diálogo
 * - user: Usuario seleccionado para asignar rol
 *
 * Autor: Dilan Torrez
 * Fecha: 2026
 */

import { useRoleStore, useAuthStore } from "@/hooks";
import {
    Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { UserModel } from "@/models";

interface AssignRoleProps {
    open: boolean;
    handleClose: () => void;
    user: UserModel | null;
}

export const AssignRoleDialog = (props: AssignRoleProps) => {
    const { open, handleClose, user } = props;
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<any[]>([]);
    const [selectedRoleId, setSelectedRoleId] = useState<string>('');
    const { getRoles, assignRole, removeUserRole, getUserRoles } = useRoleStore();
    const { role: currentRole } = useAuthStore();

    // Operador no puede asignar rol de Administrador
    const isOperador = currentRole === 'Operador';

    useEffect(() => {
        if (open && user) {
            loadRoles();
            setSelectedRoleId(user.role ? String(user.role.id) : '');
        }
    }, [open, user]);

    const loadRoles = async () => {
        const { roles: data } = await getRoles(0, -1, '');
        // Operador no puede asignar rol de Administrador
        const filteredRoles = isOperador ? data.filter((r: any) => r.name !== 'Administrador') : data;
        setRoles(filteredRoles);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user || !selectedRoleId) return;

        setLoading(true);
        const success = await assignRole(user.id, Number(selectedRoleId));
        setLoading(false);
        if (success) handleClose();
    };

    const handleRemoveRole = async () => {
        if (!user || !user.role) return;

        setLoading(true);
        const userRoles = await getUserRoles();
        const userRole = userRoles.find((ur: any) => ur.user === user.id);
        if (userRole) {
            const success = await removeUserRole(userRole.id);
            setLoading(false);
            if (success) handleClose();
        } else {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Asignar Rol</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Usuario: <strong>{user?.first_name} {user?.last_name}</strong> ({user?.username})
                        </Typography>

                        {user?.role && (
                            <Typography variant="body2">
                                Rol actual: <strong>{user.role.name}</strong>
                            </Typography>
                        )}

                        <FormControl fullWidth size="small">
                            <InputLabel>Seleccionar Rol</InputLabel>
                            <Select
                                value={selectedRoleId}
                                label="Seleccionar Rol"
                                onChange={(e: SelectChangeEvent) => setSelectedRoleId(e.target.value)}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    {user?.role && (
                        <Button
                            onClick={handleRemoveRole}
                            disabled={loading}
                            color="error"
                            variant="outlined"
                        >
                            {loading ? <CircularProgress size={24} /> : 'Quitar Rol'}
                        </Button>
                    )}
                    <Button onClick={handleClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !selectedRoleId}
                        color="primary"
                    >
                        {loading ? <CircularProgress size={24} /> : 'Asignar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
