import openai
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# Load API key from .env file
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Function to interact with OpenAI API
def get_finance_response(user_query):
    try:
        response = openai.ChatCompletion.create(
            model="text-davinci-002",
            messages=[
                {"role": "system", "content": "You are a helpful finance assistant. You answer finance-related questions."},
                {"role": "user", "content": user_query}
            ],
            max_tokens=200
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        return f"Error: {str(e)}"

# Route to serve the chatbot API
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_query = data.get("message")
    if not user_query:
        return jsonify({"error": "No message provided"}), 400

    response = get_finance_response(user_query)
    return jsonify({"response": response})



# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
