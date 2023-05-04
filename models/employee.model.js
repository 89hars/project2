const { Schema, model } = require("mongoose");

// Model of the Employee to track new Employees on the DB, passwordHash just an extra security step.

const employeeSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
    },
  },
  {   
    timestamps: true
  }
);

const Employee = model("Employee", employeeSchema);

module.exports = Employee;
