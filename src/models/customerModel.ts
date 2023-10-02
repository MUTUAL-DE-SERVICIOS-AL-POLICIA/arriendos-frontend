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
    typeCustomer: TypeCustomerModel | null;
    name_institution: string;
    nit_institution: string;
}

/*FORM CUSTOMER MODEL VALIDATIONS */
export interface FormCustomerValidations {
    typeCustomer: [(value: TypeCustomerModel) => boolean, string];
    name_institution: [(value: string) => boolean, string];
    nit_institution: [(value: string) => boolean, string];
}