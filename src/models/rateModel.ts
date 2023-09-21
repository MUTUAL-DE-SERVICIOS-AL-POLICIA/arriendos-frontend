
/* RATE MODEL */
export interface RateModel {
    id: number;
    name: string;
    customer_type: Array<string>;
    requirements: Array<string>
}

/* FORM RATE MODEL */
export interface FormRateModel {
    name: string;
}

/*FORM RATE MODEL VALIDATIONS */
export interface FormRateValidations {
    name: [(value: string) => boolean, string];
}