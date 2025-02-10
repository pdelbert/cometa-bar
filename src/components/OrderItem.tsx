import { useEffect, useState } from 'react';

import Button from './ui/Button';
import { IStock } from '../entities/stock'
import { Context } from '../context/OrderContext';
import statics from '../constants';

interface OrderItemProps {
    item: IStock
}

const OrderItem = ({ item }: OrderItemProps) => {
    const [orderQuantity, setOrderQuantity] = useState(0);
    const { roundOrder, addItem, removeItem } = Context();


    // Reset Quantity if Order has been created.
    useEffect(() => {
        if (!roundOrder.length) setOrderQuantity(0)
    }, [roundOrder])


    const handleAddItem = () => {
        if (orderQuantity < item.quantity) {
            setOrderQuantity(quantity => quantity + 1);
            addItem({ name: item.name, quantity: 1 })
        }
    }

    const handleRemoveItem = () => {
        if (orderQuantity > 0) {
            setOrderQuantity(quantity => quantity - 1);
            removeItem({ name: item.name, quantity: 1 })
        }
    }

    return (
        <div className='w-full h-auto mb-4 flex justify-between border-b-2 border-gray-100 pb-4 pt-2'>
            <span className='font-bold'>{item.name}</span>
            <span className='ml-10 flex justify-center items-center'>
                <Button className="bg-black rounded-xl text-white text-[18px] h-[40px] w-[40px]" text={statics.ADD} handlerEvent={handleAddItem} />
                <span className='ml-2 mr-2 h-10 w-10 flex items-center justify-center border border-gray-200'> {orderQuantity} </span>
                <Button className="bg-black rounded-xl text-white text-[18px] h-[40px] w-[40px]" text={statics.REMOVE} handlerEvent={handleRemoveItem} />
            </span>
        </div>
    )
}

export default OrderItem