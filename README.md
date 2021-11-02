# NODE-JS NOTLARI
* jshint app.js ile app.js içerisindeki javascript hatalarını gözlemleyebiliriz.
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
