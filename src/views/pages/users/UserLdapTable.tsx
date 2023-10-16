import { ComponentInput } from '@/components';
import { useUserStore } from '@/hooks';
import { UserLdapModel } from '@/models/userLdapModel';
import { applyPagination } from '@/utils/applyPagination';
import { Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from 'react'

interface userLdapProps {
  stateSelect: boolean;
  itemSelect: (user: UserLdapModel) => void;
  items?: any[];
}

export const UserLdapTable = (props: userLdapProps) => {
  const {
    stateSelect = false,
    itemSelect,
    items = [],
  } = props;
  const [query, setQuery] = useState<string>('');

  const handleInputChange = (event: any) => {
    const inputQuery = event.target.value;
    setQuery(inputQuery);
  };

  /*DATA */
  const { usersLDAP } = useUserStore();

  /*PAGINATION */
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  /* CONTROLADORES DE LA PAGINACIÓN */
  const handlePageChange = useCallback((_: any, value: number) => {//cuando se cambia la pagina < o >
    setPage(value)
  }, []);

  const handleRowsPerPageChange = useCallback((event: any) => {//cuando se cambia el limite 
    setLimit(event.target.value)
  }, []);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (query && query.trim() !== "") {
      const filteredUsers = usersLDAP.filter((e: any) => e.username.includes(query.trim()));
      const updateCustomerList = applyPagination(filteredUsers, page, limit);
      setUsers(updateCustomerList);
    } else {
      const defaultCustomerList = applyPagination(usersLDAP, page, limit);
      setUsers(defaultCustomerList);
    }
  }, [usersLDAP, page, limit, query]);

  return (
    <>
      <ComponentInput
        type="text"
        label="Buscar Usuario"
        name="query"
        value={query}
        onChange={handleInputChange}
      />
      <Stack sx={{ paddingRight: '10px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 350 }} size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                <TableCell />
                <TableCell sx={{ fontWeight: 'bold' }}>CUENTA</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>NOMBRES</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>APELLIDOS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: UserLdapModel) => {
                const isSelected = items.includes(user.username);
                return (
                  <TableRow
                    hover
                    key={user.username}
                  >
                    {
                      stateSelect && <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => itemSelect!(user)}
                        />
                      </TableCell>
                    }
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={usersLDAP.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Stack>
    </>
  );
}
