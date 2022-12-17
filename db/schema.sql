
DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;


USE employees;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

/* dep_ind is name of index and we need to create an INDEX on that column which will allow mysql to locate and retrieve those rows using the INDEX structure. Foreign key to be used so that it refers to a primary key in another table and ensures data is consistent. We should use fk_department which means foreign key. Use Constraint to specify name of foreign key constraint. ON DELETE CASCADE to specify what happens to the rows in our table that contain a foreign key. MySQL should delete any rows in the current table that we are referencing in the referenced table */

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id)
  REFERENCES department(id) ON DELETE CASCADE
);

/** use UNSIGNED attribute to specify that the column can only store positive integers, auto_increment to assign a unique integer value whenever we enter a new row **/

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) on DELETE CASCADE,
  maanger_id INT UNSIGNED,
  INDEX man_index(manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id)
  REFERENCES employee(id) ON DELETE SET NULL
);