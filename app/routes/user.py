from fastapi import APIRouter, Depends
from bson import ObjectId
from app.database.configuration import users_collection, transactions_collection
from app.core.deps import get_current_user
from app.utils.serializer import transactions_serializer

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/profile")
def profile(user=Depends(get_current_user)):
    user_doc = users_collection.find_one({"_id": ObjectId(user["user_id"])})
    txs = list(transactions_collection.find({"user_id": user["user_id"]}))

    return {
        "user": {
            "id": str(user_doc["_id"]),
            "name": user_doc["name"],
            "email": user_doc["email"],
            "profile": user_doc.get("profile"),
            "total_amount": user_doc.get("total_amount", 0)
        },
        "transactions": transactions_serializer(txs)
    }
