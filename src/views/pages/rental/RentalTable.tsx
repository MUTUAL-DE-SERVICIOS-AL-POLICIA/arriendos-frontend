import { ComponentTablePagination } from "@/components";
import { Box, Button, CircularProgress, MenuItem, Stack, TextField, Tooltip } from "@mui/material";
import { Download } from "@mui/icons-material";
import { ComponentTableContent } from "@/components/TableContent";
import { useEffect, useState } from "react";
import { useRentalStore } from "@/hooks";
import { useReportStore } from "@/hooks/useReportStore";
import { EditRental } from ".";
import dayjs from 'dayjs';

interface tableProps {
  limitInit?: number;
}

interface FilterOptions {
  states: { id: number; name: string }[];
}

export const RentalTable = (props: tableProps) => {
  const {
    limitInit = 10,
  } = props;

  /*DATA */
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ states: [] });
  const [filters, setFilters] = useState({ state_id: '', date_from: '', date_to: '', search_customer: '' });

  const { allRentals = [], allRentalsWithProducts = [], getAllRentals, getRentalFilterOptions} = useRentalStore()
  const { getReportXlsx } = useReportStore()
  const [ open, setOpen ] = useState(false)
  const [ rentalSelected, setRentalSelected ] = useState(null)
  const [ downloading, setDownloading ] = useState(false)

  const handleDialog = (value: boolean, rental: any) => {
    setOpen(value)
    setRentalSelected(rental)
  }

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadRentals();
  }, [page, limit, filters]);

  const loadFilterOptions = async () => {
    const options = await getRentalFilterOptions();
    setFilterOptions(options);
  };

  const loadRentals = async () => {
    const activeFilters = {
      state_id: filters.state_id,
      date_from: filters.date_from,
      date_to: filters.date_to,
    };
    const total = await getAllRentals(page, limit, handleDialog, filters.search_customer, activeFilters);
    setTotal(total || 0);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, filterType: string) => {
    setFilters(prev => ({ ...prev, [filterType]: event.target.value }));
    setPage(0);
  };

  const canDownload = filters.state_id && filters.date_from && filters.date_to;

  const handleDownloadReport = async () => {
    if (!canDownload) return;
    setDownloading(true);
    try {
      const start_date = dayjs(filters.date_from).startOf('day').hour(0).minute(0).second(0).toISOString();
      const end_date = dayjs(filters.date_to).endOf('day').hour(23).minute(59).second(59).toISOString();
      await getReportXlsx({ start_date, end_date, state: parseInt(filters.state_id) });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Stack sx={{ paddingRight: '10px' }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            size="small"
            label="Buscar por nombre de cliente"
            placeholder="Nombre del cliente"
            value={filters.search_customer}
            onChange={(e) => {
              setFilters(prev => ({ ...prev, search_customer: e.target.value }));
              setPage(0);
            }}
            sx={{ minWidth: 280, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <TextField
            select
            size="small"
            label="Estado"
            value={filters.state_id}
            onChange={(e) => handleFilterChange(e, 'state_id')}
            sx={{ minWidth: 150, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          >
            <MenuItem value="">Todos</MenuItem>
            {filterOptions.states.map((state) => (
              <MenuItem key={state.id} value={String(state.id)}>{state.name}</MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            label="Desde"
            type="date"
            value={filters.date_from}
            onChange={(e) => handleFilterChange(e, 'date_from')}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 160, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <TextField
            size="small"
            label="Hasta"
            type="date"
            value={filters.date_to}
            onChange={(e) => handleFilterChange(e, 'date_to')}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 160, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
          />
          <Tooltip title={!canDownload ? "Selecciona estado y rango de fechas para descargar" : ""}>
            <span>
              <Button
                size="small"
                variant="contained"
                startIcon={downloading ? <CircularProgress size={16} color="inherit" /> : <Download />}
                disabled={!canDownload || downloading}
                onClick={handleDownloadReport}
                sx={{ height: 40, borderRadius: '10px', textTransform: 'none' }}
              >
                Descargar reporte
              </Button>
            </span>
          </Tooltip>
        </Box>
        { allRentals.length !== 0 && allRentalsWithProducts.length !== 0 && <ComponentTableContent
          headers={['N°', 'N° trámite', 'Cliente', 'Estado', 'Fecha', 'Acción' ]}
          data={allRentals}
          sxHeader={{fontWeight: 'bold', backgroundColor: '#E2F6F0'}}
          useCollapse={true}
          subTableTitle="Producto"
          subTableHeaders={['N° producto', 'Evento', 'Fecha inicio', 'Fecha Final', 'Acción']}
          subTableData={allRentalsWithProducts}
        /> }
        <ComponentTablePagination
          total={total}
          onPageChange={(value) => setPage(value)}
          onRowsPerPageChange={(value) => setLimit(value)}
          page={page}
          limit={limit}
        />
        { open && <EditRental
          open={open}
          onClose={() => handleDialog(false, null)}
          rental={rentalSelected}
        />}
      </Stack>
    </>
  );
}
