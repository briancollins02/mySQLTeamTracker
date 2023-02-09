

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brian", "Collins", 1, null), ("Jonathan", "Garza", 2, 1), ("Benjamin", "Walker", 3, null),("Kayla", "Pruitt", 4, 3),
("Avery", "Windsor", 5, null), ("Joseph", "Malm", 4, 3), ("Gregory", "Isakov", 7, 10), ("Ariana", "Watson", 7, 10),
("Jenna", "Garcia", 5, null), ("Anna", "Cosgrove", 6, null);

INSERT INTO department (name)
VALUES ('Marketing'), ('Design'), ('Finance'), ('R&D');

INSERT INTO role (title, salary, department_id)
VALUES ('Marketing Lead', 100000, 1), ('Market Research', 80000, 1), ('Producer', 150000, 2), ('Illustrator', 120000, 2), ('Accountant', 125000, 3), ('Product Research Lead', 250000, 4), ('Data Analyst', 190000, 4);
