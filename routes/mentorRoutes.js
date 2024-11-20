import express from 'express';
import { createMentor, assignStudentToMentor, assignMultipleStudentsToMentor, getStudentsForMentor, getAllMentors } from '../controllers/mentorController.js';

const router = express.Router();

router.post('/', createMentor);
router.post('/:mentorId/assign-student', assignStudentToMentor);
router.post('/:mentorId/assign-students', assignMultipleStudentsToMentor);
router.get('/:mentorId/students', getStudentsForMentor);
router.get('/',getAllMentors)

export default router;
