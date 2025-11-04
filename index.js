require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const express = require("express");
const cors = require("cors");
require("./config/db");
const headerRoutes = require("./routes/header.route");

const app = express();
const allowedOrigins = ["http://localhost:3000", process.env.CLIENT_URL];

app.use(
  cors({
    origin: allowedOrigins, // or your frontend URL
    credentials: true, // allow sending cookies/headers
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev")); // Shows :method :url :status :response-time ms

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json("hello from backend");
});

app.use("/api/header", headerRoutes);
app.use("/api/upload-media", require("./routes/uploadMedia.route"));
app.use("/api/hero", require("./routes/heroSection.route"));
app.use("/api/quick-stats", require("./routes/quickStat.route"));
app.use("/api/Manufacturing-rnd", require("./routes/innovation.route"));
app.use("/api/global-presence", require("./routes/globalPresence.route"));
app.use("/api/csrsustainability", require("./routes/csrSustainability.route"));
app.use("/api/finalcta", require("./routes/finalCtaBanner.route"));
app.use("/api/contact", require("./routes/contactLead.route"));
// app.use("/api/csr", require("./routes/csr.route"));

// app.use("/api/certifications", require("./routes/certification.route"));

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
