# Synapse

Synapse is a modern, full-stack web application designed to transform lengthy meeting transcripts into clear, concise, and actionable summaries. Powered by AI, it allows users to paste raw text, provide custom instructions, and receive a well-structured summary in seconds.

### Key Features

* **AI-Powered Summarization**: Leverages the Gemini API to understand context and generate high-quality summaries based on custom prompts.
* **Sleek, Modern UI**: A beautiful and intuitive dark-themed interface built with a "glassmorphism" design for a professional user experience.
* **Interactive Audio Playback**: Listen to the generated summary with integrated text-to-speech that includes play, pause, resume, and restart controls.
* **Editable & Sharable**: The generated summary is fully editable and can be easily shared via the user's default email client with a single click.

## Architecture

The application follows a simple client-server architecture. The frontend is a static web page that communicates with a backend API. The backend handles the business logic and securely interacts with the external AI service.

1.  The **Frontend** captures the user's transcript and instructions and sends them as a `POST` request to the backend.
2.  The **Backend Server** receives the request, constructs a detailed prompt, and securely calls the external Gemini API.
3.  The **Gemini API** processes the request and returns the generated summary.
4.  The **Backend** sends the summary back to the frontend, which then displays it to the user.

<img width="266" height="280" alt="image" src="https://github.com/user-attachments/assets/0085cd49-ed82-47d8-a1ef-7cb74e0dff70" />

## How to Run This Project Locally

To set up and run this project on your local machine, you will need to run the frontend and backend servers separately.

### Prerequisites
* [Node.js](https://nodejs.org/en/) (v18 or later recommended)
* npm (usually comes with Node.js)
* A Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install the required dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a new file named `.env` in the `backend` directory.

4.  **Add your API key to the `.env` file:**
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    Replace `YOUR_API_KEY_HERE` with your actual key.

5.  **Start the backend server:**
    ```bash
    node server.js
    ```
    The server will start running on `http://localhost:3000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    From the root project folder, open the `frontend` directory.

2.  **Open `index.html`:**
    Simply open the `index.html` file in your web browser. You can usually do this by double-clicking the file.

The application should now be fully functional on your local machine, with the frontend communicating with your local backend server.
