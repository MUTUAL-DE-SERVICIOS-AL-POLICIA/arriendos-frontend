import { useState, useMemo } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from "@mui/material"
import { ComponentInput } from "@/components"
import { useForm, useRoomStore, usePropertieStore } from "@/hooks";
import { FormSubRoomValidations, SubRooms } from "@/models";

const STATE_OPTIONS = [
  { value: 'BUENO', label: 'Bueno' },
  { value: 'REGULAR', label: 'Regular' },
  { value: 'MALO', label: 'Malo' },
];

const formValidations: FormSubRoomValidations = {
  name: [(value: string) => value != null && value.length > 0, 'Debe ingresar el nombre del sub ambiente'],
  state: [(value: string) => value != null && value.length > 0, 'Debe seleccionar el estado'],
  quantity: [(value: any) => value != null && Number(value) > 0, 'Debe ingresar una cantidad válida'],
}

interface EditSubRoomProps {
  open: boolean;
  handleClose: () => void;
  subRoom: SubRooms | null;
}

export const EditSubRoom = (props: EditSubRoomProps) => {
  const { open, handleClose, subRoom } = props;

  const { patchEditSubRoom } = useRoomStore();
  const { getPropertiesRooms } = usePropertieStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialForm = useMemo(() => subRoom
    ? { name: subRoom.name, state: subRoom.state, quantity: subRoom.quantity }
    : { name: '', state: 'BUENO', quantity: 0 }
  , [subRoom?.id, open]);

  const {
    name, state, quantity,
    onInputChange, onValueChange, isFormValid, onResetForm,
    nameValid, stateValid, quantityValid
  } = useForm(initialForm, formValidations);

  const sendSubmit = async (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    setLoading(true);
    const body = {
      name,
      state,
      quantity: Number(quantity),
    };
    const res = await patchEditSubRoom(subRoom!.id, body);
    if (res) {
      await getPropertiesRooms();
      handleClose();
      onResetForm();
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Sub Ambiente</DialogTitle>
      <form onSubmit={sendSubmit}>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
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
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
              <TextField
                select
                size="small"
                fullWidth
                label="Estado"
                name="state"
                value={state}
                onChange={(e) => onValueChange('state', e.target.value)}
                error={!!stateValid && formSubmitted}
                helperText={formSubmitted ? stateValid : ''}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              >
                {STATE_OPTIONS.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
              <ComponentInput
                type="text"
                label="Cantidad"
                name="quantity"
                value={quantity}
                onChange={(V: any) => onInputChange(V, false, false, true)}
                error={!!quantityValid && formSubmitted}
                helperText={formSubmitted ? quantityValid : ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <CircularProgress color="success" size={30} />
          ) : (
            <>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit">GUARDAR</Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  )
}
