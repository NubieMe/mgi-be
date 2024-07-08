import { User } from "@prisma/client";
import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";

export class UserService {
    static async create(req: User): Promise<User> {
        const checkId = await prismaClient.user.count({
            where: {
                id: req.id,
            },
        });

        if (checkId != 0) throw new ResponseError(400, "id already exists");

        const checkName = await prismaClient.user.count({
            where: {
                id: req.id,
            },
        });

        if (checkName != 0) throw new ResponseError(400, "name already exists");

        const user = await prismaClient.user.create({
            data: req,
        });

        return user;
    }

    static async getAll(): Promise<User[]> {
        return await prismaClient.user.findMany();
    }

    static async getOne(id: string): Promise<User> {
        const user = await prismaClient.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) throw new ResponseError(404, "user not found");

        return user;
    }

    static async update(req: User): Promise<User> {
        const user = await prismaClient.user.count({
            where: {
                id: req.id,
            },
        });

        if (user == 0) throw new ResponseError(400, "user not found");

        const updated = await prismaClient.user.update({
            where: {
                id: req.id,
            },
            data: req,
        });

        return updated;
    }

    static async delete(id: string): Promise<User> {
        const user = await prismaClient.user.count({
            where: {
                id,
            },
        });

        if (user == 0) throw new ResponseError(400, "user not found");

        const deleted = await prismaClient.user.delete({
            where: {
                id,
            },
        });

        return deleted;
    }
}
