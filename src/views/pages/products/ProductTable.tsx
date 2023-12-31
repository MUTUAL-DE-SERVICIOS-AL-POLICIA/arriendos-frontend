import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { ComponentSearch, ComponentTablePagination, SkeletonComponent } from "@/components";
import { useProductStore } from "@/hooks";
import { ProductModel } from "@/models";

interface tableProps {
  handleEdit: (product: ProductModel) => void;
  limitInit?: number;
}

export const ProductTable = (props: tableProps) => {
  const {
    limitInit = 10,
  } = props;

  /*DATA */
  const { products = null, flag, getProducts, deleteRemoveProduct } = useProductStore();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(limitInit)

  useEffect(() => {//escucha si "page", "limit" o "flag" se modifico
    getProducts(page, limit, '').then((total) => setTotal(total))
  }, [page, limit, flag]);

  const handleSearch = async (search: string) => {
    await setPage(0);
    await setLimit(limitInit);
    getProducts(0, limitInit, search).then((total) => setTotal(total))
  }
  return (
    <Stack>
      <ComponentSearch
        title="Buscar Producto"
        onSearch={handleSearch}
      />
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
    </Stack>
  );
}
