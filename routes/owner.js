const express = require("express");
const { Owner } = require("../db/models/index");
const { prettifyErrors } = require("../lib/utils");

const router = express.Router();

router.get("/owners", function (req, res) {
  Owner.findAll({
    where: req.query,
  }).then((data) => {
    res.json(data);
  });
});

router.get("/owners/:id", function (req, res) {
  const id = req.params.id;

  Owner.findByPk(id).then((data) => {
    if (data) res.json(data);
    else res.sendStatus(404);
  });
});

router.delete("/owners/:id", function (req, res) {
  const id = req.params.id;

  Owner.destroy({
    where: {
      id,
    },
  }).then((data) => {
    if (data) res.sendStatus(204);
    else res.sendStatus(404);
  });
});

router.post("/owners", function (req, res) {
  Owner.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((e) => {
      if (e.name === "SequelizeValidationError") {
        res.status(400).json(prettifyErrors(e));
      } else {
        res.sendStatus(500);
      }
    });
});

router.put("/owners/:id", function (req, res) {
  const id = req.params.id;

  Owner.update(req.body, { where: { id }, individualHooks: true })
    .then(([nbUpdated]) => {
      if (nbUpdated === 0) res.sendStatus(404);
      else
        Owner.findByPk(id).then((data) => {
          res.json(data);
        });
    })
    .catch((e) => {
      if (e.name === "SequelizeValidationError") {
        res.status(400).json(prettifyErrors(e));
      } else {
        res.sendStatus(500);
      }
    });
});

module.exports = router;
