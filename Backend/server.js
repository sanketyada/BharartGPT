import "dotenv/config";
import express from "express";
import { Groq } from "groq-sdk";
import cors from "cors";
import getGroqResponse from "./utils/groq.js";
import ConnectDB from "./utils/dbConnection.js";
import chatRouter from "./routes/chat.routes.js";
ConnectDB()
const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

// getGroqResponse()

app.use("/api",chatRouter)


app.get("/", (req, res) => {
  res.send("App is Listening!");
});

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "llama-3.3-70b-versatile",
//       messages: [
//         {
//           role: "user",
//           content: "Who is Atiq ahmad linked with Terror?",
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       options,
//     );
//     const data = await response.json();
//     console.log(data.choices[0].message.content);
//     res.send(data);
//   } catch (error) {}
// });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
