import express, { Router } from 'express';

// Import index action from routines controller
import { index } from './controllers/routines';

// Initialize the Router
const router = Router();

// Handle /routines.json route and calls index query method from routines controller
router.route('/routines.json')
  .get(index)

export default router;
