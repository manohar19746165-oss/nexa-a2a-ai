JavaScript

require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const ai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const question = req.body.message;

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        answer: "अपना सवाल लिखिए।"
      });
    }

    const response = await ai.responses.create({
      model: "gpt-6-astra",
      instructions: `आप ROBO AI हैं।
      आप हिंदी और पंजाबी समझते हैं।
      आप गणित, सामान्य ज्ञान, पेट्रोल पंप,
      गैस एजेंसी, दुकान और बिजनेस में मदद करते हैं।
      सवाल समझकर अपने ज्ञान से जवाब दें।
      जवाब सरल और स्पष्ट रखें।
      कोई भी हिसाब बिना डेटा के न गढ़ें।`,
      input: question
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      answer: "ROBO AI अभी कनेक्ट नहीं हो पाया।"
    });
  }
});

app.listen(3000, () => {
  console.log("ROBO AI Server Started: 3000");
});

