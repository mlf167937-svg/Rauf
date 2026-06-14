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
            "title": "Chapter I",
            "img": "history1.jpg",
            "text": read_txt("history1.txt")
        },
        {
            "title": "Chapter II",
            "img": "history2.jpg",
            "text": read_txt("history2.txt")
        },
        {
            "title": "Chapter III",
            "img": "history3.jpg",
            "text": read_txt("history3.txt")
        },
        {
            "title": "Final Chapter",
            "img": "history4.jpg",
            "text": read_txt("history4.txt")
        }
    ]

    return render_template("index.html", data=data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
