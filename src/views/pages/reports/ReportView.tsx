import { ComponentInputSelect, ModalSelectComponent } from "@/components"
import { useReportStore } from "@/hooks/useReportStore"
import { useDamageStore, useExtraHourStore, usePaymentsStore, useRentalStore, useWarrantyStore } from "@/hooks"
import { Download, Description, ExpandMore, ExpandLess, Print } from "@mui/icons-material"
import { Button, Grid, Stack, SvgIcon, Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, CircularProgress, IconButton, Collapse } from "@mui/material"
import { Fragment, useCallback, useState, useEffect } from "react"
import { StateTable } from "."
import { useForm } from "@/hooks"
import { ComponentDateWithoutTime } from "@/components/DateWithoutTime"
import dayjs from 'dayjs';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DOC_TYPE_COLORS: Record<string, string> = {
  reserva: 'info',
  entrega: 'success',
  horas_extra: 'warning',
  warranty_request: 'secondary',
  warranty_damage: 'error',
  warranty_return: 'success',
  payments: 'primary',
  warranties: 'secondary',
};

const formFields = {
  state: null,
}

export const ReportView = () => {
  const [tabValue, setTabValue] = useState(0);
  const [rentals, setRentals] = useState<RentalEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRental, setExpandedRental] = useState<number | null>(null);

  const {
    state, stateValid,
    onValueChange, formSubmitted
  } = useForm(formFields)

  var bodyFormData = new FormData();

  const [modalState, setModalState] = useState(false)
  const { getReportXlsx, getDocumentsByRental } = useReportStore()
  const { postSendRequirements, getPrintReturnWarrantyForm, getPrintWarrantyReturn, postPrintDeliveryForm } = useRentalStore()
  const { postRegisterExtraHour } = useExtraHourStore()
  const { postRegisterDiscountWarranty } = useDamageStore()
  const { printPaymentForm } = usePaymentsStore()
  const { printWarrantyForm } = useWarrantyStore()

  const [since, setSince] = useState(null)
  const [until, setUntil] = useState(null)

  const handleModalStateType = useCallback((value: boolean) => {
    setModalState(value)
  }, [])

  const getDocument = () => {
    const start_date = dayjs(since).startOf('day').hour(0).minute(0).second(0).toISOString();
    const end_date = dayjs(until).endOf('day').hour(23).minute(59).second(59).toISOString();
    bodyFormData.append("start_date", start_date!)
    bodyFormData.append("end_date", end_date!)
    bodyFormData.append("state", state.id)
    getReportXlsx(bodyFormData)
  }

  const exists = () => {
    return !(state && Object.keys(state).length != 0 && since && until)
  }

  const loadDocuments = async () => {
    setLoading(true);
    const data = await getDocumentsByRental();
    setRentals(data.rentals || []);
    setLoading(false);
  };

  useEffect(() => {
    if (tabValue === 1) {
      loadDocuments();
    }
  }, [tabValue]);

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
          postRegisterDiscountWarranty({ rental: rentalId, product: doc.product_ids[0] });
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
      {modalState &&
        <ModalSelectComponent
          stateSelect={true}
          title='Estados'
          opendrawer={modalState}
          handleDrawer={handleModalStateType}
        >
          <StateTable
            stateSelect={true}
            itemSelect={(v) => {
              if (state == null || state.id != v.id) {
                onValueChange('state', v)
                handleModalStateType(false)
              }
            }}
            items={state == null ? [] : [state.id]}
          />
        </ModalSelectComponent>
      }

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Generar Reporte" icon={<Download />} />
          <Tab label="Documentos por Alquiler" icon={<Description />} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Stack direction="row" justifyContent="end">
          <Button
            onClick={() => getDocument()}
            startIcon={<SvgIcon fontSize="small"><Download /></SvgIcon>}
            variant="contained"
            disabled={exists()}
          >
            Descargar
          </Button>
        </Stack>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
            <ComponentInputSelect
              label={state != null ? 'Estado' : ''}
              title={state != null ? state.name : 'Estado'}
              onPressed={() => handleModalStateType(true)}
              error={!!stateValid && formSubmitted}
              helperText={formSubmitted ? stateValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
            <ComponentDateWithoutTime
              label="desde"
              value={since}
              onChange={setSince}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
            <ComponentDateWithoutTime
              label="hasta"
              value={until}
              onChange={setUntil}
            />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
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
                                        color={DOC_TYPE_COLORS[doc.type] as any || 'default'}
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
      </TabPanel>
    </>
  )
}
