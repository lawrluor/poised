// Populates database with model objects

import mongoose from 'mongoose';
import Routine from './models/routine';

export const routines = [
  {
    routine_id: 0,
    user_id: 0,
    author: "Lawrence Luo",
    name: "Calming Routine",
    totalLength: 40,
    convertedLength: "00:40",
    overallRating: 5
  },
  {
    routine_id: 1,
    user_id: 0,
    author: "Dr. Karin Hendricks",
    name: "Get Hype",
    totalLength: 50,
    convertedLength: "00:50",
    overallRating: 4
  },
  {
    routine_id: 2,
    user_id: 1,
    author: "Mia Yee",
    name: "Relax",
    totalLength: 30,
    convertedLength: "00:30",
    overallRating: 4
  },
  {
    routine_id: 3,
    user_id: 1,
    name: "Prepare",
    totalLength: 60,
    convertedLength: "1:00",
    overallRating: 3
  },
  {
    routine_id: 4,
    user_id: 2,
    name: "Succeed",
    totalLength: 60,
    convertedLength: "1:00",
    overallRating: 5
  },
  {
    routine_id: 2,
    user_id: 1,
    author: "Lawrence Luo",
    name: "Focus",
    totalLength: 40,
    convertedLength: "00:40",
    overallRating: 4
  },
];


// Connect to MongoDB
mongoose.connect('mongodb://localhost/routines');

// Go through each routine
routines.map(data => {
  // Initialize a model with routine data
  const routine = new Routine(data);

  // Save it into the database
  routine.save()
});
