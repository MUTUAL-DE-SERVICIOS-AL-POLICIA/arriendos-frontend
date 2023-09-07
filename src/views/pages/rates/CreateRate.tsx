import { ComponentInput, ComponentSelect } from "@/components";
import { useForm } from "@/hooks";
import { useRateStore } from "@/hooks/useRateStore";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";


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


export const CreateRate = (props: any) => {
    const {
        open,
        handleClose,
        item,
    } = props;

    // const { postCreateCustomer, patchEditCustomer } = useCustomerStore();
    const { postCreateRate, patchEditRate } = useRateStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(formFields)
    useEffect(() => {
        setForm(
            item != null ?
                {
                    ...item,
                    lastName: item.last_name,
                    typeCustomer: item.customer_type.name,
                    typeCustomerId: item.customer_type.id
                } : formFields)
    }, [item])

    const {
        name, typeCustomer,
        onInputChange, isFormValid, onResetForm,
        nameValid, typeCustomerValid } = useForm(form, formValidations);

    const sendSubmit = (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        if (item == null) {
            postCreateRate({ name, customer_type: form.typeCustomerId });
        } else {
            patchEditRate(item.id, { name, customer_type: form.typeCustomerId });
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
                    // <ModalSelectComponent
                    //     stateSelect={true}
                    //     stateMultiple={false}
                    //     title='Tipos de clientes'
                    //     opendrawer={modal}
                    //     handleDrawer={handleModal}

                    // >
                    //     <TypeCustomerTable
                    //         stateSelect={true}
                    //         limitInit={5}
                    //         itemSelect={(v: any) => {
                    //             setForm({ name, lastName, ci, phone, typeCustomer: v.name, typeCustomerId: v.id });
                    //             handleModal(false)
                    //         }}
                    //     />
                    // </ModalSelectComponent>
                    <></> :
                    <></>
            }
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nueva Tarifa' : `Tarifa: ${item.name} ${item.last_name}`}</DialogTitle>
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
                            <Grid item xs={12} sm={5} sx={{ padding: '5px' }}>
                                <ComponentSelect
                                    labelChip={['name']}
                                    title='Ambiente'
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
