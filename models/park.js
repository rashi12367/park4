const mongoose = require('mongoose');

const ParkSchema = new mongoose.Schema({
  Car_Registration_number: {
    type: String,
    required: true,
  },
  Owner: { 
    type: String,
    required: true,
    
  },
  Date: {
    type: Date,
    required: true,
    default: new Date()
  },
  Arrival: {
    type: Date,
    required: true,

  },
  Departure: {
    type: Date,
    required: true
  },
  Slot: {
    type: Number,
    required: true
  },
  Fare: {
    type: Number,
    required: true
  },
})

const Park = new mongoose.model("Park", ParkSchema);
module.exports = Park
