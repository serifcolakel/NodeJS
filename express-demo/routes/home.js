const express = require("express");
const router = express.Router();

//Templating Engines eklendi
router.get("/", (req, res) => {
  // ilk parametresi dosyadı adı(index.pug) ikincisi object index.pug da tanımlanan parametrelere göre
  res.render("index", {
    title: "My Express App",
    message: "Hi I'm Beginner on NodeJS",
  });
});

module.exports = router;
