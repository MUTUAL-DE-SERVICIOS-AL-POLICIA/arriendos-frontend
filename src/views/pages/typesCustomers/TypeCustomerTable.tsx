import { ComponentSearch, ComponentTablePagination, SeverityPill, SkeletonComponent } from "@/components";
import { useTypeCustomerStore } from "@/hooks";
import { TypeCustomerModel } from "@/models";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (typeCustomer: TypeCustomerModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (typeCustomer: TypeCustomerModel) => void;
  items?: any[];
}

export const TypeCustomerTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { typesCustomers, flag, getTypesCustomers, deleteRemoveTypeCustomer } = useTypeCustomerStore();


  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)


  useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
    getTypesCustomers(page, limit, '').then((total) => setTotal(total))
  }, [page, limit, flag]);

  const handleSearch = async (search: string) => {
    await setPage(0);
    await setLimit(limitInit);
    getTypesCustomers(0, limitInit, search).then((total) => setTotal(total))
  }

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Tipo de cliente"
        onSearch={handleSearch}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Institución</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {typesCustomers == null ?
              <SkeletonComponent
                quantity={3}
              /> : typesCustomers.map((typeCustomer: TypeCustomerModel) => {
                const isSelected = items.includes(typeCustomer.id);
                const isInstitution = typeCustomer.is_institution;
                return (
                  <TableRow key={typeCustomer.id} sx={{ borderBottom: '2px solid #ccc' }}>
                    {
                      stateSelect && <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => itemSelect!(typeCustomer)}
                        />
                      </TableCell>
                    }
                    <TableCell>{typeCustomer.name}</TableCell>
                    <TableCell>
                      <SeverityPill color={isInstitution ? 'info' : 'warning'}>
                        {isInstitution ? 'SI es institución' : 'No es institución'}
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
                            sx={{ p: 0 }}
                            onClick={() => handleEdit!(typeCustomer)} >
                            <EditOutlined color="info" />
                          </IconButton>
                          <IconButton
                            sx={{ p: 0 }}
                            onClick={() => deleteRemoveTypeCustomer(typeCustomer)} >
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
