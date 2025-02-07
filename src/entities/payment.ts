export interface IRoundItems {
    name: string
    quantity: number
}

export interface IPaymentItems {
    name: string
    price_per_unit: number
    total: number
}

export interface IPayment {
    id: string
    paid: boolean
    subtotal: number
    taxes: number
    total: number
    discounts: number
    totalOrder: IPaymentItems[]
    detail?: string
    created: string
}

export interface IPaymentRepository {
    getCheck():Promise<IPayment>
    paymentCheck(items:IRoundItems[]): Promise<IPayment>
}