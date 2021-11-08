function log(req, res, next) {
  console.log("Authenticating..");
  // Geçmek için kimlik doğrulama vb adımı uygulanabilir.
  next();
}

module.exports = log;
