import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components";
import { useForm } from "@/hooks";
import { useRateStore } from "@/hooks/useRateStore";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { TypeCustomerTable } from "../typesCustomers";


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
    const [modal, setModal] = useState(false);

    const {
        name, typeCustomer,
        onInputChange, isFormValid, onResetForm,
        nameValid, typeCustomerValid } = useForm(formFields, formValidations);
    // const {
    //     name, lastName, ci, phone, typeCustomer,
    //     onInputChange, isFormValid, onResetForm,
    //     nameValid, lastNameValid, ciValid, phoneValid, typeCustomerValid } = useForm(formFields, formValidations);
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
    const handleModal = useCallback((value: boolean) => {
        setModal(value);
    }, []);
    return (
        <>
            {
                modal ?
                    <ModalSelectComponent
                        stateSelect={true}
                        stateMultiple={true}
                        title='Tipos de clientes'
                        opendrawer={modal}
                        handleDrawer={handleModal}
                    >
                        <TypeCustomerTable
                            stateSelect={true}
                            limitInit={5}
                            itemSelect={(v: any) => {
                                // onInputChange({ target: { name: 'typeCustomer', value: v } });
                                // handleModal(false)
                            }}
                        />
                    </ModalSelectComponent> :
                    <></>
            }
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{item == null ? 'Nueva Tarifa' : `${item.name}`}</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent sx={{ display: 'flex' }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
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
                            {
                                item &&
                                <>
                                    <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                        <ComponentSelect
                                            label={typeCustomer != null ? 'Tipos de clientes' : ''}
                                            labelChip={['name']}
                                            title={'Tipos de Clientes'}
                                            onPressed={() => handleModal(true)}
                                            error={!!typeCustomerValid && formSubmitted}
                                            helperText={formSubmitted ? typeCustomerValid : ''}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                                        <ComponentSelect
                                            label={typeCustomer != null ? 'Tipos de clientes' : ''}
                                            labelChip={['name']}
                                            title={typeCustomer != null ? typeCustomer.name : 'Requisitos'}
                                            onPressed={() => handleModal(true)}
                                            error={!!typeCustomerValid && formSubmitted}
                                            helperText={formSubmitted ? typeCustomerValid : ''}
                                        />
                                    </Grid> */}
                                </>
                            }
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
