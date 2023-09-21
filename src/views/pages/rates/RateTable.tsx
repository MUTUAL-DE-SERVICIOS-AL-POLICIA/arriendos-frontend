import { ComponentInput } from "@/components";
import { useRateStore } from "@/hooks/useRateStore";
import { RateModel } from "@/models";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
export const RateTable = (props: any) => {
    const {
        handleEdit,
        onDelete,
        limitInit = 10
    } = props;
    /*BUSCADOR */
    const [query, setQuery] = useState<string>('');
    const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

    const handleInputChange = (event: any) => {
        // const inputQuery = event.target.value;
        // setQuery(inputQuery);

        // // Limpiamos el timeout anterior si existe
        // if (typingTimeout) clearTimeout(typingTimeout);

        // // Configuramos un nuevo timeout para realizar la búsqueda después de 2 segundos
        // const newTypingTimeout = setTimeout(() => {
        //     // Aquí podrías llamar a tu función de búsqueda con el valor actual de 'query'
        //     console.log('Realizar búsqueda con:', inputQuery);
        // }, 1500);

        // setTypingTimeout(newTypingTimeout);
    };

    /*DATA */
    const { rates = [], flag, getRates } = useRateStore();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit)

    useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
        getRates({ page, limit }).then((total) => setTotal(total))
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
                label="Buscar Tarifa"
                name="search"
                value={query}
                onChange={handleInputChange}
            />
            <TableContainer>
                <Table sx={{ minWidth: 350 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Tipos de clientes</TableCell>
                            <TableCell>Requisitos</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rates.map((rate: RateModel) => (
                            <TableRow
                                hover
                                key={rate.id}
                            >
                                <TableCell>{rate.name}</TableCell>
                                <TableCell>{rate.customer_type.map((typeCustomer, index) => (<Typography key={index}>{typeCustomer}</Typography>))}</TableCell>
                                <TableCell>{rate.requirements.map((requirement, index) => (<Typography key={index}>-{requirement}</Typography>))}</TableCell>
                                <TableCell>
                                    <Stack
                                        alignItems="center"
                                        direction="row"
                                        spacing={2}
                                    >
                                        <IconButton
                                            onClick={() => handleEdit(rate)}
                                        >
                                            <EditOutlined color="info" />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => onDelete(rate.id)}
                                        >
                                            <DeleteOutline color="error" />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
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
