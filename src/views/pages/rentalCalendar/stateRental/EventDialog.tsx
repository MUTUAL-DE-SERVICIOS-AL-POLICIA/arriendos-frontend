import { Button, Card, Dialog, DialogTitle, Divider, Grid, IconButton, Paper, Step, StepButton, Stepper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from "@mui/material"
import { Box } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Close } from "@mui/icons-material"
import { useLeasesStates } from "@/hooks/useLeasesStates"
import { useForm, useRentalStore } from "@/hooks"
import { Requirement } from "./reserve"
import { FormPaymentModel, FormPaymentValidations } from "@/models/paymentModel"
import Swal from "sweetalert2"
import { PaidContent } from "./paid/PaidContent"
import { EventsCalendarModel, RentalModel } from "@/models"
import { InfoRental } from "./InfoRental"


const formPaymentFields: FormPaymentModel = {
  amount: 0,
  voucherNumber: 0,
  paymentDetail: '',
  amountWarranty: 0,
  voucherNumberWarranty: 0,
  detailWarranty: ''
}

const formValidations: FormPaymentValidations = {
  amount: [(value: number) => value > 0, 'Debe ingresar el monto del pago'],
  voucherNumber: [(value: number) => value > 0, 'Debe ingresar el número de comprobante'],
  amountWarranty: [(value: number) => value > 0, 'Debe ingresar el monto de la garantia'],
  voucherNumberWarranty: [(value: number) => value > 0, 'Debe ingresar el número de comprobante de la garantía']
}

interface elementsProps {
  open: boolean;
  handleClose: () => void;
  selectedEvent: EventsCalendarModel;
  date: Date;
}

