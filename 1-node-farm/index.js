const fs = require("fs");

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
