/* use employees, we want to insert into department, insert into roles w/ values, insert into employees w/ values */

use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Josh', 'Doe', 3, NULL),
    ('Kevin', 'Doe', 4, 3),
    ('Jarret', 'Doe', 5, NULL),
    ('Jordan', 'Doe', 6, 5),
    ('Michael', 'Doe', 7, NULL),
    ('Peter', 'Doe', 8, 7);
