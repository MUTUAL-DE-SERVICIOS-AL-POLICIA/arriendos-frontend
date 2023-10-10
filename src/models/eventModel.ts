
/* EVENT MODEL */
export interface TypeEventModel {
  id: number;
  name: string;
}


export interface EventModel {

}

/* FORM EVENT MODEL */
export interface FormEventModel {
  typeEvent: string;
  detail: string;
  startTime: string;
  endTime: string;
}

/*FORM EVENT MODEL VALIDATIONS */
export interface FormEventValidations {
  typeEvent: [(value: string) => boolean, string];
  startTime: [(value: string) => boolean, string];
}