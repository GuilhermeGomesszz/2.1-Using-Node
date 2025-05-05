import mongoose from 'mongoose';


const compraSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    data:{
        type: Date,
        default: Date.now,
    },
});

export default  mongoose.model('Compra', compraSchema);