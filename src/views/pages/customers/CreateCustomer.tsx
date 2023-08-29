import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useCustomerStore, useForm } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { TypeCustomerTable } from "../typesCustomers";

const formFields = {
    name: '',
    lastName: '',
    ci: '',
    phone: '',
    typeCustomer: '',
    typeCustomerId: '',
}
const formValidations = {
    name: [(value: any) => value.length >= 1, 'Debe ingresar su nombre'],
    lastName: [(value: any) => value.length >= 1, 'Debe ingresar su apellido'],
    ci: [(value: any) => value.length >= 1, 'Debe ingresar su carnet'],
    phone: [(value: any) => value.length >= 1, 'Debe ingresar su teléfono'],
    typeCustomer: [(value: any) => value.length >= 1, 'Debe seleccionar un tipo de cliente'],
}

export const CreateCustomer = (props: any) => {
    const {
        open,
        handleClose,
        item,
    } = props;

    const { createCustomer } = useCustomerStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(formFields)
    useEffect(() => {
        setForm(
            item != null ?
                {
                    ...item,
                    lastName: item.last_name,
                    typeCustomer: '',
                    typeCustomerId: '',
                } : formFields)
    }, [item])

    const {
        name, lastName, ci, phone, typeCustomer,
        onInputChange, isFormValid, onResetForm,
        nameValid, lastNameValid, ciValid, phoneValid, typeCustomerValid } = useForm(form, formValidations);

    const sendSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        createCustomer({ name, last_name: lastName, ci, phone, customer_type: form.typeCustomerId });
        handleClose();
        onResetForm();
    }

    const handleModal = useCallback((value: boolean) => {
        setModal(value);
    }, []);

    return (
        <>
            {
                modal ?
                    <ModalSelectComponent
                        stateSelect={true}
                        stateMultiple={false}
                        title='Tipos de clientes'
                        opendrawer={modal}
                        handleDrawer={handleModal}

                    >
                        <TypeCustomerTable
                            stateSelect={true}
                            limitInit={5}
                            itemSelect={(v: any) => {
                                setForm({ name, lastName, ci, phone, typeCustomer: v.name, typeCustomerId: v.id });
                                handleModal(false)
                            }}
                        />
                    </ModalSelectComponent> :
                    <></>
            }
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{item == null ? 'Nuevo Cliente' : item.name}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Nombre"
                                    name="name"
                                    value={name}
                                    onChange={onInputChange}
                                    error={!!nameValid && formSubmitted}
                                    helperText={formSubmitted ? nameValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Apellido"
                                    name="lastName"
                                    value={lastName}
                                    onChange={onInputChange}
                                    error={!!lastNameValid && formSubmitted}
                                    helperText={formSubmitted ? lastNameValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Carnet"
                                    name="ci"
                                    value={ci}
                                    onChange={onInputChange}
                                    error={!!ciValid && formSubmitted}
                                    helperText={formSubmitted ? ciValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} sx={{ padding: '5px' }}>
                                <ComponentInput
                                    type="text"
                                    label="Teléfono"
                                    name="phone"
                                    value={phone}
                                    onChange={(v: any) => onInputChange(v, false, true)}
                                    error={!!phoneValid && formSubmitted}
                                    helperText={formSubmitted ? phoneValid : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title='Tipo de cliente'
                                    name="typeCustomer"
                                    value={typeCustomer}
                                    onPressed={() => handleModal(true)}
                                    error={!!typeCustomerValid && formSubmitted}
                                    helperText={formSubmitted ? typeCustomerValid : ''}
                                />
                            </Grid>
                        </Grid>
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
