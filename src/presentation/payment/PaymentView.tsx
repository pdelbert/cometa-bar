import { Image, Title, Button, PaymentInfo, CheckItems, ListItems } from "../../components"
import statics from "../../constants"
import { IPayment, IPaymentItems } from "../../entities/payment"

interface PaymentViewProps {
    checkData: IPayment
    orderItems: IPaymentItems[]
    handlerTotalPayment: React.MouseEventHandler<HTMLButtonElement> | undefined,
    handlerPartialPayment: React.MouseEventHandler<HTMLButtonElement> | undefined,
}

const PaymentView = ({ checkData, orderItems, handlerTotalPayment, handlerPartialPayment }: PaymentViewProps) => {
    return (
        <>
            <Image width={200} className={"logocometa"} src={statics.COMETA_LOGO} />
            <Title title={statics.PAY_TITLE} />
            <ListItems items={orderItems} Children={CheckItems} />
            <PaymentInfo {...checkData} />
            <Button text={statics.PARTIAL_PAYMENT} handlerEvent={handlerPartialPayment} />
            <Button text={statics.TOTAL_PAYMENT} handlerEvent={handlerTotalPayment} />
        </>
    )
}

export default PaymentView