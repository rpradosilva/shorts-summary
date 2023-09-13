import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) => {
  const videoURL = `https://www.youtube.com/shorts/${videoId}`;
  console.log(`Downloading short: ${videoId}`);

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      let seconds = info.formats[0].approxDurationMs / 1000;
      if (seconds > 60) {
        throw new Error("Is not an short");
      }
    })
    .on("end", () => {
      console.log(`Download complete: ${videoId}`);
    })
    .on("error", (error) => {
      console.log(`Download status - ${error}`);
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"));
};
