import { ComponentButton, ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components"
import { useCustomerStore, useForm } from "@/hooks";
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItem, Typography } from "@mui/material"
import { FormEvent, useCallback, useEffect, useState } from "react";
import { TypeCustomerTable } from "../../typesCustomers";
import { CustomerModel, FormContactModel, FormCustomerModel, FormCustomerValidations, TypeCustomerModel } from "@/models";
import { TransitionGroup } from 'react-transition-group';
import './styles.css';
import { CardContact } from "../contact";


interface createProps {
  open: boolean;
  handleClose: () => void;
  item: CustomerModel | null;
}
const formCustomerFields: FormCustomerModel = {
  customer_type: null,
  institution_name: '',
  nit: '',
}
const formCustomerValidations: FormCustomerValidations = {
  customer_type: [(value: TypeCustomerModel) => value !== null, 'Debe seleccionar un tipo de cliente'],
  institution_name: [(value: string | null) => value == null ? false : value.length >= 1, 'Debe ingresar el nombre de la institución'],
  nit: [(value: string | null) => value == null ? false : value.length >= 1, 'Debe ingresar el nit de la institución'],
};



export const CreateCustomer = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;

  const { postCreateCustomer, patchUpdateCustomer } = useCustomerStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modal, setModal] = useState(false);
  const [listContacts, setListContacts] = useState<any[]>(item == null ? [{ state: false }] : [...item.contacts.map((e: any) => ({ ...e, state: true, phones: e.phone.split(',') }))]);


  const {
    customer_type, institution_name, nit,
    onInputChange, onValueChange, isFormValid, onResetForm,
    customer_typeValid, institution_nameValid, nitValid } = useForm(item ?? formCustomerFields, formCustomerValidations);



  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(listContacts)
    event.preventDefault();
    setFormSubmitted(true);
    if ((listContacts.filter((e: any) => !e.state).length > 0)) return;
    if (customer_type.is_institution) if (!isFormValid) return;
    let data: { customer_type: number, institution?: {}, customer?: {} } = { customer_type: customer_type.id };
    if (customer_type.is_institution) {
      data.institution = {
        name: institution_name,
        nit: nit,
        contacts: listContacts
      };
    } else {
      data.customer = listContacts[0]
    }
    console.log(data)
    if (item == null) {
      postCreateCustomer(data);
    } else {
      patchUpdateCustomer(item.id, data);
    }
    handleClose();
    onResetForm();
  }

  const handleModal = useCallback((value: boolean) => setModal(value), [{}]);

  const changeValues = (value: FormContactModel, state: boolean, index: number) => {
    const updatedContacts = [...listContacts];
    updatedContacts[index] = {
      ...value,
      phone: value.phones.toString(),
      state
    };
    setListContacts(updatedContacts);
  }

  const handleAddContact = () => setListContacts([...listContacts, { state: false }]);
  const handleRemoveContact = (index: number) => {
    if (listContacts.length > 1)
      setListContacts(listContacts.filter((_, i) => i !== index));
  };


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
                onValueChange('customer_type', v);
                handleModal(false)
              }}
            />
          </ModalSelectComponent> :
          <></>
      }
      <Dialog open={open} onClose={handleClose} maxWidth={customer_type && customer_type.is_institution ? 'lg' : 'md'}>
        <DialogTitle>{item == null ? 'Nuevo Cliente' : item.institution_name ?? item.contacts[0].name}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent >
            <Grid container>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  label={customer_type != null ? 'Tipo de Cliente' : ''}
                  title={customer_type != null ? customer_type.name : 'Tipo de Cliente'}
                  onPressed={() => handleModal(true)}
                  error={!!customer_typeValid && formSubmitted}
                  helperText={formSubmitted ? customer_typeValid : ''}
                />
              </Grid>
              {
                customer_type && (
                  <>
                    {
                      customer_type.is_institution &&
                      <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                        <Typography>Datos de la institución:</Typography>
                        <ComponentInput
                          type="text"
                          label="Nombre"
                          name="institution_name"
                          value={institution_name}
                          onChange={onInputChange}
                          error={!!institution_nameValid && formSubmitted}
                          helperText={formSubmitted ? institution_nameValid : ''}
                        />
                        <ComponentInput
                          type="text"
                          label="Nit"
                          name="nit"
                          value={nit}
                          onChange={(V: any) => onInputChange(V, false, true)}
                          error={!!nitValid && formSubmitted}
                          helperText={formSubmitted ? nitValid : ''}
                        />
                      </Grid>
                    }
                    <Grid item xs={12} sm={customer_type.is_institution ? 6 : 12} sx={{ padding: '5px' }}>
                      <Typography>Datos del contacto:</Typography>
                      <div style={{ maxHeight: `${screenHeight - 350}px`, overflowY: 'auto' }}>
                        <TransitionGroup>
                          {listContacts.map((element, index) => (
                            <Collapse key={index}>
                              <ListItem className="slide-in-from-top">
                                <CardContact
                                  hiddenDelete={index != 0}
                                  formSubmitted={formSubmitted}
                                  removeItem={() => handleRemoveContact(index)}
                                  onFormStateChange={(v, s) => changeValues(v, s, index)}
                                  item={Object.keys(element).length === 1 && Object.keys(element)[0] === "state" ? null : element}
                                />
                              </ListItem>
                            </Collapse>
                          ))}
                        </TransitionGroup>
                      </div>
                      <ComponentButton
                        text="Agregar contacto"
                        onClick={handleAddContact}
                        disable={customer_type.is_institution ? listContacts.length >= 5 : listContacts.length >= 1}
                      />
                    </Grid>
                  </>
                )
              }
            </Grid>
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
