import { CustomerModel, RoomModel } from ".";

/* RENTAL MODEL */
export interface RentalModel {
    id: number;
    Rentalname: string;
    first_name: string;
    last_name: string;
    email: string;
}

/* FORM RENTAL MODEL */
export interface FormRentalModel {
    room: RoomModel | null;
    customer: CustomerModel | null;
}

/*FORM RENTAL MODEL VALIDATIONS */
export interface FormRentalValidations {
    room: [(value: string) => boolean, string];
}