import { ComponentSelect } from "@/components";
import { useForm, useSelectedProductStore } from "@/hooks";
import { Card, Grid, Paper, Typography, styled } from "@mui/material";
import { format } from 'date-fns';
import { es } from 'date-fns/locale'
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    margin: '10px',
    padding: '7px'
}));
const formFields = {
    typeCustomer: '',
    typeCustomerId: '',
}
const formValidations = {
    typeCustomer: [(value: any) => value.length >= 1, 'Debe seleccionar un tipo de cliente'],
}

export const CartSelectedProduct = () => {
    const { selectedProducts } = useSelectedProductStore();
    const [form, setForm] = useState(formFields);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { typeCustomer,
        onInputChange, isFormValid, onResetForm,
        typeCustomerValid } = useForm(form, formValidations);


    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerHeight]);


    return (
        <>
            <Typography variant="h6" style={{ padding: '10px' }}> Producto seleccionado</Typography>
            {selectedProducts.length > 0 && <>
                <div style={{ maxHeight: `${screenHeight - 300}px`, overflowY: 'auto' }}>
                    {selectedProducts.length > 0 &&
                        selectedProducts.map((product: any, index: number) => {
                            const date = format(product.start, 'EEEE dd MMMM - yyyy', { locale: es });
                            return (
                                <Item key={index} elevation={2}>
                                    <Typography>{date}</Typography>
                                    <Grid container>
                                        <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                                            <ComponentSelect
                                                labelChip={['name']}
                                                title='Rangos de horas'
                                                name="typeCustomer"
                                                value={typeCustomer}
                                                onPressed={() => { }}
                                                error={!!typeCustomerValid && formSubmitted}
                                                helperText={formSubmitted ? typeCustomerValid : ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8} sx={{ padding: '5px' }}>
                                            <ComponentSelect
                                                labelChip={['name']}
                                                title='Detalle'
                                                name="typeCustomer"
                                                value={typeCustomer}
                                                onPressed={() => { }}
                                                error={!!typeCustomerValid && formSubmitted}
                                                helperText={formSubmitted ? typeCustomerValid : ''}
                                            />
                                        </Grid>
                                    </Grid>
                                </Item>
                            );
                        })}
                </div>
                <ComponentSelect
                    labelChip={['name']}
                    title='Cliente'
                    name="typeCustomer"
                    value={typeCustomer}
                    onPressed={() => { }}
                    error={!!typeCustomerValid && formSubmitted}
                    helperText={formSubmitted ? typeCustomerValid : ''}
                />
                <Typography sx={{ m: 1.5 }} color="text.secondary">
                    En total es ......
                </Typography>
            </>
            }
        </>
    )
}
