import { ContactModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormEvent, useState } from "react";
import { useCustomerStore } from "@/hooks";
import { CardContact } from ".";


interface createProps {
  open: boolean;
  handleClose: () => void;
  customerId: number;
  item: ContactModel | null;
}

export const CreateContact = (props: createProps) => {
  const {
    open,
    handleClose,
    customerId,
    item,
  } = props;

  const { postAddContact, patchUpdateContact } = useCustomerStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(false)
  const [data, setData] = useState<any>();

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!formValid) return;
    console.log(data!)
    if (item == null) {
      postAddContact(
        {
          customer: customerId,
          degree: data!.degree,
          name: data!.name,
          ci_nit: data!.ci_nit,
          phone: data!.phone,
        }
      );
    } else {
      patchUpdateContact(
        item.id,
        {
          customer: customerId,
          degree: data!.degree,
          name: data!.name,
          ci_nit: data!.ci_nit,
          phone: data!.phone,
        }
      )
    }
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{item == null ? 'Nuevo Contacto' : item.name}</DialogTitle>
      <form onSubmit={sendSubmit}>
        <DialogContent >
          <CardContact
            formSubmitted={formSubmitted}
            onFormStateChange={(v, s) => {
              setData(v);
              setFormValid(s);
            }}
            item={item}
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
  )
}
