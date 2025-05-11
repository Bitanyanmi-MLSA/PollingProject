# Polling Web App with Flask Backend

This project is a polling web application with a Python Flask backend to handle votes and results.

## Frontend
The frontend is built using HTML, CSS, and JavaScript. It allows users to vote for their favorite candidate and view the results.

## Backend
The backend is implemented using Flask and provides the following endpoints:

- `GET /poll`: Fetch the poll question, options, and current votes.
- `POST /vote`: Submit a vote for a specific option.
- `GET /results`: Fetch the poll results.

## Running the Backend

1. Install Flask:
   ```bash
   pip install flask
   ```

2. Run the Flask app:
   ```bash
   python app.py
   ```

3. The backend will be available at `http://127.0.0.1:5000`.

## Integrating Frontend and Backend

Update the frontend JavaScript to interact with the backend endpoints using `fetch` or `axios` for:
- Fetching poll data (`GET /poll`)
- Submitting votes (`POST /vote`)
- Fetching results (`GET /results`)

## Deployment
You can deploy the backend using platforms like Heroku, AWS, or PythonAnywhere.