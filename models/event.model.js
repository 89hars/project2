const { Schema, model } = require("mongoose");
//const { checkout } = require("../app");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      enum: ["checkin", "checkout"]
    }, 
},
// this second object adds extra properties: `createdAt` and `updatedAt`
{timestamps: true}
);

const Event = model("Event", eventSchema);

module.exports = Event;