const EventEmitter = require("events");
const http = require("http");

const myEmmitter = new EventEmitter();

//from the class also you can use with custom name EventEmitter()
class Sales extends EventEmitter {
  //this is the ES6 syntax how to inherit the super class.
  constructor() {
    super();
    //we use super() to inherit all the functions in EventEmitter().
  }
}
// thid way we make objects of class.
// const myEmmitter = new Sales;

myEmmitter.on("newSale", () => {
  console.log("there was a new sale!");
});

myEmmitter.on("newSale", () => {
  console.log("Costumer name: DD");
});

myEmmitter.on("newSale", (stock) =>
  console.log(`There are now ${stock} left in stock.`)
);

myEmmitter.emit("newSale", 9);
// ------------------------------------------------------------------------------------

const server = http.createServer();

// first event listner
server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received!");
});

// second event listner
server.on("request", (req, res) => {
  console.log("Another request 😏");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
