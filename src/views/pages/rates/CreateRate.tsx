import { ComponentInput, ComponentSelect, ModalSelectComponent } from "@/components";
import { useForm } from "@/hooks";
import { useRateStore } from "@/hooks/useRateStore";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { FormEvent, useCallback, useState } from "react";
import { FormRateModel, FormRateValidations, RateModel, RequirementModel, TypeCustomerModel } from "@/models";
import { RequirementTable } from "../requirements";
import { TypeCustomerTable } from "../typesCustomers";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: RateModel | null;
}
const formFields: FormRateModel = {
  name: '',
  requirement: [],
  customer_type: [],
}
const formValidations: FormRateValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar la tarifa'],
}

export const CreateRate = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;

  const { postCreateRate, patchUpdateRate } = useRateStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    name, requirement, customer_type,
    onInputChange, onValueChange, isFormValid, onResetForm,
    nameValid, requirementValid, customer_typeValid } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateRate({ name });
    } else {
      patchUpdateRate(item.id,
        {
          name,
          requirement: requirement.map((e: RequirementModel) => e.id),
          customer_type: customer_type.map((e: TypeCustomerModel) => e.id),
        });
    }
    handleClose();
    onResetForm();
  }

  const [modalCustomerType, setCustomerType] = useState(false);
  const handleModalCustomerType = useCallback((value: boolean) => {
    setCustomerType(value);
  }, []);

  const [modalRequirement, setRequirement] = useState(false);
  const handleModalRequirement = useCallback((value: boolean) => {
    setRequirement(value);
  }, []);
  return (
    <>
      {
        modalCustomerType &&
        <ModalSelectComponent
          stateSelect={true}
          stateMultiple={true}
          title='Tipos de Clientes'
          opendrawer={modalCustomerType}
          handleDrawer={handleModalCustomerType}
        >
          <TypeCustomerTable
            stateSelect={true}
            limitInit={5}
            itemSelect={(v) => {
              onValueChange('customer_type', [...customer_type, v])
              //handleModalCustomerType(false)
            }}
          />
        </ModalSelectComponent>
      }
      {
        modalRequirement ?
          <ModalSelectComponent
            stateSelect={true}
            stateMultiple={true}
            title='Requerimientos'
            opendrawer={modalRequirement}
            handleDrawer={handleModalRequirement}
          >
            <RequirementTable
              stateSelect={true}
              limitInit={5}
              itemSelect={(v) => {
                onValueChange('requirement', [...requirement, v])
                //handleModalRequirement(false)
              }}
            />
          </ModalSelectComponent> :
          <></>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nueva Tarifa' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
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
              {
                item &&
                <>
                  <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                    <ComponentSelect
                      items={customer_type.map((e: TypeCustomerModel) => ({ id: `${e.id}typeCustomer`, name: e.name }))}
                      title={'Tipos de clientes'}
                      onPressed={() => handleModalCustomerType(true)}
                      error={!!customer_typeValid && formSubmitted}
                      helperText={formSubmitted ? customer_typeValid : ''}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                    <ComponentSelect
                      items={requirement.map((e: RequirementModel) => ({ id: `${e.id}requirement`, name: e.requirement_name }))}
                      title={'Requerimientos'}
                      onPressed={() => handleModalRequirement(true)}
                      error={!!requirementValid && formSubmitted}
                      helperText={formSubmitted ? requirementValid : ''}
                    />
                  </Grid>
                </>
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
