import express from "express";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const port = 5714;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"], // specify allowed methods (optional)
  })
);

app.use(express.json());

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

// Configure multer for image upload
const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/analyze-image", upload.single("image"), async (req, res) => {
  try {
    // Get the uploaded image
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No image provided!" });
    }

    // Convert the image to base64 format
    const base64Image = Buffer.from(file.buffer).toString("base64");

    // Send the image and prompt to the Google Generative AI model
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: file.mimetype,
        },
      },
      "1. Identify the plant in the image \
       2. Provide description and name of the diseases if any \
       3. Provide prevention, cure for the disease if any \
       4. Common areas and locations where this disease is found \
       5. Provide important notes of this disease \
      ",
    ]);

    // Send the result back to the client
    const caption = result.response.text();
    console.log("API Response:", caption);
    res.json({ caption });
  } catch (error) {
    console.error("Error analyzing image:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided!" });
    }

    // Assuming 'model' is initialized correctly
    let result;
    try {
      result = await model.generateContent([message]);
    } catch (error) {
      console.error("Error during model generation:", error.message);
      return res.status(500).json({ error: "Model generation failed" });
    }

    const responseText = result?.response?.text();
    if (!responseText) {
      console.error("No response text found in model output");
      return res.status(500).json({ error: "No response text generated" });
    }

    console.log("API Response:", responseText);
    res.json({ response: responseText });
  } catch (error) {
    console.error("Error processing text message:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
