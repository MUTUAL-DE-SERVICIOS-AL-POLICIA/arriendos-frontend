import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { FormPayment, FormPaymentValidations } from "@/models";
import { Button, Grid, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

const formFields: FormPayment = {
  amount: 0,
  voucherNumber: 0,
  paymentDetail: '',
}
const formValidations: FormPaymentValidations = {
  amount: [(value: number) => value > 0, 'Debe ingresar el monto del pago'],
  voucherNumber: [(value: number) => value > 0, 'Debe ingresar el número de comprobante'],
}

interface elementsProps {
  handleClose: () => void;
}

export const ComponentExtraHour = (props: elementsProps) => {
  const {
    handleClose,
  } = props;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { amount, voucherNumber,
    onInputChange, isFormValid,
    amountValid, voucherNumberValid,
    onResetForm } = useForm(formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    //ENVIAR PAOO
    handleClose();
    onResetForm();
  }
  return (
    <>
      <Typography variant="h6">{'Registro de hora extra'}</Typography>
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Monto"
              name="amount"
              value={amount}
              onChange={onInputChange}
              error={!!amountValid && formSubmitted}
              helperText={formSubmitted ? amountValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Número de comprobante"
              name="voucherNumber"
              value={voucherNumber}
              onChange={onInputChange}
              error={!!voucherNumberValid && formSubmitted}
              helperText={formSubmitted ? voucherNumberValid : ''}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button type="submit" >Registrar</Button>
        </Grid>
      </form>
    </>
  )
}