export const EventDialog = (props: elementsProps) => {

  const {
    open,
    handleClose,
    selectedEvent,
    date,
  } = props
  //INFORMACIÓN DEL ALQUILER
  const [rental, setRental] = useState<RentalModel>();
  const { getRental } = useRentalStore();

  const [activeStep, setActiveStep] = useState(0) //estados 1 ,2, 3,4
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})
  const [currentState, setCurrentState] = useState<any>(null)
  const { leaseStates, getLeaseState, getCurrentLeaseState, postChangeRentalState } = useLeasesStates();
  const { getRentalRequirements, postSendRequirements, getRegistersPayments, postRegisterPayment, postRegisterWarranty, postWarrantyReturn } = useRentalStore()
  const [requirements, setRequirements] = useState([])
  const [optionals, setOptionals] = useState([])
  const [checkedItems, setCheckedItems] = useState<any[]>([])
  const [checkedItemsOptional, setCheckedItemsOptional] = useState<any[]>([])
  const [tabValue, setTabValue] = useState(0)
  const [stopAction, setStopAction] = useState<any>(null)
  const [payments, setPayments] = useState<Array<any>>([])

  const {
    amount, voucherNumber, paymentDetail, setFormState,
    amountWarranty, voucherNumberWarranty, detailWarranty,
    onInputChange, amountValid, voucherNumberValid,
    amountWarrantyValid, voucherNumberWarrantyValid
  } = useForm(formPaymentFields, formValidations)


  useEffect(() => {
    (async () => {
      const rental = await getRental(selectedEvent.rental);
      setRental(rental)
      getLeaseState()
      const res = await getCurrentLeaseState(selectedEvent.rental)
      stepsExecuted(res.current_state.id)
      setActiveStep(res.current_state.id)
      setCurrentState(res)
      getStoppedAction(res.next_states)
      const req = await getRentalRequirements(selectedEvent.rental)
      setRequirements(req.required_requirements)
      setOptionals(req.optional_requirements)
      const requireds = [...req.required_requirements.map((e: any) => {
        return {
          ...e,
          state: false
        }
      })]
      setCheckedItems(requireds)
      const optionals = [...req.optional_requirements.map((e: any) => {
        return {
          ...e,
          state: false
        }
      })]
      setCheckedItemsOptional(optionals)
      const data = await getRegistersPayments(selectedEvent.rental)
      const payments = data.payments
      setPayments(payments)
    })();
  }, [])


  const handleNext = async () => {
    setActiveStep(currentState.current_state.id)
    if (activeStep == 1) {
      nextStep()
    } else if (activeStep == 2) {
      const aux = checkedItems.concat(checkedItemsOptional)
      const requirementsSelected = aux.reduce((result: any, e: any) => {
        if (e.state) result.push(e.id)
        return result
      }, [])
      const requirementsToSend = {
        rental: selectedEvent.rental,
        list_requirements: requirementsSelected
      }
      const success = await postSendRequirements(requirementsToSend)
      if (success) {
        nextStep()
      } else
        alert("No todo correcto")
    } else if (activeStep == 3) {
      console.log("aqui es")
      nextStep()
    } else if (activeStep == 4) {
      nextStep()
      handleComplete()
    }
  }

  const nextStep = async () => {
    // aqui cambiar para consumir el next_states
    const changeRentalState = {
      rental: selectedEvent.rental,
      state: currentState.current_state.id + 1 // esto esta mal
    }
    const successChange = await postChangeRentalState(changeRentalState)
    if (successChange) {
      handleComplete()
      const stepCurrent = await getCurrentLeaseState(selectedEvent.rental)
      setCurrentState(stepCurrent)
      setActiveStep(stepCurrent.current_state.id)
      getStoppedAction(stepCurrent.next_states)
      // Swal.fire('Exitoso', 'Proceso exitoso', 'success')
    }
  }

  const stepsExecuted = (currentStep: number) => {
    const startPosition = currentStep - 1
    const newCompleted = completed
    for (let i = startPosition - 1; i >= 0; i--) {
      newCompleted[i] = true
    }
    setCompleted(newCompleted)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[currentState.current_state.id - 1] = true
    setCompleted(newCompleted)
  }

  // Funciones para el tab
  const allyProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const registerPayment = async () => {
    const body = {
      rental: selectedEvent.rental,
      mount: parseFloat(amount),
      voucher_number: parseFloat(voucherNumber),
      detail: paymentDetail || null
    }
    await postRegisterPayment(body)
    const data = await getRegistersPayments(selectedEvent.rental)
    setPayments(data.payments)
    emptyForm()
  }

  const getStoppedAction = (nextStates: Array<object>) => {
    console.log(nextStates)
    if (nextStates.length !== 0) {
      const foundItem: any = nextStates.filter((elem: any) => elem.name.toLowerCase() == 'anulado' || elem.name.toLowerCase() == 'cancelado')
      if (foundItem) {
        if (foundItem[0].name.toLowerCase() === 'anulado') {
          foundItem[0].name = 'ANULAR'
        } else foundItem[0].name = 'CANCELAR'
        setStopAction(foundItem[0])
      }
    }
  }

  const stoppedAction = async () => {
    Swal.fire({
      title: '¿Está seguro de esta acción?',
      text: `Esta acción no es reversible`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const changeRentalState = {
            rental: selectedEvent.rental,
            state: stopAction.id
          }
          const successChange = await postChangeRentalState(changeRentalState)
          if (successChange) {
            Swal.fire(
              `¡Listo!`,
              'Acción realizada con exito',
              'success'
            )
            handleClose()
          }
        } catch (error: any) {
          throw Swal.fire('Oops ocurrio algo', error.response.data.detail, 'error');
        }
      }
    })
  }

  const emptyForm = () => {
    setFormState({ amount: 0, voucherNumber: 0, paymentDetail: '' })
  }

  const emptyFormWarranty = () => {
    setFormState({ amountWarranty: 0, voucherNumberWarranty: 0, detailWarranty: '' })
  }

  const registerWarranty = async () => {
    const body = {
      rental: selectedEvent.rental,
      income: parseFloat(amountWarranty),
      voucher_number: parseFloat(voucherNumberWarranty),
      detail: detailWarranty || null
    }
    await postRegisterWarranty(body)
    emptyFormWarranty()
  }

  const warrantyReturn = async () => {
    const body = {
      rental: selectedEvent.rental,
    }
    await postWarrantyReturn(body)
  }


  return (
    <Dialog
      open={open}
      maxWidth={'md'}
      fullWidth={true}
      onClose={handleClose}
      sx={{ zIndex: 9998 }}
    >
      <Box sx={{ width: '95%', padding: '0px 20px', marginBottom: '0px', backgroundColor: '#f7f4f4', zIndex: 'tooltip' }}>
        <DialogTitle sx={{ marginBottom: '0px' }}>Estado del arriendo</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
        {rental && <InfoRental
          selectedEvent={selectedEvent}
          date={date}
          productId={selectedEvent.product_id}
          rental={rental}
        />}
        <Card sx={{ margin: '20px 0px', padding: '10px 10px 0px 10px', borderRadius: '10px' }} variant="outlined">
          <Stepper nonLinear activeStep={currentState ? currentState.current_state.id - 1 : 0}>
            {leaseStates.map((step: any, index: number) => (
              <Step key={step.id} completed={completed[index]}>
                <StepButton color="inherit">
                  {step.name}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <Divider style={{ height: '1px', width: '95%', marginLeft: '20px', backgroundColor: 'green', marginTop: '10px', borderRadius: '10px' }} />
          {currentState && <>
            {activeStep == 2 && (
              <Box>
                <Tabs value={tabValue} onChange={handleChange} >
                  <Tab label="Requeridos" {...allyProps(0)} />
                  <Tab label="Opcionales" {...allyProps(1)} />
                </Tabs>
                {tabValue === 0 && (
                  <Requirement documents={requirements} checkedItems={checkedItems} setCheckedItems={setCheckedItems} />
                )}
                {tabValue === 1 && (
                  <Requirement documents={optionals} checkedItems={checkedItemsOptional} setCheckedItems={setCheckedItemsOptional} />
                )}
              </Box>
            )}
            {activeStep == 3 && (
              <Box>
                <Grid container spacing={2} sx={{ padding: '20px 0px' }}>
                  <Grid item xs={12} sm={6}>
                    <PaidContent /* Registro de pago */
                      labels={['Monto Pago', 'Número de Comprobante', 'Detalle del pago']}
                      values={[amount, voucherNumber, paymentDetail]}
                      names={['amount', 'voucherNumber', 'paymentDetail']}
                      actionFunction={registerPayment}
                      onInputChange={onInputChange}
                      errors={[amountValid, voucherNumberValid]}
                      helperTexts={[amountValid, voucherNumberWarrantyValid]}
                    />
                    <PaidContent /* Registro de la garantía */
                      labels={['Monto garantía', 'Nro Comprobante', 'Detalle de la garantía']}
                      values={[amountWarranty, voucherNumberWarranty, detailWarranty]}
                      names={['amountWarranty', 'voucherNumberWarranty', 'detailWarranty']}
                      actionFunction={registerWarranty}
                      onInputChange={onInputChange}
                      errors={[amountWarrantyValid, voucherNumberWarrantyValid]}
                      helperTexts={[amountWarrantyValid, voucherNumberWarrantyValid]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TableContainer component={Paper} sx={{ borderRadius: 2, maxHeight: 450 }}>
                      <Table stickyHeader size="small" sx={{ border: '1px solid #ccc', borderCollapse: 'collapse', borderSpacing: '0' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#AEEDE1' }}>N° Comprobante</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#AEEDE1' }}>Monto cancelado</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#AEEDE1' }}>Monto a pagar</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {payments && payments.map((payment) => (
                            <TableRow
                              key={payment.id}
                              sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                borderBottom: '1px solic #ccc'
                              }}
                            >
                              <TableCell align="right">{payment.voucher_number}</TableCell>
                              <TableCell align="right">{payment.amount_paid}</TableCell>
                              <TableCell align="right">{payment.payable_mount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
            )}
            {activeStep == 4 && (
              <Box>
                <Grid container sx={{ padding: '20px 20px' }}>
                  <Grid item xs={12} sm={4}>
                    <Button variant="contained" onClick={warrantyReturn}>
                      Devolver Garantía
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button variant="contained">
                      Imprimir Actas
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button variant="contained">
                      Imprimir Nota
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </>}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            {currentState && currentState.next_states.length != 0 &&
              <Button onClick={stoppedAction} sx={{ mr: 1, color: 'red' }}>
                {stopAction !== null ? stopAction.name : 'sin nada'}
              </Button>
            }
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Siguiente
            </Button>
          </Box>
        </Card>
      </Box>
    </Dialog>
  )
}
