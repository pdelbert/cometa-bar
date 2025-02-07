export interface IRoundItems {
    name: string
    quantity: number
}

export interface IRoundsInfo{
    created: string,
    items: IRoundItems[]
}

export interface IOrderRepository {
    createOrder(order:IRoundItems[]): Promise<IRoundsInfo[] | undefined>
}