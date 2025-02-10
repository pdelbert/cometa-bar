import { useEffect, useState } from "react";
import { Context } from "../../context/OrderContext";
import { IPayment } from "../../entities/payment";
import PaymentView from "./PaymentView";
import { Message } from "../../components";
import statics from "../../constants";
import { useNavigate } from "react-router";

interface MessageProps {
    message: string
    type: string
}

const PaymentContainer = () => {
    const [showMessage, setShowMessage] = useState<MessageProps | undefined>(undefined);
    const [checkData, setCheckData] = useState<IPayment | undefined>(undefined);
    const { getCheck, totalPaymentCheck, partialPaymentCheck } = Context();

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const checkResume = await getCheck();
            setCheckData(checkResume);
        })()
    }, [showMessage])

    // Display Message after create order.
    useEffect(() => {
        const timer = setTimeout(() => setShowMessage(undefined), 2000);
        return () => clearTimeout(timer);
    }, [showMessage])


    const handleTotalPayment = async () => {

        const response = await totalPaymentCheck();
        const message = response?.detail || statics.MEESAGE_PAYMENT_SUCCESS
        setShowMessage({ message: message, type: 'success' })
        setTimeout(() => { navigate("/") }, statics.TIMER);
    }

    const handlerPartialPayment = async () => {
        const response = await partialPaymentCheck();
        const message = response?.detail || statics.MEESAGE_PAYMENT_SUCCESS

        setShowMessage({ message: message, type: 'success' });

        (checkData && checkData.detail === statics.NO_ITEMS)
            ? setTimeout(() => { navigate("/") }, statics.TIMER)
            : setTimeout(() => { navigate("/payment") }, statics.TIMER);
    }


    return (
        <>
            {
                checkData &&
                <div className="border-8 bg-neutral-950 h-dvh p-10 flex justify-center items-center">
                    <div className="flex flex-col items-center justify-between p-10 rounded-2xl h-min-[200px] w-[450px] text-center bg-white border-purple-700 border-1">
                        <PaymentView
                            checkData={checkData}
                            orderItems={checkData.totalOrder}
                            handlerTotalPayment={handleTotalPayment}
                            handlerPartialPayment={handlerPartialPayment}
                        />
                    </div>
                </div>
            }

            {   // Display Message.
                showMessage &&
                <Message message={showMessage.message} type={showMessage.type} />
            }
        </>
    )
}

export default PaymentContainer