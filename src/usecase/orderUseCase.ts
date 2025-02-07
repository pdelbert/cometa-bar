import { IOrderRepository, IRoundItems, IRoundsInfo } from "../entities/order";
import orderRepositoryImpl from "../infrastructure/orderRepositoryImpl";

const orderUseCase = (): IOrderRepository => ({
    createOrder: async(order:IRoundItems[]): Promise<IRoundsInfo[] | undefined > => {
        return await orderRepositoryImpl().createOrder(order) as IRoundsInfo[];
    }
})

export default orderUseCase;
