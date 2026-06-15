from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

# =========================
# INDEX (MENU UTAMA)
# =========================
@app.route('/')
def index():
    return render_template('index.html')


# =========================
# REX1 PAGE
# =========================
@app.route('/rex1')
def rex1():
    return render_template('rex1.html')


# =========================
# REX2 PAGE
# =========================
@app.route('/rex2')
def rex2():
    return render_template('rex2.html')


# =========================
# FILE ACCESS REX1
# =========================
@app.route('/rex1/<path:filename>')
def rex1_static(filename):
    return send_from_directory('rex1', filename)


# =========================
# FILE ACCESS REX2
# =========================
@app.route('/rex2/<path:filename>')
def rex2_static(filename):
    return send_from_directory('rex2', filename)


# =========================
# RUN APP
# =========================
if __name__ == '__main__':
    app.run(debug=True)
