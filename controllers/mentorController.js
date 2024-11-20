import Mentor from '../modules/mentor.js';
import Student from '../modules/student.js';

// Create a Mentor
export const createMentor = async (req, res) => {
  const { name, expertise } = req.body;
  try {
    const mentor = new Mentor({ name, expertise });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get all mentors
export const getAllMentors = async (req, res) => {
    try {
      const mentors = await Mentor.find();
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Assign a single student to a mentor
export const assignStudentToMentor = async (req, res) => {
  const { mentorId } = req.params;
  const { studentId } = req.body;
  try {
    const mentor = await Mentor.findById(mentorId);
    const student = await Student.findById(studentId);
    if (!mentor || !student) throw new Error("Mentor or Student not found");

    mentor.students.push(studentId);
    student.mentor = mentorId;
    await mentor.save();
    await student.save();

    res.status(200).json({ message: "Student assigned to mentor successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Assign multiple students to a mentor
export const assignMultipleStudentsToMentor = async (req, res) => {
  const { mentorId } = req.params;
  const { studentIds } = req.body;
  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) throw new Error("Mentor not found");

    await Student.updateMany(
      { _id: { $in: studentIds } },
      { $set: { mentor: mentorId } }
    );

    mentor.students.push(...studentIds);
    await mentor.save();

    res.status(200).json({ message: "Multiple students assigned to mentor successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students for a particular mentor
export const getStudentsForMentor = async (req, res) => {
  const { mentorId } = req.params;
  try {
    const mentor = await Mentor.findById(mentorId).populate('students');
    if (!mentor) throw new Error("Mentor not found");

    res.status(200).json(mentor.students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
