import { ComponentInput, ComponentInputSelect, ModalSelectComponent } from "@/components";
import { ComponentImage } from "@/components/Image";
import { useForm, usePropertieStore } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { FormPropertieModel, FormPropertieValidations, PropertieModel } from '@/models';
import { isFile } from "@/helpers";
import noimage from "@/assets/images/no-image.webp";
import { DepartamentTable } from "./DepartamentTable";

interface CreatePropertieProps {
  open: boolean;
  handleClose: () => void;
  propertie: PropertieModel | null;
}

const formFields: FormPropertieModel = {
  name: '',
  photo: null
};

const formValidations: FormPropertieValidations = {
  name: [(value) => value.length >= 1, 'Debe ingresar un nombre'],
  photo: [(value) => isFile("image/jpeg, image/png, image/gif", value), 'Debe seleccionar una imagen'],
};

const departaments = [
  {id: 0, name: 'LA PAZ'},
  {id: 1, name: 'ORURO'},
  {id: 2, name: 'SANTA CRUZ'},
  {id: 3, name: 'POTOSÍ'},
  {id: 4, name: 'COCHABAMBA'},
  {id: 5, name: 'CHUQUISACA'},
  {id: 6, name: 'BENI'},
  {id: 7, name: 'TARIJA'},
  {id: 8, name: 'PANDO'},
]

export const CreatePropertie = (props: CreatePropertieProps) => {
  const {
    open,
    handleClose,
    propertie,
  } = props;
  const { postCreatePropertie, patchUpdatePropertie } = usePropertieStore();
  const [newImage, setNewImage] = useState<string>(noimage)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modal, setModal] = useState(false)
  useEffect(() => {
    if (propertie != null) setNewImage(propertie.photo)
  }, [propertie])


  const {
    name, direction,
    photo, departament, onValueChange,
    onInputChange, onFileChange, isFormValid, onResetForm,
    nameValid, directionValid, departamentValid, photoValid } = useForm(propertie ?? formFields, formValidations);

  const sendSubmit = (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('photo', photo);
    bodyFormData.append('address', direction);
    bodyFormData.append('department', departament.name);
    if (propertie == null) {
      postCreatePropertie(bodyFormData);
    } else {
      patchUpdatePropertie(propertie.id, bodyFormData);
    }
    handleClose();
    onResetForm();
  }

  const handleSelectDepartment = (value: boolean) => {
    setModal(value)
  }

  return (
    <>
    {
      modal && <ModalSelectComponent
          stateSelect={true}
          stateMultiple={false}
          title='Departamentos'
          opendrawer={modal}
          handleDrawer={handleSelectDepartment}
      >
        <DepartamentTable
          data={departaments}
          stateSelect={true}
          itemSelect={ (v) => {
            if(departament == null || departament.id != v.id) {
              onValueChange('departament', v)
              handleSelectDepartment(false)
            }
          }}
          items={departament == null ? [] : [departament.id]}
        />
      </ModalSelectComponent>
    }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{propertie == null ? 'Nuevo Inmueble' : `${propertie.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12} sm={12} sx={{padding: '5px'}}>
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
                <Grid item xs={12} sm={12} sx={{padding: '5px'}}>
                  <ComponentInput
                      type="text"
                      label="Dirección"
                      name="direction"
                      value={direction}
                      onChange={onInputChange}
                      error={!!directionValid && formSubmitted}
                      helperText={formSubmitted ? directionValid : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={{padding: '7px'}}>
                  <ComponentInputSelect
                    label="Departamentos"
                    title={departament != null ? `${departament.name}` : 'Departamento'}
                    onPressed={handleSelectDepartment}
                    error={!!departamentValid && formSubmitted}
                    helperText={formSubmitted ? departamentValid : ''}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
                <ComponentImage
                  onChange={(file: File) => {
                    onFileChange("photo", file);
                    setNewImage(URL.createObjectURL(file))
                  }}
                  fileImage={newImage}
                  accept={"image/png, image/gif, image/jpeg"}
                  error={!!photoValid && formSubmitted}
                  helperText={formSubmitted ? photoValid : ''}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">
              {propertie == null ? 'CREAR' : 'EDITAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
