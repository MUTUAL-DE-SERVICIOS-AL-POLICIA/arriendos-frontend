import { ComponentInput } from "@/components"
import { useForm } from "@/hooks";
import { FormContactModel, FormContactValidations } from "@/models";
import { DeleteOutline } from "@mui/icons-material";
import { Card, Grid, IconButton } from "@mui/material";
import { useEffect } from "react";

interface customerProps {
    formSubmitted: boolean,
    removeItem: () => void;
    onFormStateChange: (value: any) => void;
}

//contact
const formContactFields: FormContactModel = {
    degree: '',
    name: '',
    ci: '',
    phone: '',
}
const formValidations: FormContactValidations = {
    name: [(value: string) => value !== '', 'Debe ingresar un nombre'],
    ci: [(value: string) => value !== '', 'Debe ingresar un carnet'],
    phone: [(value: string) => value !== '', 'Debe ingresar un teléfono'],
};



export const CardContact = (props: customerProps) => {

    const {
        formSubmitted,
        removeItem,
        onFormStateChange,
    } = props;


    const {
        formState, degree, name, ci, phone,
        onInputChange,
        gradeValid, nameValid, ciValid, phoneValid } = useForm(formContactFields, formValidations);


    const sendFormStateToParent = () => {
        onFormStateChange(formState);
    };

    useEffect(() => {
        console.log('card contact')
        // Llamar a sendFormStateToParent cuando el componente se monta o desmonta
        sendFormStateToParent();
    }, [formState]);

    return (
        <Card sx={{ padding: '7px', background: '#E2F6F0' }} >
            < Grid container >
                <Grid item xs={12} sm container>
                    <Grid item xs={12} sm={4} sx={{ padding: '2px' }}>
                        <ComponentInput
                            type="text"
                            label="Grado"
                            name="degree"
                            value={degree}
                            onChange={onInputChange}
                            error={!!gradeValid && formSubmitted}
                            helperText={formSubmitted ? gradeValid : ''}
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
                            label="ci nit"
                            name="ci"
                            value={ci}
                            onChange={onInputChange}
                            error={!!ciValid && formSubmitted}
                            helperText={formSubmitted ? ciValid : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ padding: '2px' }}>
                        <ComponentInput
                            type="text"
                            label="Teléfono"
                            name="phone"
                            value={phone}
                            onChange={onInputChange}
                            error={!!phoneValid && formSubmitted}
                            helperText={formSubmitted ? phoneValid : ''}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <IconButton onClick={removeItem}>
                        <DeleteOutline color="error" />
                    </IconButton>
                </Grid>
            </Grid>
        </Card >
    )
}
