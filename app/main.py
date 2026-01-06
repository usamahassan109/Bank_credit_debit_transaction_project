from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.transaction import router as transaction_router
from app.routes.user import router as user_router

app = FastAPI(title="Finance Backend API")

app.include_router(auth_router)
app.include_router(transaction_router)
app.include_router(user_router)
