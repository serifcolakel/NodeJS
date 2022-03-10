const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    //işlem başarılı ise resolve() çağırılır
    resolve(42);
    // başarısız ise reject() çağırılır
    reject(new Error("error"));
  }, 2000);
});

// Böylece oluşturulan promise çalıştırılır.
p.then((result) => console.log("Result :", result)).catch((error) =>
  console.log("Error :", error.message)
);
