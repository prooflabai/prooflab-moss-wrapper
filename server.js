import express from "express";
import bodyParser from "body-parser";

const app = express();

// Ensure all types of JSON are parsed
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

console.log("✅ ProofLabAI MOSS Wrapper (Debug Mode) started");

// Health check route (for Render)
app.get("/", (req, res) => {
  res.status(200).send("ProofLabAI MOSS Wrapper is running ✅");
});

// Main POST route for MOSS verification
app.post("/", async (req, res) => {
  console.log("📥 Received POST request at /");

  try {
    // Defensive: log everything
    console.log("🧾 Full request body:", req.body);

    // If Render doesn’t parse JSON automatically, try fallback
    let repo_url = req.body?.repo_url || req.query?.repo_url;
    let language = req.body?.language || "unknown";

    if (!repo_url) {
      console.error("❌ repo_url missing in body. Body was:", req.body);
      return res.status(400).json({
        status: "error",
        message: "repo_url missing or invalid body format",
        received_body: req.body
      });
    }

    console.log(`🔍 MOSS Check started for: ${repo_url}, Language: ${language}`);

    // Mock logic (replace later with real moss.pl)
    const mossReportUrl = `http://moss.stanford.edu/results/mock/${Date.now()}`;
    console.log("✅ Generated mock MOSS report:", mossReportUrl);

    // Respond with success JSON
    return res.status(200).json({
      status: "success",
      similarity_score: "auto",
      report_url: mossReportUrl
    });

  } catch (err) {
    console.error("💥 Unhandled server error:", err);
    return res.status(500).json({
      status: "error",
      message: err.message || "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
