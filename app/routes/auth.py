from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from app.database.configuration import users_collection
from app.schemas.user_schema import UserCreate
from app.core.security import hash_password, verify_password, create_access_token
from app.utils.serializer import user_serializer

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", status_code=201)
def signup(user: UserCreate):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(400, "User already exists")

    result = users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password),
        "profile": user.profile,
        "total_amount": 0
    })

    return {
        "message": "User registered",
        "user": user_serializer(
            users_collection.find_one({"_id": result.inserted_id})
        )
    }

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_collection.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid credentials")

    token = create_access_token({"user_id": str(user["_id"])})
    return {"access_token": token, "token_type": "bearer"}
