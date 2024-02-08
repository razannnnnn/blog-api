require("dotenv").config();
const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./config/db");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const requestIp = require("request-ip");
const moment = require("moment-timezone");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Middleware untuk menyimpan log ke file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./access.log"),
  { flags: "a" }
);

// Middleware untuk mendapatkan alamat IP pengguna
app.use(requestIp.mw());

// Middleware morgan untuk menyimpan log ke file access.log
app.use(
  morgan(
    (tokens, req, res) => {
      const jakartaTimezone = moment.tz("Asia/Jakarta");
      const formattedDateTime = jakartaTimezone.format("DD-MM-YYYY HH:mm:ss");
      const ip = req.clientIp; // Menggunakan clientIp dari request-ip

      return [
        formattedDateTime,
        "IP Address:",
        ip,
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
  const accessLogPath = path.join(__dirname, "./access.log");

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
app.use("/api/blogs", blogRoutes());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
