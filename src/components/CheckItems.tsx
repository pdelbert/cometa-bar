import { useState } from "react";
import { IPaymentItems, IRoundItems } from "../entities/payment"
import { Context } from "../context/OrderContext";

interface CheckItemsProps {
    item: IPaymentItems
}

const CheckItems = ({ item }: CheckItemsProps) => {
    const [itemQuantity, setItemQuantity] = useState(0);
    const { paymentListItems, addItemToPayment, removeItemToPayment } = Context();


    const handleAddItem = (item: IPaymentItems) => {
        if (itemQuantity < item.total) {
            const addItems: IRoundItems = { name: item.name, quantity: itemQuantity + 1 }
            setItemQuantity(quantity => quantity + 1)
            addItemToPayment(addItems);
        }
    }

    const handleRemoveItem = (item: IPaymentItems) => {
        if (itemQuantity > 0) {
            const removeItems: IRoundItems = { name: item.name, quantity: itemQuantity - 1 }
            setItemQuantity(quantity => quantity - 1)
            removeItemToPayment(removeItems);
            console.log(paymentListItems);
        }
    }

    return (
        <span className='w-full h-auto mb-4 flex justify-between border-b-2 border-b-gray-100 pb-4'>
            <span>
                <b className="text-sm">{item.total}x</b>
                <span className="text-sm"> {item.name} {item.price_per_unit}$</span>
            </span>
            <span className='ml-10 flex justify-center items-center'>
                <button className="bg-black rounded-xl text-white text-[18px] h-[40px] w-[40px]" onClick={() => handleAddItem(item)}>+</button>
                <span className='ml-2 mr-2 rounded-xl h-10 w-10 flex items-center justify-center border border-gray-200'> {itemQuantity} </span>
                <button className="bg-black rounded-xl text-white text-[18px] h-[40px] w-[40px]" onClick={() => handleRemoveItem(item)}>-</button>
            </span>
        </span>
    )
}

export default CheckItems