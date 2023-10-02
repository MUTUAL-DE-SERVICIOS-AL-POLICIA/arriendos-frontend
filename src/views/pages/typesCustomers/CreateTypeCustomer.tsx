import { ComponentInput } from "@/components"
import { useForm, useTypeCustomerStore } from "@/hooks";
import { FormTypeCustomerModel, FormTypeCustomerValidations, TypeCustomerModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Switch } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: TypeCustomerModel | null;
}

const formFields: FormTypeCustomerModel = { name: '', is_institution: false }

const formValidations: FormTypeCustomerValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
}

export const CreateTypeCustomer = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreateTypeCustomer, patchEditTypeCustomer } = useTypeCustomerStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { name, is_institution, onInputChange, onSwitchChange, isFormValid, nameValid, onResetForm } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateTypeCustomer(
        {
          name: name.trim(),
          is_institution
        });
    } else {
      patchEditTypeCustomer(item.id, { name, is_institution });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Tipo de Cliente' : `Tipo de cliente: ${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
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
                {/* onChange={(event) => setStatePlan(event.target.checked)} */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={is_institution}
                      onChange={(event) => onSwitchChange("is_institution", event.target.checked)}
                      name="institución" />
                  }
                  label="¿Pedir ingresar el nombre de la institución?"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              onResetForm();
              handleClose()
            }}>Cancelar</Button>
            <Button type="submit">
              {item == null ? 'CREAR' : 'EDITAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
