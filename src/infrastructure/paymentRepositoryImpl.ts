import { IPayment, IPaymentRepository } from "../entities/payment";
import { IRoundItems } from "../entities/payment";

const paymentRepositoryImpl = (): IPaymentRepository => ({

    getCheck: async():Promise<IPayment> => {
        const REQUEST_URL = `${import.meta.env.VITE_API_URL}/total_order`;
        const stock = await fetch(REQUEST_URL);
        const stocks = await stock.json();
        return stocks;
    },
    
    paymentCheck: async (items: IRoundItems[]): Promise<IPayment> => {

    const REQUEST_URL = `${import.meta.env.VITE_API_URL}/pay_order`;
    const rawResponse = await fetch(REQUEST_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(items)
    });

    const response = await rawResponse.json();
    return response;

  }
})

export default paymentRepositoryImpl;
