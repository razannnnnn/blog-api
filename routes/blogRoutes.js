const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

module.exports = () => {
  // Rute untuk menghapus semua blog
  router.delete("/dell-all", blogController.deleteAllBlogs);

  // Get all blogs
  router.get("/", blogController.getAllBlogs);

  // Get blog by ID
  router.get("/:id", blogController.getBlogById);

  // Create a new blog
  router.post("/", blogController.createBlog);

  // Update a blog by ID
  router.put("/:id", blogController.updateBlog);

  // Delete a blog by ID
  router.delete("/:id", blogController.deleteBlog);

  // Search blogs by title
  router.get("/search", blogController.searchBlogs);

  return router;
};
