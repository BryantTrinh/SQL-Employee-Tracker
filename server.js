const { prompt } = require('inquirer');
const db = require('./db');
require('console.table');
const logo = require('asciiart-logo');
init();

// We want to display the logo asciiart-logo and then load prompts

function init() {
	const logoText = logo({
		name: 'Employee Manager',
	}).render();
	console.log(logoText);
	loadMainPrompts();
}

// loadMainPrompts function with all prompts. Array of prompts

function loadMainPrompts() {
	prompt([
		{
			type: 'list',
			name: 'choice',
			message: 'What do you want to do?',
			choices: [
				{
					name: 'View Employees',
					value: 'VIEW_EMPLOYEES',
				},
				{
					name: 'View All Employees By Department',
					value: 'VIEW_EMPLOYEES_BY_DEPARTMENT',
				},
				{
					name: 'View All Employees By Manager',
					value: 'VIEW_EMPLOYEES_BY_MANAGER',
				},
				{
					name: 'Add Employee',
					value: 'ADD_EMPLOYEE',
				},
				{
					name: 'Remove Employee',
					value: 'REMOVE_EMPLOYEE',
				},
				{
					name: 'Update Employee',
					value: 'UPDATE_EMPLOYEE_ROLE',
				},
				{
					name: "Update Employee's Manager",
					value: 'UPDATE_EMPLOYEE_MANAGER',
				},
				{
					name: 'View All Roles',
					value: 'VIEW_ROLES',
				},
				{
					name: 'Add Role',
					value: 'ADD_ROLE',
				},
				{
					name: 'Remove Role',
					value: 'REMOVE_ROLE',
				},
				{
					name: 'View All Departments',
					value: 'VIEW_DEPARTMENTS',
				},
				{
					name: 'Add Department',
					value: 'ADD_DEPARTMENT',
				},
				{
					name: 'Remove Department',
					value: 'REMOVE_DEPARTMENT',
				},
				{
					name: 'View Total Utilized Budget By Department',
					value: 'VIEW_UTILIZED_BUDGET_BY_DEPARTMENT',
				},
				{
					name: 'Quit',
					value: 'QUIT',
				},
			],
		},
	]).then((res) => {
		let choice = res.choice;
	});
}
