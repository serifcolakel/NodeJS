const http = require("http");

const server = http.createServer((req, res) => {
  //http://localhost:3000 adresine string olarak veri yazdı
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }
  //http://localhost:3000/api/courses adresine JSON formatinda veri yazdı
  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
}); //EventEmitter'dir

server.listen(3000);

console.log("listening on port 3000");
