import { ComponentInput, SelectComponent } from "@/components";
import { useExtraHourStore, useForm } from "@/hooks";
import { FormExtraHourModel, FormExtraHourValidations, ProductRentalModel, RentalModel } from "@/models";
import { Button, Grid, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import { format } from "date-fns";
import esES from 'date-fns/locale/es';
import { formatDate } from "@/helpers";

const formFields: FormExtraHourModel = {
  amount: 0,
  quantity: 0,
  voucherNumber: 0,
  detail: '',
  eventSelect: '',
}
const formValidations: FormExtraHourValidations = {
  quantity: [(value: number) => value > 0, 'Debe ingresar la cantidad de horas'],
  voucherNumber: [(value: number) => value > 0, 'Debe ingresar el número de comprobante'],
  eventSelect: [(value: string) => value.length !== 0, 'Debe seleccionar un evento'],
}

interface elementsProps {
  handleClose: () => void;
  sendData: (data: object) => void;
  amountRecomend?: number;
  rental: RentalModel;
}

export const ComponentExtraHour = (props: elementsProps) => {
  const {
    handleClose,
    sendData,
    amountRecomend,
    rental,
  } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { getExtraHour } = useExtraHourStore();

  const { amount, quantity, voucherNumber, detail, eventSelect,
    onInputChange, isFormValid, onListValuesChange,
    amountValid, quantityValid, voucherNumberValid, eventSelectValid,
    onResetForm } = useForm(formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    //ENVIAR HORA EXTRA
    sendData({
      amount,
      quantity,
      voucherNumber,
      detail,
      eventSelect,
    });
    handleClose();
    onResetForm();
  }

  const handleEvent = async (value: any) => {
    console.log(value)
    const price = await getExtraHour(value);
    onListValuesChange(['amount', 'eventSelect'], [price, value])
  }
  return (
    <>
      <Typography variant="h6">{'Registro de hora extra'}</Typography>
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12} sx={{ padding: '5px', paddingTop: '20px' }}>
            <SelectComponent
              handleSelect={handleEvent}
              label={`Seleccionar Evento`}
              options={[...rental.products.map((item: ProductRentalModel) => ({ id: item.id, name: `${item.id} ${format(formatDate(item.start_time), 'EEEE dd-MMMM HH:mm', { locale: esES })} ${item.event} ${item.property}-${item.room}` }))]}
              value={eventSelect}
              error={!!eventSelectValid && formSubmitted}
              helperText={formSubmitted ? eventSelectValid : ''}
            />
          </Grid>
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
          <Grid item xs={12} sm={2} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Cantidad de horas"
              name="quantity"
              value={quantity}
              onChange={(V: any) => onInputChange(V, false, true)}
              error={!!quantityValid && formSubmitted}
              helperText={formSubmitted ? quantityValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={3.5} sx={{ padding: '5px' }}>
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
