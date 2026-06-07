const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 8082;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

/**
 * Sends a plain text response.
 * @param {http.ServerResponse} response
 * @param {number} statusCode
 * @param {string} message
 */
function sendText(response, statusCode, message) {
  response.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(message);
}

/**
 * Resolves a safe file path inside the project root.
 * @param {string} requestPath
 * @returns {string | null}
 */
function resolveFilePath(requestPath) {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const safePath = path.normalize(normalizedPath).replace(/^(\.\.[/\\])+/, "");
  const absolutePath = path.join(ROOT_DIR, safePath);

  if (!absolutePath.startsWith(ROOT_DIR)) {
    return null;
  }

  return absolutePath;
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host}`);
  const filePath = resolveFilePath(requestUrl.pathname);

  if (!filePath) {
    sendText(response, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, fileBuffer) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendText(response, 404, "File not found");
        return;
      }

      sendText(response, 500, "Internal server error");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] ?? "application/octet-stream";

    response.writeHead(200, { "Content-Type": contentType });
    response.end(fileBuffer);
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the existing process or run with PORT set to a different value.`);
    process.exit(1);
  }

  console.error("Server failed to start.", error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Task Planner is running at http://localhost:${PORT}`);
});
