from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

API_KEY = 'AIzaSyATrdGcC7iOlYf5gbcA46vj04TACvfrPSQ'
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')

@app.route('/generate-tips', methods=['POST'])
def generate_tips():
    try:
       
        data = request.json
        age = data['age']
        gender = data['gender']
        activity_level = data['activity_level']
        health_goal = data['health_goal']


        prompt = f"""
        Generate personalized health and wellness recommendations based on the following user profile:

        Age: {age} years old
        Gender: {gender}
        Activity Level: {activity_level}
        Health Goal: {health_goal}

        Please provide:
        1. A tailored daily exercise routine
        2. Specific diet recommendations
        3. 3 actionable tips for achieving the stated health goal
        4. Motivational advice

        Format the response in a clear, encouraging manner that is specific to this individual's needs and goals.
        """

        # Generate response using Gemini API
        response = model.generate_content(prompt)
        return jsonify({'success': True, 'message': response.text})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True,port=5001)
