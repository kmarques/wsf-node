const express = require("express");
const { Concessionaire } = require("../db/models/index");
const { prettifyErrors } = require("../lib/utils");

const router = express.Router();

router.get("/concessionaires", function (req, res) {
  Concessionaire.findAll({
    where: req.query,
  }).then((data) => {
    res.json(data);
  });
});

router.get("/concessionaires/:id", function (req, res) {
  const id = req.params.id;

  Concessionaire.findByPk(id).then((data) => {
    if (data) res.json(data);
    else res.sendStatus(404);
  });
});

router.delete("/concessionaires/:id", function (req, res) {
  const id = req.params.id;

  Concessionaire.destroy({
    where: {
      id,
    },
  }).then((data) => {
    if (data) res.sendStatus(204);
    else res.sendStatus(404);
  });
});

router.post("/concessionaires", function (req, res) {
  Concessionaire.create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((e) => {
      if (e.name === "SequelizeValidationError") {
        res.status(400).json(prettifyErrors(e));
      } else {
        res.sendStatus(500);
      }
    });
});

router.put("/concessionaires/:id", function (req, res) {
  const id = req.params.id;

  Concessionaire.update(req.body, { where: { id }, individualHooks: true })
    .then(([nbUpdated]) => {
      if (nbUpdated === 0) res.sendStatus(404);
      else
        Concessionaire.findByPk(id).then((data) => {
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
