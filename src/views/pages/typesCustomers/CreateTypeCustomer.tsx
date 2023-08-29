import { ComponentInput } from "@/components"
import { useForm, useTypeCustomerStore } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useState } from "react";

const formFields = { name: '' }

const formValidations = {
    name: [(value: any) => value.length >= 1, 'Debe ingresar el nombre'],
}

export const CreateTypeCustomer = (props: any) => {
    const {
        open,
        handleClose,
        item,
    } = props;
    const { createTypeCustomer, editTypeCustomer } = useTypeCustomerStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { name, onInputChange, isFormValid, nameValid, onResetForm } = useForm(item ?? formFields, formValidations);

    const sendSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        if (item == null) {
            createTypeCustomer({ name });
        } else {
            editTypeCustomer(item.id, { name });
        }
        handleClose();
        onResetForm();
    }


    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nuevo Tipo de Cliente' : item.name}</DialogTitle>
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
                        <Button onClick={() => {
                            onResetForm();
                            handleClose()
                        }}>Cancelar</Button>
                        <Button type="submit">
                            {item == null ? 'CREAR' : 'EDITAR'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
