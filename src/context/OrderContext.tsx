import React, { useMemo, useState } from "react";
import { IRoundItems } from "../entities/stock";
import orderUseCase from "../usecase/orderUseCase";
import { IRoundsInfo } from "../entities/order";
import paymentUseCase from "../usecase/paymentUseCase";
import { IPayment, IPaymentItems } from "../entities/payment";

interface IOrderContext {
    roundOrder: IRoundItems[]
    roundsCreated: IRoundsInfo[] | undefined
    paymentListItems: IRoundItems[] | undefined
    totalOrderItems: IPaymentItems[]

    addItem: (item: IRoundItems) => void
    removeItem: (item: IRoundItems) => void
    createRound: () => Promise<boolean>
    getCheck: () => Promise<IPayment>
    totalPaymentCheck: () => Promise<IPayment>
    partialPaymentCheck: () => Promise<IPayment | undefined>
    addItemToPayment: (item: IRoundItems) => void
    removeItemToPayment: (item: IRoundItems) => void
}

const OrderContext = React.createContext<IOrderContext | undefined>(undefined)

const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [roundOrder, setRoundOrder] = useState<IRoundItems[]>([]);
    const [roundsCreated, setRoundsCreated] = useState<IRoundsInfo[] | undefined>(undefined)
    const [paymentListItems, setPaymentListItems] = useState<IRoundItems[] | undefined>(undefined)
    const [totalOrderItems, setTotalOrderItems] = useState<IPaymentItems[]>([])

    const addItem = (item: IRoundItems) => {
        const itemIndex = roundOrder.findIndex(elm => elm.name === item.name);

        if (itemIndex !== -1) {
            roundOrder[itemIndex].quantity += item.quantity;
            setRoundOrder([...roundOrder])
        } else {
            setRoundOrder([...roundOrder, item])
        }
    }

    const removeItem = (item: IRoundItems) => {
        const itemIndex = roundOrder.findIndex(elm => elm.name === item.name);

        if (itemIndex !== -1) {
            if (roundOrder[itemIndex].quantity > 1) {
                roundOrder[itemIndex].quantity -= item.quantity;
                setRoundOrder([...roundOrder]);
            } else {
                roundOrder.splice(itemIndex, 1);
                setRoundOrder([...roundOrder]);
            }
        }
    }

    const addItemToPayment = (item: IRoundItems) => {
        if (paymentListItems) {
            const itemIndex = paymentListItems.findIndex(elm => elm.name === item.name);

            if (itemIndex !== -1) {
                paymentListItems[itemIndex].quantity = item.quantity;
                setPaymentListItems([...paymentListItems])
            } else {
                setPaymentListItems([...paymentListItems, item])
            }

        } else { setPaymentListItems([item]) }
    }

    const removeItemToPayment = (item: IRoundItems) => {
        if (paymentListItems) {
            const itemIndex = paymentListItems.findIndex(elm => elm.name === item.name);
            paymentListItems[itemIndex].quantity = item.quantity;
            setPaymentListItems([...paymentListItems])
        }
    }

    const createRound = async () => {
        if (roundOrder.length) {
            const response = await orderUseCase().createOrder(roundOrder);
            setRoundsCreated(response);
            setRoundOrder([]);
            return true;
        }

        return false;
    }

    const getCheck = async (): Promise<IPayment> => {
        const response = await paymentUseCase().getCheck();
        setTotalOrderItems(response.totalOrder);
        return response;
    }

    const totalPaymentCheck = async (): Promise<IPayment> => {
        const formatedRound: IRoundItems[] = [];
        totalOrderItems.map(elm => formatedRound.push({ name: elm.name, quantity: elm.total }));

        const response = await paymentUseCase().paymentCheck(formatedRound);
        return response;
    }

    const partialPaymentCheck = async (): Promise<IPayment | undefined> => {
        if (paymentListItems) {
            const response = await paymentUseCase().paymentCheck(paymentListItems);
            return response;
        }
        return undefined;
    }

    const value = useMemo(() => {
        return {
            roundOrder,
            roundsCreated,
            paymentListItems,
            totalOrderItems,
            addItem,
            removeItem,
            createRound,
            getCheck,
            totalPaymentCheck,
            partialPaymentCheck,
            addItemToPayment,
            removeItemToPayment
        }
    }, [roundOrder, roundsCreated, paymentListItems, totalOrderItems])


    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

const Context = () => {
    const context = React.useContext(OrderContext);
    if (!context) throw new Error(context);
    return context;
}

export { Context, OrderProvider }