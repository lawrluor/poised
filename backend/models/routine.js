import mongoose, { Schema } from 'mongoose';

// Define Routine Schema
// Store just IDs if space is a concern, and cleanness. mongo has limit (16mb?)
var routineSchema = new Schema({
  routine_id: Number,
  user_id: Number,
  author: String,
  name: String,
  totalLength: Number,
  convertedLength: String,
  overallRating: Number
  // actions: [0, 1]
});

export default mongoose.model('routine', routineSchema);
