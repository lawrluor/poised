// Populates database with model objects

import mongoose from 'mongoose';
import Routine from './models/routine';

export const routines = [
  {
    routine_id: 0,
    user_id: 0,
    author: "Mia Yee",
    name: "Calm",
    preview: "This routine is designed to calm your mind and body through a guided breathing exercise...",
    description: "This routine is designed to calm your mind and body. Through a guided breathing exercise, it will return your breath to a normal rate. It will also reduce anxiety during a 'thinking about thinking' phase, intensely on an unrelated object.",
    actions: [
      {text:"measured breathing", length:30},
      {text:"shake out your limbs", length:30},
      {text:"imagine a lake", length:30}
    ],
    totalLength: 90,
    convertedLength: "1:30",
    overallRating: 67
  },
  {
    routine_id: 1,
    user_id: 0,
    author: "Dr. Karin Hendricks",
    name: "Energize",
    preview: "Sometimes, the best performances require a heightened state of arousal...",
    description: "Sometimes, the best performances require a heightened state of arousal. This routine will amp up your mind and body, and energize you for the your performance ahead.",
    actions: [
      {text:"words of self-affirmation", length:20},
      {text:"power poses", length:30},
      {text:"visualize your performance", length:20}
    ],
    totalLength: 70,
    convertedLength: "1:10",
    overallRating: 14
  },
  {
    routine_id: 3,
    user_id: 1,
    author: "Lawrence Luo",
    name: "Inspire",
    preview: "For many, the best way to execute at their 100% is not the how but the why...",
    description: "For many, the best way to execute at their 100% is not the how but the why. This routine consists of a series of insightful questions that will help you channel your passion behind your performance, and will focus you towards your core goals.",
    actions: [
      {text:"think of 3 reasons why this task matters", length:60},
      {text:"remember who is benefitting from your performance", length:30},
      {text:"ask yourself why you are important to them", length:30}
    ],
    totalLength: 120,
    convertedLength: "2:00",
    overallRating: 832
  },
  {
    routine_id: 4,
    user_id: 1,
    author: "Lawrence Luo",
    name: "Focus",
    preview: "Taking a test emphasizes memory recall and mental dexterity rather than charisma or stage presence...",
    description: "Taking a test emphasizes memory recall and mental dexterity rather than charisma or stage presence. This routine is designed to focus your mind on test materials, help you reiterate the most crucial concepts for the exam, and clear your mind of other distractions.",
    actions: [
      {text:"pick a familiar object or scene, and observe it in your mind", length:30},
      {text:"think of three concepts you have been struggling with", length:60},
      {text:"think of three crucial concepts you've mastered", length:60}
    ],
    totalLength: 120,
    convertedLength: "2:00",
    overallRating: 1044
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
