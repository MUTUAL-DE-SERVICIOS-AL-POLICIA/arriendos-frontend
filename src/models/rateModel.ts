import { RequirementModel, TypeCustomerModel } from ".";

/* RATE MODEL */
export interface RateModel {
    id: number;
    name: string;
    customer_type: TypeCustomerModel[];
    requirement: RequirementModel[]
}

/* FORM RATE MODEL */
export interface FormRateModel {
    name: string;
    requirement: RequirementModel[] | [];
    customer_type: TypeCustomerModel[] | [];
}

/*FORM RATE MODEL VALIDATIONS */
export interface FormRateValidations {
    name: [(value: string) => boolean, string];
}