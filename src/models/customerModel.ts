import { TypeCustomerModel } from ".";

/* CUSTOMER MODEL */
export interface CustomerModel {
    id: number;
    ci: string;
    name: string;
    last_name: string;
    email: string;
    phone: number;
    customer_type: TypeCustomerModel
}

/* FORM CUSTOMER MODEL */
export interface FormCustomerModel {
    name: string;
    lastName: string;
    ci: string;
    phone: string;
    typeCustomer: TypeCustomerModel | null;
}

/*FORM CUSTOMER MODEL VALIDATIONS */
export interface FormCustomerValidations {
    name: [(value: string) => boolean, string];
    lastName: [(value: string) => boolean, string];
    ci: [(value: string) => boolean, string];
    phone: [(value: string) => boolean, string];
    typeCustomer: [(value: TypeCustomerModel) => boolean, string];
}