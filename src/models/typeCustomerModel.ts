/* TYPE CUSTOMER MODEL */
export interface TypeCustomerModel {
    id: number;
    name: string;
}

/* FORM TYPE CUSTOMER MODEL */
export interface FormTypeCustomerModel {
    name: string;
}

/*FORM TYPE CUSTOMER MODEL VALIDATIONS */
export interface FormTypeCustomerValidations {
    name: [(value: string) => boolean, string];
}