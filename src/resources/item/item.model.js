import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  status: {
    type: String,
    required: true,
    // 取值范围
    enum: ['active', 'complete', 'pastdue'],
    default: 'active'
  },
  // 简写形式
  notes: String,
  due: Date,
  createdBy: {
    // 等同于 MongoDB 中的id？
    type: mongoose.SchemaTypes.ObjectId,
    // 这个任务项是和list表单挂钩的，但是这里不是特别理解
    // TODO:
    ref: 'user',
    required: true
  },
  list: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'list',
    required: true
  }
}, { timestamps: true })
export const Item = mongoose.model('item', itemSchema)
