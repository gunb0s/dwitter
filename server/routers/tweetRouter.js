import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  if ("username" in req.query) {
    res.status(200).send(req.query.username);
  } else {
    res.status(200).send("get");
  }
});

router.post("/", (req, res) => {
  res.status(201).send({ message: "CREATED" });
});

router.put("/:id", (req, res) => {
  res.status(200).send({ message: "EDITED" });
});

router.delete("/:id", (req, res) => {
  res.sendStatus(204);
});

export default router;
