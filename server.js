const { prompt } = require('inquirer');
const db = require('./db');
require('console.table');
const logo = require('asciiart-logo');
const { removeEmployee, updateEmployeeRole, removeDepartment, removeRole } = require('./db');
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
    // use switch/case to let the user pick whatever choice they want
	]).then((res) => {
		let choice = res.choice;
    switch(choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
      break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
      break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
      break;
      case "ADD_EMPLOYEE":
        addEmployee();
      break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
      break;    
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
      break;
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
      break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
      break;
      case "ADD_DEPARTMENT":
        addDepartment();
      break;
      case "REMOVE_DEPARTMENT":
      removeDepartment();
      break;
      case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetsByDepartment();
      break;  
      case "VIEW_ROLES":
        viewRoles();
      break;
      case "ADD_ROLE":
        addRole();
      break;
      case "REMOVE_ROLE":
        removeRole();
      break;
      default:
        quit();
    }
	}
  )
}


// Be able to view all employees that are in a department

function viewEmployeesByDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "departmentId",
          message: "What department would you like to see the employees?",
          choices: departmentChoices
        }
      ])
        .then(res => db.findAllEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        })
        .then(() => loadMainPrompts())
    });
}  
// function to be able to view all employees

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.log(employees);
    })
    .then(() => loadMainPrompts());
}

// view employees by specific manager

function viewEmployeesByManager() {
  db.findAllEmployees()
    .then(([rows]) => {
      let manager = rows;
      const managerChoices = managers.map(({ id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employee do you want to see direct reports for?",
        choices: managerChoices
      }
    ])
      .then(res => db.findAllEmployeesByManager(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("The selected employee has no direct manager that they report to");
        } else {
          console.table(employees);
        }
      })
      .then(() => loadMainPrompts())
    });
}

// function to update an employee's role

function updateEmployeeRole() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update?",
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.findAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title}) => ({
              name: title,
              value: id
            }));
          prompt([
            {
              type: "list",
              name: "roleId",
              message: "Which role do you want to assign to the employee?",
              choices: roleChoices
            }
          ])
            .then(res => db.updateEmployeeRole(employeeId, res.roleId))
            .then(() => console.log("Updated employee's, role"))
            .then(() => loadMainPrompts())
          });
        });
    })
}


// Function to delete employee

function removeEmployee() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select an employee you want to remove",
          choices: employeeChoices
        }
      ])
        .then(res => db.removeEmployee(res.employeeId))
        .then(() => console.log("Removed employee from the database"))
        .then(() => loadMainPrompts())
    })
}

// function to update an employee's maanger

function updateEmployeeManager() {
  db.findAllEmployeesByManager()
  .then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices
      }
    ])
      .then(res => {
        let employeeId = res.employeeId
        db.findAllPossibleManagers(employeeId)
        .then(([rows]) => {
          letmanagers = ros;
          const managerChoices = managers.map(({ id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }));
          prompt([
            {
              type: "list",
              name: "managerId",
              message:"Which employee do you want to set as manager for the selected employee?",
              choices: managerChoices
            }
          ])
            .then(res => db.updateEmployeeManager(employeeId, res.managerId))
            .then(() => console.log("Updated employee's manager"))
            .then(() => loadMainPrompts())
        })
      })
  })
}

// view all the roles

function viewRoles() {
  db.findAllRoles()
  .then(([rows]) => {
    let roles = rows;
    console.log("\n");
    console.table(roles);
  })
  .then(() => loadMainPrompts());
}

// Add role

function addRole() {
  db.findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
    
    prompt([
      {
        name: "title",
        message: "What is the role's name?"
      },
      {
        name: "salary",
        message: "What is the salary of this role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices
      }
    ])
      .then(role => {
        db.createRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => loadMainPrompts())
      })
  })
}

// delete role

function removeRole() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to remove? This will remove eployees as well",
        choices: roleChoices
      }
    ])
      .then(res => db.removeRole(res.roleId))
      .then(() => console.log("Removed role from database"))
      .then(() => loadMainPrompts())
  })
}

// view departments

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

// add departments

function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of department?"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => loadMainPrompts())
    }) 
}

// Delete department

function removeDepartment() {
  db.findAllDepartments()
  .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
    prompt({
      type: "list",
      name: "departmentId",
      message: "Which department do you want to remove? This will remove their roles and employees)",
      choices: departmentChoices
    })
    .then(res => db.removeDepartment(res.departmentId))
    .then(() => console.log(`Removed department from the database`))
    .then(() => loadMainPrompts())
  })
}


// function to view all department and their utilized_budget

function viewUtilizedBudgetsByDepartment() {
  db.viewDepartmentBudgets()
  .then(([rows]) => {
    let departments = rows;
    console.log("\n");
    console.table(departments);
  })
  .then(() => loadMainPrompts());
}

// add employee

function addEmployee() {
  prompt([
		{
			name: 'first_name',
			message: "What is the employee's first name?",
		},
		{
			name: 'last_name',
			message: "What is the employee's last name?",
		}
	])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
        prompt({
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        })
          .then(res => {
            let roleId = res.roleId;

            db.findAllEmployees()
            .then(([rows]) => {
              let employees = rows;
              const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
              }));

              managerChoices.unshift({
                name: "None", 
                value: null });
                
              prompt({
                type: "list",
                name: "managerId",
                message: "Who is the employee's manager?",
                choices: managerChoices
              })  
                .then(res => {
                  let employee = {
                    manager_id: res.managerId,
                    role_id: roleId,
                    first_name: firstName,
                    last_name: lastName
                  }
                  db.createEmployee(employee);
                })
                .then(() => console.log(`Added ${firstName} ${lastName} to the database`))
                .then(() => loadMainPrompts())
            })
        })
    })
}

// End, use function quit to exit app

function quit() {
  console.log("Ending application, goodbye");
  process.exit();
}