import express from "express";
import { readFile } from "node:fs/promises";

const app = express();
const port = process.env.PORT || 3000;
const sentencesFile = new URL("./static/sentences.json", import.meta.url);

app.get("/api/sentences", async (_request, response) => {
  try {
    const sentences = JSON.parse(await readFile(sentencesFile, "utf8"));
    response.json(sentences);
  } catch (error) {
    console.error("Unable to read sentence collection:", error);
    response.status(500).json({ error: "Unable to load sentences." });
  }
});

app.listen(port, () => {
  console.log(`Learning app API listening on http://localhost:${port}`);
});
