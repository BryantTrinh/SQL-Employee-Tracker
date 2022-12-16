const connection = require("./connection"):

// do constructor connection for future use
class DB {
  constructor(connection) {
    this.connection = connection;
  }

// we want to view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.salary, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }


  // Create employee

  createEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
  }

  // Find all employee, not by their id

  findAllPossibleManagers(employeeId) {
    return this.connection.promise().query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?", employeeId
    );
  }

  // Update employee role

  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
    );
  }

// Update employee's manager

updateEmployeeManager(employeeId, managerId) {
  return this.connection.promise().query("UPDATE employee SET manager_id = ? WHERE id = ?", [managerId, employeeId]
  );
}

  // Delete an employee with id

  removeEmployee(employeeId) {
    return this.connection.promise().query("DELETE FROM employee where id = ?", employeeId
    );
  }

  