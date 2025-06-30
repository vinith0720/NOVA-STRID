import express from "express";
import { db } from "../firebase/firebase";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { path, data } = req.body;
  try {
    await db.ref(path).set(data);
    res.send({ success: true, message: "Data created!" });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

router.get("/read", async (req, res) => {
  const { path } = req.query;
  console.log(path);

  try {
    const snapshot = await db.ref(String(path)).once("value");
    console.log(snapshot);

    res.send(snapshot.val());
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

router.put("/update", async (req, res) => {
  const { path, data } = req.body;
  try {
    await db.ref(path).update(data);
    res.send({ success: true, message: "Data updated!" });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

router.delete("/delete", async (req, res) => {
  const { path } = req.body;
  try {
    await db.ref(path).remove();
    res.send({ success: true, message: "Data deleted!" });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

export default router;
