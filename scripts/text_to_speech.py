import requests

url = "https://text-to-speech-demo.ng.bluemix.net/api/v3/synthesize"
while True:
    message = input("message: ")
    filename = input("save as: ")
    if filename == "exit":
        break
    params = {
        "text": message,
        "voice": "en-US_AllisonV3Voice",
        "download": "true",
        "accept": "audio/mp3",
    }
    audio = requests.get(url, params=params)
    with open(filename, "wb") as f:
        f.write(audio.content)
