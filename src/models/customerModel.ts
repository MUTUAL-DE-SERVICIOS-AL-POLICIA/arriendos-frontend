import { ContactModel, TypeCustomerModel } from ".";

/* CUSTOMER MODEL */
export interface CustomerModel {
    id: number;
    customer_type: TypeCustomerModel;
    contacts: ContactModel[];
    institution_name: string | null;
    nit: string | null;
}

/* FORM CUSTOMER MODEL */
export interface FormCustomerModel {
    customer_type: TypeCustomerModel | null;
    institution_name: string | null;
    nit: string | null;
}

/*FORM CUSTOMER MODEL VALIDATIONS */
export interface FormCustomerValidations {
    customer_type: [(value: TypeCustomerModel) => boolean, string];
    institution_name: [(value: string | null) => boolean, string];
    nit: [(value: string | null) => boolean, string];
}