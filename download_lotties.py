import urllib.request
import json

files = {
    "public/lottie-epasal.json": "https://raw.githubusercontent.com/LottieFiles/free-animation-json/master/animations/lf20_UJNc2O.json",
    "public/lottie-rag.json": "https://raw.githubusercontent.com/LottieFiles/free-animation-json/master/animations/lf20_tno6cg2w.json"
}

req = urllib.request.Request(
    'https://api.github.com/search/code?q=extension:json+path:animations+repo:LottieFiles/lottie-react',
    headers={'User-Agent': 'Mozilla/5.0'}
)

try:
    with urllib.request.urlopen(req) as response:
        print("Github API works")
except Exception as e:
    print("Error:", e)
