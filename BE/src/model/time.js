import mongoose from 'mongoose';

const { Schema } = mongoose;

const TimeSchema = new Schema({
    categoryId: Schema.Types.ObjectId,
    todoId : {type : Schema.Types.ObjectId, ref : 'Todo'},
    ymd: String,
    startDate: Date,
    endDate: Date,
    totalTime: Number,
});

const Time = mongoose.model('Time', TimeSchema);

export default Time;
