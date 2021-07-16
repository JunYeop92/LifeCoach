import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema } = mongoose;

const CategorySchema = new Schema({
    content: String,
    insertDate: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
