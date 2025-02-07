import { IStock, IStockRepository } from "../entities/stock";
import stockRepositoryImpl from "../infrastructure/stockRepositoryImpl";

const stockUseCase = (): IStockRepository => ({
    getAllStocks: async(): Promise<IStock[]> => {
        return await stockRepositoryImpl().getAllStocks();
    }
})

export default stockUseCase;
