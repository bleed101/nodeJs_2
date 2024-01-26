const fs = require("fs");
const http = require("http");
const path = require("path");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");
// File handling.
/*
// Blocking, synchronous way.
const textIncomming = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIncomming);

const textOutgoing = `This is the text which is being extracted from input.txt ${textIncomming} . 
Dated ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOutgoing);

// Non-blocking, asynchronous way.
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error! ⛔");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("your file has been written😊");
      });
    });
  });
});
*/

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  // path.join(__dirname, "templates", "template-overview.html"),
  "utf-8"
);
const tempProduct = fs.readFileSync(
  path.join(__dirname, "templates", "template-product.html"),
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  // path.join(__dirname, "templates", "template-card.html"),
  "utf-8"
);
const apiData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const apiDataObj = JSON.parse(apiData);

const slugs = apiDataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

console.log(`${__dirname}\\templates\\template-card.html`);
//Server creation.
const server = http.createServer((req, res) => {
  // console.log(req.url);
  const prefix = req.url;
  // Overview page
  if (prefix === "/" || prefix === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const cardsHtml = apiDataObj.map((el) => replaceTemplate(tempCard, el));
    console.log(cardsHtml);
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product
  } else if (prefix === `/product?id=${prefix.split("=")[1]}`) {
    res.writeHead(200, { "content-type": "text/html" });
    const cardsHtml = apiDataObj.map((el) => replaceTemplate(tempProduct, el));
    // const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml[prefix.split("=")[1]]);
    res.end(cardsHtml[prefix.split("=")[1]]);

    // API
  } else if (prefix === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(apiData);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world.",
    });
    res.end("<h1>Hello from server!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000.");
});
