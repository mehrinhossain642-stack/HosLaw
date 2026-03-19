from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import answer_question

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    question: str
    province: str

@app.post("/ask")
async def ask(query: Query):
    answer = answer_question(query.question, query.province)
    return {"answer": answer, "province": query.province}

@app.get("/")
def root():
    return {"message": "HosLaw API is running"}
