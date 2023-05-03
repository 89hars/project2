const { Schema, model } = require("mongoose");
const Employee = require("./employee.model");
//const { checkout } = require("../app");

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      enum: ["check-in", "check-out"]
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Employee"

    } 
},
// this second object adds extra properties: `createdAt` and `updatedAt`
{timestamps: true}
);

const Event = model("Event", eventSchema);

module.exports = Event;
