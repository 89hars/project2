const { Schema, model } = require("mongoose");

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
