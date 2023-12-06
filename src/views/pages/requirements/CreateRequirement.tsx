import { ComponentInput } from "@/components";
import { useForm, useRequirementStore } from "@/hooks";
import { FormRequirementModel, FormRequirementValidations, RequirementModel } from "@/models";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
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
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { requirement_name, onInputChange, isFormValid, requirement_nameValid, onResetForm } = useForm(item ?? formFields, formValidations);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    setLoading(true);
    if (item == null) {
      await postCreateRequirement({ requirement_name: requirement_name.trim() }).then((res) => {
        if (res) {
          handleClose();
          onResetForm();
        }
      });
    } else {
      await patchEditRequirement(item.id, { requirement_name: requirement_name.trim() }).then((res) => {
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
        <DialogTitle>{item == null ? 'Nuevo Requisito' : ` ${item.requirement_name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <ComponentInput
              type="text"
              label="Nombre"
              name="requirement_name"
              value={requirement_name}
              onChange={(V: any) => onInputChange(V, true)}
              error={!!requirement_nameValid && formSubmitted}
              helperText={formSubmitted ? requirement_nameValid : ''}
            />
          </DialogContent>
          <DialogActions>
            {
              loading ?
                <CircularProgress color="success" size={30} /> :
                <>
                  <Button onClick={() => {
                    onResetForm();
                    handleClose()
                  }}>Cancelar</Button>
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
