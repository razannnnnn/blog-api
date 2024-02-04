require("dotenv").config();
const express = require("express");
const multer = require("multer");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./config/db");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
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

// Middleware untuk menyimpan log ke file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../access.log"),
  { flags: "a" }
);

// Middleware untuk menangkap IP address dan endpoint
app.use(
  morgan(
    (tokens, req, res) => {
      const jakartaTimezone = moment.tz("Asia/Jakarta");
      const formattedDateTime = jakartaTimezone.format("DD-MM-YYYY HH:mm:ss");

      return [
        formattedDateTime,
        "IP Address:",
        req.ip,
        "Method:",
        tokens.method(req, res),
        "URL:",
        tokens.url(req, res),
      ].join(" ");
    },
    { stream: accessLogStream }
  )
);

// Middleware untuk memeriksa keberadaan ID dalam URL
const checkAccessLogId = (req, res, next) => {
  // Ambil ID dari URL
  const id = req.params.id;

  // Dapatkan ID yang telah ditetapkan
  const accessLogId = require("./config/config").accessLogId;

  // Jika ID tidak sama dengan ID yang telah ditetapkan, tolak permintaan
  if (!id || id !== accessLogId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  // Lanjutkan ke handler berikutnya jika ID ditemukan
  next();
};

// Endpoint untuk menampilkan file access.log
app.get("/access-log/:id", checkAccessLogId, (req, res) => {
  const accessLogPath = path.join(__dirname, "../access.log");

  // Baca isi file access.log
  fs.readFile(accessLogPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Kirim isi file access.log sebagai respon
    res.set("Content-Type", "text/plain");
    res.send(data);
  });
});
// Route untuk pengujian, boleh dihapus
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the blog routes
app.use("/api/blogs", blogRoutes(upload));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
