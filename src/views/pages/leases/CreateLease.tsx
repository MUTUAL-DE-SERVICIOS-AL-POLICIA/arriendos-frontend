import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Step, StepLabel, Stepper, Switch, Typography } from "@mui/material"
import React, { useState } from "react";
import { FormLease } from ".";
import { ComponentSelect } from "@/components";
import { useForm } from "@/hooks";

// const steps = ['Arriendo', 'Confirmar'];


export const CreateLease = (props: any) => {
    const {
        open,
        handleClose,
        item,
    } = props;

    const steps = [
        {
            title: 'Arriendo',
            content: <FormLease />
        },
        {
            title: 'Confirmar',
            content: <></>
        }
    ]
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const [statePlan, setStatePlan] = useState(false);
    const { typeEvent } = useForm(null);

    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Nuevo Arriendo</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={statePlan}
                                        onChange={(event) => setStatePlan(event.target.checked)}
                                        name="plan" />
                                }
                                label="Aplicar plan"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                            {
                                statePlan &&
                                <ComponentSelect
                                    labelChip={['name']}
                                    title='Plan'
                                    name="typeEvent"
                                    value={typeEvent}
                                    onPressed={() => { }}
                                />
                            }
                        </Grid>
                    </Grid>
                    <Stepper activeStep={activeStep}>
                        {steps.map((item, index) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: {
                                optional?: React.ReactNode;
                            } = {};
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={item.title} {...stepProps}>
                                    <StepLabel {...labelProps}>{item.title}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {steps[activeStep].content}
                </DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">
                        {item == null ? 'CREAR' : 'EDITAR'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
