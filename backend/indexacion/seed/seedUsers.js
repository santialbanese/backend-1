import fs from "fs";
import dirname from "../dirname.js"
import { userModel } from "../user.model.js";
import { parse } from "path";

export const seedUsers = async () => { 
    try {
        
        const users = await fs.promises.readFile(dirname + "/seed/Users.json", "utf-8");
        const usersParse = await JSON.parse(users);

        await userModel.insertMany(usersParse);

        console.log("realizado")

    } catch (error) {
        console.log(error)
    }
}