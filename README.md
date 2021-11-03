# NODE-JS NOTLARI
* jshint app.js ile app.js içerisindeki javascript hatalarını gözlemleyebiliriz.
### Moduller
* Her değişken tanımlandığı .js sayfası içerisinde global olarak tanımlanmaz.Bu yüzden değişkenlere farklı yerlerden ulaşılması halinde modüller altında global değişken haline getirilip kullanılabilir.
* Aşağıdaki kod parçacığı ile .js sayfası modül haline getirilebilir ve dışarıya aktarılabilir.

```javascript

var url = "URL";

function log(message) {
  //Send an HTTP request
  console.log(message);
}

//fonksiyon log olarak kullanılabilir.
module.exports.log = log;
//url endPoint olarak kullanılabilir.
module.exports.endPoint = url;

```


*	Dosya sistemi(fs), Her zaman asenkron olarak kullanılmalıdır. https://nodejs.org/dist/latest-v17.x/docs/api/fs.html  adresinden gerekli metodlar kullanılabilir.
*	Events Modulü(https://nodejs.org/dist/latest-v17.x/docs/api/events.html , events) 
* 	HTTP Modülü(https://nodejs.org/dist/latest-v17.x/docs/api/http.html ) Birden fazla veri eklemek için kod satırı fazla olacağından dolayı Express kullanılarak bu sorun ortadan kaldırılmış olur.

```javascript
 const http = require("http");
 
 const server = http.createServer((req, res) = {
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

```

*	**NPM** 
	* package.json => npm init  yazıp tüm şartları kabul et ve package.json’ı oluştur
	* Using a Package => npm i package ile kur ve doküman okuyarak import edebilirsin.
	* https://underscorejs.org/ ile JS metod, fonks. Vs kullanılabilir.
	* npm i  ile package.json içeresinde önceden kurulan paketleri otomatik kurabilirsin.
	* git init ile git’e hazır hale getirilir .gitignore ile de yüklenmemesini istediğimiz dosyaları gizleyebiliriz.
	* Sürüm 4. 1.2 => anasürüm(major).Küçüksürüm(minor).yamaversiyonu(patch) şeklinde kodlanır.Hata bulunmazsa 4.0.0 olabilir.

# **REST(Representational State Transfer) Full Services**
  *  Verilerin güvenli bir kanalda değiş tokuş edilmesi için https kullan
  *  https://vidly.com/api/customers bir end-point örneği 
### **HTTP methods** 
  * **GET(Read)**
    ```javascript
      app.get("/api/posts/:year/:month", (req, res) => {
        res.send(req.params); // request içerisinde gelen ay ve yıl verilerini yolladık
        res.send(req.query); // query objeleri gösterildi
      });
      app.get("/api/courses/:id", (req, res) => {
  // sorgu adında kurs varsa kursu gönderecek JSON formatında yoksa status ile 404 ve hata mesajı gönderecek
      const course = courses.find((c) => c.id === parseInt(req.params.id));
      if (!course)
        res.status(404).send("The Course with the given ID was not found.");
        res.send(course);
      });
    ```
  *  **POST(Create)** 
```javascript
app.post("api/courses", (req, res) => {
  const course = {
    id: courses.length + 1, // id sayısını veri sayısının 1 fazlası olarak ayarladık
    name: req.body.name, // isteğin body'sinde bulunan adı
  };
  courses.push(course); // course'yi courses'e atıyoruz
  res.send(course); // yanıtı gövdeye dönderiyoruz.
});
```
  *  **PUT(Update/Replace)**
  *  **DELETE(Delete)** 
  *  **PATCH(Update/Modify)**

# **EXPRESS**
  *  **npm i express** ile kurulur.
  *  **npm i -g nodemon** ile global olarak kullanılarak yenileyen modul import edilmiş olur
  *  **In Command Prompt: set PORT=5000**
  *  **Power Shell'de: $env:PORT=5000**
  *  **Bash'te (Windows): export PORT=5000** ile PORT değeri 5000 olarak ayarlanır.
  * **http://localhost:3000/api/posts/2018/7?sortBy=name** sortBy ile sıralanabilir. 