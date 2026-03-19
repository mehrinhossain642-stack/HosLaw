import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

load_dotenv()

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model_name="llama-3.3-70b-versatile"
)

def answer_question(question: str, province: str) -> str:
    prompt = PromptTemplate(
        input_variables=["province", "question"],
        template="""You are HosLaw, a Canadian legal information assistant.
The user is located in {province}.

Answer their question clearly in plain English.
Always mention the relevant Canadian law or statute if you know it.
End every response with: "This is general legal information, not legal advice. Please consult a licensed lawyer for your specific situation."

Question: {question}

Answer:"""
    )

    chain = prompt | llm
    response = chain.invoke({"province": province, "question": question})
    return response.content