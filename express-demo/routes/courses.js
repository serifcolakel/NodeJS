const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "Course-1" },
  { id: 2, name: "Course-2" },
  { id: 3, name: "Course-3" },
  { id: 4, name: "Course-45" },
];
const key = [
  "124124qwasdsad",
  "qwşielkqwğpeığ1p2k3",
  "şlqfmöğpocsvjpnb21",
  "781274qwk0912kiwşlfkm",
];
// /api/courses
router.get("/", (req, res) => {
  //console.log("--1", req.headers);
  if (key.includes(req.headers.key)) {
    res.send(courses);
  } else {
    res.send("key not found");
  }
});

// /api/courses
router.get("/:id", (req, res) => {
  // sorgu adında kurs varsa kursu gönderecek JSON formatında yoksa status ile 404 ve hata mesajı gönderecek
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The Course with the given ID was not found.");
  res.send(course);
});

// /api/courses
router.post("/", (req, res) => {
  // const schema = {
  //   name: Joi.string().min(3).required(),
  // };
  // const result = Joi.validate(req.body, schema);
  // // console.log(result); //postmanda görünteleniyor
  // // name yoksa veya boyutu 3'den az ise
  // if (result.error) {
  //   // Status: 400 Bad Request
  //   res.status(400).send(result.error);
  //   // res.status(400).send(result.error.details[0].message); //sadece mesaj gösterilecek
  //   return; // fonksiyonu sonladırdık
  // }
  //YADA AŞAĞIDAKİ GİBİ KULLANILABİLİR
  const { error } = validateCourse(req.body); // result.error destruc.
  if (error) {
    return res.status(400).send(error.details[0].message); //sadece mesaj gösterilecek
  }

  const course = {
    id: courses.length + 1, // id sayısını veri sayısının 1 fazlası olarak ayarladık
    name: req.body.name, // isteğin body'sinde bulunan adı
  };
  courses.push(course); // course'yi courses'e atıyoruz
  res.send(course); // yanıtı gövdeye dönderiyoruz.
});

//Kaynakları güncellemek için put Kullanıyoruz.
// /api/courses/
router.put("/:id", (req, res) => {
  // (if) Kursa bakmamız lazım ve yoksa 404 döndermeliyiz
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The Course with the given ID was not found.");
  }

  // (else if) doğrulama yapılmalı ve doğrulama geçersizse 400 döndermeliyiz.
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); // result.error destruc.
  if (error) {
    return res.status(400).send(error.details[0].message); //sadece mesaj gösterilecek
  }
  // (else if) update course return the updated course
  course.name = req.body.name;
  res.send(course);
});

// /api/courses
router.delete("/:id", (req, res) => {
  // (if) Kursa bakmamız lazım ve yoksa 404 döndermeliyiz
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The Course with the given ID was not found.");
  }
  // Silme işlemi
  const index = courses.indexOf(course);
  courses.splice(index, 1); //gelen course objesini siliyoruz
  // return the same course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

module.exports = router;
