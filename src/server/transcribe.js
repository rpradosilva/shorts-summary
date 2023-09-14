import { pipeline } from "@xenova/transformers";

export async function transcribe(audio) {
  try {
    console.log("Transcribing video...");

    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "xenova/whisper-small"
    );

    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
    });

    console.log("Finish transcribe!");
    return transcription?.text.replace("[Música]", "");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// import { transcriptionExample } from "./utils/transcription.js";
// return transcriptionExample;
