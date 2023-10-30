
import { Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { ComponentSearch, ComponentTablePagination } from '@/components';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/hooks';
import { UserModel } from '@/models';

interface tableProps {
  limitInit?: number;
}

export const UserTable = (props: tableProps) => {
  const {
    limitInit = 10
  } = props;

  /*DATA */
  const { users, flag, getUsers, toggleActivation } = useUserStore();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)

  useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
    getUsers({ page, limit }).then((total) => setTotal(total))
  }, [page, limit, flag]);

  return (
    <>
      <ComponentSearch
        title="Buscar Usuario"
      />
      <Stack sx={{ paddingRight: '10px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 350 }} size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Cuenta</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Correo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: UserModel) => {
                return (
                  <TableRow key={user.id} >
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Switch

                        checked={user.is_active}
                        onChange={() => toggleActivation(user)}
                        color="success"
                        size="small"
                      />
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
    </>
  );
};