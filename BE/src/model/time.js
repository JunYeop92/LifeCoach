import mongoose from 'mongoose';

const { Schema } = mongoose;

const TimeSchema = new Schema({
    category: Schema.Types.ObjectId,
    ymd: String,
    startDate: Date,
    endDate: Date,
    totalTime: Number,
});

const Time = mongoose.model('Time', TimeSchema);

export default Time;
