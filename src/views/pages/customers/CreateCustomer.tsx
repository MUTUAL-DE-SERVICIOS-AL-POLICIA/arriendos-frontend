import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useCustomerStore, useForm } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { TypeCustomerTable } from "../typesCustomers";
import { FormCustomerModel, FormCustomerValidations, TypeCustomerModel } from "@/models";

const formFields: FormCustomerModel = {
    name: '',
    lastName: '',
    ci: '',
    phone: '',
    typeCustomer: null,
}
const formValidations: FormCustomerValidations = {
    name: [(value: string) => value.length >= 1, 'Debe ingresar su nombre'],
    lastName: [(value: any) => value.length >= 1, 'Debe ingresar su apellido'],
    ci: [(value: any) => value.length >= 1, 'Debe ingresar su carnet'],
    phone: [(value: any) => value.length >= 1, 'Debe ingresar su teléfono'],
    typeCustomer: [(value: TypeCustomerModel) => value != null, 'Debe seleccionar un tipo de cliente'],
}

export const CreateCustomer = (props: any) => {
    const {
        open,
        handleClose,
        item,
    } = props;

    const { postCreateCustomer, patchEditCustomer } = useCustomerStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modal, setModal] = useState(false);
    // const [form, setForm] = useState(formFields)
    useEffect(() => {
        // setForm(
        //     item != null ?
        //         {
        //             ...item,
        //             lastName: item.last_name,
        //             typeCustomer: item.customer_type.name,
        //             typeCustomerId: item.customer_type.id
        //         } : formFields)
    }, [item])

    const {
        name, lastName, ci, phone, typeCustomer,
        onInputChange, isFormValid, onResetForm,
        nameValid, lastNameValid, ciValid, phoneValid, typeCustomerValid } = useForm(formFields, formValidations);

    const sendSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        if (item == null) {
            postCreateCustomer({ name, last_name: lastName, ci, phone, customer_type: typeCustomer.id });
        } else {
            patchEditCustomer(item.id, { name, last_name: lastName, ci, phone, customer_type: typeCustomer.id });
        }
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
                                onInputChange({ target: { name: 'typeCustomer', value: v } });
                                handleModal(false)
                            }}
                        />
                    </ModalSelectComponent> :
                    <></>
            }
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nuevo Cliente' : `Cliente: ${item.name} ${item.last_name}`}</DialogTitle>
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
                                    label={typeCustomer != null ? 'Tipo de Cliente' : ''}
                                    labelChip={['name']}
                                    title={typeCustomer != null ? typeCustomer.name : 'Tipo de Cliente'}
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
