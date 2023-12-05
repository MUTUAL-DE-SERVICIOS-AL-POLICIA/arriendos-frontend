import { RoomModel } from ".";

/* PROPERTIE MODEL */
export interface PropertieModel {
  id: number;
  name: string;
  photo: string;
  address: string;
  department: string;
  rooms: Array<RoomModel>;
}



/* FORM PROPERTIE MODEL */
export interface FormPropertieModel {
  name: string;
  photo: File | null;
  address: string;
  department: DepartmentModel | null;
}

/*FORM PROPERTIE MODEL VALIDATIONS */
export interface FormPropertieValidations {
  name: [(value: string) => boolean, string];
  photo: [(value: File) => boolean, string];
  address: [(value: string) => boolean, string];
  department: [(value: DepartmentModel) => boolean, string];
}

/* DEPARTMENT MODEL */
export interface DepartmentModel {
  id: number;
  name: string;
}

export const listDepartments: DepartmentModel[] = [
  { id: 0, name: 'LA PAZ' },
  { id: 1, name: 'ORURO' },
  { id: 2, name: 'SANTA CRUZ' },
  { id: 3, name: 'POTOSÍ' },
  { id: 4, name: 'COCHABAMBA' },
  { id: 5, name: 'CHUQUISACA' },
  { id: 6, name: 'BENI' },
  { id: 7, name: 'TARIJA' },
  { id: 8, name: 'PANDO' },
];