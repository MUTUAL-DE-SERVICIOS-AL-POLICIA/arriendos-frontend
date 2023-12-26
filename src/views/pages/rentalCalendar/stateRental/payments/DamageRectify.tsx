import { ComponentInput, SelectComponent } from "@/components"
import { useDamageStore, useForm, useLeasesStates, useWarrantyStore } from "@/hooks"
import { FormDamageModel, FormDamageValidations, ProductRentalModel, RentalModel } from "@/models"
import { Button, Grid, Typography } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { format } from "date-fns";
import esES from 'date-fns/locale/es';
import { formatDate } from "@/helpers";

const formFields: FormDamageModel = {
  detail: '',
  discount: 0,
  eventSelect: '',
}
const formValidations: FormDamageValidations = {
  detail: [(value: string) => value.length >= 1, 'Debe ingresar el detalle del daño'],
  discount: [(value: number) => value != 0, 'Debe ingresar un monto'],
  eventSelect: [(value: string) => value.length !== 0, 'Debe seleccionar un evento'],
}

interface elementsProps {
  handleClose: () => void;
//   sendData: (data: object) => void;
  rental: any;
}

export const ComponentDamageRectify = (props: elementsProps) => {
  const {
    handleClose,
    // sendData,
    rental,
  } = props;


  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    detail, discount, onInputChange, eventSelect,
    isFormValid, detailValid, discountValid, eventSelectValid,
    onResetForm, onValueChange } = useForm(formFields, formValidations);


    const { getRental } = useLeasesStates()
    const [ lease, setLease ] = useState<RentalModel>()

    const { postRegisterDiscountWarranty } = useDamageStore()
    const { getListWarranty } = useWarrantyStore()

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    // //ENVIAR DAÑO
    const body = {
        rental: rental,
        detail: detail,
        discount: parseFloat(discount),
        product: eventSelect
    }
    await postRegisterDiscountWarranty(body)
    await getListWarranty(rental)
    handleClose();
    onResetForm();
  }

  useEffect(() => {
    getRental(rental).then(data => setLease(data))
  }, [])

  return (
    <>
      <Typography variant="h6">{'Registro de daños'}</Typography>
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={12} sx={{ padding: '5px', paddingTop: '20px' }}>
            { lease && <SelectComponent
              handleSelect={(value: any) => onValueChange('eventSelect', value)}
              label={`Seleccionar Evento`}
              options={[...lease.products.map((item: ProductRentalModel) => ({ id: item.id, name: `${item.id} ${format(formatDate(item.start_time), 'EEEE dd-MMMM HH:mm', { locale: esES })} ${item.event} ${item.property}-${item.room}` }))]}
              value={eventSelect}
              error={!!eventSelectValid && formSubmitted}
              helperText={formSubmitted ? eventSelectValid : ''}
            />
            }
          </Grid>
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

