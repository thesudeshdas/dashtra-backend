var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.send({test: 'suceess'})
});

module.exports = router;
