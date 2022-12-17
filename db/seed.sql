/* use employees, we want to insert into department, insert into roles w/ values, insert into employees w/ values */

use employees; 

INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');


INSERT INTO role (title, salary, department_id)

VALUES 
  ('Sales Lead', 70000, 1),
  ('Salesperson', 50000, 1),
  ('Lead Engineer', 200000, 2),
  ('Software Engineer', 150000, 2),
  ('Account Manager', 130000, 3),
  ('Accountant', 100000, 3),
  ('Legal Team Lead', 200000, 4),
  ('Lawyer', 175000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Doe', 2, 1),
  ('Josh', 'Doe', 3, NULL),
  ('Kevin', 'Doe', 4, 3),
  ('Timmy', 'Doe', 5, NULL),
  ('Jimmy', 'Doe', 6, 5),
  ('Peter', 'Doe', 7, NULL),
  ('WIlliam', 'Doe', 8, 7);