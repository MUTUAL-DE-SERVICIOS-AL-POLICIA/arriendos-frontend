import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useProductStore } from "@/hooks";
import { ProductModel } from "@/models";

interface tableProps {
  handleEdit: (product: ProductModel) => void;
  limitInit?: number;
}

export const ProductTable = (props: tableProps) => {
  const {
    handleEdit,
    limitInit = 10
  } = props;

  /*DATA */
  const { products, flag, getProducts } = useProductStore();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)

  useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
    getProducts({ page, limit }).then((total) => setTotal(total))
  }, [page, limit, flag]);

  return (
    <Stack>
      <ComponentSearch
        title="Buscar Producto"
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead >
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
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
            {products.map((product: ProductModel) => (
              <TableRow key={product.id}>
                <TableCell>{product.room.property.name}</TableCell>
                <TableCell>{product.room.name}</TableCell>
                <TableCell>{product.rate.name}</TableCell>
                <TableCell>{product.hour_range.name}</TableCell>
                <TableCell>{product.day.map((day, index) => (<Typography key={index}>- {day}</Typography>))}</TableCell>
                <TableCell>{product.active_price.mount}</TableCell>
                <TableCell>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                  >
                    <IconButton onClick={() => handleEdit(product)}>
                      <EditOutlined color="info" />
                    </IconButton>
                    <IconButton onClick={() => { }}>
                      <DeleteOutline color="error" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
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
