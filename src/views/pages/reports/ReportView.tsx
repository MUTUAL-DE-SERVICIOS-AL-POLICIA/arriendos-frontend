import { useReportStore } from "@/hooks/useReportStore"
import { useDamageStore, useExtraHourStore, usePaymentsStore, useRentalStore, useWarrantyStore } from "@/hooks"
import { ExpandMore, ExpandLess, Print } from "@mui/icons-material"
import { Stack, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, CircularProgress, IconButton, Collapse } from "@mui/material"
import { Fragment, useState, useEffect } from "react"

interface AvailableDoc {
  type: string;
  name: string;
  product_ids?: number[];
}

interface RentalEntry {
  id: number;
  contract_number: string;
  customer_name: string;
  state_name: string;
  date: string;
  available_documents: AvailableDoc[];
}

const DOC_TYPE_COLORS: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  reserva: 'info',
  entrega: 'success',
  horas_extra: 'warning',
  warranty_request: 'secondary',
  warranty_damage: 'error',
  warranty_return: 'success',
  payments: 'primary',
  warranties: 'secondary',
};

export const ReportView = () => {
  const [rentals, setRentals] = useState<RentalEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRental, setExpandedRental] = useState<number | null>(null);

  const { getDocumentsByRental } = useReportStore()
  const { postSendRequirements, getPrintReturnWarrantyForm, getPrintWarrantyReturn, postPrintDeliveryForm } = useRentalStore()
  const { postRegisterExtraHour } = useExtraHourStore()
  const { printDamageWarrantyForm } = useDamageStore()
  const { printPaymentForm } = usePaymentsStore()
  const { printWarrantyForm } = useWarrantyStore()

  useEffect(() => {
    setLoading(true);
    getDocumentsByRental().then((data) => {
      setRentals(data.rentals || []);
      setLoading(false);
    });
  }, []);

  const handleReprint = (doc: AvailableDoc, rentalId: number) => {
    switch (doc.type) {
      case 'reserva':
        postSendRequirements({ rental: rentalId });
        break;
      case 'entrega':
        if (doc.product_ids && doc.product_ids.length > 0)
          postPrintDeliveryForm({ rental: rentalId, product: doc.product_ids[0] });
        break;
      case 'horas_extra':
        if (doc.product_ids && doc.product_ids.length > 0)
          postRegisterExtraHour(rentalId, { selected_product: doc.product_ids[0] });
        break;
      case 'warranty_request':
        getPrintWarrantyReturn(rentalId);
        break;
      case 'warranty_damage':
        if (doc.product_ids && doc.product_ids.length > 0)
          printDamageWarrantyForm(rentalId, doc.product_ids[0]);
        break;
      case 'warranty_return':
        getPrintReturnWarrantyForm(rentalId);
        break;
      case 'payments':
        printPaymentForm(rentalId);
        break;
      case 'warranties':
        printWarrantyForm(rentalId);
        break;
    }
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Documentos por Alquiler
        </Typography>
      </Box>

      {loading ? (
        <Stack alignItems="center" sx={{ p: 4 }}>
          <CircularProgress />
        </Stack>
      ) : rentals.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ p: 4 }}>
          No hay documentos disponibles
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                <TableCell width={50}></TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>N° Trámite</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Cliente</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentals.map((rental) => (
                <Fragment key={rental.id}>
                  <TableRow
                    key={`row-${rental.id}`}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setExpandedRental(expandedRental === rental.id ? null : rental.id)}
                  >
                    <TableCell>
                      <IconButton size="small">
                        {expandedRental === rental.id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {rental.contract_number || rental.id}
                      </Typography>
                    </TableCell>
                    <TableCell>{rental.customer_name}</TableCell>
                    <TableCell>{rental.state_name}</TableCell>
                    <TableCell>{rental.date}</TableCell>
                    <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                      <Stack direction="row" spacing={0.5} justifyContent="center" flexWrap="wrap" useFlexGap>
                        {rental.available_documents.map((doc) => (
                          <IconButton
                            key={`btn-${doc.type}-${doc.product_ids?.[0] || ''}`}
                            size="small"
                            title={`Imprimir ${doc.name}`}
                            onClick={() => handleReprint(doc, rental.id)}
                          >
                            <Print fontSize="small" />
                          </IconButton>
                        ))}
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <TableRow key={`detail-${rental.id}`}>
                    <TableCell sx={{ py: 0 }} colSpan={6}>
                      <Collapse in={expandedRental === rental.id} timeout="auto" unmountOnExit>
                        <Box sx={{ py: 1 }}>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Documento</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Producto(s)</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acción</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rental.available_documents.map((doc, idx) => (
                                <TableRow key={idx}>
                                  <TableCell>
                                    <Chip
                                      label={doc.name}
                                      color={DOC_TYPE_COLORS[doc.type] || 'default'}
                                      size="small"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    {doc.product_ids ? doc.product_ids.join(', ') : '-'}
                                  </TableCell>
                                  <TableCell align="center">
                                    <IconButton
                                      size="small"
                                      title={`Imprimir ${doc.name}`}
                                      onClick={() => handleReprint(doc, rental.id)}
                                    >
                                      <Print fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
