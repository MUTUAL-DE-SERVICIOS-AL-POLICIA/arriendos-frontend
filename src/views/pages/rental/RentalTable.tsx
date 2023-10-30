import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useRateStore } from "@/hooks/useRateStore";
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  limitInit?: number;
}

export const RentalTable = (props: tableProps) => {
  const {
    limitInit = 10,
  } = props;

  /*DATA */
  const { flag, getRates } = useRateStore();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)

  useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
    getRates({ page, limit }).then((total) => setTotal(total))
  }, [page, limit, flag]);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Alquiler"
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Propiedad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ambiente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tarifa</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Deudas</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Contrato</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Garantía</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {
            rates.map((rate: RateModel) => (
                <TableRow key={rate.id}>
                  <TableCell>{rate.name}</TableCell>
                  <TableCell>{rate.customer_type.map((e) => (<Typography key={e.id}>-{e.name}</Typography>))}</TableCell>
                </TableRow>
              ))
            } */}
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
  );
}