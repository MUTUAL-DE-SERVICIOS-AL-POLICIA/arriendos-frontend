import { Button, Card, CardContent, Dialog, DialogTitle, Divider, Grid, Grow, IconButton, Paper, Step, StepButton, Stepper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { Close } from "@mui/icons-material"
// import { Form } from "react-router-dom"
import { useLeasesStates } from "@/hooks/useLeasesStates"

const convertDateWithTime = (date: any) => {
	const currentDate = new Date(date);
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, así que sumamos 1
	const day = String(currentDate.getDate()).padStart(2, '0');
	const hours = String(currentDate.getHours()).padStart(2, '0');
	const minutes = String(currentDate.getMinutes()).padStart(2, '0');

	const dateFormatted = `${day}/${month}/${year} ${hours}:${minutes}`;
	return dateFormatted;
};

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
				? leaseStates.findIndex((_, i) => !(i in completed))
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
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Card variant="outlined" sx={{ margin: '0px 0px 12px 0px', borderRadius: '10px' }}>
							<CardContent>
								<Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
									<i>{selectedEvent.title}</i>
								</Typography>
								<Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
									&emsp;<b>Fecha inicial:</b> {convertDateWithTime(selectedEvent.start)}
								</Typography>
								<Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
									&emsp;<b>Fecha final:</b> {convertDateWithTime(selectedEvent.end)}
								</Typography>
								<Typography sx={{ fontSize: 15 }} color="text.primary" gutterBottom>
									&emsp;<b>Detalle:</b> Algun detalle
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card variant="outlined" >
							<CardContent></CardContent>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card variant="outlined" >
							<CardContent></CardContent>
						</Card>
					</Grid>
				</Grid>
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
