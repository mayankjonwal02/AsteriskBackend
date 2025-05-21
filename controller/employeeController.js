const Employee = require('../models/Employee');

// Pre-created employees
const preCreatedEmployees = [
  { name: 'Mayank', employeeId: 'EMP001' },
  { name: 'Amit', employeeId: 'EMP002' },
  { name: 'Priya', employeeId: 'EMP003' },
  { name: 'Sonia', employeeId: 'EMP004' },
  { name: 'Ravi', employeeId: 'EMP005' },
];

exports.seedEmployees = async () => {
  const count = await Employee.countDocuments();
  if (count === 0) {
    await Employee.insertMany(preCreatedEmployees);
  }
};

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
};

exports.addEmployee = async (req, res) => {
  const { name, employeeId } = req.body;
  const exists = await Employee.findOne({ employeeId });
  if (exists) return res.status(400).json({ message: 'Employee ID already exists' });
  const employee = new Employee({ name, employeeId });
  await employee.save();
  res.status(201).json(employee);
};
