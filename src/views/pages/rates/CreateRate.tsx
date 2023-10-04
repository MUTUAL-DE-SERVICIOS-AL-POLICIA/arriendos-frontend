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
  customer_type: [],
  requirement: [],
}
const formValidations: FormRateValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar la tarifa'],
  customer_type: [(value: TypeCustomerModel[]) => value.length >= 1, 'Debe selecccionar almenos un tipo de cliente'],
  requirement: [(value: RequirementModel[]) => value.length >= 1, 'Debe seleccionar almenos un requisito'],
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
    name, customer_type, requirement,
    onInputChange, onValueChange, isFormValid, onResetForm,
    nameValid, requirementValid, customer_typeValid } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      postCreateRate(
        {
          name,
          requirement: requirement.map((e: RequirementModel) => e.id),
          customer_type: customer_type.map((e: TypeCustomerModel) => e.id),
        });
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
              if (customer_type.map((e: TypeCustomerModel) => e.id).includes(v.id)) {
                onValueChange('customer_type', [...customer_type.filter((e: TypeCustomerModel) => e.id != v.id)])
              } else {
                onValueChange('customer_type', [...customer_type, v])
              }
            }}
            items={customer_type.map((e: TypeCustomerModel) => (e.id))}
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
                if (requirement.map((e: RequirementModel) => e.id).includes(v.id)) {
                  onValueChange('requirement', [...requirement.filter((e: RequirementModel) => e.id != v.id)])
                } else {
                  onValueChange('requirement', [...requirement, v])
                }
              }}
              items={requirement.map((e: RequirementModel) => (e.id))}
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
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  title={'Tipos de clientes'}
                  onPressed={() => handleModalCustomerType(true)}
                  items={customer_type.map((e: TypeCustomerModel) => ({ id: e.id, name: e.name }))}
                  onRemove={(v) => onValueChange('customer_type', [...customer_type.filter((e: TypeCustomerModel) => e.id != v)])}
                  error={!!customer_typeValid && formSubmitted}
                  helperText={formSubmitted ? customer_typeValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentSelect
                  title={'Requisitos'}
                  onPressed={() => handleModalRequirement(true)}
                  items={requirement.map((e: RequirementModel) => ({ id: e.id, name: e.requirement_name }))}
                  onRemove={(v) => onValueChange('requirement', [...requirement.filter((e: RequirementModel) => e.id != v)])}
                  error={!!requirementValid && formSubmitted}
                  helperText={formSubmitted ? requirementValid : ''}
                />
              </Grid>
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
