import express from "express";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let grade = req.body;

    if (!grade.student || !grade.type || !grade.subject || grade.value == null) {
      throw new Error("Campos obrigatórios não preenchidos.");
    }

    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date()
    };
    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);

    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
    logger.info("GET /grade");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(
      grade => grade.id === parseInt(req.params.id));
    res.send(grade);
    logger.info("GET /grade/:id")
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter(
      grade => grade.id !== parseInt(req.params.id));
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();
    logger.info(`DELETE /grade/:id - ${req.params.id}`)
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const grade = req.body;

    if (!grade.student || !grade.type || !grade.subject || grade.value == null) {
      throw new Error("Campos obrigatórios não preenchidos.");
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex(a => a.id === grade.id);

    if (index === -1) {
      throw new Error("Registro não encontrado.");
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    data.grades[index].timestamp = new Date();


    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);

    logger.info(`PUT /grade - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

router.get("/notaTotal/:student/:subject", async (req, res, next) => {
  try {
    let nota = 0;
    const data = JSON.parse(await readFile(global.fileName));
    const studentGrades = data.grades.filter(
      grade => grade.student === req.params.student && grade.subject === req.params.subject);
    studentGrades.forEach(studentGrade => {
      nota += studentGrade.value
    });
    console.log(studentGrades)
    if (studentGrades.length < 1) {
      throw new Error("Registro não encontrado.");
    }
    res.send({
      student: req.params.student,
      subject: req.params.subject,
      total: nota
    });

    logger.info("GET /grade/notaTotal/")
  } catch (err) {
    next(err);
  }
});

router.get("/mediaGrade/:subject/:type", async (req, res, next) => {
  try {
    let nota = 0;
    const data = JSON.parse(await readFile(global.fileName));
    const studentGrades = data.grades.filter(
      grade => grade.type === req.params.type && grade.subject === req.params.subject);
    studentGrades.forEach(studentGrade => {
      nota += studentGrade.value
    });
    if (studentGrades.length < 1) {
      throw new Error("Registro não encontrado.");
    }
    console.log(studentGrades)
    res.send({
      subject: req.params.subject,
      type: req.params.type,
      media: nota / studentGrades.length
    });

    logger.info("GET /grade/notaTotal/")
  } catch (err) {
    next(err);
  }
});

router.get("/topGrade/:subject/:type", async (req, res, next) => {
  try {
    let nota = 0;
    const data = JSON.parse(await readFile(global.fileName));
    const studentGrades = data.grades.filter(
      grade => grade.type === req.params.type && grade.subject === req.params.subject);
    studentGrades.forEach(studentGrade => {
      nota += studentGrade.value
    });
    if (studentGrades.length < 1) {
      throw new Error("Registro não encontrado.");
    }

    res.send(studentGrades.sort((a, b) => b.value - a.value).filter((studentGrade, idx) => idx < 3));

    logger.info("GET /grade/topGrade/")
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;