import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema } = mongoose;

const TodoSchema = new Schema({
    content: String,
    categoryId: Schema.Types.ObjectId,
    ymd : String,
    isCompleted : { type: Boolean, default: false },
    insertDate: { type: Date, default: Date.now },
    
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
