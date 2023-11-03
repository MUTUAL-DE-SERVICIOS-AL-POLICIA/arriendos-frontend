import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { FormExtraHourModel, FormExtraHourValidations } from "@/models";
import { Button, Grid, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

const formFields: FormExtraHourModel = {
  amount: 0,
  quantity: 0,
  voucherNumber: 0,
  detail: '',
}
const formValidations: FormExtraHourValidations = {
  quantity: [(value: number) => value > 0, 'Debe ingresar el monto del pago'],
  voucherNumber: [(value: number) => value > 0, 'Debe ingresar el número de comprobante'],
}

interface elementsProps {
  handleClose: () => void;
  sendData: (data: object) => void;
  amountRecomend?: number;
}

export const ComponentExtraHour = (props: elementsProps) => {
  const {
    handleClose,
    sendData,
    amountRecomend,
  } = props;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { amount, quantity, voucherNumber, detail,
    onInputChange, isFormValid, onValueChange,
    amountValid, quantityValid, voucherNumberValid,
    onResetForm } = useForm(formFields, formValidations);

  useEffect(() => {
    if (amountRecomend) onValueChange('amount', amountRecomend)
  }, [])
  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    //ENVIAR HORA EXTRA
    sendData({
      amount,
      quantity,
      voucherNumber,
      detail
    });
    handleClose();
    onResetForm();
  }
  return (
    <>
      <Typography variant="h6">{'Registro de hora extra'}</Typography>
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={1.5} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Monto"
              name="amount"
              value={amount}
              onChange={(V: any) => onInputChange(V, false, true)}
              error={!!amountValid && formSubmitted}
              helperText={formSubmitted ? amountValid : ''}
              disabled={amountRecomend != null}
            />
          </Grid>
          <Grid item xs={12} sm={1.5} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Cantidad"
              name="quantity"
              value={quantity}
              onChange={(V: any) => onInputChange(V, false, true)}
              error={!!quantityValid && formSubmitted}
              helperText={formSubmitted ? quantityValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Número de comprobante"
              name="voucherNumber"
              value={voucherNumber}
              onChange={(V: any) => onInputChange(V, false, true)}
              error={!!voucherNumberValid && formSubmitted}
              helperText={formSubmitted ? voucherNumberValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={5} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Detalle"
              name="detail"
              value={detail}
              onChange={onInputChange}
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
