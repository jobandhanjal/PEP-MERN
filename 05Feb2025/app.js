const express = require("express");
require("./config/dbConfig.js");
// requiring a file (first time) runs that file line-by-line
// (second time onwards) will get the cached exports

const PORT = 1401;

const app = express();

app.get("/", (req, res) => {
res.send(`<h1>Server is running ...</h1>`);
});

app.post("/tasks", (req, res) => {
try {
// 1. get the data from request
// 2. validate the data
// 3. save the data in db :: MongoDB (online --> ATLAS) (offline is pain to setup :: in deployment we will mostly prefer online)
} catch (err) {
console.log("Error in POST /tasks", err.message);
res.status(500).json({ status: "fail", message: "Internal Server Error" });
}
});

app.listen(PORT, () => {
console.log("------------------------------------------");
console.log(`--------- http://localhost:${PORT}/ ---------`);
console.log("------------------------------------------");
});