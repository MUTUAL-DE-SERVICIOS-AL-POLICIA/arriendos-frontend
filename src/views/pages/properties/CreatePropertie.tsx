import { ComponentInput, ComponentInputSelect, ModalSelectComponent } from "@/components";
import { ComponentImage } from "@/components/Image";
import { useForm, usePropertieStore } from "@/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { DepartmentModel, FormPropertieModel, FormPropertieValidations, PropertieModel, listDepartments } from '@/models';
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
  photo: null,
  address: '',
  department: null,
};




export const CreatePropertie = (props: CreatePropertieProps) => {
  const {
    open,
    handleClose,
    propertie,
  } = props;

  const formValidations: FormPropertieValidations = {
    name: [(value: string) => value.length >= 1, 'Debe ingresar un nombre'],
    photo: [(value) => propertie == null ? isFile("image/jpeg, image/png, image/gif", value) : true, 'Debe seleccionar una imagen'],
    address: [(value: string) => value.length >= 1, 'Debe ingresar una dirección'],
    department: [(value: DepartmentModel) => value != null, 'Debe ingresar un departamento'],
  };

  const { postCreatePropertie, patchUpdatePropertie } = usePropertieStore();
  const [newImage, setNewImage] = useState<string>(noimage)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modal, setModal] = useState(false);

  const {
    name, photo, address, department,
    onValueChange,
    onInputChange, onFileChange, isFormValid, onResetForm,
    nameValid, addressValid, departmentValid, photoValid } = useForm(propertie ?? formFields, formValidations);

  useEffect(() => {
    if (propertie != null) {
      setNewImage(propertie.photo);
      const departmentSelect = listDepartments.find((item: DepartmentModel) => item.name === propertie.department)
      onValueChange('department', departmentSelect)
    }
  }, [propertie])



  const sendSubmit = (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    var bodyFormData = new FormData();
    bodyFormData.append('name', name);
    if (propertie == null || isFile("image/jpeg, image/png, image/gif", photo)) bodyFormData.append('photo', photo);
    bodyFormData.append('address', address);
    bodyFormData.append('department', department.name);
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
            data={listDepartments}
            stateSelect={true}
            itemSelect={(v) => {
              if (department == null || department.id != v.id) {
                onValueChange('department', v)
                handleSelectDepartment(false)
              }
            }}
            items={department == null ? [] : [department.id]}
          />
        </ModalSelectComponent>
      }
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{propertie == null ? 'Nuevo Inmueble' : `${propertie.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                  <ComponentInput
                    type="text"
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={(V: any) => onInputChange(V, true)}
                    error={!!nameValid && formSubmitted}
                    helperText={formSubmitted ? nameValid : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ padding: '5px' }}>
                  <ComponentInput
                    type="text"
                    label="Dirección"
                    name="address"
                    value={address}
                    onChange={onInputChange}
                    error={!!addressValid && formSubmitted}
                    helperText={formSubmitted ? addressValid : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={{ padding: '7px' }}>
                  <ComponentInputSelect
                    label={department != null ? 'Departamento' : ''}
                    title={department != null ? department.name : 'Departamento'}
                    onPressed={() => handleSelectDepartment(true)}
                    error={!!departmentValid && formSubmitted}
                    helperText={formSubmitted ? departmentValid : ''}
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
              {propertie == null ? 'CREAR' : 'GUARDAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
