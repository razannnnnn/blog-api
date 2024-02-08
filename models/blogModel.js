const mongoose = require("mongoose");
const moment = require("moment-timezone");

// Mengatur zona waktu ke Asia/Jakarta
const jakartaTimezone = moment.tz("Asia/Jakarta");

// Format tanggal dan waktu sesuai kebutuhan
const formattedDate = jakartaTimezone.format("DD/MM/YYYY");
const formattedTime = jakartaTimezone.format("HH:mm");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, maxlength: 1000, required: true },
  createdDate: { type: String, default: formattedDate },
  createdTime: { type: String, default: formattedTime },
  lastEditedDate: { type: String },
  lastEditedTime: { type: String },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
