import { useState, useEffect } from 'react';
import OrderView from './OrderView'
import { IStock } from '../../entities/stock';
import stockUseCase from '../../usecase/stockUseCase';
import { Context } from '../../context/OrderContext';
import statics from '../../constants';
import { Message, Button } from '../../components';
import { useNavigate } from 'react-router';

const OrderContainer = () => {
    const [stock, useStock] = useState<IStock[]>([]);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const { roundsCreated, createRound } = Context();
    const navigate = useNavigate();

    // Get Stock.
    useEffect(() => {
        (async () => {
            const response = await stockUseCase().getAllStocks();
            useStock(response);
        })()
    }, []);


    // Display Message after create order.
    useEffect(() => {
        if (roundsCreated) {
            setShowMessage(true)
            const timer = setTimeout(() => setShowMessage(false), 2000);

            return () => clearTimeout(timer);
        }
    }, [roundsCreated])

    const handlerCreateOrder = () => createRound();
    const handlerPayOrder = () => navigate("/payment");

    return (
        <>
            <div className="border-8 bg-neutral-950 h-dvh p-10 flex justify-center items-center">
                <div className="flex flex-col items-center justify-between p-10 rounded-2xl h-auto h-min-[200px] w-[400px] text-center bg-white border-purple-700 border-1">
                    {   // Create Round View
                        stock &&
                        <OrderView stock={stock} handlerCreateOrder={handlerCreateOrder} />
                    }

                    {   // Pay Order.
                        roundsCreated &&
                        <Button text={statics.PAYMENT} handlerEvent={handlerPayOrder} />
                    }
                </div>

                {   // Display Message.
                    showMessage &&
                    <Message message={statics.MESSAGE_CREATED_ORDER} type="success" />
                }
            </div>
        </>
    )
}

export default OrderContainer