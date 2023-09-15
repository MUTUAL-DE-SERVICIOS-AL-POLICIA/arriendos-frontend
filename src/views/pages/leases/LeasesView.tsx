import { useForm, useSelectorStore } from "@/hooks";
import { Grid, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { CalendarComponent, CartSelectedProduct, PropertieTable } from ".";
import { ComponentSelect, ModalSelectComponent } from "@/components";


const formFields = {
  typeCustomer: '',
  typeCustomerId: '',
}
const formValidations = {
  typeCustomer: [(value: any) => value.length >= 1, 'Debe seleccionar un tipo de cliente'],
}

export const LeasesView = () => {

  const { selectionsRooms } = useSelectorStore();

  const [form, setForm] = useState(formFields);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { typeCustomer,
    onInputChange, isFormValid, onResetForm,
    typeCustomerValid } = useForm(form, formValidations);

  const [modal, setModal] = useState(false);

  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);

  useEffect(() => {
    if (selectionsRooms.length > 0) setForm({ typeCustomer: selectionsRooms[0], typeCustomerId: '1' })
    setModal(false);
  }, [selectionsRooms])

  return (
    <>
      {
        modal ?
          <ModalSelectComponent
            stateSelect={true}
            stateMultiple={false}
            title='Tipos de clientes'
            opendrawer={modal}
            handleDrawer={() => handleModal(false)}
          >
            <PropertieTable />
          </ModalSelectComponent> :
          <></>
      }
      <Typography variant="h6">Arriendos</Typography>
      <Grid container>
        <Grid item xs={12} sm={7} >
          <div style={{ padding: '10px' }}>
            <ComponentSelect
              labelChip={['name']}
              title='Ambiente'
              name="typeCustomer"
              value={typeCustomer}
              onPressed={() => handleModal(true)}
              error={!!typeCustomerValid && formSubmitted}
              helperText={formSubmitted ? typeCustomerValid : ''}
            />
            <CalendarComponent select={selectionsRooms.length > 0} />
          </div>
        </Grid>
        <Grid item xs={12} sm={5}>
          <CartSelectedProduct />
        </Grid>
      </Grid>
    </>
  )
}
