import { ComponentInput } from '@/components';
import { useSelectorStore, useUserStore } from '@/hooks';
import { applyPagination } from '@/utils/applyPagination';
import { Checkbox, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from 'react'

export const UserLdapTable = (props: any) => {
    const {
        stateSelect = false,
        itemSelect
    } = props;
    const [query, setQuery] = useState<string>('');
    const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

    const handleInputChange = (event: any) => {
        const inputQuery = event.target.value;
        setQuery(inputQuery);

        // Limpiamos el timeout anterior si existe
        if (typingTimeout) clearTimeout(typingTimeout);

        // Configuramos un nuevo timeout para realizar la búsqueda después de 2 segundos
        const newTypingTimeout = setTimeout(() => {
            // Aquí podrías llamar a tu función de búsqueda con el valor actual de 'query'
            console.log('Realizar búsqueda con:', inputQuery);
        }, 2000);

        setTypingTimeout(newTypingTimeout);
    };

    /*DATA */
    const { selections = [], selectOne, deselectOne, deselectAll } = useSelectorStore();
    const { usersLDAP } = useUserStore();

    /*PAGINATION */
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    // const [total, setTotal] = useState(0);
    /* CONTROLADORES DE LA PAGINACIÓN */
    const handlePageChange = useCallback((_: any, value: number) => {//cuando se cambia la pagina < o >
        setPage(value)
    }, []);

    const handleRowsPerPageChange = useCallback((event: any) => {//cuando se cambia el limite 
        setLimit(event.target.value)
    }, []);
    const [customerList, setCustomerList] = useState([]);
    useEffect(() => {
        if (query && query.trim() !== "") {
            const filteredUsers = usersLDAP.filter((e: any) => e.username.includes(query.trim()));
            const updateCustomerList = applyPagination(filteredUsers, page, limit);
            setCustomerList(updateCustomerList);
        } else {
            const defaultCustomerList = applyPagination(usersLDAP, page, limit);
            setCustomerList(defaultCustomerList);
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
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>CUENTA</TableCell>
                                <TableCell>NOMBRES</TableCell>
                                <TableCell>APELLIDOS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customerList.map((user: any) => {
                                const isSelected = selections.includes(user.username);
                                return (
                                    <TableRow
                                        hover
                                        key={user.username}
                                    >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(value) => {
                                                        if (value.target.checked) {
                                                            deselectAll?.(customerList.map((e: any) => e.username));
                                                            selectOne(user.username);
                                                            itemSelect(user);
                                                        } else {
                                                            deselectOne(user.username);
                                                        }
                                                    }}
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
