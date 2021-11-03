const express = require("express");
const app = express();
app.use(express.json());

// HTTP methods https://expressjs.com/en/5x/api.html
// app.get(url, callback func);
// app.post(url, callback func);
// app.put(url, callback func);
// app.delete(url, callback func);

// /api/courses/1 => 1=id'si kursun

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api/courses/", (req, res) => {
  console.log([1, 2, 3]);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params); // request içerisinde gelen ay ve yıl verilerini yolladık
  res.send(req.query); // query objeleri gösterildi
});
const courses = [
  { id: 1, name: "Course-1" },
  { id: 2, name: "Course-2" },
  { id: 3, name: "Course-3" },
];
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  // sorgu adında kurs varsa kursu gönderecek JSON formatında yoksa status ile 404 ve hata mesajı gönderecek
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The Course with the given ID was not found.");

  res.send(course);
});

app.post("api/courses", (req, res) => {
  const course = {
    id: courses.length + 1, // id sayısını veri sayısının 1 fazlası olarak ayarladık
    name: req.body.name, // isteğin body'sinde bulunan adı
  };
  courses.push(course); // course'yi courses'e atıyoruz
  res.send(course); // yanıtı gövdeye dönderiyoruz.
});

// 3000 portunun kullanilmasina karşın önlem
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
