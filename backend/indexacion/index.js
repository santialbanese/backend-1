import mongoose from "mongoose";
import { seedUsers } from "./seed/seedUsers.js";
import { userModel } from "./user.model.js";

const environment = async () => { 
    await mongoose.connect("mongodb+srv://santialbanese11:Hve6svwbpwKoLiLv@backend-1.dmjvco3.mongodb.net/ejemplo")
    
    const res = await userModel.find({first_name: "Paco"}).explain("executionStates");
    console.log(res)

    mongoose.disconnect();
    console.log("desconectado")
}


environment();