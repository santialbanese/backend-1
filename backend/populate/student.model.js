import mongoose from "mongoose";

const studentCollection = "students";

const studentSchema = new mongoose.Schema({
    first_name: {
      type: String
    },
    last_name:  {
      type: String
    },
    email:  {
      type: String
    },
    gender:  {
      type: String
    },
    courses: {
      type: [ { course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" } } ]
    }
});

studentSchema.pre("find", function () {
  this.populate("courses.course")
})

export const studentModel = mongoose.model(studentCollection, studentSchema);