const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const fs = require("fs");
const path = require("path");

module.exports = (upload) => {
  // Rute untuk menghapus semua blog
  router.delete("/dell-all", blogController.deleteAllBlogs);

  // Get all blogs
  router.get("/", blogController.getAllBlogs);

  // Get blog by ID
  router.get("/:id", blogController.getBlogById);

  // Create a new blog
  router.post("/", upload.single("image"), blogController.createBlog);

  // Update a blog by ID
  router.put("/:id", upload.single("image"), blogController.updateBlog);

  // Delete a blog by ID
  router.delete("/:id", blogController.deleteBlog);

  // Search blogs by title
  router.get("/search", blogController.searchBlogs);

  // Rute untuk menyajikan file gambar
  router.get("/img/:filename", (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, "../uploads", filename);

    // Baca file gambar
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        // Jika terjadi kesalahan, tanggapi dengan 404 Not Found
        res.status(404).send("File not found");
      } else {
        // Jika berhasil, set header dan kirim data gambar sebagai respons
        res.setHeader("Content-Type", "image/png"); // Sesuaikan dengan jenis file gambar Anda
        res.end(data);
      }
    });
  });

  return router;
};
