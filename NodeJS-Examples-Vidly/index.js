const Joi = require("joi");
const genres = require("./routes/genres");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

//File creating deleting reading and writing
// const fs = require("fs");

// //reading files
// fs.readFile("./readme.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data.toString());
//   }
// });

// // writing files --> if file not exist it will create it*
// fs.writeFile("./readme.txt", "Hello World", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("File created");
//   }
// });

// // directories --> take arg : (path, options, callback);
// // existsSync --> take arg : (path) --> true or false --> true if file or directory exists
// if (!fs.existsSync("./assets")) {
//   fs.mkdir("./assets", { recursive: true }, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Directory created");
//     }
//   });
// } else {
//   // take arg : (path, options, callback) --> recursive : true -> if directory exist it will delete it
//   fs.rmdir("./assets", { recursive: true }, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Directory deleted");
//     }
//   });
// }

// //delete files --> take arg : (path, options, callback)
// if (!fs.existsSync("./assets/readme.txt")) {
//   fs.unlink("./assets/readme.txt", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("File deleted");
//     }
//   });
// }
