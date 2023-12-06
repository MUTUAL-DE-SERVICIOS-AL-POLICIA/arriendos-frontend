import { useState } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Switch } from "@mui/material"
import { ComponentInput } from "@/components"
import { useForm, useRoomStore } from "@/hooks";
import { FormRoomModel, FormRoomValidations } from "@/models";

const formFields: FormRoomModel = {
  name: '',
  is_active: true,
  capacity: 0,
  warranty: 0,
  property: 1,
}

const formValidations: FormRoomValidations = {
  name: [(value: string) => value != null && value.length > 0, 'Debe ingresar el nombre del ambiente'],
  capacity: [(value: any) => value != 0, 'Debe ingresar la capacidad del ambiente'],
  warranty: [(value: any) => value != 0, 'Debe ingresar la garantía del ambiente']
}

export const CreateRoom = (props: any) => {
  const {
    open,
    handleClose,
    property,
    change,
  } = props;

  const { postRoom, patchEditRoom } = useRoomStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    name, is_active, capacity, warranty,
    onInputChange, isFormValid, onResetForm, onSwitchChange,
    capacityValid, warrantyValid, nameValid
  } = useForm('capacity' in property ? property : formFields, formValidations);


  const sendSubmit = async (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    const bodyFormData = new FormData();
    bodyFormData.append('name', name)
    bodyFormData.append('capacity', capacity)
    bodyFormData.append('warranty', warranty)
    bodyFormData.append('is_active', is_active)
    bodyFormData.append('group', '1')
    bodyFormData.append('property', property.property)
    setLoading(true);
    if (!('capacity' in property)) {
      await postRoom(bodyFormData).then((res) => {
        if (res) {
          handleClose();
          onResetForm();
        }
      })
    } else {
      await patchEditRoom(property.id, bodyFormData).then((res) => {
        if (res) {
          handleClose();
          onResetForm();
        }
      })
    }
    setLoading(false);
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{change ? 'Nuevo ambiente' : `Modificando ${property.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} sm={8} sx={{ padding: '5px' }}>
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
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={is_active}
                      onChange={(event) => onSwitchChange("is_active", event.target.checked)}
                      name="estado"
                    />
                  }
                  label="Activar ambiente"
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Capacidad"
                  name="capacity"
                  value={capacity}
                  onChange={(V: any) => onInputChange(V, false, false, true)}
                  error={!!capacityValid && formSubmitted}
                  helperText={formSubmitted ? capacityValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Garantía"
                  name="warranty"
                  value={warranty}
                  onChange={(V: any) => onInputChange(V, false, true)}
                  error={!!warrantyValid && formSubmitted}
                  helperText={formSubmitted ? warrantyValid : ''}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {
              loading ?
                <CircularProgress color="success" size={30} /> :
                <>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button type="submit">
                    {change ? 'CREAR' : 'GUARDAR'}
                  </Button>
                </>
            }
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
