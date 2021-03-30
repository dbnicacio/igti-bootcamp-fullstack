import express from "express";
import winston from "winston";
import { promises as fs } from "fs";
import gradesRouter from "./routes/grades.js"
const { readFile, writeFile } = fs;

global.fileName = "./data/grades.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "my-bank-api.log" })
  ],
  format: combine(
    label({ label: "my-bank-api" }),
    timestamp(),
    myFormat
  )
});

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/grade", gradesRouter);
app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info("API Started!");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
      logger.info("API Started and File Created!");
    }).catch(err => {
      logger.error(err);
    });
  }
});