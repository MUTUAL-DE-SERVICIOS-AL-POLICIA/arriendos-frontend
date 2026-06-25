import { useProductStore } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface PriceHistoryProps {
  open: boolean;
  handleClose: () => void;
  productId: number | null;
  productName: string;
}

interface PriceRecord {
  id: number;
  mount: number;
  is_active: boolean;
  valid_from: string | null;
  valid_to: string | null;
  created_at: string;
}

export const PriceHistory = (props: PriceHistoryProps) => {
  const { open, handleClose, productId, productName } = props;
  const [prices, setPrices] = useState<PriceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const { getPriceHistory } = useProductStore();

  useEffect(() => {
    if (open && productId) {
      loadPriceHistory();
    }
  }, [open, productId]);

  const loadPriceHistory = async () => {
    if (!productId) return;
    setLoading(true);
    const data = await getPriceHistory(productId);
    setPrices(data);
    setLoading(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Actual";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-BO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Historial de Precios - {productName}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Typography>Cargando historial...</Typography>
        ) : prices.length === 0 ? (
          <Typography>No hay registros de precios para este producto.</Typography>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#E2F6F0" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Precio</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Vigente Desde</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Vigente Hasta</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Fecha Registro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prices.map((price) => (
                  <TableRow
                    key={price.id}
                    sx={{
                      backgroundColor: price.is_active ? "#E8F5E9" : "inherit",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <TableCell>
                      <Typography fontWeight={price.is_active ? "bold" : "normal"}>
                        {price.mount} Bs
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: price.is_active ? "success.main" : "text.secondary",
                          fontWeight: price.is_active ? "bold" : "normal",
                        }}
                      >
                        {price.is_active ? "Activo" : "Inactivo"}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(price.valid_from)}</TableCell>
                    <TableCell>{formatDate(price.valid_to)}</TableCell>
                    <TableCell>{formatDate(price.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
