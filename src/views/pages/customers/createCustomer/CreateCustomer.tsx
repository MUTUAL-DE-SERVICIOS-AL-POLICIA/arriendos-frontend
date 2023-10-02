import { ComponentButton, ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useCustomerStore, useForm } from "@/hooks";
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItem, Typography } from "@mui/material"
import { FormEvent, useCallback, useEffect, useState } from "react";
import { TypeCustomerTable } from "../../typesCustomers";
import { FormContactModel, FormCustomerModel, FormCustomerValidations, TypeCustomerModel } from "@/models";
import { TransitionGroup } from 'react-transition-group';
import './styles.css';
import { CardContact } from ".";

interface createProps {
  open: boolean;
  handleClose: () => void;
}
const formCustomerFields: FormCustomerModel = {
  typeCustomer: null,
  name_institution: '',
  nit_institution: '',
}
const formCustomerValidations: FormCustomerValidations = {
  typeCustomer: [(value: TypeCustomerModel) => value !== null, 'Debe seleccionar un tipo de cliente'],
  name_institution: [(value: string) => value.length >= 1, 'Debe ingresar el nombre de la institución'],
  nit_institution: [(value: string) => value.length >= 1, 'Debe ingresar el nit de la institución'],
};



export const CreateCustomer = (props: createProps) => {
  const {
    open,
    handleClose,
  } = props;

  const { postCreateCustomer } = useCustomerStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [listContacts, setListContacts] = useState<object[]>([]);


  const {
    typeCustomer, name_institution, nit_institution,
    onInputChange, isFormValid, onResetForm,
    typeCustomerValid, name_institutionValid, nit_institutionValid } = useForm(formCustomerFields, formCustomerValidations);



  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    let data: { customer_type: number, institution?: {}, customer?: {} } = { customer_type: typeCustomer.id };

    if (typeCustomer.is_institution) {
      data.institution = {
        name: name_institution,
        nit: nit_institution,
        contacts: listContacts
      };
    } else {
      data.customer = listContacts[0]
    }
    postCreateCustomer(data);
    handleClose();
    onResetForm();
  }

  const handleModal = useCallback((value: boolean) => setModal(value), [{}]);

  const changeValues = (value: FormContactModel, index: number) => {
    const updatedContacts = [...listContacts];
    updatedContacts[index] = value;
    setListContacts(updatedContacts);
  }

  const handleAddContact = () => {
    if (typeCustomer.is_institution) {
      if (listContacts.length < 5) setListContacts([...listContacts, {}])
    } else {
      if (listContacts.length < 1) setListContacts([...listContacts, {}])
    }
  };
  const handleRemoveContact = (index: number) => setListContacts(listContacts.filter((_, i) => i !== index));





  //ajuste de tamaño de scroll
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);


  return (
    <>
      {
        modal ?
          <ModalSelectComponent
            stateSelect={true}
            stateMultiple={false}
            title='Tipos de clientes'
            opendrawer={modal}
            handleDrawer={handleModal}
          >
            <TypeCustomerTable
              stateSelect={true}
              limitInit={5}
              itemSelect={(v) => {
                onInputChange({ target: { name: 'typeCustomer', value: v } });
                handleModal(false)
              }}
            />
          </ModalSelectComponent> :
          <></>
      }
      <Dialog open={open} onClose={handleClose} maxWidth={typeCustomer && typeCustomer.is_institution ? 'lg' : 'md'}>
        <DialogTitle>{'Nuevo Cliente'}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent >
            <Grid container>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={typeCustomer != null ? 'Tipo de Cliente' : ''}
                  title={typeCustomer != null ? typeCustomer.name : 'Tipo de Cliente'}
                  onPressed={() => handleModal(true)}
                  error={!!typeCustomerValid && formSubmitted}
                  helperText={formSubmitted ? typeCustomerValid : ''}
                />
              </Grid>
              {
                typeCustomer && (
                  <>
                    {
                      typeCustomer.is_institution &&
                      <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                        {/* ESPACIO PARA LOS DATOS DE UNA INSTITUCIÓN */}
                        <Typography>Datos de la institución:</Typography>
                        <ComponentInput
                          type="text"
                          label="Nombre"
                          name="name_institution"
                          value={name_institution}
                          onChange={onInputChange}
                          error={!!name_institutionValid && formSubmitted}
                          helperText={formSubmitted ? name_institutionValid : ''}
                        />
                        <ComponentInput
                          type="text"
                          label="Nit"
                          name="nit_institution"
                          value={nit_institution}
                          onChange={onInputChange}
                          error={!!nit_institutionValid && formSubmitted}
                          helperText={formSubmitted ? nit_institutionValid : ''}
                        />
                      </Grid>
                    }
                    <Grid item xs={12} sm={typeCustomer.is_institution ? 6 : 12} sx={{ padding: '5px' }}>
                      <Typography>Datos del contacto:</Typography>
                      <div style={{ maxHeight: `${screenHeight - 350}px`, overflowY: 'auto' }}>
                        {/* ESPACIO PARA LOS CONTACTOS */}
                        <TransitionGroup>
                          {listContacts.map((_, index) => (
                            <Collapse key={index}>
                              <ListItem className="slide-in-from-top">
                                <CardContact
                                  formSubmitted={formSubmitted}
                                  removeItem={() => handleRemoveContact(index)}
                                  onFormStateChange={(v: any) => changeValues(v, index)}
                                />
                              </ListItem>
                            </Collapse>
                          ))}
                        </TransitionGroup>
                      </div>
                      <ComponentButton
                        text="Agregar contacto"
                        onClick={handleAddContact}
                        disable={typeCustomer.is_institution ? listContacts.length >= 5 : listContacts.length >= 1}
                      />
                    </Grid>
                  </>
                )
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              //console.log(listData)
              //console.log(CardContact.)
              console.log(listContacts)
            }}>Verificar</Button>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">CREAR</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
