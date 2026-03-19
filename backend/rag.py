import os
import requests
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
CANLII_API_KEY = os.getenv("CANLII_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("Missing GROQ_API_KEY")

if not CANLII_API_KEY:
    raise ValueError("Missing CANLII_API_KEY")

llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model_name="llama-3.3-70b-versatile"
)

PROVINCE_COLLECTION_MAP = {
    "ontario": "on",
    "alberta": "ab",
    "british columbia": "bc",
    "manitoba": "mb",
    "new brunswick": "nb",
    "newfoundland and labrador": "nl",
    "nova scotia": "ns",
    "prince edward island": "pe",
    "quebec": "qc",
    "saskatchewan": "sk",
    "canada": "ca",
    "federal": "ca",
}

def normalize_province(province: str) -> str:
    return PROVINCE_COLLECTION_MAP.get(province.strip().lower(), "ca")

def get_canlii_metadata(province: str, question: str) -> str:
    """
    Fetches CanLII metadata.
    This is a starter function. Since CanLII API access is metadata-limited,
    we use it to gather collection-level context instead of full legal text.
    """
    jurisdiction = normalize_province(province)

    # Starter endpoint pattern — adjust this to the exact CanLII endpoint
    # you are using from their API docs.
    url = f"https://api.canlii.org/v1/caseBrowse/en/{jurisdiction}"

    headers = {
        "Authorization": f"Bearer {CANLII_API_KEY}",
        "Accept": "application/json",
    }

    try:
        response = requests.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        data = response.json()

        # Keep the metadata lightweight for now
        # Adjust these fields based on actual response structure
        if isinstance(data, dict):
            return str(data)[:2000]

        return "CanLII metadata retrieved, but response format was unexpected."

    except requests.RequestException as e:
        return f"Could not retrieve CanLII metadata: {str(e)}"

def answer_question(question: str, province: str) -> str:
    canlii_context = get_canlii_metadata(province, question)

    prompt = PromptTemplate(
        input_variables=["province", "question", "canlii_context"],
        template="""You are HosLaw, a Canadian legal information assistant.

The user is located in {province}.

Use the CanLII metadata/context below when it is relevant. If the metadata is limited or insufficient, be honest about that. Do not invent statutes, case names, or legal conclusions.

CanLII context:
{canlii_context}

Answer the user's question clearly in plain English.
If you mention a law, statute, or legal principle, be careful and say when you are uncertain.
End every response with exactly:
"This is general legal information, not legal advice. Please consult a licensed lawyer for your specific situation."

Question: {question}

Answer:"""
    )

    chain = prompt | llm
    response = chain.invoke({
        "province": province,
        "question": question,
        "canlii_context": canlii_context
    })
    return response.content
