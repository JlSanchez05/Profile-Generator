const generateHTML = require('./src/generateHTML')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const fs = require('fs')
const inquirer = require('inquirer')
// empty array to put all the members together later
const teamArray = [] 

// start of manager prompts 
const manager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Enter Managers Name', 
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log ('Enter Manager ID')
                    return false
                }
            }
        }, {
            type: 'input',
            name: 'id',
            message: "Enter Manager ID",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Enter Manager ID")
                    return false 
                } else {
                    return true
                }
            }
        },{
            type: 'input',
            name: 'email',
            message: 'Enter Managers Email',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true
                } else {
                    console.log ('Enter Email Correctly!')
                    return false 
                }
            }
        },{
            type: 'input',
            name: 'officeNumber',
            message: 'Enter Managers Office Number',
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('Enter Office Number Correctly!')
                    return false 
                } else {
                    return true
                }
            }
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput 
        const manager = new Manager (name, id, email, officeNumber)

        teamArray.push(manager)
        console.log(manager) 
    })
};

const addEmployee = () => {
    console.log(`
    ***********************************************************
    ~ ADDING EMPLOYEES TO TEAM ~
    ***********************************************************

    `)
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: 'Please Choose A Role For Employee',
            choices: ['Engineer', 'Intern']
        },{
            type: 'input',
            name: 'name',
            message: "What Is The Employees Name ?", 
            validate: nameInput => {
                if (nameInput) {
                    return true
                } else {
                    console.log ('Enter Employees Name Correctly!')
                    return false
                }
            }
        },{
            type: 'input',
            name: 'id',
            message: "Enter Employees ID",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('Enter Employees ID')
                    return false; 
                } else {
                    return true;
                }
            }
        },{
            type: 'input',
            name: 'email',
            message: 'Enter Employees Email',
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true
                } else {
                    console.log ('Enter Email Please!')
                    return false 
                }
            }
        }, {
            type: 'input',
            name: 'github',
            message: 'Enter Employees Github UserName',
            when: (input) => input.role === 'Engineer',
            validate: nameInput => {
                if (nameInput ) {
                    return true
                } else {
                    console.log ('Enter The Github UserName!')
                }
            }
        },{
            type: 'input',
            name: 'school',
            message: 'Enter Interns School',
            when: (input) => input.role === 'Intern',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ('Enter The Interns School!')
                }
            }
        }, {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would You Like To Add More Members',
            default: false
        }
    ]).then(employeeData => {
        // employee data check

        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData
        let employee

        if (role === 'Engineer') {
            employee = new Engineer (name, id, email, github)

            console.log(employee)

        } else if (role === 'Intern') {
            employee = new Intern (name, id, email, school)

            console.log(employee)
        }

        teamArray.push(employee) 

        if (confirmAddEmployee) {
            return addEmployee(teamArray) 
        } else {
            return teamArray
        }
    })

};

//using function to create html file
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err)
            return
        } else {
            console.log('Team Has Been Generated Check index.html To see results')
        }
    })
}; 

//chaining addmanager function to add the user inputs in

manager()
  .then(addEmployee)
  .then(teamArray => { return generateHTML(teamArray) }).then(pageHTML => {return writeFile(pageHTML)}).catch(err => {console.log(err)
  })