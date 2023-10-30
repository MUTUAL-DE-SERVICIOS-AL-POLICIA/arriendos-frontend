import { CustomerModel, RoomModel } from ".";

export interface EventsCalendarModel {
    id: number;
    start: Date;
    end: Date;
    product_id: number;
    rental: number
    title: string;
}

export interface ProductRentalModel {
    id: number;
    property: string;
    room: string;
    hour_range: number;
    start_time: string;
    end_time: string;
    detail: string;
    event: string;
    rental: number;
}

/* RENTAL MODEL */
export interface RentalModel {
    customer: CustomerModel;
    products: ProductRentalModel[];
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