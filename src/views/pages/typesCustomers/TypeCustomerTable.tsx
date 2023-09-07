import { useSelectorStore, useTypeCustomerStore } from "@/hooks";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export const TypeCustomerTable = (props: any) => {
    const {
        stateSelect = false,
        handleEdit,
        onDelete,
        itemSelect,
        limitInit = 10
    } = props;

    const { selections = [], selectOne, deselectOne, deselectAll } = useSelectorStore();
    const { typesCustomers, flag, getTypesCustomers } = useTypeCustomerStore();


    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(limitInit)

    // useEffect(() => {
    //     deselectAll(typesCustomers.map((e: any) => e.id));
    // }, [])

    useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
        getTypesCustomers({ page, limit }).then((total) => setTotal(total))
    }, [page, limit, flag]);

    /* CONTROLADORES DE LA PAGINACIÓN */
    const handlePageChange = useCallback((_: any, value: number) => {//cuando se cambia la pagina < o >
        setPage(value)
    }, []);

    const handleRowsPerPageChange = useCallback((event: any) => {//cuando se cambia el limite 
        setLimit(event.target.value)
    }, []);



    return (

        total != undefined ?
            <Stack sx={{ paddingRight: '10px' }}>
                <TableContainer>
                    <Table sx={{ minWidth: 350 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                {
                                    !stateSelect && <TableCell>Acciones</TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typesCustomers.map((item: any) => {
                                // console.log(selections)
                                const isSelected = selections.includes(item.id);
                                return (
                                    <TableRow
                                        hover
                                        key={item.id}
                                    >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(value) => {
                                                        if (value.target.checked) {
                                                            deselectAll(typesCustomers.map((e: any) => e.id));
                                                            selectOne(item.id);
                                                            itemSelect(item);
                                                        } else {
                                                            deselectOne(item.id);
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>{item.name}</TableCell>
                                        {
                                            !stateSelect && <TableCell align="right">
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    <IconButton
                                                        onClick={() => handleEdit(item)}
                                                    >
                                                        <EditOutlined color="info" />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => onDelete(item.id)}
                                                    >
                                                        <DeleteOutline color="error" />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                        }

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
                    SelectProps={{
                        native: true,
                    }}
                />
            </Stack> :
            <></>
    );
}
