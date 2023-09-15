/* RATE MODEL */
export interface RateModel {
    id: number;
    name: string;
    customer_type: string;
}

/* FORM RATE MODEL */
export interface FormRateModel {
    Ratename: string;
}

/*FORM RATE MODEL VALIDATIONS */
export interface FormRateValidations {
    Ratename: [(value: string) => boolean, string];
}