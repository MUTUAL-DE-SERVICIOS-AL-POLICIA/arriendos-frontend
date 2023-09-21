import { ComponentInput } from '@/components';
import { useRequirementStore, useSelectorStore } from '@/hooks';
import { RequirementModel } from '@/models';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

export const RequirementTable = (props: any) => {
    const {
        stateSelect = false,
        stateMultiple = false,
        handleEdit,
        onDelete,
        itemSelect,
        limitInit = 10
    } = props;
    /*BUSCADOR */
    const [query, setQuery] = useState<string>('');
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleInputChange = (event: any) => {
        const inputQuery = event.target.value;
        setQuery(inputQuery);

        // Limpiamos el timeout anterior si existe
        if (typingTimeout) clearTimeout(typingTimeout);

        // Configuramos un nuevo timeout para realizar la búsqueda después de 2 segundos
        const newTypingTimeout = setTimeout(() => {
            // Aquí podrías llamar a tu función de búsqueda con el valor actual de 'query'
            console.log('Realizar búsqueda con:', inputQuery);
        }, 1500);

        setTypingTimeout(newTypingTimeout);
    };

    /*DATA */
    const { selections = [], selectOne, deselectOne } = useSelectorStore();
    const { requirements, flag, getRequirements } = useRequirementStore();


    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit)

    useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
        getRequirements({ page, limit }).then((total) => setTotal(total))
    }, [page, limit, flag]);

    /* CONTROLADORES DE LA PAGINACIÓN */
    const handlePageChange = useCallback((_: any, value: number) => {//cuando se cambia la pagina < o >
        setPage(value)
    }, []);

    const handleRowsPerPageChange = useCallback((event: any) => {//cuando se cambia el limite 
        setLimit(event.target.value)
    }, []);


    return (
        <Stack sx={{ paddingRight: '10px' }}>
            <ComponentInput
                type="text"
                label="Buscar Cliente"
                name="search"
                value={query}
                onChange={handleInputChange}
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requirements.map((requirement: RequirementModel) => {
                            const isSelected = selections.includes(requirement.id);
                            return (
                                <TableRow
                                    hover
                                    key={requirement.id}
                                >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(value) => {
                                                    if (stateMultiple) {
                                                        if (value.target.checked) {
                                                            console.log(requirement)
                                                            selectOne(requirement.id);
                                                        } else {
                                                            deselectOne(requirement.id);
                                                        }
                                                    } else {
                                                        itemSelect(requirement)
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{requirement.requirement_name}</TableCell>
                                    <TableCell>
                                        <Stack
                                            alignItems="center"
                                            direction="row"
                                            spacing={2}
                                        >
                                            <IconButton
                                                onClick={() => handleEdit(requirement)}
                                            >
                                                <EditOutlined color="info" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => onDelete(requirement.id)}
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
    );
}
