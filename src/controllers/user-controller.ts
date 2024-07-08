import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";

export class UserController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as User;
            const response = await UserService.create(request);

            res.status(201).json({
                message: "create user success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.getAll();

            res.status(200).json({
                message: "get user success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.getOne(req.params.id);

            res.status(200).json({
                message: "get user success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as User;
            request.id = req.params.id;
            const response = await UserService.update(request);

            res.status(200).json({
                message: "update user success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await UserService.delete(req.params.id);

            res.status(200).json({
                message: "delete user success",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    }
}
