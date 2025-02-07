import statics from '../constants'
import { IPayment } from '../entities/payment'

const PaymentInfo = ({ discounts, taxes, subtotal, total }: IPayment) => {
    return (
        <span className="flex flex-col w-full mb-10 mt-5 border border-gray-200 p-4 rounded-xl">
            <span className="flex justify-between border-b-2 border-b-gray-100 pb-2">
                <b>{statics.PAYMENT_DISCOUNT}:</b>
                <h4>${discounts}</h4>
            </span>

            <span className="flex justify-between border-b-2 border-b-gray-100 pb-2 pt-2">
                <b>{statics.PAYMENT_TAXES}:</b>
                <h4>${taxes}</h4>
            </span>

            <span className="flex justify-between border-b-2 border-b-gray-100 pb-2 pt-2">
                <b>{statics.PAYMENT_SUBTOTAL}:</b>
                <h4>${subtotal}</h4>
            </span>

            <span className="flex justify-between border-b-gray-100 pt-2">
                <b>{statics.PAYMENT_TOTAL}:</b>
                <h4><b>${parseFloat(String(total)).toFixed(2)}</b></h4>
            </span>
        </span>
    )
}

export default PaymentInfo