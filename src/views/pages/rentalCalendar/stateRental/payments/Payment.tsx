import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { FormPayment, FormPaymentValidations } from "@/models";
import { Button, Grid, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";


const formFields: FormPayment = {
  amount: 0,
  voucherNumber: 0,
  paymentDetail: '',
}
interface elementsProps {
  handleClose: () => void;
  sendData: (data: object) => void;
  amountRecomend?: number;
  disalbleMount?: boolean;
  voucher?: string;
  detail?: string;
  edit?: boolean
}

export const ComponentPayment = (props: elementsProps) => {
  const {
    handleClose,
    sendData,
    amountRecomend = 1111,
    disalbleMount = false,
    voucher,
    detail,
    edit
  } = props;
  const formValidations: FormPaymentValidations = {
    amount: [(value: number) =>
      {
        if(!edit) {
          if(amountRecomend != 0 && value > 0 && value <= parseFloat(`${amountRecomend}`)){
            return true
          }
          else if(amountRecomend == 0 && value > 0) {
            return true
          }
        } else {
          if(amountRecomend != 0 && value > 0) {
            return true
          }
        }
        return false
      },
      'Debe ingresar el monto del pago'],
    voucherNumber: [(value: number) =>
      {
        if(value > 0) {
          return true
        } else if (edit) {
          return true
        } else return false
      },
      'Debe ingresar el número  de comprobante'],
  }
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { amount, voucherNumber, paymentDetail,
    onInputChange, isFormValid,
    amountValid, voucherNumberValid, onListValuesChange,
    onResetForm } = useForm(formFields, formValidations);

  useEffect(() => {
    let names = []
    let states = []
    if(amountRecomend) {
      names.push('amount')
      states.push(amountRecomend)
    }
    if(voucher) {
      names.push('voucherNumber')
      states.push(voucher)
    }
    if(detail) {
      names.push('paymentDetail')
      states.push(detail)
    }
    onListValuesChange(names, states)
  }, [])

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    //ENVIAR PAOO
    sendData({
      amount,
      voucherNumber,
      paymentDetail
    });
    handleClose();
    onResetForm();
  }
  return (
    <>
      <Typography variant="h6">{`Registro de pago`}</Typography>
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Monto"
              name="amount"
              value={amount}
              disabled={disalbleMount}
              onChange={(V: any) => onInputChange(V, false, true)}
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
              onChange={(V: any) => onInputChange(V, false, true)}
              error={!!voucherNumberValid && formSubmitted }
              helperText={formSubmitted ? voucherNumberValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Detalle"
              name="paymentDetail"
              value={paymentDetail}
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
