import { Button, Card, Dialog, DialogTitle, Divider, IconButton, Step, StepButton, Stepper } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { Close } from "@mui/icons-material"
import { useLeasesStates } from "@/hooks/useLeasesStates"
import { useRentalStore } from "@/hooks"
import Swal from "sweetalert2"
import { EventsCalendarModel, RentalModel } from "@/models"
import { InfoRental } from "./InfoRental"
import { FormPayments, Reason } from "./payments"
import { Reserver } from "./reserve/Main"
import { Rented } from "./payments/Main"
import { Concluded } from "./concluded/Main"

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
  const { getRental, postSendRequirements } = useRentalStore();

  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})
  const [currentState, setCurrentState] = useState<any>(null)
  const { leaseStates, getLeaseState, getCurrentLeaseState, postChangeRentalState } = useLeasesStates();
  const [stopAction, setStopAction] = useState<any>(null)

  const [ checked, setChecked ] = useState<Array<any>>([])
  const [ checkedOptional, setCheckedOptional] = useState<Array<any>>([])

  useEffect(() => {
    (async () => {
      const rental = await getRental(selectedEvent.rental);
      setRental(rental)
      getLeaseState()
      const res = await getCurrentLeaseState(selectedEvent.rental)
      if(res.current_state.id === 1) {
        stepsExecuted(res.current_state.id + 1)
      } else stepsExecuted(res.current_state.id)
      setActiveStep(res.current_state.id)
      setCurrentState(res)
      getStoppedAction(res.next_states)
    })();
  }, [])


  const mergeRequirements = (checkedItems: Array<any>, checkedItemsOptional: Array<any>) => {
    setChecked(checkedItems)
    setCheckedOptional(checkedItemsOptional)
  }

  const handleNext = async () => {
    setActiveStep(currentState.current_state.id)
    if (activeStep == 1) {
      nextStep()
    } else if (activeStep == 2) {
      const aux = checked.concat(checkedOptional)
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
      nextStep()
    } else if (activeStep == 4) {
      nextStep()
      handleComplete()
    }
  }

  const nextStep = async () => {
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

  const getStoppedAction = (nextStates: Array<object>) => {
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


  const [tabSelect, setTabSelect] = useState<Reason>(Reason.payment);
  const [modal, setModal] = useState(false);
  const handleModal = (value: boolean, reason?: Reason) => {
    if (reason) setTabSelect(reason!);
    setModal(value);
  };


  return (
    <>
      <Dialog
        open={open}
        maxWidth={'md'}
        fullWidth={true}
        onClose={handleClose}
        sx={{ zIndex: 9998 }}
      >
        <Box sx={{ width: '95%', padding: '0px 20px', marginBottom: '0px', backgroundColor: '#f7f4f4', zIndex: 'tooltip' }}>
          <DialogTitle sx={{ marginBottom: '0px' }}>Estado del alquiler</DialogTitle>
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
                <Reserver rental={selectedEvent.rental} checkeds={mergeRequirements} />
              )}
              {activeStep == 3 && (
                <Rented handleModal={handleModal} rental={selectedEvent.rental} />
              )}
              {activeStep == 4 && (
                <Concluded rental={selectedEvent.rental} />
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
      <FormPayments
        open={modal}
        handleClose={() => handleModal(false)}
        tabReason={tabSelect}
        selectedEvent={selectedEvent}
        rental={rental!}
      />
    </>
  )
}
