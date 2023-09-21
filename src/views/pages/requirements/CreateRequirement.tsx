import { ComponentInput } from "@/components";
import { useForm, useRequirementStore } from "@/hooks";
import { FormRequirementModel, FormRequirementValidations } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

const formFields: FormRequirementModel = { name: '' }

const formValidations: FormRequirementValidations = {
    name: [(value: any) => value.length >= 1, 'Debe ingresar el nombre'],
}

export const CreateRequirement = (props: any) => {
    const {
        open,
        handleClose,
        item,
    } = props;
    const { postCreateRequirement, patchEditRequirement } = useRequirementStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { name, onInputChange, isFormValid, nameValid, onResetForm } = useForm(item ?? formFields, formValidations);

    const sendSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        if (item == null) {
            postCreateRequirement({ requirement_name: name.trim() });
        } else {
            patchEditRequirement(item.id, { requirement_name: name.trim() });
        }
        handleClose();
        onResetForm();
    }


    return (
        <>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nuevo Requisito' : `Tipo de cliente: ${item.name}`}</DialogTitle>
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
