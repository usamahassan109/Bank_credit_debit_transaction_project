from pymongo import MongoClient

MONGO_URL = "mongodb+srv://usamahassan311_db_user:sORJeo98Eu4buhXX@cluster0.jhhjdft.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(MONGO_URL)
db = client.finance_db

users_collection = db.users
transactions_collection = db.transactions
