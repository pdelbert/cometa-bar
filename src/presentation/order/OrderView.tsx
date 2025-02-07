import statics from '../../constants';
import { IStock } from '../../entities/stock'
import { Title, Image, Button, ListItems, OrderItem } from '../../components/index'

interface OrderViewProps {
    stock: IStock[];
    handlerCreateOrder: () => void
}

const OrderView = ({ stock, handlerCreateOrder }: OrderViewProps) => {
    return (
        <>
            <Image width={200} className={"logocometa"} src={statics.COMETA_LOGO} />
            <Title title={statics.INIT_LABEL} />
            <ListItems items={stock} Children={OrderItem} />
            <Button text={statics.CREATE_ORDER} handlerEvent={handlerCreateOrder} />
        </>
    )
}

export default OrderView