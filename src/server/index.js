import cors from "cors";
import express from "express";

import { download } from "./download.js";
import { transcribe } from "./transcribe.js";
import { summarize } from "./summarize.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/summary/:id", async (request, response) => {
  await download(request.params.id);
  const result = await transcribe();

  return response.json({ result });
});

app.post("/summary", async (request, response) => {
  const result = await summarize(request.body.text);

  return response.json({ result });
});

app.listen(3333, () => {
  console.log(`Server is running on port http://localhost:3333`);
});

// /summary/0S-3sBv0-EI - short
