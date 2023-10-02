/* HOUR RANGE MODEL */
export interface HourRangeModel {
    id: number;
    name: string;
}
/* FORM HOUR RANGE MODEL */
export interface FormHourRangeModel {
    name: string;
}

/*FORM HOUR RANGE MODEL VALIDATIONS */
export interface FormHourRangeValidations {
    name: [(value: string) => boolean, string];
}