import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { useRateStore } from "@/hooks/useRateStore";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";


const formFields = {
    name: '',
}
const formValidations = {
    name: [(value: any) => value.length >= 1, 'Debe ingresar la tarifa'],
}

export const CreateRate = (props: any) => {
    const {
        open,
        handleClose,
        item,
    } = props;

    const { postCreateRate, patchEditRate } = useRateStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        name,
        onInputChange, isFormValid, onResetForm,
        nameValid } = useForm(formFields, formValidations);

    const sendSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        if (item == null) {
            postCreateRate({ name });
        } else {
            patchEditRate(item.id, { name });
        }
        handleClose();
        onResetForm();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nueva Tarifa' : `Tarifa: ${item.name}`}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent sx={{ display: 'flex' }}>
                        <ComponentInput
                            type="text"
                            label="Nombre"
                            name="name"
                            value={name}
                            onChange={onInputChange}
                            error={!!nameValid && formSubmitted}
                            helperText={formSubmitted ? nameValid : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">
                            {item == null ? 'CREAR' : 'EDITAR'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
