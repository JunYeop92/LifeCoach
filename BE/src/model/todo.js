import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema } = mongoose;

const TodoSchema = new Schema({
    content: String,
    isCompleted : { type: Boolean, default: false },
    insertDate: { type: Date, default: Date.now },
    categoryId: Schema.Types.ObjectId,
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
