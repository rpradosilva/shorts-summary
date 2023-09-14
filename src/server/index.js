import cors from "cors";
import express from "express";

import { download } from "./download.js";
import { transcribe } from "./transcribe.js";

const app = express();
app.use(cors());

app.get("/summary/:id", async (request, response) => {
  await download(request.params.id);
  const result = await transcribe();
  response.json({ result });
});

app.listen(3333, () => {
  console.log(`Server is running on port http://localhost:3333`);
});

// /summary/0S-3sBv0-EI - short
