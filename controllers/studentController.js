import student from '../modules/student.js';
import Student from '../modules/student.js';

// Create a Student
export const createStudent = async (req, res) => {
  const { name, class: studentClass } = req.body;
  try {
    const student = new Student({ name, class: studentClass });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get student
export const getAllStudents = async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// List unassigned students
export const listUnassignedStudents = async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
