import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { ContactModel, FormContactModel, FormContactValidations } from "@/models";
import { DeleteOutline } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useEffect } from "react";

const formContactFields: FormContactModel = {
    degree: '',
    name: '',
    ci_nit: '',
    phone: '',
}
const formValidations: FormContactValidations = {
    name: [(value: string) => value.length >= 1, 'Debe ingresar un nombre'],
    ci_nit: [(value: string) => value.length >= 1, 'Debe ingresar un carnet'],
    phone: [(value: string) => value.length >= 1, 'Debe ingresar un teléfono'],
};

interface contendProps {
    formSubmitted: boolean;
    onFormStateChange: (value: any, state: boolean) => void;
    removeItem?: () => void;
    item: ContactModel | null;
}


export const CardContact = (props: contendProps) => {
    const {
        formSubmitted,
        onFormStateChange,
        removeItem,
        item = null,
    } = props;

    const {
        formState, degree, name, ci_nit, phone,
        onInputChange, isFormValid,
        nameValid, ci_nitValid, phoneValid } = useForm(item ?? formContactFields, formValidations);

    useEffect(() => {
        onFormStateChange(formState, isFormValid)
    }, [formState, degree, name, ci_nit, phone])

    return (
        <>
            < Grid container >
                <Grid item xs={12} sm={4} sx={{ padding: '2px' }}>
                    <ComponentInput
                        type="text"
                        label="Grado"
                        name="degree"
                        value={degree}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid item xs={12} sm={8} sx={{ padding: '2px' }}>
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
                <Grid item xs={12} sm={6} sx={{ padding: '2px' }}>
                    <ComponentInput
                        type="text"
                        label="ci o nit"
                        name="ci_nit"
                        value={ci_nit}
                        onChange={(V: any) => onInputChange(V, false, true)}
                        error={!!ci_nitValid && formSubmitted}
                        helperText={formSubmitted ? ci_nitValid : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ padding: '2px' }}>
                    <ComponentInput
                        type="text"
                        label="Teléfono"
                        name="phone"
                        value={phone}
                        onChange={(V: any) => onInputChange(V, false, true)}
                        error={!!phoneValid && formSubmitted}
                        helperText={formSubmitted ? phoneValid : ''}
                    />
                </Grid>
            </Grid>
            {
                removeItem && <Grid item>
                    <IconButton onClick={removeItem}>
                        <DeleteOutline color="error" />
                    </IconButton>
                </Grid>}
        </>
    )
}