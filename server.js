import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

console.log("✅ ProofLabAI MOSS Wrapper is live");

app.get("/", (req, res) => {
  res.send("ProofLabAI MOSS Wrapper working ✅");
});

app.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming request body:", req.body);
    const { repo_url, language } = req.body;

    if (!repo_url) {
      console.error("❌ Missing repo_url in request");
      return res.status(500).json({ error: "Submission not found" });
    }

    console.log(`🔍 Checking ${repo_url} (${language}) ...`);

    // Simulated MOSS output for testing
    const mossReportUrl = `http://moss.stanford.edu/results/mock/${Date.now()}`;
    res.json({
      similarity_score: "auto",
      report_url: mossReportUrl,
      status: "success"
    });

  } catch (error) {
    console.error("💥 Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 MOSS Wrapper running on port ${PORT}`));
