import { ComponentInput } from "@/components"
import { useHourRangeStore, useForm } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormEvent, useState } from "react";
import { FormHourRangeModel, FormHourRangeValidations, HourRangeModel } from "@/models";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: HourRangeModel | null;
}

const formFields: FormHourRangeModel = {
  name: '',
}
const formValidations: FormHourRangeValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar un rango'],
};


export const CreateHourRange = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;

  const { postCreateHourRange, patchUpdateHourRange } = useHourRangeStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    name,
    onInputChange, isFormValid, onResetForm,
    nameValid } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateHourRange({ name });
    } else {
      patchUpdateHourRange(item.id, { name });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Rango de horas' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <ComponentInput
              type="text"
              label="Rango de hora"
              name="name"
              value={name}
              onChange={(V: any) => onInputChange(V, false, true)}
              error={!!nameValid && formSubmitted}
              helperText={formSubmitted ? nameValid : ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">
              {item == null ? 'CREAR' : 'EDITAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
