import { CustomerModel, RoomModel } from ".";

export interface EventsCalendarModel {
    id: number;
    start: Date;
    end: Date;
    product_id: number;
    rental: number
    title: string;
    name_state: string;
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

export interface RentalStateModel {
    id: number;
    name: string;
    next_state?: object[];
}














/*FORM PAYMENT */
export interface FormPayment {
    amount: number;
    voucherNumber: number;
    paymentDetail: string;
    businessName: string;
    nit: number;
}

/*FORM PAYMENT VALIDATIONS */
export interface FormPaymentValidations {
    amount: [(value: number) => boolean, string];
    voucherNumber: [(value: number) => boolean, string];
    businessName: [(value: string) => boolean, string];
    nit: [(value: number) => boolean, string]
}

/*FORM EXTRA HOUR */
export interface FormExtraHourModel {
    amount: number;
    quantity: number;
    voucherNumber: number;
    detail: string;
    eventSelect: string | number;
    businessName: string;
    nit: number;
}

/*FORM EXTRA HOUR VALIDATIONS */
export interface FormExtraHourValidations {
    quantity: [(value: number) => boolean, string];
    voucherNumber: [(value: number) => boolean, string];
    eventSelect: [(value: string) => boolean, string];
    businessName: [(value: string) => boolean, string];
    nit: [(value: number) => boolean, string]
}


/*FORM DAMAGE */
export interface FormDamageModel {
    detail: string;
    discount: number;
    eventSelect: string | number;
}

/*FORM DAMAGE VALIDATIONS */
export interface FormDamageValidations {
    detail: [(value: string) => boolean, string];
    discount: [(value: number) => boolean, string];
    eventSelect: [(value: string) => boolean, string];
}
