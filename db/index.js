const connection = require('./connection.js');

// do constructor connection for future use
class DB {
	constructor(connection) {
		this.connection = connection;
	}

	// Create employee

	createEmployee(employee) {
		return this.connection
			.promise()
			.query("INSERT INTO employee SET ?", employee);
	}

	// Find all employee, not by their id

	findAllPossibleManagers(employeeId) {
		return this.connection
			.promise()
			.query(
				"SELECT id, first_name, last_name FROM employee WHERE id != ?",
				employeeId
			);
	}

	// Update employee role

	updateEmployeeRole(employeeId, roleId) {
		return this.connection
			.promise()
			.query("UPDATE employee SET role_id = ? WHERE id = ?", [
				roleId,
				employeeId,
			]);
	}

	// Update employee's manager

	updateEmployeeManager(employeeId, managerId) {
		return this.connection
			.promise()
			.query("UPDATE employee SET manager_id = ? WHERE id = ?", [
				managerId,
				employeeId,
			]);
	}

	// Delete an employee with id

	removeEmployee(employeeId) {
		return this.connection
			.promise()
			.query("DELETE FROM employee WHERE id = ?", employeeId);
	}

	// Create a new department

	createDepartment(department) {
		return this.connection
			.promise()
			.query("INSERT INTO department SET ?", department);
	}

	// remove a department

	removeDepartment(departmentId) {
		return this.connection
			.promise()
			.query("DELETE FROM department WHERE id = ?", departmentId);
	}

	// Be able to create a new role

	createRole(role) {
		return this.connection.promise().query("INSERT INTO role SET ?", role);
	}

	// remove role from mysql database

	removeRole(roleId) {
		return this.connection
			.promise()
			.query("DELETE FROM role WHERE id = ?", roleId);
	}

	// find roles and join with department and display name of department
	findAllRoles() {
		return this.connection
			.promise()
			.query(
				"SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
			);
	}

	// next find all departments

	findAllDepartments() {
		return this.connection
			.promise()
			.query("SELECT department.id, department.name FROM department;");
	}

	// we want to view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

	findAllEmployees() {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
			);
	}

	findAllEmployeesByManager(managerId) {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
				managerId
			);
	}

	findAllEmployeesByDepartment(departmentId) {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
				departmentId
			);
	}

	// we need to find all department combine with employees/roles/and sum up department budget

	viewDepartmentBudgets() {
		return this.connection
			.promise()
			.query(
				"SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
			);
	}
}

module.exports = new DB(connection);
