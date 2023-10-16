import { ContactModel, CustomerModel, RoomModel } from ".";


/* RENTAL MODEL */
export interface RentalModel {
    end_time: Date;
    start_time: Date;
    product_id: string;
    room_id: number;
    room_name: string;
    selected_product_id: number;
    event_type_name: number;
    institution_name: string | null;
    nit: string | null;
    contacts: ContactModel[]
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