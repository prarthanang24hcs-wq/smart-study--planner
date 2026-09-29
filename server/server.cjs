const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/study", async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        error: "Please provide study text.",
      });
    }

    let instructions = "";

    if (mode === "Make the answer shorter") {
      instructions = `
Make the student's answer SHORTER.

Rules:
- Keep only the most important information.
- Use simple and clear sentences.
- Do NOT create a 5-mark answer.
- Do NOT add an introduction or conclusion.
- Do NOT add information that is not in the study material.
- Keep it around 2 to 4 sentences.
`;
    } else if (mode === "Explain the answer in simple language") {
      instructions = `
Explain the student's answer in VERY SIMPLE language.

Rules:
- Use easy words suitable for a college student.
- Explain the same information in an easier way.
- Do NOT create a 5-mark answer.
- Do NOT add unnecessary information.
- Do NOT change the meaning.
`;
    } else if (mode === "Create a proper 5-mark exam answer") {
      instructions = `
Create a proper 5-mark college exam answer.

Use this structure:

Introduction:
- 1 or 2 sentences.

Important Points:
- Give the important points in bullet points.

Example:
- Give an example ONLY if the study material supports one.

Conclusion:
- Give a short conclusion.

Rules:
- Use ONLY information from the student's study material.
- Keep the answer suitable for a 5-mark exam question.
- Use clear and simple language.
`;
    } else if (mode === "Give the important key points") {
      instructions = `
Give ONLY the important key points from the student's study material.

Rules:
- Use bullet points.
- Keep each point short.
- Do NOT write an introduction.
- Do NOT write a conclusion.
- Do NOT create paragraphs.
- Do NOT add information that is not in the study material.
`;
    } else if (mode === "Give the most important keywords") {
      instructions = `
Give ONLY the most important keywords from the student's study material.

Rules:
- Give keywords as a simple list.
- Do NOT explain the keywords.
- Do NOT write paragraphs.
- Do NOT create a 5-mark answer.
- Use only words or short terms found in or directly supported by the study material.
`;
    } else if (
      mode === "Create useful question and answer flashcards"
    ) {
      instructions = `
Create study flashcards from the student's study material.

Use exactly this format:

Flashcard 1
Question: ...
Answer: ...

Flashcard 2
Question: ...
Answer: ...

Flashcard 3
Question: ...
Answer: ...

Rules:
- Create useful exam-focused questions.
- Keep answers short and clear.
- Use ONLY information from the student's study material.
- Do NOT add unrelated information.
`;
    } else {
      instructions = `
Explain the student's study material clearly and simply.
Use only the information provided.
`;
    }

    const prompt = `
You are a helpful college study assistant.

STUDENT'S STUDY MATERIAL:
${text}

REQUEST:
${mode}

INSTRUCTIONS:
${instructions}

IMPORTANT:
- Follow the requested format exactly.
- Do not mix formats.
- Do not create a 5-mark answer unless the request is specifically "Create a proper 5-mark exam answer".
- Do not add information that is not supported by the student's study material.
- Do not talk about being an AI.
`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2:3b",
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Ollama Error:", errorText);

      return res.status(500).json({
        error: "Could not connect to Ollama.",
      });
    }

    const data = await response.json();

    res.json({
      result: data.response,
    });
  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      error: "Something went wrong while generating the answer.",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Study AI server running on http://localhost:${PORT}`);
});