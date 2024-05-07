# Blog API using Node.js

This is a repository for an API built with Node.js to manage a blog. This API provides basic functionalities for creating, reading, updating, and deleting (CRUD) blogs, as well as searching for blogs by title.

## Installation

1. **Clone the Repository**: Clone this repository into your local system by running the following command:

   ```bash
   git clone https://github.com/razn-id/blog-api.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install dependencies by running:

   ```bash
   cd blog-api
   npm install
   ```

3. **Configuration**: Make sure to set required environment variables, such as database connection or image storage settings (if used).

## Usage

To run the server, you can use the command:

```bash
npm run start
```

Once the server is running, you can access the API via http://localhost:port/, where port is the port specified in the configuration file or the default port (usually 3000).

## Configuration

Create a `.env` file in the root directory of the project and add the following configurations:

```env
MONGO_URI=<Mongo_URI> # Your MongoDB atlas URI
PORT=<Port> # Default port is 3000
ACCESS_LOG_KEY=<YourSecretKey> # The default key if this is not set is admin123
```

Replace `<Mongo_URI>` with your actual MongoDB URI, `<Port>` with the desired port number and `<YourSecretKey>` with custom key for access password to endpoint `/access-log`. If no port is provided, the default port used will be 3000.

## Development

To start development server, you need to install Nodemon first. Run the following command:

```bash
npm install -g nodemon
```

Once Nodemon is installed, you can start the development server using the following command:

```bash
npm run dev
```

## API Endpoints

Here is a list of endpoints provided by the API:

- GET /api/blogs: Get all blogs.
- GET /api/blogs/:id: Get a blog by ID.
- POST /api/blogs: Create a new blog.
- PUT /api/blogs/:id: Update a blog by ID.
- DELETE /api/blogs/:id: Delete a blog by ID.
- GET /api/blogs/search?title=query: Search for blogs by title.
- DELETE /api/blogs/dell-all: Delete all blogs (Caution: This action cannot be undone).

## Directory Structure

- 📂 **config**: Manages application configuration.
- 📂 **controllers**: Manages application logic.
- 📂 **models**: Stores database model definitions.
- 📂 **routes**: Defines API endpoints and links them with controllers.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Author

Created by [Razan](https://github.com/razn-id).

Feel free to reach out if you have any questions or feedback!
