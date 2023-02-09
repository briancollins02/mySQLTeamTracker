const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const PORT = process.env.PORT || 3306;

const connection  = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'BrCo92sri24%',
        connectTimeout: 60000,
        database: 'team_db',
    },
    console.log(`Conected to the team_db database`)
);


function init()  {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add employee',
            'Add departments',
            'Add roles',
            'Update employee role',
            'exit'
        ]
    })
    .then((answers) => {
        switch (answers.action) {
            case 'View all employees':
                console.log("that's rad");
                viewEmp();
            break;
            case 'View all departments':
                viewDept();
            break;
            case 'View all roles':
                viewRole();
            break;
            case 'Add employee':
                addEmp();
            break;
            case 'Add departments':
                addDept();
            break;
            case 'Add roles':
                addRole();
            break;
            case 'Update employee role':
                updateRole();
            break;
            default:
                console.log('Disconnected!');
                connection.end();
                return;
        }
    });
};

function viewEmp() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log('employees viewed!');
            init();
        }
    );
};


function viewDept() { 
    connection.query('SELECT * FROM department', function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log('departments viewed!');
            init();
        }
    );
};

function viewRole() { 
    connection.query('SELECT * FROM role', function (err, res) {
            if (err) throw err;
            console.table(res);
            console.log('roles viewed!');
            init();
        }
    );
};

function addEmp() {
    let input = [
        {
            type: 'input',
            message: "Employee's first name",
            name: 'first_name'
        },
        {
            type: 'input',
            message: "Employee's last name",
            name: 'last_name'
        },
        {
            type: 'input',
            message: "Employee role ID",
            name: 'role_id'
        },
        {
            type: 'input',
            message: "Employee Manager ID",
            name: 'manager_id'
        }
    ];
    inquirer.prompt(input).then(function(answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id,
            },
            function (err) {
                if (err) throw err;
                console.log('Employee added!');
                init();
            }
        )
    }
)};

function addDept() {
    inquirer.prompt({
        type: 'input',
        message: 'Department name',
        name: 'department'
    })
    .then(function(answer) {
        console.log(answer.department);
        connection.query("INSERT INTO department SET ?",
        {name: answer.department},
        function(err) {
            err ? console.log(err) : init();
        })
    })
};

function addRole() {
    let input = [
        {
            type: 'input',
            message: 'Role title',
            name: 'title'
        },
        {
            type: 'input',
            message: 'department ID',
            name: 'department_id'
        },
        {
            type: 'input',
            message: 'what is the salary for this role?',
            name: 'salary'
        }
    ];
    inquirer.prompt(input).then(function(answer) {
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: answer.title,
                department_id: answer.department_id,
                salary: answer.salary
            },
            function(err) {
                err ? console.log(err) : init();
            }
        )
    });
};

function updateRole() {
    let input = [
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the employee you wish to edit'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enther the ID of the role you wish to assign'
        }
    ]
   inquirer.prompt(input).then(function(answer) {
    console.log(answer);
    connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answer.role_id, answer.id],
        function(err) {
            err ? console.log(err) : init()
        })
   })
};
 

init();