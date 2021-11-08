const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const express = require("express");
const courses = require("./routes/courses");
const home = require("./routes/home");
const logger = require("./middleware/logger");
const app = express();

//helmet : Çeşitli HTTP üstbilgileri ayarlayarak uygulamalarınızın güvenliğini sağlamaya yardımcı olur.
const helmet = require("helmet");
app.use(helmet());
//morgan : HTPP request logger(her isteği kaydeder.) default olarak console da gösterir ayrı bir dosyaya da kaydedilebilir.
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use("/api/courses", courses);
app.use("/", home);

//Templating Engine
app.set("view engine", "pug"); // pug modülünü import etti
app.set("views", "./views"); // all template dosyası içerisinde

//Hata Ayıklama işlemi 2 türde yapılabilir şartlı yada
if (app.get("env") === "development") {
  startupDebugger("Morgan Enabled...");
}
//şartsız olarak işlemleri gerçekleştirilir.
dbDebugger("Contected to the database...");
//$env:DEBUG="app:startup" ile startup tagı verilen debug çalışırken $env:DEBUG="app:*" ile de tüm hata ayıklama kodları ayrı ayır çalışır

// Configuration - Şifre vs gibi önemli bilgiler bu json dosyalarında saklanmaz
//https://www.npmjs.com/package/config
//Eğer NODE_ENV=development ise development.json bilgileri gelecek
console.log("Application Name : " + config.get("name"));
console.log("Mail Server : " + config.get("mail.host"));
console.log("Mail Password : " + config.get("mail.password")); // $env:app_password=666
//Eğer NODE_ENV=production ise production.json bilgileri gelecek

// Enviroments
console.log(`NODE_DEV: ${process.env.NODE_DEV}`); // eğer burası tanımlanmadıysa
// yada
console.log(`app : ${app.get("env")}`); // burası development olarak kaydedilir.
//Ayrıca sadece developmentte isteklerin günlüğe kaydedilmesi için
//Projeyi durdur ctrl+c ile sonrasında  $env:NODE_ENV="production" sayı ise "" yok
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled..");
}

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params); // request içerisinde gelen ay ve yıl verilerini yolladık
  res.send(req.query); // query objeleri gösterildi
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.use(express.json()); //midlle func dönderir
//Built-in Middleware (Yerleşik Ara Yazılım)
app.use(express.urlencoded({ extended: true })); // req.body'i parse eder.
app.use(express.static("public")); // public adlı dosyayı static dosya olarak ekledi
// http://localhost:3000/readme.txt ile ulaşılabilir middleware ile halka açık değil
// https://expressjs.com/en/resources/middleware.html
app.use(function (req, res, next) {
  console.log("logging...");
  next(); //isteği sonlandırıyoruz.sonlandırmada denediğimizde yanıt alamıyoruz
  // Kısaca özetlersek istek burada sıkışıyor biz next ile bu işlem adımları
  // gerçekleştirildikten sonra fonksiyonu sonlandırıyoruz.
  // Geçmek için kimlik doğrulama vb adımı uygulanabilir.
});
app.use(logger); // creating custom middleware declare

// HTTP methods https://expressjs.com/en/5x/api.html
// app.get(url, callback func);
// app.post(url, callback func);
// app.put(url, callback func);
// app.delete(url, callback func);
// /api/courses/1 => 1=id'si kursun

// 3000 portunun kullanilmasina karşın önlem
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
