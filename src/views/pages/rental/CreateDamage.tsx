import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { FormEvent } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
}
export const CreateDamage = (props: createProps) => {
  const {
    open,
    handleClose,
  } = props;

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  }

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>{'Registro de Daños'}</DialogTitle>
      <form onSubmit={sendSubmit}>
        <DialogContent sx={{ display: 'flex' }}>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">
            {'CREAR'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}