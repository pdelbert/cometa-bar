import { IPayment, IPaymentRepository, IRoundItems } from "../entities/payment";
import paymentRepositoryImpl from "../infrastructure/paymentRepositoryImpl";

const paymentUseCase = (): IPaymentRepository => ({
    getCheck: async():Promise<IPayment> => {
        return await paymentRepositoryImpl().getCheck();
    },
    
    paymentCheck: async(items:IRoundItems[]): Promise<IPayment> => {
        return await  paymentRepositoryImpl().paymentCheck(items);
    }
})

export default paymentUseCase;
