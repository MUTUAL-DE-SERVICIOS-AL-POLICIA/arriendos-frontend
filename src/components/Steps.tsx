import { Card, Dialog, Divider, Step, StepButton, Stepper } from "@mui/material"
import { RentalStateModel } from "@/models"
import { useEffect, useState } from "react"
import { Reserver } from "@/views/pages/rentalCalendar/stateRental/reserve"
import { Rented } from "@/views/pages/rentalCalendar/stateRental/payments/Main"
import { Box, width } from "@mui/system"
import { ComponentButton } from "."

interface Props {
  states: Array<RentalStateModel>
  open: boolean
  handleClose: () => void
}

export const Steps = (props: Props) => {
  const {
    states,
    open,
    handleClose
  } = props

  useEffect(() => {
    console.log(states)
  })

  const [ activeStep, setActiveStep ] = useState(0)

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  return (
    <>
      <Dialog
        open={open}
        maxWidth={'lg'}
        fullWidth={true}
        onClose={handleClose}
        sx={{ zIndex: 9998}}
        disableEnforceFocus
      >
        <Box sx={{width: '95%', padding: '0px 20px', marginBottom: '0px', backgroundColor: '#f7f4f4', zIndex: 'tooltip'}}>
          <Card sx={{ margin: '20px 0px', padding: '10px 10px 0px 10px', borderRadius: '10px'}} variant="outlined">
            <Stepper nonLinear activeStep={activeStep}>
              {states.map((step: RentalStateModel, index:number) => (
                <Step key={step.id}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {step.name}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <Divider style={{ height: '1px', width: '95%', marginLeft: '20px', backgroundColor: 'green', marginTop: '10px', borderRadius: '10px' }} />
            <Box sx={{diplay: 'flex', flexDirection: 'row', pt: 2, pb: 1}}>
              <Box sx={{ flex: '1 1 auto'}}>
                <ComponentButton
                  text="siguiente"
                  variant={'outlined'}
                />
              </Box>
            </Box>
          </Card>
        </Box>
      </Dialog>
    </>
  )
}