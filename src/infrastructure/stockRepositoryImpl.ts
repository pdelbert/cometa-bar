import {IStock, IStockRepository} from '../entities/stock'

const stockRepositoryImpl = () : IStockRepository => ({
    getAllStocks: async(): Promise<IStock[]> => {
        const REQUEST_URL = `${import.meta.env.VITE_API_URL}/stock`;
        const stock = await fetch(REQUEST_URL);
        const stocks = await stock.json();
        return stocks;
    }
});

export default stockRepositoryImpl;
