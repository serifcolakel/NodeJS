const p = Promise.resolve({ id: 1 });
p.then((result) => console.log(result));

// const p = Promise.reject(new Error("Something went wrong"));
// p.catch((error) => console.log(error));

//Paralel Promise

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1..");
    reject(new Error("Something went wrong"));
  }, 1000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2..");
    resolve(2);
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 3..");
    resolve(3);
  }, 3000);
});

//Hepsi Çözüldüğünde Sonuçları Alır
Promise.all([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));

// Race dizi döndermez sadece ilk değeri dönderir
Promise.race([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
