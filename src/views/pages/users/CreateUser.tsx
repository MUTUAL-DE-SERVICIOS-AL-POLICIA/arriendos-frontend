
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useForm, useUserStore } from "@/hooks";
import { ComponentInputSelect, ModalSelectComponent } from "@/components";
import { UserLdapTable } from ".";
import { FormUserModel, FormUserValidations } from "@/models";
import { UserLdapModel } from "@/models/userLdapModel";

interface createProps {
  open: boolean;
  handleClose: () => void;
}

const formFields: FormUserModel = { user: null }

const formValidations: FormUserValidations = {
  user: [(value: UserLdapModel) => value != null, 'Debe ingresar la cuenta'],
}

export const CreateUser = (props: createProps) => {
  const {
    open,
    handleClose
  } = props;

  const { getUsersLdap, postCreateUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { user, onValueChange, isFormValid, userValid, onResetForm } = useForm(formFields, formValidations);
  useEffect(() => {
    getUsersLdap();
  }, [])

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    setLoading(true)
    await postCreateUser({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }).then(() => {
      onResetForm();
      handleClose();
    })
    setLoading(false);
  };


  const [modal, setModal] = useState(false);
  const handleModal = useCallback((value: boolean) => {
    setModal(value);
  }, []);
  return (
    <>
      {
        modal &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Usuarios:'
          opendrawer={modal}
          handleDrawer={handleModal}
        >
          <UserLdapTable
            stateSelect={true}
            itemSelect={(v) => {
              onValueChange('user', v);
              handleModal(false)
            }}
            items={user == null ? [] : [user.username]}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Nuevo Usuario</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent>
            <Box sx={{ flexDirection: 'column' }}>
              <ComponentInputSelect
                label={user != null ? 'Cuenta' : ''}
                title={user != null ? user.first_name : 'Cuenta'}
                onPressed={() => handleModal(true)}
                error={!!userValid && formSubmitted}
                helperText={formSubmitted ? userValid : ''}
              />
              {
                user &&
                <>
                  <Typography>NOMBRES: {user.first_name}</Typography>
                  <Typography>APELLIDOS: {user.last_name}</Typography>
                  <Typography>CORREO: {user.email}</Typography>
                </>
              }
            </Box>
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
                    CREAR
                  </Button>
                </>
            }

          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}