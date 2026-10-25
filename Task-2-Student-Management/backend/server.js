const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database Array
let students = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", course: "Full Stack Development", grade: "A" },
  { id: "2", name: "Sam Smith", email: "sam@example.com", course: "Data Science", grade: "B+" }
];

// GET API: Fetch all student records
app.get("/api/students", (req, res) => {
  res.json(students);
});

// POST API: Add a new student record
app.post("/api/students", (req, res) => {
  const { name, email, course, grade } = req.body;
  if (!name || !email || !course || !grade) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const newStudent = { id: Date.now().toString(), name, email, course, grade };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// DELETE API: Remove a student record by ID
app.delete("/api/students/:id", (req, res) => {
  const { id } = req.params;
  students = students.filter((s) => s.id !== id);
  res.json({ message: "Student record deleted successfully." });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});