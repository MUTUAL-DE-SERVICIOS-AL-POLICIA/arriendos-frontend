import { ComponentInput } from "@/components";
import { useForm, useRequirementStore } from "@/hooks";
import { FormRequirementModel, FormRequirementValidations, RequirementModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FormEvent, useState } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: RequirementModel | null;
}

const formFields: FormRequirementModel = { requirement_name: '' }

const formValidations: FormRequirementValidations = {
  requirement_name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
}

export const CreateRequirement = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { postCreateRequirement, patchEditRequirement } = useRequirementStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { requirement_name, onInputChange, isFormValid, requirement_nameValid, onResetForm } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateRequirement({ requirement_name: requirement_name.trim() });
    } else {
      patchEditRequirement(item.id, { requirement_name: requirement_name.trim() });
    }
    handleClose();
    onResetForm();
  }


  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Requisito' : ` ${item.requirement_name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <ComponentInput
              type="text"
              label="Nombre"
              name="requirement_name"
              value={requirement_name}
              onChange={onInputChange}
              error={!!requirement_nameValid && formSubmitted}
              helperText={formSubmitted ? requirement_nameValid : ''}
            />
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
