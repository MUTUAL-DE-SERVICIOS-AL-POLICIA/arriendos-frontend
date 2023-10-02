import { TablePagination } from "@mui/material"
import { useCallback } from "react";
interface paginationProps {
    total: number;
    onPageChange: (value: number) => void;
    onRowsPerPageChange: (value: number) => void;
    page: number;
    limit: number;
}

export const ComponentTablePagination = (props: paginationProps) => {
    const {
        total,
        onPageChange,
        onRowsPerPageChange,
        page,
        limit,
    } = props;

    /* CONTROLADORES DE LA PAGINACIÓN */
    const handlePageChange = useCallback((_: any, value: number) => {//cuando se cambia la pagina < o >
        onPageChange(value)
    }, []);

    const handleRowsPerPageChange = useCallback((event: any) => {//cuando se cambia el limite 
        onRowsPerPageChange(event.target.value)
    }, []);


    return (
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
    );
}
