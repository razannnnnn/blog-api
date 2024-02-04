# Blog API using Node.js

This is a repository for an API built with Node.js to manage a blog. This API provides basic functionalities for creating, reading, updating, and deleting (CRUD) blogs, as well as searching for blogs by title.

## Installation

1. **Clone the Repository**: Clone this repository into your local system by running the following command:

    ```bash
    git clone https://github.com/razn-id/blog-api.git
    ```

2. **Install Dependencies**: Navigate to the project directory and install dependencies by running:

    ```bash
    cd blog_repo
    npm install
    ```

3. **Configuration**: Make sure to set required environment variables, such as database connection or image storage settings (if used).

## Usage

To run the server, you can use the command:

```bash
npm start
```

Once the server is running, you can access the API via http://localhost:port/, where port is the port specified in the configuration file or the default port (usually 3000).

## API Endpoints

Here is a list of endpoints provided by the API:

GET /api/blogs: Get all blogs.
GET /api/blogs/:id: Get a blog by ID.
POST /api/blogs: Create a new blog.
PUT /api/blogs/:id: Update a blog by ID.
DELETE /api/blogs/:id: Delete a blog by ID.
GET /api/blogs/search?title=query: Search for blogs by title.
DELETE /api/blogs/dell-all: Delete all blogs (Caution: This action cannot be undone).
