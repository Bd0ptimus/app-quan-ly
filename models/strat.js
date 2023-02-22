const mongoose = require("mongoose");
const { Schema } = mongoose;

const stratSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    }
})
const Strat = mongoose.model('Strat', stratSchema);
module.exports = Strat;