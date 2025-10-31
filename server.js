import express from "express";
import { exec } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

app.post("/api/analyze", async (req, res) => {
  try {
    const { language = "python", files = [] } = req.body;

    // Write submitted code files to temp folder
    const tmpDir = path.join(__dirname, "tmp");
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const filePaths = [];
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(tmpDir, `file${i}.${language}`);
      fs.writeFileSync(filePath, files[i]);
      filePaths.push(filePath);
    }

    const command = `perl ${path.join(__dirname, "moss.pl")} -l ${language} ${filePaths.join(" ")}`;

    exec(command, (error, stdout) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "MOSS execution failed", details: error.message });
      }

      // Find MOSS report URL in output
      const match = stdout.match(/http.*moss.*\n?/);
      const mossUrl = match ? match[0].trim() : null;

      res.json({
        similarity_score: "auto",
        report_url: mossUrl || "No URL returned",
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("ProofLabAI MOSS Wrapper running ✅"));
app.listen(process.env.PORT || 3000, () => console.log("MOSS Wrapper active"));
