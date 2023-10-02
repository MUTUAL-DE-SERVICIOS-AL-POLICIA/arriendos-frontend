import { HourRangeModel, RateModel, RoomModel } from ".";

/* CUSTOMER MODEL */
export interface ProductModel {
    id: number;
    day: Array<string>;
    rate: {
        id: number;
        name: string;
    };
    room: {
        id: number;
        name: string;
        capacity: number;
        warranty: number;
        is_active: boolean;
        group: string;
        property: {
            id: number;
            name: string;
            photo: string;
        };
    };
    hour_range: {
        id: number;
        name: string;
    };
    active_price: {
        id: number;
        mount: string;
    }
}

/* FORM CUSTOMER MODEL */
export interface FormProductModel {
    day: Array<string>,
    hour_range: HourRangeModel | null,
    room: RoomModel | null,
    rate: RateModel | null,
    price_time: number,
    mount: number,
}

/*FORM CUSTOMER MODEL VALIDATIONS */
export interface FormProductValidations {
    day: [(values: string[]) => boolean, string];
    hour_range: [(value: HourRangeModel) => boolean, string];
    room: [(value: RoomModel) => boolean, string];
    rate: [(value: RateModel) => boolean, string];
    price_time: [(values: number) => boolean, string];
    mount: [(values: number) => boolean, string];
}