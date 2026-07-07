import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteOutline, EditOutlined, History } from "@mui/icons-material";
import { ComponentTablePagination, SkeletonComponent } from "@/components";
import { useProductStore } from "@/hooks";
import { ProductModel } from "@/models";
import { PriceHistory } from ".";

interface tableProps {
  handleEdit: (product: ProductModel) => void;
  limitInit?: number;
}

interface FilterOptions {
  rates: { id: number; name: string }[];
  properties: { id: number; name: string }[];
  rooms: { id: number; name: string; property_id: number }[];
  hour_ranges: { id: number; time: number }[];
  days: string[];
}

export const ProductTable = (props: tableProps) => {
  const {
    limitInit = 10,
    handleEdit,
  } = props;

  /*DATA */
  const { products = null, flag, getProducts, deleteRemoveProduct, getFilterOptions } = useProductStore();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)
  const [openHistory, setOpenHistory] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ rates: [], properties: [], rooms: [], hour_ranges: [], days: [] });
  const [filters, setFilters] = useState({ rate_id: '', property_id: '', room_id: '', hour_range_id: '', day: [] as string[] });

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page, limit, flag, filters]);

  const loadFilterOptions = async () => {
    const options = await getFilterOptions();
    setFilterOptions(options);
  };

  const loadProducts = async () => {
    const activeFilters = {
      rate_id: filters.rate_id,
      property_id: filters.property_id,
      room_id: filters.room_id,
      hour_range_id: filters.hour_range_id,
      day: filters.day.join(',')
    };
    const total = await getProducts(page, limit, '', activeFilters);
    setTotal(total || 0);
  };

  const handleFilterChange = (event: SelectChangeEvent<string | string[]>, filterType: string) => {
    const value = event.target.value;
    setFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      // Si cambia inmueble, resetear ambiente
      if (filterType === 'property_id') {
        newFilters.room_id = '';
      }
      return newFilters;
    });
    setPage(0);
  };
  const handleOpenHistory = (product: ProductModel) => {
    setSelectedProduct(product);
    setOpenHistory(true);
  };

  const handleCloseHistory = () => {
    setOpenHistory(false);
    setSelectedProduct(null);
  };

  return (
    <Stack>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Tarifa</InputLabel>
          <Select
            value={filters.rate_id}
            label="Tarifa"
            onChange={(e) => handleFilterChange(e, 'rate_id')}
          >
            <MenuItem value="">Todas</MenuItem>
            {filterOptions.rates.map((rate) => (
              <MenuItem key={rate.id} value={rate.id}>{rate.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Inmueble</InputLabel>
          <Select
            value={filters.property_id}
            label="Inmueble"
            onChange={(e) => handleFilterChange(e, 'property_id')}
          >
            <MenuItem value="">Todos</MenuItem>
            {filterOptions.properties.map((property) => (
              <MenuItem key={property.id} value={property.id}>{property.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Ambiente</InputLabel>
          <Select
            value={filters.room_id}
            label="Ambiente"
            onChange={(e) => handleFilterChange(e, 'room_id')}
          >
            <MenuItem value="">Todos</MenuItem>
            {(filterOptions.rooms || [])
              .filter(room => !filters.property_id || room.property_id === Number(filters.property_id))
              .map((room) => (
              <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Rango Hrs</InputLabel>
          <Select
            value={filters.hour_range_id}
            label="Rango Hrs"
            onChange={(e) => handleFilterChange(e, 'hour_range_id')}
          >
            <MenuItem value="">Todos</MenuItem>
            {filterOptions.hour_ranges.map((hr) => (
              <MenuItem key={hr.id} value={hr.id}>{hr.time} Hrs</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Días</InputLabel>
          <Select
            multiple
            value={filters.day}
            label="Días"
            onChange={(e) => handleFilterChange(e, 'day')}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            <MenuItem value="">Todos</MenuItem>
            {(filterOptions.days || []).map((day) => (
              <MenuItem key={day} value={day}>{day}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead >
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Cod.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Inmueble</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ambiente</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Tarifa</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Rango Hrs</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Días</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              products == null ?
                <SkeletonComponent
                  quantity={8}
                /> :
                products.map((product: ProductModel) => (
                  <TableRow key={product.id} sx={{ borderBottom: '2px solid #ccc' }}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.room.property.name}</TableCell>
                    <TableCell>{product.room.name}</TableCell>
                    <TableCell>{product.rate.name}</TableCell>
                    <TableCell>{`${product.hour_range.time} Hrs`}</TableCell>
                    <TableCell>{product.day.map((day, index) => (<Typography key={index} >- {day}</Typography>))}</TableCell>
                    <TableCell>{product.mount}</TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                      >
                        <IconButton
                          sx={{ p: 0 }}
                          onClick={() => handleEdit(product)}
                          title="Editar producto"
                        >
                          <EditOutlined color="warning" />
                        </IconButton>
                        <IconButton
                          sx={{ p: 0 }}
                          onClick={() => handleOpenHistory(product)}
                          title="Historial de precios"
                        >
                          <History color="primary" />
                        </IconButton>
                        <IconButton
                          sx={{ p: 0 }}
                          onClick={() => deleteRemoveProduct(product)}>
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
            }
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
      {selectedProduct && (
        <PriceHistory
          open={openHistory}
          handleClose={handleCloseHistory}
          productId={selectedProduct.id}
          productName={`${selectedProduct.room.name} - ${selectedProduct.rate.name}`}
        />
      )}
    </Stack>
  );
}
