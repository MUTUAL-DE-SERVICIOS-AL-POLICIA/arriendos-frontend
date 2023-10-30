import { ComponentInput } from "@/components"
import { useForm } from "@/hooks"
import { FormDamageModel, FormDamageValidations } from "@/models"
import { Button, Grid, Typography } from "@mui/material"
import { FormEvent, useState } from "react"


const formFields: FormDamageModel = {
  detail: '',
  discount: 0,
}
const formValidations: FormDamageValidations = {
  detail: [(value: string) => value.length >= 1, 'Debe ingresar el detalle del daño'],
  discount: [(value: number) => value != 0, 'Debe ingresar un monto'],
}

interface elementsProps {
  handleClose: () => void;
  sendData: (data: object) => void;
}

export const ComponentDamage = (props: elementsProps) => {
  const {
    handleClose,
    sendData,
  } = props;


  const [formSubmitted, setFormSubmitted] = useState(false);
  const { detail, discount, onInputChange, isFormValid, detailValid, discountValid, onResetForm } = useForm(formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    //ENVIAR DAÑO
    sendData({
      detail,
      discount
    })
    handleClose();
    onResetForm();
  }

  return (
    <>
      <Typography variant="h6">{'Registro de daños'}</Typography>
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Detalle"
              name="detail"
              value={detail}
              onChange={onInputChange}
              error={!!detailValid && formSubmitted}
              helperText={formSubmitted ? detailValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Monto"
              name="discount"
              value={discount}
              onChange={onInputChange}
              error={!!discountValid && formSubmitted}
              helperText={formSubmitted ? discountValid : ''}
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
