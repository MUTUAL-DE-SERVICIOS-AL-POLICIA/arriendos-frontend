import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { ContactModel, FormContactModel, FormContactValidations } from "@/models";
import { DeleteOutline } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useEffect } from "react";
import { Phone } from ".";

const formContactFields: FormContactModel = {
    degree: '',
    name: '',
    ci_nit: '',
    phones: [''],
}
const formValidations: FormContactValidations = {
    name: [(value: string) => value.length >= 1, 'Debe ingresar un nombre'],
    ci_nit: [(value: string) => value.length >= 1, 'Debe ingresar un carnet'],
    phones: [(value: string[]) => value.every((e) => e !== ''), 'Debe completar el número de contacto'],
};

interface contendProps {
    hiddenDelete: boolean;
    formSubmitted: boolean;
    onFormStateChange: (value: any, state: boolean) => void;
    removeItem?: () => void;
    item: ContactModel | null;
}


export const CardContact = (props: contendProps) => {
    const {
        hiddenDelete,
        formSubmitted,
        onFormStateChange,
        removeItem,
        item = null,
    } = props;

    const {
        formState, degree, name, ci_nit, phones,
        onInputChange, isFormValid, onValueChange,
        nameValid, ci_nitValid, phonesValid } = useForm(item ?? formContactFields, formValidations);

    useEffect(() => {
        console.log(`formState ${formState}`)
        console.log(`isFormValid ${isFormValid}`)
        onFormStateChange(formState, isFormValid)
    }, [isFormValid, degree, name, ci_nit, phones])

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
                    <Phone
                        phones={phones}
                        onUpdate={(value) => onValueChange('phones', value)}
                        error={!!phonesValid && formSubmitted}
                        helperText={formSubmitted ? phonesValid : ''}
                    />
                </Grid>
            </Grid>
            {
                hiddenDelete && removeItem && <Grid item>
                    <IconButton onClick={removeItem}>
                        <DeleteOutline color="error" />
                    </IconButton>
                </Grid>
            }
        </>
    )
}