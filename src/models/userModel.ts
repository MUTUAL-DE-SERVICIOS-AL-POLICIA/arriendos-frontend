/* USER MODEL */
export interface UserModel {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}

/* FORM USER MODEL */
export interface FormUserModel {
    username: string;
}

/*FORM USER MODEL VALIDATIONS */
export interface FormUserValidations {
    username: [(value: string) => boolean, string];
}