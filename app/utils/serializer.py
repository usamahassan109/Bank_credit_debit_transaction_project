def user_serializer(user):
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "profile": user.get("profile"),
        "total_amount": user.get("total_amount", 0)
    }

def transaction_serializer(tx):
    return {
        "id": str(tx["_id"]),
        "product_name": tx["product_name"],
        "amount": tx["amount"],
        "transaction_type": tx.get("transaction_type", "credit")
    }

def transactions_serializer(transactions):
    return [transaction_serializer(tx) for tx in transactions]
