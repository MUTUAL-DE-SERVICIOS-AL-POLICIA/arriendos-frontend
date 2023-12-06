import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm: any = {}, formValidations: any = {}) => {

  const [formState, setFormState] = useState({ ...initialForm });
  const [formValidation, setFormValidation] = useState<string | any>({});

  useEffect(() => {
    createValidators();
  }, [formState])

  useEffect(() => {
    setFormState({ ...initialForm });
  }, [initialForm])


  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation])



  const onInputChange = ({ target }: { target: any }, uppercase = false, onlyfloat = false, onlyInteger = false) => {
    const { name, value } = target;

    if (onlyfloat || onlyInteger) {
      // Si solo se permiten números, elimina cualquier carácter no numérico del valor
      const numericValue = onlyfloat ? value.replace(/[^0-9.]/g, '') : value.replace(/[^0-9]/g, '');
      setFormState({
        ...formState,
        [name]: numericValue
      });
    } else {
      // Si no se restringen los caracteres, simplemente convierte a mayúsculas si es necesario
      setFormState({
        ...formState,
        [name]: uppercase ? value.toUpperCase() : value
      });
    }
  }


  const isSelectChange = (name: string, text: string) => {
    setFormState({
      ...formState,
      [name]: text
    })
  }
  const onFileChange = (name: string, file: File) => {
    setFormState({
      ...formState,
      [name]: file
    })
  }

  const onSwitchChange = (name: string, state: boolean) => {
    setFormState({
      ...formState,
      [name]: state
    })
  }

  const onArrayChange = (name: string, state: Array<any>) => {
    setFormState({
      ...formState,
      [name]: state
    })
  }

  const onValueChange = (name: string, state: any) => {
    setFormState({
      ...formState,
      [name]: state
    })
  }
  const onListValuesChange = (names: string[], states: any[],) => {
    // Copia el estado actual en un nuevo objeto
    const updatedFormState = { ...formState };

    // Itera sobre los nombres y estados y actualiza el objeto
    names.forEach((name, index) => {
      updatedFormState[name] = states[index];
    });

    // Establece el nuevo objeto actualizado como el estado
    setFormState(updatedFormState);
  }



  const onResetForm = () => {
    setFormState(initialForm);
  }

  const createValidators = () => {
    const formCheckedValues: any = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  }



  return {
    ...formState,
    formState,
    setFormState,
    onInputChange,
    isSelectChange,
    onFileChange,
    onSwitchChange,
    onArrayChange,
    onValueChange,
    onListValuesChange,
    onResetForm,

    ...formValidation,
    isFormValid
  }
}