export interface IStock {
    id: number
    name: string
    price: number
    quantity: number
}

export interface IRoundItems {
    name: string
    quantity: number
}

export interface IStockRepository {
    getAllStocks(): Promise<IStock[]>
}