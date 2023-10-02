/* CONTACT MODEL */
export interface ContactModel {
    id: number;
    degree: string;
    name: string;
    ci_nit: string;
    phone: number;
}

/* FORM CUSTOMER MODEL */
export interface FormContactModel {
    degree: string | null;
    name: string;
    ci: string;
    phone: string;
}

/*FORM CUSTOMER MODEL VALIDATIONS */
export interface FormContactValidations {
    name: [(value: string) => boolean, string];
    ci: [(value: string) => boolean, string];
    phone: [(value: string) => boolean, string];
}