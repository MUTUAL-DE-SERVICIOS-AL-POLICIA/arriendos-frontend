import { ComponentDate, ComponentInput, ComponentSelect } from "@/components"
import { useForm } from "@/hooks"
import { FormControlLabel, Grid, Stack, Switch, Typography } from "@mui/material"
import { useState } from "react"
const formFields = {
    name: '',
    lastName: '',
    ci: '',
    phone: '',
    typeEvent: '',
    typeEventId: '',
    description: ''
}
const formValidations = {
    name: [(value: any) => value.length >= 1, 'Debe ingresar su nombre'],
    lastName: [(value: any) => value.length >= 1, 'Debe ingresar su apellido'],
    ci: [(value: any) => value.length >= 1, 'Debe ingresar su carnet'],
    phone: [(value: any) => value.length >= 1, 'Debe ingresar su teléfono'],
    typeEvent: [(value: any) => value.length >= 1, 'Debe seleccionar un tipo de cliente'],
    description: [(value: any) => value.length >= 1, 'Debe ingresar su nombre'],
}

export const FormLease = () => {
    const sendSubmit = (event: any) => {

    }
    const [startDate, setstartDate] = useState(null)
    const onDateChanged = (event: any, changing: any) => {
        // console.log('changee', event)

        // setFormValues({
        //     ...formValues,
        //     [changing]: event
        // })
        // if (changing === 'start') setstartDate(event)
        // if (changing === 'end') setEndDate(event)
    }
    
    const [form, setForm] = useState(formFields);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        name, lastName, ci, phone, typeEvent, description,
        onInputChange, isFormValid, onResetForm,
        nameValid, lastNameValid, ciValid, phoneValid, typeEventValid, descriptionValid } = useForm(form, formValidations);

    return (
        <form onSubmit={sendSubmit}>
            <Grid container>
                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                    <ComponentDate
                        value={startDate}
                        title="Fecha y hora"
                        onChange={(event: any) => onDateChanged(event, 'start')}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                    <ComponentSelect
                        labelChip={['name']}
                        title='Tipo de evento'
                        name="typeEvent"
                        value={typeEvent}
                        onPressed={() => { }}
                        error={!!typeEventValid && formSubmitted}
                        helperText={formSubmitted ? typeEventValid : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                    <ComponentSelect
                        labelChip={['name']}
                        title='Producto'
                        name="typeEvent"
                        value={typeEvent}
                        onPressed={() => { }}
                        error={!!typeEventValid && formSubmitted}
                        helperText={formSubmitted ? typeEventValid : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                    <ComponentInput
                        type="text"
                        label="Descripción"
                        name="description"
                        value={description}
                        onChange={onInputChange}
                        multiline
                    />
                </Grid>
            </Grid>
        </form>
    )
}
