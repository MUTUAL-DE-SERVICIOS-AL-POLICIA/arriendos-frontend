import { ComponentInput } from "@/components"
import { useHourRangeStore, useForm } from "@/hooks";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormEvent, useState } from "react";
import { FormHourRangeModel, FormHourRangeValidations, HourRangeModel } from "@/models";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: HourRangeModel | null;
}

const formFields: FormHourRangeModel = {
  time: 0,
}
const formValidations: FormHourRangeValidations = {
  time: [(value: number) => value != 0, 'Debe ingresar un rango'],
};


export const CreateHourRange = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;

  const { postCreateHourRange, patchUpdateHourRange } = useHourRangeStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    time,
    onInputChange, isFormValid, onResetForm,
    nameValid } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    setLoading(true)
    if (item == null) {
      await postCreateHourRange({ time }).then((res) => {
        if (res) {
          handleClose();
          onResetForm();
        }
      });
    } else {
      await patchUpdateHourRange(item.id, { time }).then((res) => {
        if (res) {
          handleClose();
          onResetForm();
        }
      });
    }
    setLoading(false);
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Rango de horas' : `${item.time} Horas`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <ComponentInput
              type="text"
              label="Rango de hora"
              name="time"
              value={time}
              onChange={(V: any) => onInputChange(V, false, true)}
              error={!!nameValid && formSubmitted}
              helperText={formSubmitted ? nameValid : ''}
            />
          </DialogContent>
          <DialogActions>
            {
              loading ?
                <CircularProgress color="success" size={30} /> :
                <>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button type="submit">
                    {item == null ? 'CREAR' : 'GUARDAR'}
                  </Button>
                </>
            }
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
