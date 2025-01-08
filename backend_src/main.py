from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("EXCHANGE_API_KEY")

app = FastAPI()

origins = [
    "http://localhost:4200",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],    # Allows all methods like GET, POST, etc.
    allow_headers=["*"],    # Allows all headers
)


@app.get("/api/get-exchange-rates")
async def get_exchange_rates(baseCurrency: str):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API Key is missing")
    try:
        url = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/{baseCurrency}"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            data = response.json()
        if "conversion_rates" not in data:
            raise HTTPException(status_code=500, detail="Invalid response structure")
        return data
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=500, detail=f"Error fetching exchange rates: {str(e)}"
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=500, detail=f"Error making the request: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
