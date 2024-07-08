import fs from "fs";
import { csv2Json } from "../utils/convert-csv";
import { User } from "@prisma/client";
import { prismaClient } from "../database/prisma";
import { ResponseError } from "../error/response-error";

export class CsvService {
    static async upload(filename: string) {
        const path = "src/uploads/" + filename;

        const file = fs.readFileSync(path, {
            encoding: "utf-8",
        });

        const json = csv2Json(file);

        fs.unlinkSync(path);

        return json;
    }

    static async import(data: User[]) {
        const check = await prismaClient.user.findMany();

        for (let i = 0; i < data.length; i++) {
            check.forEach((val) => {
                if (val.id == data[i].id) throw new ResponseError(400, "data already exist");
            });
        }

        const user = await prismaClient.user.createMany({
            data,
        });

        return user;
    }
}
