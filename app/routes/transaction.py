from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from app.database.configuration import transactions_collection, users_collection
from app.schemas.transaction_schema import TransactionCreate, TransactionUpdate
from app.core.deps import get_current_user
from app.utils.serializer import transaction_serializer

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.post("/add")
def add_transaction(tx: TransactionCreate, user=Depends(get_current_user)):
    balance_change = tx.amount if tx.transaction_type == "credit" else -tx.amount

    result = transactions_collection.insert_one({
        "user_id": user["user_id"],
        "product_name": tx.product_name,
        "amount": tx.amount,
        "transaction_type": tx.transaction_type
    })

    users_collection.update_one(
        {"_id": ObjectId(user["user_id"])},
        {"$inc": {"total_amount": balance_change}}
    )

    return {
        "transaction": transaction_serializer(
            transactions_collection.find_one({"_id": result.inserted_id})
        )
    }
