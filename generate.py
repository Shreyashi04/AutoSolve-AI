from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

load_dotenv()

os.environ["API_KEY"] = os.getenv("API_KEY")


client = genai.Client(api_key=api_key)

chat = client.chats.create(
    model='gemini-2.0-flash',
    config=types.GenerateContentConfig(
      tools=[types.Tool(
        code_execution=types.ToolCodeExecution
      )]
    )
)




response = chat.send_message("write a function to calculate bubblesort")
print(response.text)