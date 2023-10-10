import { RequirementModel, TypeCustomerModel } from ".";

/* RATE MODEL */
export interface RateModel {
    id: number;
    name: string;
    customer_type: TypeCustomerModel[];
    requirements: RequirementModel[]
}

/* FORM RATE MODEL */
export interface FormRateModel {
    rate: string;
    customer_type: TypeCustomerModel[] | [];
    requirement: RequirementModel[] | [];
}

/*FORM RATE MODEL VALIDATIONS */
export interface FormRateValidations {
    rate: [(value: string) => boolean, string];
    customer_type: [(value: TypeCustomerModel[]) => boolean, string];
    requirement: [(value: RequirementModel[]) => boolean, string];
}