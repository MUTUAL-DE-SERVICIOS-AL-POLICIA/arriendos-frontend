import { Button, Card, Dialog, DialogTitle, Divider,IconButton, Step, StepButton, Stepper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { Close } from "@mui/icons-material"
import { useLeasesStates } from "@/hooks/useLeasesStates"
import { InfoRental } from "."


interface elementsProps {
	open: boolean;
	handleClose: () => void;
	selectedEvent: any;
}
export const EventDialog = (props: elementsProps) => {

	const {
		open,
		handleClose,
		selectedEvent
	} = props

	const [activeStep, setActiveStep] = useState(0) //estados 1 ,2, 3,4
	const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})
	const [currentState, setCurrentState] = useState<any>(null)
	const { leaseStates, getLeaseState, getCurrentLeaseState } = useLeasesStates();

	useEffect(() => {
		(async () => {
			getLeaseState()
			const res = await getCurrentLeaseState(selectedEvent.rental)
			setCurrentState(res)
		})();
	}, [])

	const totalSteps = () => { // Total de pasos
		return leaseStates.length
	}

	const completedSteps = () => {
		return Object.keys(completed).length
	}

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps()
	}

	const isLastStep = () => {
		return activeStep === totalSteps() - 1
	}

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? leaseStates.findIndex((_:any, i:number) => !(i in completed))
				: activeStep + 1
		setActiveStep(newActiveStep)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	// const handleComplete = () => {
	// 	const newCompleted = completed
	// 	newCompleted[activeStep] = true
	// 	setCompleted(newCompleted)
	// 	handleNext()
	// }

	return (

		<Dialog
			open={open}
			maxWidth={'md'}
			fullWidth={true}
			onClose={handleClose}
		>
			<Box sx={{ width: '95%', padding: '0px 20px', marginBottom: '0px', backgroundColor: '#f7f4f4' }}>
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
				<InfoRental selectedEvent={selectedEvent}/>
				{JSON.stringify(currentState)}
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
					{allStepsCompleted() ? (
						<>
							<Typography>Aqui hacemos la logica de mandar al backend algo</Typography>
						</>
					) : (
						<>
							{currentState && <>

								{currentState.current_state.id == 2 && (
									<Button
										color="inherit"
									>
										Componente paso 1
									</Button>
								)}
								{currentState.current_state.id == 3 && (
									<p>Paso 3</p>
								)}
							</>}
							{/* <Typography sx={{ mt:2, mb: 1, py: 1}}>
									Paso {activeStep + 1}
							</Typography> */}
							<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
								<Button
									color="inherit"
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1 }}
								>
									Atras
								</Button>
								<Box sx={{ flex: '1 1 auto' }} />
								<Button onClick={handleNext} sx={{ mr: 1 }}>
									Siguiente
								</Button>
								{/* {activeStep !== steps.length &&
									(completed[activeStep] ? (
										<Typography variant="caption" sx={{display: 'inline-block'}}>
											Step { activeStep + 1 } ya completado
										</Typography>
									) : (
										<Button onClick={handleComplete}>
											{ completedSteps() === totalSteps() -1  ? 'Finalizar' : 'Completar paso'}
										</Button>
									))
								} */}
							</Box>
						</>
					)}
				</Card>
			</Box>
		</Dialog>
	)
}
