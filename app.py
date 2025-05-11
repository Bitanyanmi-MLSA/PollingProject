from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

# In-memory storage for poll data
poll_data = {
    "question": "Who is your favorite candidate?",
    "options": ["Prince", "Benard", "Diego", "Justice"],
    "votes": [0, 0, 0, 0]
}

@app.route("/poll", methods=["GET"])
def get_poll():
    return jsonify(poll_data)

@app.route("/vote", methods=["POST"])
def vote():
    data = request.json
    option_index = data.get("option_index")
    if option_index is not None and 0 <= option_index < len(poll_data["votes"]):
        poll_data["votes"][option_index] += 1
        return jsonify({"message": "Vote recorded successfully."}), 200
    return jsonify({"error": "Invalid option index."}), 400

@app.route("/results", methods=["GET"])
def get_results():
    return jsonify(poll_data)

@app.route("/")
def serve_index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(".", path)

if __name__ == "__main__":
    app.run(debug=True)
