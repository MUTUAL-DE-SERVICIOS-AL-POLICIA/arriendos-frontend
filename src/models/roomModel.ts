/* Sub Eviroment MODEL */
export interface SubRooms {
    id: number;
    name: string;
    state: string;
    quantity: number;
    room: number;
    is_active: boolean;
}

/* Room MODEL */
export interface RoomModel {
    id: number;
    is_active: boolean;
    name: string;
    capacity: number;
    warranty: number;
    property: number;
    sub_rooms: SubRooms[];
}


/* FORM Room MODEL */
export interface FormRoomModel {
    name: string;
    is_active: boolean;
    capacity: number;
    warranty: number;
    property: number;
}

/* FORM Room MODEL VALIDATIONS */
export interface FormRoomValidations {
    name: [(value: string) => boolean, string];
    capacity: [(value: number) => boolean, string];
    warranty: [(value: number) => boolean, string];
}

/* FORM SUB_ROOM MODEL */
export interface FormSubRoomModel {
    name: string;
    state: string;
    quantity: number;
}

/* FORM SUB_ROOM MODEL VALIDATIONS */
export interface FormSubRoomValidations {
    name: [(value: string) => boolean, string];
    state: [(value: string) => boolean, string];
    quantity: [(value: number) => boolean, string];
}