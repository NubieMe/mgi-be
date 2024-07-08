import express from "express";
import upload from "../middlewares/upload-file";
import { CsvController } from "../controllers/csv-controller";
import { UserController } from "../controllers/user-controller";

export const routes = express.Router();

// csv API
routes.post("/upload", upload.single("file"), CsvController.upload);
routes.post("/import", CsvController.import);

// user API
routes.post("/user", UserController.create);
routes.get("/user", UserController.getAll);
routes.get("/user/:id", UserController.getOne);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);
