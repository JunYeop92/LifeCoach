import mongoose from 'mongoose';

const { Schema } = mongoose;

const TimeSchema = new Schema({
    category: String,
    ymd: String,
    seq: Number,
    isEnd: Boolean,
    insertDate: Date,
});

const Time = mongoose.model('Time', TimeSchema);
export default Time;
