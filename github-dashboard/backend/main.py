from fastapi import FastAPI
import requests
from bs4 import BeautifulSoup

app = FastAPI()

@app.get("/github")
def github_data(user: str = "deiondz"):
    url = f"https://github.com/{user}?tab=overview&from=2025-05-01&to=2025-05-30"
    headers = {'User-Agent': 'Mozilla/5.0'}
    html = requests.get(url, headers=headers).text

    soup = BeautifulSoup(html, "html.parser")
    contributions = soup.find_all("rect", class_="day")
    print(contributions[:5])  # Print first 5 contributions
    return {"contributions": contributions}
