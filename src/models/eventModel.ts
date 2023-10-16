
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
  startTime: Date | null;
  endTime: Date | null;
}

/*FORM EVENT MODEL VALIDATIONS */
export interface FormEventValidations {
  typeEvent: [(value: string) => boolean, string];
  startTime: [(value: Date) => boolean, string];
}