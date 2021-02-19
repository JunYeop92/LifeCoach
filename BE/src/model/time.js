import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema } = mongoose;

const TimeSchema = new Schema({
    category: String,
    ymd: String,
    seq: Number,
    isEnd: Boolean,
    insertDate: Date,
});

//순번 추가
const AutoIncrement = AutoIncrementFactory(mongoose);
TimeSchema.plugin(AutoIncrement, { inc_field: 'seq' });

const Time = mongoose.model('Time', TimeSchema);

export default Time;
