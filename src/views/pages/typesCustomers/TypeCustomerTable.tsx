import { SeverityPill } from "@/components";
import { useSelectorStore, useTypeCustomerStore } from "@/hooks";
import { TypeCustomerModel } from "@/models";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export const TypeCustomerTable = (props: any) => {
    const {
        stateSelect = false,
        stateMultiple,
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
                                <TableCell>Institución</TableCell>
                                {
                                    !stateSelect && <TableCell>Acciones</TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typesCustomers.map((typeCustomer: TypeCustomerModel) => {
                                // console.log(selections)
                                const isSelected = selections.includes(typeCustomer.id);
                                const isInstitution = typeCustomer.is_institution;
                                return (
                                    <TableRow
                                        hover
                                        key={typeCustomer.id}
                                    >
                                        {
                                            stateSelect && <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onChange={(value) => {
                                                        if (value.target.checked) {
                                                            deselectAll(typesCustomers.map((e: any) => e.id));
                                                            selectOne(typeCustomer.id);
                                                            itemSelect(typeCustomer);
                                                        } else {
                                                            deselectOne(typeCustomer.id);
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        }
                                        <TableCell>{typeCustomer.name}</TableCell>
                                        <TableCell>
                                            <SeverityPill color={isInstitution ? 'success' : 'error'}>
                                                {isInstitution ? 'SI' : 'No'}
                                            </SeverityPill>
                                        </TableCell>
                                        {
                                            !stateSelect && <TableCell align="right">
                                                <Stack
                                                    alignItems="center"
                                                    direction="row"
                                                    spacing={2}
                                                >
                                                    <IconButton
                                                        onClick={() => handleEdit(typeCustomer)}
                                                    >
                                                        <EditOutlined color="info" />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => onDelete(typeCustomer.id)}
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
