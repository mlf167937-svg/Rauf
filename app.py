from flask import Flask, render_template
import os

app = Flask(__name__)

BASE = os.path.dirname(os.path.abspath(__file__))
STATIC = os.path.join(BASE, "static")

def read_txt(name):
    try:
        with open(os.path.join(STATIC, name), "r", encoding="utf-8") as f:
            return f.read()
    except:
        return ""

@app.route("/")
def home():
    data = [
        {
            "title": "History 1",
            "img": "history1.jpg",
            "text": read_txt("history1.txt")
        },
        {
            "title": "History 2",
            "img": "history2.jpg",
            "text": read_txt("history2.txt")
        },
        {
            "title": "History 3",
            "img": "history3.jpg",
            "text": read_txt("history3.txt")
        }
    ]
    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
