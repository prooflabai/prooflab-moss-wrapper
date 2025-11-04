// Use CommonJS style for compatibility with Render Node
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Confirm server start
console.log("✅ ProofLabAI MOSS Wrapper is live");

// Basic test route
app.get("/", (req, res) => {
  res.send("ProofLabAI MOSS Wrapper working ✅");
});

// Main POST route
app.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming POST request...");

    // Log the entire request body for debugging
    console.log("🧾 Raw body:", JSON.stringify(req.body));

    const { repo_url, language } = req.body || {};

    // Defensive checks
    if (!repo_url) {
      console.error("❌ Missing repo_url or invalid body");
      return res.status(400).json({ error: "repo_url missing" });
    }

    console.log(`🔍 Running MOSS check for ${repo_url} (${language || "unspecified"})`);

    // Simulated successful response
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
