const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // feel free to enable any flow out of 3 soln.
  // This will end up crashing the server as it will wait for full file to load which we don't need
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //   // Solution-1(Streams)
  //   const readable = fs.createReadStream("text-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  // // we need this so as tell server we won't be sending any more chunks but res.write already sends it but still we need to use as it's terminology.
  //   readable.on("end", () => {
  //     res.end();
  //   });

  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });
  // Solution-2(Stream pip)
  //   to match the speed of input and output we use pipe in upper case it can be that speed of sending chunks is more then the receiving data(Backtrasher) to overcome that we use pipe.
  const readable = fs.createReadStream("text-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening...");
});
