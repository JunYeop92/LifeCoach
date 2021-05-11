import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema } = mongoose;

const TodoSchema = new Schema({
    content: String,
    insertDate: { type: Date, default: Date.now },
    category: Schema.Types.ObjectId,
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
