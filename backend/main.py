from fastapi import FastAPI, HTTPException
from openai import OpenAI
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware
import os

# Initialize FastAPI app
app = FastAPI()

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, change to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Set up OpenAI model (ensure OPENAI_API_KEY is set in your environment)
os.environ["OPENAI_API_KEY"] = "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"
llm = OpenAI()

# Request model
class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]  # List of message history [{"role": "user", "content": "Hi!"}]


# Strong system prompt
SYSTEM_PROMPT = {
    "role": "system",
    "content": (
        "Your name is SpeakAI. You are an expert AI assistant specializing in English learning. "
        "You provide clear, concise, and grammatically correct explanations, helping users improve "
        "their English skills effectively. Always maintain a professional and friendly tone."
    )
}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:

         # Remove any existing system prompts from the request
        request.messages = [msg for msg in request.messages if msg["role"] != "system"]

        # Prepend the strong system prompt
        messages = [SYSTEM_PROMPT] + request.messages

        print(messages)
        
        # Call OpenAI API with the provided message history
        response = llm.chat.completions.create(
            model="gpt-4",
            messages=messages
        )

        # Get assistant's response
        assistant_reply = response.choices[0].message.content

        # Append assistant's response to chat history (excluding system prompt for frontend)
        chat_history = request.messages + [{"role": "assistant", "content": assistant_reply}]


        return {"response": assistant_reply, "chat_history": chat_history}

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))



@app.get("/")
async def root():
    return {"message": "Chat API is running"}