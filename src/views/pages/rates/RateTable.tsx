import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useSelectorStore } from "@/hooks";
import { useRateStore } from "@/hooks/useRateStore";
import { RateModel } from "@/models";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (rate: RateModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (rate: RateModel) => void;
}

export const RateTable = (props: tableProps) => {
  const {
    handleEdit,
    limitInit = 10,
    stateSelect = false,
    itemSelect,
  } = props;

  /*DATA */
  const { selections = [], selectOne, deselectOne, deselectAll } = useSelectorStore();
  const { rates = [], flag, getRates, deleteRemoveRate } = useRateStore();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)

  useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
    getRates({ page, limit }).then((total) => setTotal(total))
  }, [page, limit, flag]);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Tarifa"
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tipos de clientes</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Requisitos</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rates.map((rate: RateModel) => {
              const isSelected = selections.includes(`${rate.id}rate`);
              return (
                <TableRow key={rate.id}>
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(value) => {
                          if (value.target.checked) {
                            deselectAll(rates.map((e: RateModel) => `${e.id}rate`));
                            selectOne(`${rate.id}rate`);
                            itemSelect!(rate);
                          } else {
                            deselectOne(`${rate.id}rate`);
                          }
                        }}
                      />
                    </TableCell>
                  }
                  <TableCell>{rate.name}</TableCell>
                  <TableCell>{rate.customer_type.map((e) => (<Typography key={e.id}>-{e.name}</Typography>))}</TableCell>
                  <TableCell>{rate.requirement.map((e) => (<Typography key={e.id}>-{e.requirement_name}</Typography>))}</TableCell>
                  {
                    !stateSelect && <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton onClick={() => handleEdit!(rate)}>
                          <Edit color="info" />
                        </IconButton>
                        <IconButton onClick={() => deleteRemoveRate(rate)}>
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  }
                </TableRow>
              )
            })}
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