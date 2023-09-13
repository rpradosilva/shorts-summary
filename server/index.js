import cors from "cors";
import express from "express";

import { download } from "./download.js";

const app = express();
app.use(cors());

app.get("/summary/:id", (request, response) => {
  download(request.params.id);
  response.json({ result: "Video converted" });
});

app.listen(3333, () => {
  console.log(`Server is running on port http://localhost:3333`);
});

// /summary/0S-3sBv0-EI - short
