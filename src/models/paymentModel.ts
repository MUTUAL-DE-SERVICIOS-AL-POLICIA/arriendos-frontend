
export interface PaymentModel {
    rentalId: number;
    amount: number;
    voucherNumber: number;
    paymentDetail: string;
    amountWarraty: number;
    voucherNumberWarranty: number;
    detailWarranty: string;
}

export interface FormPaymentModel {
    amount: number;
    voucherNumber: number;
    paymentDetail: string;
    amountWarranty: number;
    voucherNumberWarranty: number;
    detailWarranty: string;
}

export interface FormPaymentValidations {
    amount: [(value: number) => boolean, string];
    voucherNumber: [(value: number) => boolean, string];
    amountWarranty: [(value: number) => boolean, string];
    voucherNumberWarranty: [(value: number) => boolean, string]
}