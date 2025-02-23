const http = require("http");

const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    console.log("data : ",data)
    return data.products;
};
//getData();
const CardUI = (products) => {
    let finalHTML = ``;
    products.forEach((elem) => {
        finalHTML += `
        <div class='card'>
            <h5><span>${elem.title}</span></h5>
            <img src='${elem.thumbnail}' />
            <p>${elem.description}</p>
            <a href='/${elem.id}'>Read More...</a>
        </div>
        `;
    });
    return finalHTML;
};
const server = http.createServer(async (req, res) => {
    const path = req.url;
    console.log("-->", path);
    res.setHeader("content-type", "text/html");

    if (path == "/") {
        const products = await fetchData();
        // using backtick, we can write multiline string in JS
        res.end(`
<html>
    <head>
        <style>
            body{
                background-color: yellow;
                padding: 1rem;
            }
            .card{
                max-width: 400px;
                background-color: khaki;
                color: darkblue;
                padding: 1rem;
                border: 2px solid lightgrey;
                border-radius: 1rem;
                margin: 1rem auto;
            }
            img{
                height: 125px;
                display: block;
                width: fit-content;
                margin: auto;
            }
        </style>
    </head>
    <body>
        ${CardUI(products)}
    </body>
</html>`);
    } else if (path == "/about") {
        res.end("<h1 style='color: blue'>About Page</h1>");
    } else {
        res.end("<h1 style='color: green'>Oops... Page Not Found!</h1>");
    }
});
server.listen(1010, () => {
    console.log("------ Server Started ------");
});