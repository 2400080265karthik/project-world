const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/project-assistant", async (req, res) => {

    try {

        const userMessage = req.body.message;

        if (!userMessage || !userMessage.trim()) {
            return res.status(400).json({
                error: "Message is required."
            });
        }

        const response = await client.responses.create({

            model: "gpt-6-luna",

            instructions: `
You are the Project World AI Project Assistant.

Your job is to help college students choose project ideas.

Suggest project ideas beyond the projects already displayed on the Project World website.

Understand natural language requests such as:
- AI projects
- machine learning projects
- web projects
- app projects
- cyber security projects
- IoT projects
- data science projects
- easy projects
- intermediate projects
- advanced projects
- final year projects
- unique projects
- projects under a specific budget

When recommending projects, consider:
1. Domain
2. Difficulty
3. Student level
4. Technology
5. Budget
6. Whether the project is suitable for a college/final-year project

Give useful explanations for each recommendation.

Do not claim that a project already exists on the Project World website unless it is explicitly provided in the user's message.

Keep responses clear, friendly and practical.

If the student's requirements are unclear, ask a short follow-up question.
`,

            input: userMessage

        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {

        console.error("AI Assistant Error:", error);

        res.status(500).json({
            error: "AI assistant could not respond."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `🤖 Project World AI server running at http://localhost:${PORT}`
    );

});