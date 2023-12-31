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
    degree: string;
    name: string;
    ci_nit: string;
    phones: string[];
    nup: number | null;
}

/*FORM CUSTOMER MODEL VALIDATIONS */
export interface FormContactValidations {
    name: [(value: string) => boolean, string];
    ci_nit: [(value: string) => boolean, string];
    phones: [(value: string[]) => boolean, string];
}