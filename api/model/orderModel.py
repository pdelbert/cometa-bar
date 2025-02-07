from pydantic import BaseModel
from datetime import datetime

class beerModel(BaseModel):
    id: int
    name: str
    price: int
    quantity: int


class StockModel(BaseModel):
    id: str
    beers: list[beerModel]
    last_updated: str


class OrderItemModel(BaseModel):
    name: str
    quantity: int


class RoundModel(BaseModel):
    items: list[OrderItemModel]
    created: datetime

class ItemsModel(BaseModel): 
    name: str = ""
    price_per_unit: int = 0
    total: int = 0


class OrderModel(BaseModel):
    id: str
    paid: bool = False
    subtotal: float = 0
    taxes: float = 0
    total: float = 0
    discounts: float  = 0
    rounds: list[RoundModel] = []
    totalOrder: list[ItemsModel] = []
    created: datetime
