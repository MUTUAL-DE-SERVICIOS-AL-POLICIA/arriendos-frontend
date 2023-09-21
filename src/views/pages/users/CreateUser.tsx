
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm, useUserStore } from "@/hooks";
import { ComponentSelect, ModalSelectComponent } from "@/components";
import { UserLdapTable } from ".";
import { FormUserModel, FormUserValidations } from "@/models";

const formFields: FormUserModel = { username: '' }

const formValidations: FormUserValidations = {
    username: [(value: any) => value.length >= 1, 'Debe ingresar la cuenta'],
}

export const CreateUser = (props: any) => {
    const {
        open,
        handleClose
    } = props;

    const { getUsersLdap, postCreateUser } = useUserStore();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const { username, onInputChange, isFormValid, usernameValid, onResetForm } = useForm(formFields, formValidations);
    useEffect(() => {
        getUsersLdap();
    }, [])

    const sendSubmit = async (event: any) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        await postCreateUser({
            username,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
        }).then(() => {
            onResetForm();
            handleClose();
        })
    };


    const [modal, setModal] = useState(false);
    const handleModal = useCallback((value: boolean) => {
        setModal(value);
    }, []);
    return (
        <>
            {
                modal ?
                    <ModalSelectComponent
                        stateSelect={true}
                        stateMultiple={false}
                        title='Usuarios:'
                        opendrawer={modal}
                        handleDrawer={handleModal}

                    >
                        <UserLdapTable
                            stateSelect={true}
                            limitInit={5}
                            itemSelect={(v: any) => {
                                onInputChange({ target: { name: 'username', value: v.username } });
                                setUserInfo(v);
                                handleModal(false)
                            }}
                        />
                    </ModalSelectComponent> :
                    <></>
            }
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Nuevo Usuario</DialogTitle>
                <form onSubmit={sendSubmit}>
                    <DialogContent>
                        <Box sx={{ flexDirection: 'column' }}>
                            <ComponentSelect
                                label={username != '' ? 'Cuenta' : ''}
                                labelChip={['name']}
                                title={username != '' ? username : 'Cuenta'}
                                onPressed={() => handleModal(true)}
                                error={!!usernameValid && formSubmitted}
                                helperText={formSubmitted ? usernameValid : ''}
                            />
                            {
                                userInfo &&
                                <>
                                    <Typography>NOMBRES: {userInfo.first_name}</Typography>
                                    <Typography>APELLIDOS: {userInfo.last_name}</Typography>
                                    <Typography>CORREO: {userInfo.email}</Typography>
                                </>
                            }
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            onResetForm();
                            handleClose()
                        }}>Cancelar</Button>
                        <Button type="submit">
                            CREAR
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
