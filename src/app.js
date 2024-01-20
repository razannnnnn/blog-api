require("dotenv").config();
const express = require("express");
const multer = require("multer");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./config/db");
const moment = require("moment-timezone");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mengatur zona waktu ke Asia/Jakarta
const jakartaTimezone = moment.tz("Asia/Jakarta");

// Format tanggal sesuai kebutuhan
const formattedDateTime = jakartaTimezone.format("DD-MM-YYYY-HH_mm");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const sanitizedFilename = originalname.replace(/\s+/g, "_");
    const filenameWithTimestamp = formattedDateTime + "-" + sanitizedFilename;
    cb(null, filenameWithTimestamp);
  },
});

const upload = multer({ storage });

// Connect to MongoDB Atlas
connectDB();

// Use the blog routes
app.use("/api/blogs", blogRoutes(upload));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
