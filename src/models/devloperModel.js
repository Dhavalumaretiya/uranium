const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const devloperSchema = new mongoose.Schema({
    
	name:String,
    gender:{
        type: String,
        enum: ["male","female","LGBTQ"]
    },
    percentage:Number,
	batch:{
        type: ObjectId,
        ref:"batches"
    },

},{ timestamps: true });

module.exports = mongoose.model('developers',devloperSchema);

