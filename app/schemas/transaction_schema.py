from pydantic import BaseModel
from enum import Enum
from typing import Optional

class TransactionType(str, Enum):
    credit = "credit"
    debit = "debit"

class TransactionCreate(BaseModel):
    product_name: str
    amount: float
    transaction_type: TransactionType = TransactionType.credit

class TransactionUpdate(BaseModel):
    product_name: Optional[str]
    amount: Optional[float]
    transaction_type: Optional[TransactionType]
