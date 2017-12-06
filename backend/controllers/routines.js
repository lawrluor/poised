import Routine from '../models/routine';

// to be called from router
export const index = (req, res, next) => {
  // Find all Routines and return json response
  Routine.find().lean().exec((err, routines) => res.json(
    routines
  ));
}
