import mongoose, { mongo } from "mongoose";
import { courseModel } from "./course.model.js";
import { studentModel } from "./student.model.js";

const environment = async () => {
    await mongoose.connect("mongodb+srv://santialbanese11:Hve6svwbpwKoLiLv@backend-1.dmjvco3.mongodb.net/estudiantes")


    // Creamos un curso
    /* await courseModel.create({
        title: "Curso de Backend",
        description: "Backend I",
        difficulty: 5,
        topics: ["Javascript", "Node", "Express"],
        professor: "Luis"
    }); */

    //estudiante
    /* await studentModel.create({
        first_name: "Pepe",
        last_name: "Sapo",
        email: "sp@gmail.com",
        gender: "Sapo",
        courses: [{ course: "66a5869015574f3a3f775748" }]
    }) */

    //consultar estudiante creado
    const student = await studentModel.find({_id: "66a58763b36f7f250acae75b"})
    console.log(student)

    //consultar estudiante con populate
    /* const student = await studentModel.findById("66a58763b36f7f250acae75b").populate("courses.course")
    console.log(student) */


    mongoose.disconnect();
    console.log("desconectado")
}

environment();