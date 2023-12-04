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
    nup: null
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
    disabled?: boolean;
}


export const CardContact = (props: contendProps) => {
    const {
        hiddenDelete,
        formSubmitted,
        onFormStateChange,
        removeItem,
        item = null,
        disabled = false,
    } = props;

    const {
        formState, degree, name, ci_nit, phones,
        onInputChange, isFormValid, onValueChange,
        nameValid, ci_nitValid, phonesValid } = useForm(item ?? formContactFields, formValidations);

    useEffect(() => {
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ padding: '2px' }}>
                    <Phone
                        phones={phones}
                        onUpdate={(value:string[]) => onValueChange('phones', value)}
                        error={!!phonesValid && formSubmitted}
                        helperText={formSubmitted ? phonesValid : ''}
                        disabled={disabled}
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