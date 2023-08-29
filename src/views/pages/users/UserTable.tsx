
import {
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { ComponentInput } from '@/components';
import { useCallback, useEffect, useState } from 'react';
import { useUserStore } from '@/hooks';

export const UserTable = (props: any) => {
    const {
        handleEdit,
        onDelete,
        limitInit = 10
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
    const { users, flag, getUsers } = useUserStore();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit)

    useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
        getUsers({ page, limit }).then((total) => setTotal(total))
    }, [page, limit, flag]);

    /* CONTROLADORES DE LA PAGINACIÓN */
    const handlePageChange = useCallback((_: any, value: number) => {//cuando se cambia la pagina < o >
        setPage(value)
    }, []);

    const handleRowsPerPageChange = useCallback((event: any) => {//cuando se cambia el limite 
        setLimit(event.target.value)
    }, []);

    return (
        <>
            <ComponentInput
                type="text"
                label="Buscar Usuario"
                name="search"
                value={query}
                onChange={handleInputChange}
            />
            <Stack sx={{ paddingRight: '10px' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Cuenta</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user: any) => {
                                return (
                                    <TableRow
                                        hover
                                        key={user.id}
                                    >
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.first_name}</TableCell>
                                        <TableCell>{user.last_name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <IconButton
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    <EditOutlined color="info" />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => onDelete(user.id)}
                                                >
                                                    <DeleteOutline color="error" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={total}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25]}
                    labelRowsPerPage='Filas por página:'
                    labelDisplayedRows={({ from, to, count }: { from: any, to: any, count: any }) => `${from}-${to} de ${count}`}
                />
            </Stack>
        </>
    );
};