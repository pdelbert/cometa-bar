import { IOrderRepository, IRoundItems, IRoundsInfo } from "../entities/order";

const orderRepositoryImpl = (): IOrderRepository => ({
    createOrder: async(order:IRoundItems[]): Promise<IRoundsInfo[]> => {
        const REQUEST_URL = `${import.meta.env.VITE_API_URL}/new_order`;

        const rawResponse = await fetch(REQUEST_URL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        const response = await rawResponse.json();
        console.log(response.rounds);
        
        return response.rounds as IRoundsInfo[];
    }
});

export default orderRepositoryImpl;