from flask import Flask, render_template, session, request
import os
import uuid

app = Flask(__name__)
app.secret_key = "rexcraft-love-secret-key"

BASE = os.path.dirname(os.path.abspath(__file__))
STATIC = os.path.join(BASE, "static")


# 📄 baca txt
def read_txt(file):
    try:
        with open(os.path.join(STATIC, file), "r", encoding="utf-8") as f:
            return f.read()
    except:
        return ""


# 💖 tracking setiap request
@app.before_request
def track_request():
    if "user_id" not in session:
        session["user_id"] = str(uuid.uuid4())

    user_id = session["user_id"]

    print(f"[VISIT] {user_id} -> {request.path}")


# 🌙 main page
@app.route("/")
def home():

    user_id = session.get("user_id")

    print(f"[OPEN WEB] USER = {user_id}")

    data = [
        {
            "img": "history1.jpg",
            "text": read_txt("history1.txt")
        },
        {
            "img": "history2.jpg",
            "text": read_txt("history2.txt")
        },
        {
            "img": "history3.jpg",
            "text": read_txt("history3.txt")
        },
        {
            "img": "history4.jpg",
            "text": read_txt("history4.txt")
        },
        {
            "img": None,
            "text": read_txt("history5.txt")
        }
    ]

    return render_template("index.html", data=data, user_id=user_id)


# 🔥 optional: test route
@app.route("/ping")
def ping():
    return "alive 💖"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
