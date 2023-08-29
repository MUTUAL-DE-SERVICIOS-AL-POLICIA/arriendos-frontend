
import { Box, Button, Dialog, DialogContent, DialogTitle, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { AccountLdap } from "./AccountLdap";
import { FormUser } from "./FormUser";
import { useForm, useUserStore } from "@/hooks";

const formFields = { user: '' }

const formValidations = {
    user: [(value: any) => value.length >= 1, 'Debe ingresar la cuenta'],
}

export const CreateUser = (props: any) => {
    const {
        open,
        handleClose,
        item,
    } = props;

    const { searchUserLdap } = useUserStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { user, onInputChange, isFormValid, userValid } = useForm(formFields, formValidations);
    const [activeStep, setActiveStep] = useState(0);
    const [userInfo, setUserInfo] = useState();

    const sendSubmit = async (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        searchUserLdap({ user })
            .then((res) => {
                setUserInfo(res)
                setActiveStep((step) => step + 1);
            })
    };

    const handleBack = () => {
        if (activeStep === 0) {
            handleClose();
        } else {
            setActiveStep((step) => step - 1);
        }
    };

    const steps = () => {
        return ([
            {
                name: 'Buscar usuario',
                child: <AccountLdap
                    name="user"
                    value={user}
                    onChange={onInputChange}
                    error={!!userValid && formSubmitted}
                    helperText={formSubmitted ? userValid : ''}
                />
            },
            {
                name: 'Crear Usuario',
                child: <FormUser
                    userInfo={userInfo} />
            }
        ])
    }
    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nuevo Usuario' : item.name}</DialogTitle>
                <Stepper activeStep={activeStep}>
                    {steps().map((item) => {
                        const stepProps: { completed?: boolean } = {};
                        return (
                            <Step key={item.name} {...stepProps}>
                                <StepLabel>{item.name}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <form onSubmit={sendSubmit}>
                    {
                        <DialogContent sx={{ display: 'flex' }}>
                            {steps()[activeStep].child}
                        </DialogContent>
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            {activeStep === 0 ? 'Cancelar' : 'Atrás'}
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button type="submit">
                            {activeStep < 1 ? 'Siguiente' : 'Crear'}
                        </Button>
                    </Box>
                </form>
            </Dialog>
        </>
    )
}
