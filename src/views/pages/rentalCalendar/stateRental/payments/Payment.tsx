import { ComponentInput } from "@/components";
import { useForm } from "@/hooks";
import { FormPayment, FormPaymentValidations } from "@/models";
import { Button, Grid, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";


const formFields: FormPayment = {
  amount: 0,
  voucherNumber: 0,
  paymentDetail: '',
  businessName: '',
  nit: 0
}
interface elementsProps {
  handleClose: () => void;
  sendData: (data: object) => void;
  amountRecomend?: number;
  disalbleMount?: boolean;
  voucher?: string;
  detail?: string;
  edit?: boolean;
  warranty?: boolean;
}

export const ComponentPayment = (props: elementsProps) => {
  const {
    handleClose,
    sendData,
    amountRecomend = 1111,
    disalbleMount = false,
    voucher,
    detail,
    edit,
    warranty
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
    businessName: [(value: string) =>
      {
        if(value !== undefined && value !== ''){
          return true
        } else if(edit) {
          return true
        } else if (warranty) {
          return true
        } else {
          return false
        }
      },
      'Debe ingresar la razón social'],
    nit: [(value: number) =>
      {
        if(value > 0) {
          return true
        } else if(edit) {
          return true
        } else if(warranty) {
          return true
        } else return false
      },
      'Debe ingresar el número del NIT'
    ]
  }
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { amount, voucherNumber, paymentDetail,
    businessName, nit, onInputChange, isFormValid,
    amountValid, voucherNumberValid, onListValuesChange,
    businessNameValid, nitValid,
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
    if(!warranty && businessName) {
      names.push('businessName')
      states.push(businessName)
    }
    if(!warranty && nit) {
      names.push('nit')
      states.push(nit)
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
      paymentDetail,
      businessName,
      nit
    });
    handleClose();
    onResetForm();
  }
  return (
    <>
      <Typography variant="h6">{`Registro de pago`}</Typography>
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
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
          <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
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
          <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Detalle"
              name="paymentDetail"
              value={paymentDetail}
              onChange={onInputChange}
            />
          </Grid>
          {!warranty && <Grid item xs={12} sm={4} sx={{ padding: '5px'}}>
            <ComponentInput
              type="text"
              label="Razón social"
              name="businessName"
              value={businessName}
              onChange={onInputChange}
              error={!!businessNameValid && formSubmitted}
              helperText={formSubmitted ? businessNameValid : ''}
            />
          </Grid> }
          {!warranty && <Grid item xs={12} sm={4} sx={{padding: '5px'}}>
            <ComponentInput
              type="text"
              label="NIT"
              name="nit"
              value={nit}
              onChange={onInputChange}
              error={!!nitValid && formSubmitted}
              helperText={formSubmitted ? nitValid : ''}
            />
          </Grid>}
        </Grid>
        <Grid container sx={{ justifyContent: 'space-evenly' }}>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button type="submit" >Registrar</Button>
        </Grid>
      </form>
    </>
  )
}
