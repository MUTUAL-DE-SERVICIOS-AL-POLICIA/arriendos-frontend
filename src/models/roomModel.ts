/* Sub Eviroment MODEL */
export interface SubEnvironments {
    name: string;
    state: string;
    quantity: number;
}

/* Room MODEL */
export interface RoomModel {
    id: number;
    is_active: boolean;
    name: string;
    capacity: number;
    warranty: number;
    property: number;
    sub_environments: SubEnvironments[];
}


/* FORM Room MODEL */
export interface FormRoomModel {
    name: string;
    is_active: boolean;
    capacity: number;
    warranty: number;
    property: number;
}

/*FORM Room MODEL VALIDATIONS */
export interface FormRoomValidations {
    name: [(value: string) => boolean, string];
    capacity: [(value: number) => boolean, string];
    warranty: [(value: number) => boolean, string];
}