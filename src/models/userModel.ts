import { UserLdapModel } from "./userLdapModel";

/* USER MODEL */
export interface UserModel {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
}

/* FORM USER MODEL */
export interface FormUserModel {
    user: UserLdapModel | null;
}

/*FORM USER MODEL VALIDATIONS */
export interface FormUserValidations {
    user: [(value: UserLdapModel) => boolean, string];
}