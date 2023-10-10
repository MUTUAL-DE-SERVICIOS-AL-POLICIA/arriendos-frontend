/* HOUR RANGE MODEL */
export interface HourRangeModel {
    id: number;
    time: number;
}
/* FORM HOUR RANGE MODEL */
export interface FormHourRangeModel {
    time: number;
}

/*FORM HOUR RANGE MODEL VALIDATIONS */
export interface FormHourRangeValidations {
    time: [(value: number) => boolean, string];
}