from typing import List
from fastapi import APIRouter, HTTPException
from model.orderModel import OrderModel, beerModel, RoundModel, OrderItemModel, ItemsModel
from stock import stock
import datetime
from uuid import uuid4 as uuid

router = APIRouter()

newOrder = OrderModel(
    id= str(uuid()),
    paid=False,
    subtotal = 0,
    taxes = 0,
    discounts = 0,
    rounds= [],
    created=datetime.datetime.now()
)

totalOrder = OrderModel(
    id = str(uuid()),
    paid=False,
    subtotal = 0,
    taxes = 0,
    total= 0,
    discounts = 0,
    rounds= [],
    totalOrder = [],
    created=datetime.datetime.now()
)

current_stock:list[beerModel] = stock.stock
orderItems: list[ItemsModel] = []

# Return Stock 
@router.get("/stock", tags=["Stock"]) 
async def get_stock() -> list[beerModel]:
    return current_stock

# New Round
@router.post("/new_order", tags=["Order"])
async def get_order(newItemRound: list[OrderItemModel]):

    newRound = RoundModel(
        id = str(uuid()),
        items = [],
        created = datetime.datetime.now()   
    )
    
    for newItem in newItemRound:
        matched = next((x for x in orderItems if x.name == newItem.name), None)

        if matched: 
            matched.total += newItem.quantity
        else:
            findMatched = next((x for x in current_stock if x["name"] == newItem.name), None)
            
            if findMatched == None:
                raise HTTPException(status_code=404, detail="Item not found")
            else:
                orderItems.append(
                    ItemsModel(
                        name=newItem.name, 
                        price_per_unit=findMatched['price'],
                        total=newItem.quantity
                    )
                )
   
    for newItem in newItemRound:
        newRound.items.append(newItem)

    newOrder.rounds.append(newRound)

    return newOrder

# Get Order
@router.get("/item", tags=["Item"])
async def get_order():
    return orderItems

# Total Order
@router.get("/total_order", tags=["Total Order"])
async def get_total_order():
    if len(orderItems) == 0:
        raise HTTPException(status_code=404, detail="No items")
    else:
        # Reset total order
        totalOrder.taxes = 0
        totalOrder.rounds = []
        totalOrder.discounts = 0
        totalOrder.total = 0
        totalOrder.subtotal = 0
        totalOrder.created = datetime.datetime.now()
        
        # Add items per round.
       # totalOrder.rounds.append(orderItems)
        totalOrder.totalOrder  = orderItems

        for item in orderItems:
            totalOrder.subtotal += item.price_per_unit * item.total

        totalOrder.taxes = totalOrder.subtotal * 0.19
        totalOrder.discounts = totalOrder.subtotal * 0.1
        totalOrder.total = totalOrder.subtotal + totalOrder.taxes - totalOrder.discounts
        
        return totalOrder


# Pay Order
@router.post("/pay_order", tags=["Pay Order"])
async def pay_order(payItems: list[OrderItemModel]):
    if len(orderItems) == 0:
        raise HTTPException(status_code=200, detail="Cuenta ya ha sido pagada")
    else:
        if totalOrder.paid == False:
            for pay in payItems:
                for item in totalOrder.totalOrder:
                    print(item.name)
                    if item.name == pay.name and item.total >= 0:
                        item.total -= pay.quantity
                        totalOrder.total -= pay.quantity * item.price_per_unit
                        if(item.total == 0):
                            totalOrder.totalOrder.remove(item)

            if len(totalOrder.totalOrder) == 0:
                totalOrder.paid = True
                raise HTTPException(status_code=200, detail="La cuenta se ha pagado de manera existosa.")
            else:  
                return totalOrder
        else:
            raise HTTPException(status_code=200, detail="Cuenta ya se encuentra pagada en su totalidad.")