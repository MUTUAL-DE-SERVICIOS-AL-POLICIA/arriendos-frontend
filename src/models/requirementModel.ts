/* REQUIREMENT MODEL */
export interface RequirementModel {
    id: number;
    requirement_name: string;
}

/* FORM REQUIREMENT MODEL */
export interface FormRequirementModel {
    name: string;
}

/*FORM REQUIREMENT MODEL VALIDATIONS */
export interface FormRequirementValidations {
    name: [(value: string) => boolean, string];
}