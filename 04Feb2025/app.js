const express = require("express");
const fsPromises = require("fs/promises");
const PORT = 1010;

const app = express();

app.get("/", (req, res) => {
// dummy api to test if server is working or not
res.send(`<h1>Server is running on PORT : ${PORT}</h1>`);
});

app.get("/tasks", async (req, res) => {
// in file like .txt, .cpp, .html, .css :: we write text
// so when we read the file :: we get text
console.log("hi")

const text = await fsPromises.readFile('db.json');

// if we want to convert "text in JSON format" to "JS object" :: JSON.parse()
// if we want to convert "JS object" to "text in JSON format" :: JSON.stringify()

const obj = JSON.parse(text); // sync process

// res.send :: generic method to send response where content-type need to explicitly specified by developer
// res.json :: it is similar to send, but it also adds content-type and serializes the JS Object into JSON String

res.json(obj);
});

app.listen(PORT, () => {
console.log(`
-------------------------------------------------
------- Server Started on PORT : ${PORT} --------
------- link: http://localhost:${PORT}/ ---------
-------------------------------------------------
`);
});