/**
 * Tabla de gestión de roles.
 *
 * Muestra la lista de roles con sus permisos, cantidad de usuarios
 * y estado. Permite editar y eliminar roles.
 *
 * Columnas mostradas:
 * - Cod.: ID del rol
 * - Nombre: Nombre del rol
 * - Descripción: Descripción del rol
 * - Módulos: Módulos con permisos asignados
 * - Usuarios: Cantidad de usuarios con este rol
 * - Estado: Activo/Inactivo
 * - Acciones: Botones de editar/eliminar
 *
 * Permisos requeridos:
 * - users.change: Para ver botón de editar
 * - users.delete: Para ver botón de eliminar
 *
 * Autor: Dilan Torrez
 * Fecha: 2026
 */

import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { ComponentSearch, ComponentTablePagination, SkeletonComponent, DialogComponent } from "@/components";
import { useRoleStore, useAuthStore } from "@/hooks";

interface tableProps {
  handleEdit: (role: any) => void;
  limitInit?: number;
}

export const RoleTable = (props: tableProps) => {
  const { limitInit = 10, handleEdit } = props;
  const [roles, setRoles] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit);
  const [flag, setFlag] = useState(false);
  const { getRoles, deleteRemoveRole } = useRoleStore();
  const { hasPermission } = useAuthStore();

  useEffect(() => {
    loadRoles();
  }, [page, limit, flag]);

  const loadRoles = async () => {
    const { roles: data, total: t } = await getRoles(page, limit, '');
    setRoles(data);
    setTotal(t);
  };

  const handleSearch = async (search: string) => {
    setPage(0);
    setLimit(limitInit);
    const { roles: data, total: t } = await getRoles(0, limitInit, search);
    setRoles(data);
    setTotal(t);
  };

  const handleDelete = async (id: number) => {
    const { dialogDelete } = DialogComponent();
    const confirmed = await dialogDelete('El rol sera eliminado permanentemente');
    if (confirmed) {
      const success = await deleteRemoveRole(id);
      if (success) setFlag(!flag);
    }
  };

  return (
    <Stack>
      <ComponentSearch title="Buscar Rol" onSearch={handleSearch} />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Cod.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descripcion</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Modulos</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Usuarios</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles == null ? (
              <SkeletonComponent quantity={8} />
            ) : (
              roles.map((role: any) => (
                <TableRow key={role.id} sx={{ borderBottom: '2px solid #ccc' }}>
                  <TableCell>{role.id}</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{role.name}</Typography>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {role.role_permissions?.map((rp: any) => (
                        <Typography
                          key={rp.id}
                          variant="caption"
                          sx={{
                            backgroundColor: '#E2F6F0',
                            borderRadius: 1,
                            px: 0.5,
                            py: 0.25,
                          }}
                        >
                          {rp.module_name}
                        </Typography>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>{role.user_count}</TableCell>
                  <TableCell>
                    <Typography sx={{ color: role.is_active ? 'success.main' : 'error.main' }}>
                      {role.is_active ? 'Activo' : 'Inactivo'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack alignItems="center" direction="row">
                      {hasPermission('users.change') && (
                        <IconButton sx={{ p: 0 }} onClick={() => handleEdit(role)} title="Editar rol">
                          <EditOutlined color="warning" />
                        </IconButton>
                      )}
                      {hasPermission('users.delete') && (
                        <IconButton sx={{ p: 0 }} onClick={() => handleDelete(role.id)} title="Eliminar rol">
                          <DeleteOutline color="error" />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={total}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setLimit(value)}
        page={page}
        limit={limit}
      />
    </Stack>
  );
};
