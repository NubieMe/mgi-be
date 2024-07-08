import { NextFunction, Request, Response } from "express";
import { CsvService } from "../service/csv-service";
import { ResponseError } from "../error/response-error";

export class CsvController {
    static async upload(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) throw new ResponseError(400, "file required");

            const request = req.file.filename;

            const response = await CsvService.upload(request);
            res.status(200).json({
                message: "upload success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async import(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body.data;

            const response = await CsvService.import(request);
            res.status(200).json({
                message: "import data success",
                data: response,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}
