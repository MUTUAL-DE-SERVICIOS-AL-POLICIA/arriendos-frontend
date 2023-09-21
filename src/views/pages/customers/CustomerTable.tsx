import { ComponentInput } from "@/components";
import { useCustomerStore, useSelectorStore } from "@/hooks";
import { CustomerModel } from "@/models";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export const CustomerTable = (props: any) => {
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
    const { customers, flag, getCustomers } = useCustomerStore();


    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit)

    useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
        getCustomers({ page, limit }).then((total) => setTotal(total))
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
                            <TableCell>Carnet</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Tipo de Cliente</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer: CustomerModel) => {
                            const isSelected = selections.includes(customer.id);
                            return (
                                <TableRow
                                    hover
                                    key={customer.id}
                                >
                                    {
                                        stateSelect && <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(value) => {
                                                    if (stateMultiple) {
                                                        if (value.target.checked) {
                                                            console.log(customer)
                                                            selectOne(customer.id);
                                                        } else {
                                                            deselectOne(customer.id);
                                                        }
                                                    } else {
                                                        itemSelect(customer)
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                    }
                                    <TableCell>{customer.ci}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.last_name}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.customer_type.name}</TableCell>
                                    <TableCell>
                                        <Stack
                                            alignItems="center"
                                            direction="row"
                                            spacing={2}
                                        >
                                            <IconButton
                                                onClick={() => handleEdit(customer)}
                                            >
                                                <EditOutlined color="info" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => onDelete(customer.id)}
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
