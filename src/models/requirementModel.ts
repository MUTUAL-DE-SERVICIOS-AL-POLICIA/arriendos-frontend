/* REQUIREMENT MODEL */
export interface RequirementModel {
    id: number;
    requirement_name: string;
}

/* FORM REQUIREMENT MODEL */
export interface FormRequirementModel {
    requirement_name: string;
}

/*FORM REQUIREMENT MODEL VALIDATIONS */
export interface FormRequirementValidations {
    requirement_name: [(value: string) => boolean, string];
}