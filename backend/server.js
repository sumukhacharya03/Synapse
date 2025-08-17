const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

async function generateSummary(transcript, customPrompt) {
    const apiKey = process.env.GEMINI_API_KEY;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const prompt = `
        Transcript:
        ---
        ${transcript}
        ---

        Based on the transcript above, please perform the following task:
        ${customPrompt}
    `;

    const payload = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }]
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("API Error Response:", errorBody);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        } else {
            console.error("Unexpected API Response Structure: ", JSON.stringify(result, null, 2));
            return "Could not generate a summary from the provided text...";
        }

    } catch (error) {
        console.error('Error calling the AI Service: ', error);
        return 'Failed to generate summary due to a backend error...';
    }
}


app.post('/summarize', async (req, res) => {
    const { transcript, prompt } = req.body;

    if (!transcript || !prompt) {
        return res.status(400).json({ error: 'Transcript and Prompt are required' });
    }

    const summary = await generateSummary(transcript, prompt);

    res.json({ summary });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
