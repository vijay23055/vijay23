import express from 'express';
import { createStudent, listUnassignedStudents , getAllStudents } from '../controllers/studentController.js';

const router = express.Router();

router.post('/', createStudent);
router.get('/', getAllStudents);
router.get('/unassigned', listUnassignedStudents);

export default router;
