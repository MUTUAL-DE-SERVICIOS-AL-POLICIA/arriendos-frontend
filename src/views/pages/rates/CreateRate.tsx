import { ComponentInput, ComponentInputSelect, ModalSelectComponent } from "@/components";
import { useForm } from "@/hooks";
import { useRateStore } from "@/hooks/useRateStore";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { FormEvent, useCallback, useState } from "react";
import { FormRateModel, FormRateValidations, RequirementModel, TypeCustomerModel } from "@/models";
import { RequirementTable } from "../requirements";
import { TypeCustomerTable } from "../typesCustomers";

interface createProps {
  open: boolean;
  handleClose: () => void;
}
const formFields: FormRateModel = {
  rate: '',
  customer_type: [],
  requirement: [],
}
const formValidations: FormRateValidations = {
  rate: [(value: string) => value.length >= 1, 'Debe ingresar la tarifa'],
  customer_type: [(value: TypeCustomerModel[]) => value.length >= 1, 'Debe selecccionar almenos un tipo de cliente'],
  requirement: [(value: RequirementModel[]) => value.length >= 1, 'Debe seleccionar almenos un requisito'],
}

export const CreateRate = (props: createProps) => {
  const {
    open,
    handleClose,
  } = props;

  const { postCreateRate } = useRateStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    rate, customer_type, requirement,
    onInputChange, onValueChange, isFormValid, onResetForm,
    rateValid, requirementValid, customer_typeValid } = useForm(formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    postCreateRate(
      {
        rate,
        requirement: requirement.map((e: RequirementModel) => e.id),
        customer_type: customer_type.map((e: TypeCustomerModel) => e.id),
      })
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
        <DialogTitle>{'Nueva Tarifa'}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Nombre"
                  name="rate"
                  value={rate}
                  onChange={onInputChange}
                  error={!!rateValid && formSubmitted}
                  helperText={formSubmitted ? rateValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentInputSelect
                  title={'Tipos de clientes'}
                  onPressed={() => handleModalCustomerType(true)}
                  items={customer_type.map((e: TypeCustomerModel) => ({ id: e.id, name: e.name }))}
                  onRemove={(v) => onValueChange('customer_type', [...customer_type.filter((e: TypeCustomerModel) => e.id != v)])}
                  error={!!customer_typeValid && formSubmitted}
                  helperText={formSubmitted ? customer_typeValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                <ComponentInputSelect
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
              {'CREAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
