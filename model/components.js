const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "processor",
      "RAM",
      "Storage",
      "Graphics Card",
      "Display",
      "Battery",
      "Keyboard",
      "Operating System"
    ],
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  
  priceHistory: [
    {
      price: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Component", componentSchema);