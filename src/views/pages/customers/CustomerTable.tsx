import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useCustomerStore } from "@/hooks";
import { CustomerModel } from "@/models";
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { RowCustomer } from ".";

interface tableProps {
  limitInit?: number;
  stateSelect?: boolean;
  stateMultiple?: boolean
  itemSelect?: (customer: CustomerModel) => void;
  items?: any[];
  itemEdit?: (customer: CustomerModel) => void;
}

export const CustomerTable = (props: tableProps) => {
  const {
    stateSelect = false,
    limitInit = 10,
    itemSelect,
    items,
    itemEdit,
  } = props;

  const { customers, flag, getCustomers } = useCustomerStore();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)

  useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
    getCustomers({ page, limit }).then((total) => setTotal(total))
  }, [page, limit, flag]);


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Cliente"
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }} >Nit</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} >Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} >Tipo de Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} >Contactos</TableCell>
              {stateSelect && <TableCell sx={{ fontWeight: 'bold' }} >Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer: CustomerModel) => (
              <RowCustomer
                key={customer.id}
                customer={customer}
                stateSelect={stateSelect}
                itemSelect={itemSelect}
                items={items}
                itemEdit={itemEdit}
              />
            ))}
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
