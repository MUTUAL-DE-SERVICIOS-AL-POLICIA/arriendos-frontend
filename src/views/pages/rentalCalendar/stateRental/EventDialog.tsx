import { Card, Dialog, DialogTitle, Divider, IconButton, Step, StepButton, Stepper } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { ArrowCircleRight, Cancel, Close } from "@mui/icons-material"
import { useLeasesStates } from "@/hooks/useLeasesStates"
import { useRentalStore } from "@/hooks"
import Swal from "sweetalert2"
import { InfoRental } from "./InfoRental"
import { Reserver } from "./reserve/Main"
import { Rented } from "./payments/Main"
import { Concluded } from "./concluded/Main"
import { ComponentButton } from "@/components"

interface elementsProps {
  open: boolean;
  handleClose: () => void;
  date: Date;
}

export const EventDialog = (props: elementsProps) => {

  const {
    open,
    handleClose,
    date,
  } = props

  //INFORMACIÓN DEL ALQUILER
  const { rentalSelected, postSendRequirements } = useRentalStore();


  const { states, rentalInformation, currentRentalState, getLeaseState, getRental, getCurrentLeaseState, postChangeRentalState } = useLeasesStates();

  const [checked, setChecked] = useState<Array<any>>([])
  const [checkedOptional, setCheckedOptional] = useState<Array<any>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRental(rentalSelected.rental);
    getLeaseState()
    getCurrentLeaseState(rentalSelected.rental)
  }, [])


  const mergeRequirements = (checkedItems: Array<any>, checkedItemsOptional: Array<any>) => {
    setChecked(checkedItems)
    setCheckedOptional(checkedItemsOptional)
  }

  const handleNext = async () => {
    setLoading(true)
    if (currentRentalState.current_state.id == 1) {
      const aux = checked.concat(checkedOptional)
      const requirementsSelected = aux.reduce((result: any, e: any) => {
        if (e.state) result.push(e.id)
        return result
      }, [])
      const requirementsToSend = {
        rental: rentalSelected.rental,
        list_requirements: requirementsSelected
      }
      if (requirementsSelected.length != 0) {
        const success = await postSendRequirements(requirementsToSend)
        if (success) {
          nextStep()
        }
      } else Swal.fire('Error', 'No existen requisitos entregados', 'error')
    } else if (currentRentalState.current_state.id == 2) {
      nextStep()
    } else if (currentRentalState.current_state.id == 3) {
      nextStep()
      handleClose()
    }
    setLoading(false)
  }

  const nextStep = async () => {
    let estadoSiguienteId = null;
    let diferenciaMinima = Infinity;

    currentRentalState.next_states.forEach((nextState: any) => {
      const diferencia = Math.abs(currentRentalState.current_state.id - nextState.id);
      if (diferencia < diferenciaMinima) {
        diferenciaMinima = diferencia;
        estadoSiguienteId = nextState.id;
      }
    });
    const changeRentalState = {
      rental: rentalSelected.rental,
      state: estadoSiguienteId
    }
    await postChangeRentalState(changeRentalState)
  }

  return (
    <>
      <Dialog
        open={open}
        maxWidth={'lg'}
        fullWidth={true}
        onClose={handleClose}
        sx={{ zIndex: 9998 }}
        disableEnforceFocus
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
          {
            rentalInformation && <InfoRental
              date={date}
            />
          }
          {currentRentalState && <Card sx={{ margin: '20px 0px', padding: '10px 10px 0px 10px', borderRadius: '10px' }} variant="outlined">
            <Stepper nonLinear activeStep={currentRentalState.current_state.id} >
              {states.map((step: any) => (
                <Step key={step.id} completed={step.id - 1 < currentRentalState.current_state.id}>
                  <StepButton color="inherit">
                    {step.name}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <Divider style={{ height: '1px', width: '95%', marginLeft: '20px', backgroundColor: 'green', marginTop: '10px', borderRadius: '10px' }} />
            <>
              {
                currentRentalState.current_state.id == 1 &&
                <Reserver
                  rentalId={rentalSelected.rental}
                  checkeds={mergeRequirements}
                />
              }
              {
                currentRentalState.current_state.id == 2 &&
                <Rented />
              }
              {
                currentRentalState.current_state.id == 3 &&
                <Concluded
                  rental={rentalSelected.rental}
                />
              }
            </>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, pb: 1 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              {
                (currentRentalState.current_state.id + 1) <= states.length &&
                <ComponentButton
                  text={(currentRentalState.current_state.id + 1) == states.length ? 'Finalizar' : 'Siguiente'}
                  onClick={handleNext}
                  loading={loading}
                  variant={'outlined'}
                  endIcon={(currentRentalState.current_state.id + 1) == states.length ? <Cancel /> : <ArrowCircleRight />}
                />
              }
            </Box>
          </Card>}
        </Box>
      </Dialog >
    </>
  )
}
