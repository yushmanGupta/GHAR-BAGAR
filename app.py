from flask import Flask, render_template, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load the model
model = pickle.load(open('home_price_prediction/model/banglore_home_prices_model.pickle', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json(force=True)
    bhk = int(data['bhk'])
    bathrooms = int(data['bathrooms'])
    location = data['location']

    # Prepare input for prediction
    input_data = np.array([[bhk, bathrooms, location]])
    prediction = model.predict(input_data)
    estimated_price = prediction[0]

    return jsonify({'estimated_price': estimated_price})

if __name__ == "__main__":
    app.run(debug=True)
