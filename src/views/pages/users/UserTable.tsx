
import { Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton, Tooltip } from '@mui/material';
import { /*ComponentSearch, */ ComponentTablePagination, SkeletonComponent } from '@/components';
import { useEffect, useState } from 'react';
import { useUserStore, useAuthStore } from '@/hooks';
import { UserModel } from '@/models';
import { AdminPanelSettings } from '@mui/icons-material';
import { AssignRoleDialog } from '.';

interface tableProps {
  limitInit?: number;
}

export const UserTable = (props: tableProps) => {
  const {
    limitInit = 10
  } = props;

  /*DATA */
  const { users, flag, getUsers, toggleActivation } = useUserStore();
  const { hasPermission, username: currentUserUsername } = useAuthStore();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)

  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
    getUsers(page, limit).then((total) => setTotal(total))
  }, [page, limit, flag]);

  const handleOpenAssign = (user: UserModel) => {
    setSelectedUser(user);
    setOpenAssignDialog(true);
  };

  const handleCloseAssign = () => {
    setOpenAssignDialog(false);
    setSelectedUser(null);
    getUsers(page, limit);
  };

  // Verificar si el usuario es el admin del sistema (username admin o sin rol asignado = is_superuser)
  const isSystemAdmin = (user: UserModel) => {
    return user.username === 'admin';
  };

  return (
    <>
      {/* <ComponentSearch
        title="Buscar Usuario"
        onSearch={() => { }}
      /> */}
      <Stack sx={{ paddingRight: '10px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 350 }} size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Cuenta</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Correo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users == null ?
                <SkeletonComponent
                  quantity={5}
                /> : users.map((user: UserModel) => {
                  const isCurrentUser = user.username === currentUserUsername;
                  const adminUser = isSystemAdmin(user);
                  return (
                    <TableRow key={user.id} sx={{ borderBottom: '2px solid #ccc' }}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.first_name}</TableCell>
                      <TableCell>{user.last_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: user.role ? 'success.main' : 'text.secondary',
                            fontWeight: user.role ? 'bold' : 'normal',
                          }}
                        >
                          {user.role?.name || 'Sin rol'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {hasPermission('users.change') && !adminUser && (
                            <Tooltip title="Asignar Rol">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenAssign(user)}
                                color="primary"
                              >
                                <AdminPanelSettings fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {hasPermission('users.delete') && (
                            <Tooltip title={adminUser ? "No se puede desactivar al admin" : isCurrentUser ? "No puedes desactivarte a ti mismo" : ""}>
                              <span>
                                <Switch
                                  checked={user.is_active}
                                  onChange={() => toggleActivation(user)}
                                  color="success"
                                  size="small"
                                  disabled={adminUser || isCurrentUser}
                                />
                              </span>
                            </Tooltip>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
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

      {openAssignDialog && (
        <AssignRoleDialog
          open={openAssignDialog}
          handleClose={handleCloseAssign}
          user={selectedUser}
        />
      )}
    </>
  );
};
