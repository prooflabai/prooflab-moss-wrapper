import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

console.log("✅ ProofLabAI MOSS Wrapper is live (ESM mode)");

// Root route
app.get("/", (req, res) => {
  res.send("ProofLabAI MOSS Wrapper working ✅");
});

// POST route for MOSS verification
app.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming POST request...");
    console.log("🧾 Raw body:", JSON.stringify(req.body));

    const { repo_url, language } = req.body || {};

    if (!repo_url) {
      console.error("❌ Missing repo_url or invalid request body");
      return res.status(400).json({ error: "repo_url missing" });
    }

    console.log(`🔍 Running MOSS check for ${repo_url} (${language || "unspecified"})`);

    // Mock response for testing
    const mossReportUrl = `http://moss.stanford.edu/results/mock/${Date.now()}`;
    res.status(200).json({
      similarity_score: "auto",
      report_url: mossReportUrl,
      status: "success"
    });

  } catch (error) {
    console.error("💥 Internal error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 MOSS Wrapper running on port ${PORT}`));
