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
}

/*FORM PROPERTIE MODEL VALIDATIONS */
export interface FormPropertieValidations {
    name: [(value: string) => boolean, string];
    photo: [(value: File) => boolean, string];
}