import { ComponentTablePagination, SkeletonComponent } from "@/components";
import { useCustomerStore } from "@/hooks";
import { CustomerModel } from "@/models";
import { Box, Checkbox, IconButton, MenuItem, SelectChangeEvent, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DeleteOutline, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { ContactTable } from "./contact";

interface tableProps {
  limitInit?: number;
  stateSelect?: boolean;
  stateMultiple?: boolean
  itemSelect?: (customer: CustomerModel) => void;
  items?: any[];
  itemEdit?: (customer: CustomerModel) => void;
}

interface FilterOptions {
  customer_types: { id: number; name: string }[];
}

export const CustomerTable = (props: tableProps) => {
  const {
    stateSelect = false,
    limitInit = 10,
    itemSelect,
    items,
    itemEdit,
  } = props;

  const { customers, flag, getCustomers, getCustomerFilterOptions, deleteRemoveCustomer } = useCustomerStore();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ customer_types: [] });
  const [filters, setFilters] = useState({ customer_type_id: '', contact_search: '', search_nit: '', search_name: '' });

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [page, limit, flag, filters]);

  const loadFilterOptions = async () => {
    const options = await getCustomerFilterOptions();
    setFilterOptions(options);
  };

  const loadCustomers = async () => {
    const activeFilters = {
      customer_type_id: filters.customer_type_id,
      contact_search: filters.contact_search,
      search_nit: filters.search_nit,
      search_name: filters.search_name,
    };
    const total = await getCustomers(page, limit, '', activeFilters);
    setTotal(total || 0);
  };

  const handleFilterChange = (event: SelectChangeEvent<string>, filterType: string) => {
    setFilters(prev => ({ ...prev, [filterType]: event.target.value }));
    setPage(0);
  };

  const handleContactSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, contact_search: event.target.value }));
    setPage(0);
  };
  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size="small"
          label="Buscar por NIT/CI"
          placeholder="Solo números, máx. 12"
          value={filters.search_nit}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 12);
            setFilters(prev => ({ ...prev, search_nit: val }));
            setPage(0);
          }}
          sx={{ minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        />
        <TextField
          size="small"
          label="Buscar por nombre/institución"
          placeholder="Nombre o institución"
          value={filters.search_name}
          onChange={(e) => {
            setFilters(prev => ({ ...prev, search_name: e.target.value }));
            setPage(0);
          }}
          sx={{ minWidth: 300, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        />
        <TextField
          select
          size="small"
          label="Tipo de Cliente"
          value={filters.customer_type_id}
          onChange={(e) => handleFilterChange(e as SelectChangeEvent<string>, 'customer_type_id')}
          sx={{ minWidth: 180, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        >
          <MenuItem value="">Todos</MenuItem>
          {filterOptions.customer_types.map((type) => (
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          size="small"
          label="Buscar por teléfono"
          placeholder="Número de celular"
          value={filters.contact_search}
          onChange={handleContactSearchChange}
          sx={{ minWidth: 200, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        />
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {stateSelect && <TableCell />}
              <TableCell sx={{ fontWeight: 'bold' }} >Nit/CI</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} >Nombre/Institución</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} >Tipo de Cliente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} >Contactos</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }} >Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              customers == null ?
                <SkeletonComponent
                  quantity={5}
                /> :
                customers.map((customer: CustomerModel, index: number) => {
                  const isSelected = items?.includes(customer.id);
                  return (
                    <React.Fragment key={index} >
                      <TableRow sx={{ borderBottom: '2px solid #ccc' }}>
                        {
                          stateSelect && <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => itemSelect!(customer)}
                            />
                          </TableCell>
                        }
                        <TableCell>{customer.nit ?? (customer.contacts.length > 0 ? customer.contacts[0].ci_nit : '')} </TableCell>
                        <TableCell>{customer.institution_name ?? (customer.contacts.length > 0 ? customer.contacts[0].name : '')}</TableCell>
                        <TableCell>{customer.customer_type.name}</TableCell>
                        {
                          customer.customer_type.is_institution ?
                            <TableCell>
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpenIndex(openIndex == customer.id ? null : customer.id)}
                              >
                                {openIndex == customer.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                              </IconButton>
                            </TableCell> :
                            <TableCell>{customer.contacts.length > 0 ? customer.contacts[0].phone : ''}</TableCell>
                        }
                        {!stateSelect && <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                          >
                            <IconButton sx={{ p: 0 }} onClick={() => itemEdit!(customer)} >
                              <EditOutlined color="info" />
                            </IconButton>
                            <IconButton sx={{ p: 0 }} onClick={() => deleteRemoveCustomer(customer)} >
                              <DeleteOutline color="error" />
                            </IconButton>
                          </Stack>
                        </TableCell>}
                      </TableRow>
                      <ContactTable
                        open={openIndex == customer.id}
                        contacts={customer.contacts}
                      />
                    </React.Fragment>
                  )
                }
                )}
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
