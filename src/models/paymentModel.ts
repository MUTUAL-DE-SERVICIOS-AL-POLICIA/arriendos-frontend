
export interface PaymentModel {
    rentalId: number;
    amount: number;
    voucherNumber: number;
    paymentDetail: string;
}

export interface FormPaymentModel {
    amount: number;
    voucherNumber: number;
    paymentDetail: string;
}

export interface FormPaymentValidations {
    amount: [(value: number) => boolean, string];
    voucherNumber: [(value: number) => boolean, string];
}